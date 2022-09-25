## [比赛链接](https://leetcode.cn/contest/weekly-contest-312)


### [6188. 按身高排序](https://leetcode.cn/problems/sort-the-people/)



```c++
class Solution {
public:
    using PIS = pair<int, string>;
    vector<string> sortPeople(vector<string>& names, vector<int>& heights) {
        int n = names.size();
        vector<PIS> xs;
        for (int i = 0; i < n; ++ i )
            xs.push_back({heights[i], names[i]});
        sort(xs.begin(), xs.end());
        reverse(xs.begin(), xs.end());
        vector<string> res;
        for (auto [h, s] : xs)
            res.push_back(s);
        return res;
    }
};
```



```python

```



### [6189. 按位与最大的最长子数组](https://leetcode.cn/problems/longest-subarray-with-maximum-bitwise-and/)



```c++
class Solution {
public:
    int longestSubarray(vector<int>& nums) {
        int n = nums.size(), x = -1;
        for (int i = 0; i < n; ++ i )
            if (nums[i] > x)
                x = nums[i];
        
        int res = 0;
        for (int i = 0; i < n; ++ i ) {
            if (nums[i] != x)
                continue;
            int j = i;
            while (j < n && nums[j] == nums[i])
                j ++ ;
            res = max(res, j - i);
            i = j - 1;
        }
        return res;
    }
};
```



```python

```



### [6190. 找到所有好下标](https://leetcode.cn/problems/find-all-good-indices/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int l[N], r[N];
    
    vector<int> goodIndices(vector<int>& nums, int k) {
        memset(l, 0, sizeof l), memset(r, 0, sizeof r);
        int n = nums.size();
        for (int i = 1; i <= n; ++ i )
            if (i == 1)
                l[i] = 1;
            else {
                if (nums[i - 2] >= nums[i - 1])
                    l[i] = l[i - 1] + 1;
                else
                    l[i] = 1;
            }
        for (int i = n; i >= 1; -- i )
            if (i == n)
                r[i] = 1;
            else {
                if (nums[i] >= nums[i - 1])
                    r[i] = r[i + 1] + 1;
                else
                    r[i] = 1;
            }
        
        vector<int> res;
        for (int i = k + 1; i <= n - k; ++ i ) {
            if (k == 1)
                res.push_back(i - 1);
            else if (l[i - 1] >= k && r[i + 1] >= k)
                res.push_back(i - 1);
        }
            
        return res;
    }
};
```



```python

```



### [6191. 好路径的数目](https://leetcode.cn/problems/number-of-good-paths/) [TAG]

非常好的并查集

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 3e4 + 10;
    
    int p[N], sz[N];
    void init() {
        for (int i = 0; i < N; ++ i )
            p[i] = i, sz[i] = 1;
    }
    int find(int x) {
        if (p[x] != x)
            p[x] = find(p[x]);
        return p[x];
    }
    
    vector<int> g[N];
    
    int numberOfGoodPaths(vector<int>& vals, vector<vector<int>>& edges) {
        int n = vals.size();
        for (auto & e : edges)
            g[e[0]].push_back(e[1]), g[e[1]].push_back(e[0]);
        
        init();
        
        vector<PII> xs;
        for (int i = 0; i < n; ++ i )
            xs.push_back({vals[i], i});
        sort(xs.begin(), xs.end()); // 按权值排序
        
        int res = 0;
        for (auto [x, i] : xs) {
            int fi = find(i);
            for (auto j : g[i]) {
                int fj = find(j), y = vals[fj]; // ATTENTION 注意顺序 【 y 必须是对应的 fj 的值】
                // 跳过已在同集合的
                if (fj == fi)
                    continue;
                // 跳过较大的数值
                if (y > x)
                    continue;
                
                if (x == y) {
                    // ATTENTION: 非常非常 trick
                    // 并非所有合并的情况都要累加，当且仅当数值相等时才累加
                    // 【思考 细节 为什么可以这样做而不需要在每个集合内部再维护一个 map】
                    res += sz[fi] * sz[fj];
                    sz[fi] += sz[fj];
                }
                // ATTENTION:
                // 把小的节点值合并到大的节点值上
                p[fj] = fi;
            }
        }
        return res + n;
    }
};
```



```python

```

