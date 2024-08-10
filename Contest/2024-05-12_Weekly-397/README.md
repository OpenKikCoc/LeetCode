## [比赛链接](https://leetcode.cn/contest/weekly-contest-397/)


### [3146. 两个字符串的排列差](https://leetcode.cn/problems/permutation-difference-between-two-strings/)



```c++
class Solution {
public:
    int findPermutationDifference(string s, string t) {
        int n = s.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            char c = s[i];
            for (int j = 0; j < n; ++ j )
                if (t[j] == c) {
                    res += abs(j - i);
                    break;
                }
        }
        return res;
    }
};
```


### [3147. 从魔法师身上吸取的最大能量](https://leetcode.cn/problems/taking-maximum-energy-from-the-mystic-dungeon/)



```c++
class Solution {
public:
    int maximumEnergy(vector<int>& energy, int k) {
        reverse(energy.begin(), energy.end());
        int n = energy.size();
        
        int res = -1e9;
        vector<int> s(k);
        for (int i = 0; i < n; ++ i ) {
            int x = energy[i];
            s[i % k] += x;
            res = max(res, s[i % k]);
        }
        return res;
    }
};
```

### [3148. 矩阵中的最大得分](https://leetcode.cn/problems/maximum-difference-score-in-a-grid/)



```c++
class Solution {
public:
    int maxScore(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        
        // 维护最小值
        int res = -1e8;
        vector<vector<int>> f(n, vector<int>(m, 1e8));
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                int t = 1e8;
                if (i)
                    t = min(t, f[i - 1][j]);
                if (j)
                    t = min(t, f[i][j - 1]);
                
                res = max(res, grid[i][j] - t);
                
                f[i][j] = min(t, grid[i][j]);
            }
        return res;
    }
};
```

### [3149. 找出分数最低的排列](https://leetcode.cn/problems/find-the-minimum-cost-array-permutation/) [TAG]

经典 状压DP+具体方案

trick: 当值相同时 记录字典序最小路径的方式 (路径编码为 LL)

```c++
class Solution {
public:
    // 根据数据范围 猜测是状态压缩(通过状压枚举操作顺序)
    using LL = long long;
    const static int N = 17000, M = 14, INF = 0x3f3f3f3f;
    
    int f[N][M]; // 2^14 = 1024*16
    LL p[N][M];
    
    int n;
    
    vector<int> get(int st, int i) {
        LL x = p[st][i];
        vector<int> ret;
        for (int i = 0; i < n; ++ i )
            ret.push_back(x % n), x /= n;
        reverse(ret.begin(), ret.end());
        return ret;
    }
    
    vector<int> findPermutation(vector<int>& nums) {
        this->n = nums.size();
        
        int val = INF;
        vector<int> res;
        for (int start = 0; start < n; ++ start ) {
            memset(f, 0x3f, sizeof f);
            memset(p, 0, sizeof p);
            f[1 << start][start] = 0;
            
            for (int i = 1; i < 1 << n; ++ i ) {
                if (!(i >> start & 1))
                    continue;
                
                if (i == 1 << start) {
                    for (int k = 0; k < n; ++ k )
                        if (k != start) {
                            int t = f[i][start] + abs(start - nums[k]);
                            int st = i | (1 << k);
                            if (f[st][k] > t) {
                                f[st][k] = t;
                                p[st][k] = start * n + k;
                            }
                        }
                    continue;
                }

                for (int j = 0; j < n; ++ j )
                    if (j != start && i >> j & 1)
                        for (int k = 0; k < n; ++ k )
                            if (!(i >> k & 1)) {
                                int t = f[i][j] + abs(j - nums[k]);
                                LL last = p[i][j];
                                int st = i | (1 << k);
                                if (f[st][k] > t || f[st][k] == t && p[st][k] > last * n + k) {
                                    f[st][k] = t;
                                    p[st][k] = last * n + k;
                                }
                            }
            }
            
            // 默认字典序最小
            for (int i = 0; i < n; ++ i ) {
                int t = f[(1 << n) - 1][i] + abs(i - nums[start]);
                auto perm = get((1 << n) - 1, i);
                if (val > t || val == t && res > perm)
                    res = perm, val = t;
            }
            
            // break;
        }
        return res;
    }
};
```

代码简化

```c++
class Solution {
public:
    // 根据数据范围 猜测是状态压缩(通过状压枚举操作顺序)
    using LL = long long;
    const static int N = 17000, M = 14, INF = 0x3f3f3f3f;
    
    int f[N][M]; // 2^14 = 1024*16
    LL p[N][M];
    
    int n;
    
    vector<int> get(int st, int i) {
        LL x = p[st][i];
        vector<int> ret;
        for (int i = 0; i < n; ++ i )
            ret.push_back(x % n), x /= n;
        reverse(ret.begin(), ret.end());
        return ret;
    }
    
    vector<int> findPermutation(vector<int>& nums) {
        this->n = nums.size();
        
        int val = INF;
        vector<int> res;
        for (int start = 0; start < n; ++ start ) {
            memset(f, 0x3f, sizeof f);
            memset(p, 0, sizeof p);
            f[1 << start][start] = 0;
            
            for (int i = 1; i < 1 << n; ++ i ) {
                if (!(i >> start & 1))
                    continue;
                
                for (int j = 0; j < n; ++ j )
                    if (i >> j & 1)
                        for (int k = 0; k < n; ++ k )
                            if (!(i >> k & 1)) {
                                int t = f[i][j] + abs(j - nums[k]);
                                LL last = p[i][j];
                                int st = i | (1 << k);
                                if (f[st][k] > t || f[st][k] == t && p[st][k] > last * n + k) {
                                    f[st][k] = t;
                                    p[st][k] = last * n + k;
                                }
                            }
            }
            
            // 默认字典序最小
            for (int i = 0; i < n; ++ i ) {
                int t = f[(1 << n) - 1][i] + abs(i - nums[start]);
                auto perm = get((1 << n) - 1, i);
                if (val > t || val == t && res > perm)
                    res = perm, val = t;
            }
            
            // 进一步简化 (结合题意 与首位无关 则答案一定是以 0 为起点开始的)
            break;
        }
        return res;
    }
};
```
