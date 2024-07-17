## [比赛链接](https://leetcode.cn/contest/weekly-contest-253)

>   Rank: 106 / 4569


### [5838. 检查字符串是否为数组前缀](https://leetcode.cn/problems/check-if-string-is-a-prefix-of-array/)

模拟匹配即可

```c++
class Solution {
public:
    bool isPrefixString(string s, vector<string>& words) {
        int n = words.size(), m = s.size();
        int p = 0;
        for (auto & ws : words) {
            for (auto c : ws)
                if (p < m && c == s[p])
                    p ++ ;
                else
                    return false;
            if (p == m)
                return true;
        }
        return false;
    }
};
```

更简单写法

```c++
class Solution {
public:
    bool isPrefixString(string s, vector<string>& words) {
        string p;
        for(string t : words) {
            p += t;
            if(p == s) return 1;
        }
        return 0;
    }
};
```



### [5839. 移除石子使总数最小](https://leetcode.cn/problems/remove-stones-to-minimize-the-total/)

同模拟 略

```c++
class Solution {
public:
    int minStoneSum(vector<int>& piles, int k) {
        priority_queue<int> q;
        for (auto v : piles)
            q.push(v);
        while (k -- && q.size()) {
            int t = q.top(); q.pop();
            if (t - t / 2 > 0)
                q.push(t - t / 2);
        }
        
        int res = 0;
        while (q.size()) {
            res += q.top();
            q.pop();
        }
        return res;
    }
};
```

### [5840. 使字符串平衡的最小交换次数](https://leetcode.cn/problems/minimum-number-of-swaps-to-make-the-string-balanced/)

有点思维 其实分析知 `(stk + 1) / 2` （向上取整）即可

```c++
class Solution {
public:
    int n;
    int minSwaps(string s) {
        this->n = s.size();
        int stk = 0, cnt = 0;
        for (auto c : s) {
            if (c == '[')
                stk ++ ;
            else {
                if (stk > 0)
                    stk -- ;
                else {
                    cnt ++ ;
                }
            }
        }
        
        return (stk + 1) / 2;
    }
};
```

### [5841. 找出到每个位置为止最长的有效障碍赛跑路线](https://leetcode.cn/problems/find-the-longest-valid-obstacle-course-at-each-position/)

LIS 优化的应用 略

```c++
class Solution {
public:
    vector<int> longestObstacleCourseAtEachPosition(vector<int>& obs) {
        int n = obs.size();
        vector<int> res(n), f;
        for (int i = 0; i < n; ++ i ) {
            int v = obs[i];
            if (f.empty() || f.back() <= v) {
                res[i] = f.size() + 1;
                f.push_back(v);
            } else {
                // 第一个大于该值
                auto it = upper_bound(f.begin(), f.end(), v);
                res[i] = it - f.begin() + 1;
                *it = v;
            }
        }
        return res;
    }
};
```

```c++
// 比赛时
class Solution {
public:
    vector<int> longestObstacleCourseAtEachPosition(vector<int>& obs) {
        int n = obs.size();
        vector<int> res(n), f;
        for (int i = 0; i < n; ++ i ) {
            int v = obs[i];
            if (f.empty() || f.back() <= v) {
                res[i] = f.size() + 1;
                f.push_back(v);
            } else {
                auto it = lower_bound(f.begin(), f.end(), v + 1);
                res[i] = it - f.begin() + 1;
                *it = v;
            }
        }
        return res;
    }
};
```

另一写法

```c++
class Solution {
public:
    vector<int> longestObstacleCourseAtEachPosition(vector<int>& obstacles) {
        int n = obstacles.size();
        vector<int> ans, LIS;
        for (int obstacle : obstacles) {
            auto it = upper_bound(LIS.begin(), LIS.end(), obstacle);
            if (it == LIS.end()) {
                LIS.emplace_back(obstacle);
                ans.emplace_back(LIS.size());
            } else {
                ans.push_back(it - LIS.begin() + 1);
                *it = obstacle;
            }
        }
        return ans;
    }
};
```

