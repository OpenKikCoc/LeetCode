## [比赛链接](https://leetcode.cn/contest/weekly-contest-305/)


### [2367. 算术三元组的数目](https://leetcode.cn/problems/number-of-arithmetic-triplets/)



```c++
class Solution {
public:
    int arithmeticTriplets(vector<int>& nums, int diff) {
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                for (int k = j + 1; k < n; ++ k ) {
                    if (nums[j] - nums[i] == diff && nums[k] - nums[j] == diff)
                        res ++ ;
                }
        return res;
    }
};
```


### [2368. 受限条件下可到达节点的数目](https://leetcode.cn/problems/reachable-nodes-with-restrictions/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = N << 1;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    unordered_set<int> S;
    int res;
    
    void dfs(int u, int fa) {
        if (S.count(u))
            return;
        res ++ ;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            dfs(j, u);
        }
    }
    
    int reachableNodes(int n, vector<vector<int>>& edges, vector<int>& restricted) {
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        S.clear();
        for (auto x : restricted)
            S.insert(x);
        res = 0;
        dfs(0, -1);
        return res;
    }
};
```

### [2369. 检查数组是否存在有效划分](https://leetcode.cn/problems/check-if-there-is-a-valid-partition-for-the-array/)

要想到 dp

```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    bool f[N];
    
    bool validPartition(vector<int>& nums) {
        int n = nums.size();
        f[0] = true;
        for (int i = 1; i <= n; ++ i ) {
            if (i >= 2 && nums[i - 1] == nums[i - 2])
                f[i] |= f[i - 2];
            if (i >= 3 && nums[i - 1] == nums[i - 2] && nums[i - 2] == nums[i - 3])
                f[i] |= f[i - 3];
            if (i >= 3 && nums[i - 1] == nums[i - 2] + 1 && nums[i - 2] == nums[i - 3] + 1)
                f[i] |= f[i - 3];
        }
        return f[n];
    }
};
```

### [2370. 最长理想子序列](https://leetcode.cn/problems/longest-ideal-subsequence/)



```c++
class Solution {
public:
    int longestIdealString(string s, int k) {
        vector<int> f(27, 0);
        for (auto c : s) {
            auto g = f;
            int i = c - 'a' + 1;
            for (int j = max(1, i - k); j <= min(i + k, 26); ++ j )
                f[i] = max(f[i], g[j] + 1);
        }
        int res = 0;
        for (int i = 1; i <= 26; ++ i )
            res = max(res, f[i]);
        return res;
    }
};
```
