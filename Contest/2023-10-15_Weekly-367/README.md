## [比赛链接](https://leetcode.cn/contest/weekly-contest-367/)


### [2903. 找出满足差值条件的下标 I](https://leetcode.cn/problems/find-indices-with-index-and-value-difference-i/)



```c++
class Solution {
public:
    vector<int> findIndices(vector<int>& nums, int indexDifference, int valueDifference) {
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            int a = nums[i];
            for (int j = i; j < n; ++ j ) {
                int b = nums[j];
                if (abs(i - j) >= indexDifference && abs(a - b) >= valueDifference) {
                    return {i, j};
                }
            }
        }
        return {-1, -1};
    }
};
```


### [2904. 最短且字典序最小的美丽子字符串](https://leetcode.cn/problems/shortest-and-lexicographically-smallest-beautiful-string/)



```c++
class Solution {
public:
    string shortestBeautifulSubstring(string s, int k) {
        int n = s.size();
        string res;
        unordered_map<int, int> h;
        h[0] = -1;
        for (int i = 0, c = 0; i < n; ++ i ) {
            c += s[i] - '0';
            h[c] = i;
            
            if (c >= k) {
                int j = h[c - k];
                string t = s.substr(j + 1, i - j);
                // cout << " i = " << i << " t = " << t << endl;
                if (res.empty() || t.size() < res.size() || t.size() == res.size() && t < res)
                    res = t;
            }
        }
        return res;
    }
};
```

### [2905. 找出满足差值条件的下标 II](https://leetcode.cn/problems/find-indices-with-index-and-value-difference-ii/)

实际上可以直接记录最大最小值 不需要有序 略

```c++
class Solution {
public:
    // 显然 滑动窗口 => 需要记录下标
    using PII = pair<int, int>;
    
    vector<int> findIndices(vector<int>& nums, int indexDifference, int valueDifference) {
        int n = nums.size();
        set<PII> S;
        for (int i = 0; i < n; ++ i ) {
            // 入队
            if (i - indexDifference >= 0)
                S.insert({nums[i - indexDifference], i - indexDifference});
            
            int x = nums[i], t = 1e9;
            
            {
                auto it = S.lower_bound({x - valueDifference + 1, -1e9});   // ATTENTINO +INF
                if (it != S.begin()) {
                    it -- ;
                    auto [y, j] = *it;
                    return {j, i};
                }
            }
            {
                auto it = S.lower_bound({x + valueDifference, -1e9});       // ATTENTION -INF
                if (it != S.end()) {
                    auto [y, j] = *it;
                    return {j, i};
                }
            }
        }
        return {-1, -1};
    }
};
```

### [2906. 构造乘积矩阵](https://leetcode.cn/problems/construct-product-matrix/)

前后缀分解 重点在想到

```c++
class Solution {
public:
    // 初看认为是求逆元
    // 实际上 只需要前后缀分解即可...
    using LL = long long;
    const static int N = 1e5 + 10, MOD = 12345;

    LL l[N], r[N];
    
    vector<vector<int>> constructProductMatrix(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        
        memset(l, 0, sizeof l), memset(r, 0, sizeof r);
        
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                int x = grid[i][j];
                int idx = i * m + j;
                l[idx] = (idx ? l[idx - 1] : 1) * x % MOD;
            }
        for (int i = n - 1; i >= 0; -- i )
            for (int j = m - 1; j >= 0; -- j ) {
                int x = grid[i][j];
                int idx = i * m + j;
                r[idx] = (idx < n * m - 1 ? r[idx + 1] : 1) * x % MOD;
            }
        
        vector<vector<int>> res(n, vector<int>(m));
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                LL idx = i * m + j;
                LL t = (idx ? l[idx - 1] : 1) * (idx < n * m - 1 ? r[idx + 1] : 1) % MOD;
                res[i][j] = t;
            }
        return res;
    }
};
```
