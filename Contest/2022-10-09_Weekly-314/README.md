## [比赛链接](https://leetcode.cn/contest/weekly-contest-314)

>   rank: 231 / 4838


### [6200. 处理用时最长的那个任务的员工](https://leetcode.cn/problems/the-employee-that-worked-on-the-longest-task/)



```c++
class Solution {
public:
    int hardestWorker(int n, vector<vector<int>>& logs) {
        int p = -1, mx = -1;
        for (int i = 0; i < logs.size(); ++ i )
            if (i == 0) {
                int c = logs[i][1];
                if (c > mx || c == mx && logs[i][0] < p)
                    p = logs[i][0], mx = c;
            } else {
                int c = logs[i][1] - logs[i - 1][1];
                if (c > mx || c == mx && logs[i][0] < p)
                    p = logs[i][0], mx = c;
            }
        return p;
    }
};
```


### [6201. 找出前缀异或的原始数组](https://leetcode.cn/problems/find-the-original-array-of-prefix-xor/)



```c++
class Solution {
public:
    vector<int> findArray(vector<int>& pref) {
        int pre = 0, n = pref.size();
        vector<int> res;
        for (int i = 0; i < n; ++ i ) {
            res.push_back(pre ^ pref[i]);
            pre ^= res[i];
        }
        return res;
    }
};

class Solution {
public:
    vector<int> findArray(vector<int>& pref) {
        int pre = 0, n = pref.size();
        vector<int> res;
        res.push_back(pref[0]);
        for (int i = 1; i < n; ++ i )
            res.push_back(pref[i - 1] ^ pref[i]);
        return res;
    }
};
```

### [6202. 使用机器人打印字典序最小的字符串](https://leetcode.cn/problems/using-a-robot-to-print-the-lexicographically-smallest-string/) [TAG]

比赛时代码：

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = 26;
    
    int c[M];  // 方便找后面的串中 最小的字符是谁 ==> 查询过程可以常量优化
    
    string robotWithString(string s) {
        int n = s.size();
        memset(c, 0, sizeof c);
        for (auto x : s)
            c[x - 'a'] ++ ;
        
        string res;
        stack<char> st;
        for (auto x : s) {
            int p = -1;
            for (int i = 0; i < M; ++ i )
                if (c[i]) {
                    p = i;
                    break;
                }
            if (x - 'a' == p) {
                res.push_back(x);
                c[p] -- ;
                
                while (st.size()) {
                    int t = -1;
                    for (int i = 0; i < M; ++ i )
                        if (c[i]) {
                            t = i;
                            break;
                        }
                    if (st.top() - 'a' <= t) {
                        res.push_back(st.top()), st.pop();
                    } else
                        break;
                }
            } else {
                st.push(x);
                c[x - 'a'] -- ;
            }
            // cout << " after x = " << x << " res = " << res << endl;
            // vzho fn 
        }
        while (st.size())
            res.push_back(st.top()), st.pop();
        return res;
    }
};
```

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = 26;
    
    int c[M];
    
    string robotWithString(string s) {
        int n = s.size();
        memset(c, 0, sizeof c);
        for (auto x : s)
            c[x - 'a'] ++ ;
        
        string res;
        stack<char> st;
        int p = 0;
        for (auto x : s) {
            st.push(x);
            c[x - 'a'] -- ;
            
            // int p = -1;
            // for (int i = 0; i < M; ++ i )
            //     if (c[i]) {
            //         p = i;
            //         break;
            //     }
            while (p < M && c[p] == 0)
                p ++ ;
            
            while (st.size() && st.top() - 'a' <= p)
                res.push_back(st.top()), st.pop();
        }
        while (st.size())
            res.push_back(st.top()), st.pop();
        return res;
    }
};
```



### [6203. 矩阵中和能被 K 整除的路径](https://leetcode.cn/problems/paths-in-matrix-whose-sum-is-divisible-by-k/)



```c++

class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;
    
    vector<vector<int>> g;
    int n, m;
    
    vector<vector<vector<LL>>> f;
    
    int numberOfPaths(vector<vector<int>>& grid, int k) {
        this->g = grid;
        this->n = g.size(), m = g[0].size();
        
        f = vector<vector<vector<LL>>>(n + 1, vector<vector<LL>>(m + 1, vector<LL>(k + 1)));
        
        f[0][1][0] = 1;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                for (int x = 0; x < k; ++ x ) {
                    int last = ((x - g[i - 1][j - 1]) % k + k) % k;
                    f[i][j][x] = (f[i - 1][j][last] + f[i][j - 1][last]) % MOD;
                }
        return f[n][m][0] % MOD;
    }
};
```
