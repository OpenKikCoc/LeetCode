## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-243)


### [5772. 检查某单词是否等于两单词之和](https://leetcode-cn.com/problems/check-if-word-equals-summation-of-two-words/)

略

```c++
class Solution {
public:
    int get(string s) {
        int ret = 0;
        for (auto c : s)
            ret = ret * 10 + c - 'a';
        return ret;
    }
    
    bool isSumEqual(string firstWord, string secondWord, string targetWord) {
        int a = get(firstWord), b = get(secondWord), c = get(targetWord);
        return a + b == c;
    }
};
```


### [5773. 插入后的最大值](https://leetcode-cn.com/problems/maximum-value-after-insertion/)

略

```c++
class Solution {
public:
    string maxValue(string n, int x) {
        string res;
        if (n[0] == '-') {
            int sz = n.size();
            int p = 1;
            res.push_back('-');
            while (p < sz && n[p] - '0' <= x)
                res.push_back(n[p ++ ]);
            res.push_back('0' + x);
            while (p < sz)
                res.push_back(n[p ++ ]);
        } else {
            int sz = n.size();
            int p = 0;
            while (p < sz && n[p] - '0' >= x)
                res.push_back(n[p ++ ]);
            res.push_back('0' + x);
            while (p < sz)
                res.push_back(n[p ++ ]);
        }
        return res;
    }
};
```

### [5774. 使用服务器处理任务](https://leetcode-cn.com/problems/process-tasks-using-servers/) [TAG]

显然堆

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    vector<int> assignTasks(vector<int>& servers, vector<int>& tasks) {
        int n = servers.size(), m = tasks.size();
        
        priority_queue<PII, vector<PII>, greater<PII>> busy, idle;
        
        for (int i = 0; i < n; ++ i )
            idle.push({servers[i], i});
        
        int ts = 0;
        vector<int> res(m);
        for (int i = 0; i < m; ++ i ) {
            ts = max(ts, i);
            while (busy.size() && busy.top().first <= ts) {
                auto [_, sid] = busy.top(); busy.pop();
                idle.push({servers[sid], sid});
            }
            
            if (idle.empty()) {
                ts = busy.top().first;
                i = i - 1;  // 更新时间戳 再次检查本个任务
            } else {
                auto [rank, sid] = idle.top(); idle.pop();
                res[i] = sid;
                busy.push({ts + tasks[i], sid});
            }
        }
        return res;
    }
};
```

一开始的错误代码

```c++
// WA 30 / 34
class Solution {
public:
    using PII = pair<int, int>;
    
    vector<int> assignTasks(vector<int>& servers, vector<int>& tasks) {
        int n = servers.size(), m = tasks.size();
        vector<int> res(m, -1);
        
        priority_queue<PII, vector<PII>, greater<PII>> idle, working;
        priority_queue<int, vector<int>, greater<int>> task;
        
        for (int i = 0; i < n; ++ i )
            idle.push({servers[i], i});
        
        for (int i = 0; i < m; ++ i ) {
            // 当前遍历到第i个任务 时间也为i 弹出所有到i时刻已完成的任务服务器
            while (working.size()) {
                auto [et, sid] = working.top();
                if (et > i)
                    break;
                else {
                    working.pop();
                    idle.push({servers[sid], sid});
                }
            }
            // 加入当前第i个任务
            task.push(i);
            // 无可用服务器 continue
            if (idle.empty())
                continue;
            
            // 取下标最小的任务
            auto tid = task.top(); task.pop();
            int t = tasks[tid];

            // 存在可用服务器 即使用最优的服务器
            auto [rank, sid] = idle.top(); idle.pop();
            res[tid] = sid;
            working.push({i + t, sid});
        }
        
        // now时间戳
        int now = m;
        while (task.size()) {
            // 根据时间戳更新服务器状态
            while (working.size()) {
                auto [et, sid] = working.top();
                if (et > now)
                    break;
                else {
                    working.pop();
                    idle.push({servers[sid], sid});
                }
            }
            
            // 取下标最小的任务
            auto tid = task.top();
            int t = tasks[tid];
            
            // 如果有可用服务器 则使用该服务器
            // 否则更新时间戳 快进到会有服务器被弹出的时刻
            if (idle.size()) {
                task.pop();
                auto [rank, sid] = idle.top(); idle.pop();
                res[tid] = sid;
                working.push({now + t, sid});
            } else {
                auto [et, sid] = working.top();
                now = et;
            }
        }
        return res;
    }
};
```

问题在于同一时刻开始多个任务的实现细节

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    vector<int> assignTasks(vector<int>& servers, vector<int>& tasks) {
        int n = servers.size(), m = tasks.size();
        vector<int> res(m, -1);
        
        priority_queue<PII, vector<PII>, greater<PII>> idle, working;
        priority_queue<int, vector<int>, greater<int>> task;
        
        for (int i = 0; i < n; ++ i )
            idle.push({servers[i], i});
        
        for (int i = 0; i < m; ++ i ) {
            // 当前遍历到第i个任务 时间也为i 弹出所有到i时刻已完成的任务服务器
            while (working.size()) {
                auto [et, sid] = working.top();
                if (et > i)
                    break;
                else {
                    working.pop();
                    idle.push({servers[sid], sid});
                }
            }
            // 加入当前第i个任务
            task.push(i);
            // 无可用服务器 continue
            if (idle.empty())
                continue;
            
            // ===== 问题在于 此时此刻可能有多个任务可以同时开始 =====
            // 取下标最小的任务
            while (task.size() && idle.size()) {
                auto tid = task.top(); task.pop();
                int t = tasks[tid];

                // 存在可用服务器 即使用最优的服务器
                auto [rank, sid] = idle.top(); idle.pop();
                res[tid] = sid;
                working.push({i + t, sid});
            }
        }
        
        // now时间戳
        int now = m;
        while (task.size()) {
            // 根据时间戳更新服务器状态
            while (working.size()) {
                auto [et, sid] = working.top();
                if (et > now)
                    break;
                else {
                    working.pop();
                    idle.push({servers[sid], sid});
                }
            }
            
            // 取下标最小的任务
            auto tid = task.top();
            int t = tasks[tid];
            
            // 如果有可用服务器 则使用该服务器
            // 否则更新时间戳 快进到会有服务器被弹出的时刻
            if (idle.size()) {
                task.pop();
                auto [rank, sid] = idle.top(); idle.pop();
                res[tid] = sid;
                working.push({now + t, sid});
            } else {
                auto [et, sid] = working.top();
                now = et;
            }
        }
        return res;
    }
};
```

### [5775. 准时抵达会议现场的最小跳过休息次数](https://leetcode-cn.com/problems/minimum-skips-to-arrive-at-meeting-on-time/) [TAG]

理清楚 eps 放在哪

```c++
class Solution {
public:
    const double eps = 1e-8, INF = 1e9;
    const static int N = 1010;
    double f[N][N];

    int minSkips(vector<int>& dist, int speed, int hoursBefore) {
        int n = dist.size();
        for (int i = 1; i <= n; ++ i ) {
            double t = (double)dist[i - 1] / speed;
            for (int j = 0; j <= i; ++ j ) {
                f[i][j] = INF;
                if (j <= i - 1)
                    f[i][j] = ceil(f[i - 1][j] + t - eps);
                if (j)
                    f[i][j] = min(f[i][j], f[i - 1][j - 1] + t);
            }
        }
        for (int i = 0; i <= n; ++ i )
            if (f[n][i] <= hoursBefore)
                return i;
        return -1;
    }
};
```

自己习惯的初始化和转移的写法

```c++
class Solution {
public:
    const double eps = 1e-8, INF = 2e9;
    const static int N = 1010;
    double f[N][N];
    
    int minSkips(vector<int>& dist, int speed, int hoursBefore) {
        int n = dist.size();
        for (int i = 0; i <= n; ++ i )
            for (int j = 0; j <= n; ++ j )
                f[i][j] = INF;
        f[0][0] = 0;
        for (int i = 1; i <= n; ++ i )
            f[i][0] = ceil(f[i - 1][0] - eps) + (double)dist[i - 1] / speed;
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= i; ++ j ) {
                double t = (double)dist[i - 1] / speed;
                f[i][j] = min(ceil(f[i - 1][j] - eps), f[i - 1][j - 1]) + t;
            }
        for (int i = 0; i <= n; ++ i )
            if (f[n][i] <= hoursBefore)
                return i;
        return -1;
    }
};
```
