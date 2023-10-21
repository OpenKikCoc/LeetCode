## [比赛链接](https://leetcode.cn/contest/biweekly-contest-115/)


### [2899. 上一个遍历的整数](https://leetcode.cn/problems/last-visited-integers/)



```c++
class Solution {
public:
    vector<int> lastVisitedIntegers(vector<string>& words) {
        vector<int> t, res;
        int n = words.size();
        for (int i = 0, c = 0; i < n; ++ i ) {
            if (words[i] != "prev") {
                c = 0;
                t.push_back(stoi(words[i]));
                continue;
            }
            c ++ ;
            if (t.size() < c)
                res.push_back(-1);
            else
                res.push_back(t[t.size() - c]);
        }
        return res;
    }
};
```


### [2900. 最长相邻不相等子序列 I](https://leetcode.cn/problems/longest-unequal-adjacent-groups-subsequence-i/)



```c++
class Solution {
public:
    const static int N = 1010;
    
    vector<int> bylens[11];
    
    vector<string> getWordsInLongestSubsequence(int n, vector<string>& words, vector<int>& groups) {
        for (int i = 0; i < n; ++ i ) {
            auto & w = words[i];
            bylens[1].push_back(i); // 固定
        }
        
        int mx = 0;
        vector<int> r;
        for (int len = 1; len <= 1; ++ len ) {
            auto & idxs = bylens[len];
            int m = idxs.size();
            
            static bool d[N][N];
            memset(d, 0, sizeof d);
            // 预处理所有可以接在前面的下标
            // vector<int> ts[m];
            for (int i = 0; i < m; ++ i ) {
                int a = idxs[i];
                string & sa = words[a];
                for (int j = i + 1; j < m; ++ j ) {
                    int b = idxs[j];
                    string & sb = words[b];
                    
                    // ATTENTION 额外条件
                    if (groups[a] == groups[b])
                        continue;
                    
                    // int c = 0;
                    // for (int k = 0; k < len; ++ k )
                    //     c += sa[k] != sb[k];
                    // if (c != 1)
                    //     continue;
                    
                    d[i][j] = d[j][i] = true;
                }
            }

            int t = 0, p = -1;
            static int f[N], g[N];
            for (int i = 0; i < m; ++ i ) {
                f[i] = 1, g[i] = -1;
                for (int j = 0; j < i; ++ j )
                    if (d[i][j]) {
                        if (f[j] + 1 > f[i]) {
                            f[i] = f[j] + 1;
                            g[i] = j;
                        }
                    }
                if (f[i] > t)
                    t = f[i], p = i;
            }
            if (t > mx) {
                mx = t;
                r.clear();
                // 逆序存储
                for (;~p; p = g[p])
                    r.push_back(idxs[p]);   // ATTENTION idxs[p] 找到原始下标
            }
        }
        
        vector<string> res;
        for (int i = r.size() - 1; i >= 0; -- i )
            res.push_back(words[r[i]]);
        return res;
    }
};
```

### [2901. 最长相邻不相等子序列 II](https://leetcode.cn/problems/longest-unequal-adjacent-groups-subsequence-ii/)



```c++
class Solution {
public:
    const static int N = 1010;
    
    vector<int> bylens[11];
    
    vector<string> getWordsInLongestSubsequence(int n, vector<string>& words, vector<int>& groups) {
        for (int i = 0; i < n; ++ i ) {
            auto & w = words[i];
            bylens[w.size()].push_back(i);
        }
        
        int mx = 0;
        vector<int> r;
        for (int len = 1; len <= 10; ++ len ) {
            auto & idxs = bylens[len];
            int m = idxs.size();
            
            static bool d[N][N];
            memset(d, 0, sizeof d);
            for (int i = 0; i < m; ++ i ) {
                int a = idxs[i];
                string & sa = words[a];
                for (int j = i + 1; j < m; ++ j ) {
                    int b = idxs[j];
                    string & sb = words[b];
                    
                    // ATTENTION 额外条件
                    if (groups[a] == groups[b])
                        continue;
                    
                    int c = 0;
                    for (int k = 0; k < len; ++ k )
                        c += sa[k] != sb[k];
                    if (c != 1)
                        continue;
                    
                    d[i][j] = d[j][i] = true;
                }
            }

            int t = 0, p = -1;
            static int f[N], g[N];
            for (int i = 0; i < m; ++ i ) {
                f[i] = 1, g[i] = -1;
                for (int j = 0; j < i; ++ j )
                    if (d[i][j]) {
                        if (f[j] + 1 > f[i]) {
                            f[i] = f[j] + 1;
                            g[i] = j;
                        }
                    }
                if (f[i] > t)
                    t = f[i], p = i;
            }
            if (t > mx) {
                mx = t;
                r.clear();
                // 逆序存储
                for (;~p; p = g[p])
                    r.push_back(idxs[p]);   // ATTENTION idxs[p] 找到原始下标
            }
        }
        
        vector<string> res;
        for (int i = r.size() - 1; i >= 0; -- i )
            res.push_back(words[r[i]]);
        return res;
    }
};
```

### [2902. 和带限制的子多重集合的数目](https://leetcode.cn/problems/count-of-sub-multisets-with-bounded-sum/) [TAG]

显然单调队列优化（实际上不必要是单调队列，双指针窗口即可）

```c++
class Solution {
public:
    // 简单直接的写法显然会TLE
    // 考虑单调队列优化
    using PII = pair<int, int>;
    const static int N = 2e4 + 10, MOD = 1e9 + 7;
    
    int countSubMultisets(vector<int>& nums, int l, int r) {
        vector<PII> xs;
        sort(nums.begin(), nums.end());
        int zero = 0;
        for (int i = 0; i < nums.size(); ++ i ) {
            int j = i;
            while (j < nums.size() && nums[j] == nums[i])
                j ++ ;
            if (nums[i] == 0)
                zero += j - i;
            else
                xs.push_back({nums[i], j - i});
            i = j - 1;
        }
        
        int f[N], g[N];
        memset(f, 0, sizeof f);
        f[0] = zero + 1;    // ATTENTION 特殊处理0
        for (auto [x, c] : xs) {
            // 转移公式: f[i] += f[i - x * cnt] + 1;
            // option 1:
            /*
            memcpy(g, f, sizeof g);
            memset(f, 0, sizeof f);
            for (int i = 0; i < N; ++ i )
                for (int j = 0; j <= c && x * j <= i; ++ j )
                    f[i] = (f[i] + g[i - x * j]) % MOD;
            */
            
            // option 2:
            // 宽度为x枚举 类似单调队列优化dp
            // f[i] = g[i-x*c] + g[i-x*(c-1)] + ... + g[i]
            
            memcpy(g, f, sizeof g);
            f[0] = g[0];
            
            for (int w = 0; w < x; ++ w ) {
                static int q[N];
                int hh = 0, tt = -1;
                for (int i = w, s = 0; i < N; i += x ) {        // ATTENTION 注意 s 的初始化与后续维护
                    // 移除队头
                    if (hh <= tt && q[hh] < i - x * c)
                        s = ((s - g[q[hh]]) % MOD + MOD) % MOD, hh ++ ; // ATTENTION g[q[hh]] 而不是 g[hh] ...
                    q[ ++ tt] = i;
                    s = (s + g[i]) % MOD;
                    
                    f[i] = s;
                }
            }
        }
        
        int res = 0;
        for (int i = l; i <= r; ++ i )
            res = (res + f[i] % MOD) % MOD;
        return res;
    }
};
```
