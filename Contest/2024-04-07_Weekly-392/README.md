## [比赛链接](https://leetcode.cn/contest/weekly-contest-392/)


### [3105. 最长的严格递增或递减子数组](https://leetcode.cn/problems/longest-strictly-increasing-or-strictly-decreasing-subarray/)



```c++
class Solution {
public:
    int get(vector<int> & xs, bool flag) {
        int n = xs.size();
        int ret = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n && (flag && xs[j] > xs[j - 1] || !flag && xs[j] < xs[j - 1]))
                j ++ ;
            ret = max(ret, j - i);
            i = j - 1;
        }
        return ret;
    }
    
    int longestMonotonicSubarray(vector<int>& nums) {
        return max(get(nums, true), get(nums, false));
    }
};
```


### [3106. 满足距离约束且字典序最小的字符串](https://leetcode.cn/problems/lexicographically-smallest-string-after-operations-with-constraint/)



```c++
class Solution {
public:
    const static int N = 26;
    
    int c[N][N];
    void init() {
        memset(c, 0, sizeof c);
        for (int i = 0; i < N; ++ i )
            for (int j = i + 1; j < N; ++ j )
                c[i][j] = c[j][i] = min(j - i, i + N - j);
    }
    
    string getSmallestString(string s, int k) {
        init();
        
        string res;
        for (auto x : s) {
            int i = x - 'a';
            int p = -1;
            for (int j = 0; j < i; ++ j ) {
                int t = c[i][j];
                if (t <= k) {
                    p = j;
                    break;
                }
            }
            if (p == -1)
                res.push_back(x);
            else
                res.push_back('a' + p), k -= c[i][p];
        }
        return res;
    }
};
```

### [3107. 使数组中位数等于 K 的最少操作数](https://leetcode.cn/problems/minimum-operations-to-make-median-of-array-equal-to-k/)



```c++
class Solution {
public:
    using LL = long long;

    long long minOperationsToMakeMedianK(vector<int>& nums, int k) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        
        int p = n / 2;
        LL res = abs(nums[p] - k);
        {
            for (int i = p + 1; i < n; ++ i )
                if (nums[i] < k)
                    res += k - nums[i];
        }
        {
            for (int i = p - 1; i >= 0; -- i )
                if (nums[i] > k)
                    res += nums[i] - k;
        }
        return res;
    }
};
```

###[3108. 带权图里旅途的最小代价](https://leetcode.cn/problems/minimum-cost-walk-in-weighted-graph/) 

一开始搞错题意了...

基于正确的题意理解 在一个联通集合内所有边都应当遍历一遍 并维护极小值

=> 带权并查集

需要加快速度

```c++
class Solution {
public:
    // 刚开始看错题意了... 题目要求的是最小的代价
    // 则 对于一个联通集 所有点对之间的代价完全相同 为所有边的&
    // 重在分析
    
    const static int N = 1e5 + 10;
    
    int pa[N], v[N];
    void init() {
        for (int i = 0; i < N; ++ i )
            pa[i] = i, v[i] = (1 << 18) - 1;
    }
    int find(int x) {
        if (pa[x] != x) {
            // ATTENTION 注意写法
            int root = find(pa[x]);
            v[x] = v[x] & v[pa[x]];
            pa[x] = root;
        }
        return pa[x];
    }
    
    vector<int> minimumCost(int n, vector<vector<int>>& edges, vector<vector<int>>& query) {
        init();
        
        for (auto & e : edges) {
            int a = e[0], b = e[1], c = e[2];
            int fa = find(a), fb = find(b);
            // if (fa != fb)
                pa[fa] = fb;            // whatever, set the fb
            v[fb] = v[fb] & v[fa] & c;  // ATTENTION &v[fa]
        }
        
        vector<int> res;
        for (auto & q : query) {
            int a = q[0], b = q[1];
            int fa = find(a), fb = find(b);
            if (fa != fb)
                res.push_back(-1);
            else
                res.push_back(v[fa]);
        }
        return res;
    }
};
```
