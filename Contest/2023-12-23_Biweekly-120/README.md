## [比赛链接](https://leetcode.cn/contest/biweekly-contest-120/)


### [2970. 统计移除递增子数组的数目 I](https://leetcode.cn/problems/count-the-number-of-incremovable-subarrays-i/)



```c++
class Solution {
public:
    // 移除一段连续序列 使得左右两侧合并为LIS(严格递增)
    // 求有多少个序列移除办法
    
    using LL = long long;
    
    int n, l, r;
    
    long long incremovableSubarrayCount(vector<int>& nums) {
        this->n = nums.size();
        l = 0, r = n - 1;
        {
            while (l + 1 < n && nums[l + 1] > nums[l])
                l ++ ;
            while (r > 0 && nums[r - 1] < nums[r])
                r -- ;
        }
        if (l >= r)
            return (LL)(n + 1) * n / 2;
        
        // ATTENTION: case 1 如果只保留左侧(完全移除右侧)
        LL res = l + 2;
        
        // case 2 只保留右侧位置
        // 枚举右侧的起始位置 则左侧终止位置需要满足特定条件
        for (int i = 0, j = r; j < n; ++ j ) {
            // 找到第一个不符合的位置
            while (i <= l && nums[i] < nums[j])
                i ++ ;
            
            res += (i + 1);
        }
        return res;
    }
};
```


### [2971. 找到最大周长的多边形](https://leetcode.cn/problems/find-polygon-with-the-largest-perimeter/)

排序贪心即可

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL s[N];
    
    long long largestPerimeter(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        {
            s[0] = 0;
            for (int i = 1; i <= n; ++ i )
                s[i] = s[i - 1] + nums[i - 1];
        }
        
        // ATTENTION: 贪心即可 【不需要双指针】
        for (int i = n; i >= 1; -- i )
            if (s[i - 1] > nums[i - 1])
                return s[i];
        return -1;
    }
};
```

### [2972. 统计移除递增子数组的数目 II](https://leetcode.cn/problems/count-the-number-of-incremovable-subarrays-ii/) [TAG]

思维 + 双指针

注意不要漏掉【只保留左侧 l+2】的计数值

```c++
class Solution {
public:
    // 移除一段连续序列 使得左右两侧合并为LIS(严格递增)
    // 求有多少个序列移除办法
    // 
    // 显然要先从左右两侧收缩区间 找到最小的不满足LIS的位置
    // 随后分情况讨论 + 枚举右端点
    
    using LL = long long;
    
    int n, l, r;
    
    long long incremovableSubarrayCount(vector<int>& nums) {
        this->n = nums.size();
        l = 0, r = n - 1;
        {
            while (l + 1 < n && nums[l + 1] > nums[l])
                l ++ ;
            while (r > 0 && nums[r - 1] < nums[r])
                r -- ;
        }
        if (l >= r)
            return (LL)(n + 1) * n / 2;
        
        // ATTENTION: case 1 如果只保留左侧(完全移除右侧)
        LL res = l + 2;
        
        // case 2 只保留右侧位置
        // 枚举右侧的起始位置 则左侧终止位置需要满足特定条件
        for (int i = 0, j = r; j < n; ++ j ) {
            // 找到第一个不符合的位置
            while (i <= l && nums[i] < nums[j])
                i ++ ;
            
            res += (i + 1);
        }
        return res;
    }
};
```

### [2973. 树中每个节点放置的金币数目](https://leetcode.cn/problems/find-number-of-coins-to-place-in-tree-nodes/) [TAG]

数学分析 优化数据范围

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 2e4 + 10, M = 4e4 + 10;

    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }

    int n;
    vector<int> cs;
    vector<LL> res;

    vector<int> dfs(int u, int fa) {
        vector<int> ret = {cs[u]};
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            auto t = dfs(j, u);
            ret.insert(ret.end(), t.begin(), t.end());
        }

        sort(ret.begin(), ret.end());
        int m = ret.size();
        // 求最值
        if (m >= 3) {
            res[u] = max({(LL)ret[m - 3] * ret[m - 2] * ret[m - 1],
                        (LL)ret[0] * ret[1] * ret[m - 1], 0ll});
        }
        // ATTENTION 收缩不必要的区间
        if (m > 5)
            ret = {ret[0], ret[1], ret[m - 3], ret[m - 2], ret[m - 1]};
        return ret;
    }

    vector<long long> placedCoins(vector<vector<int>>& edges, vector<int>& cost) {
        init();
        {
            for (auto & e : edges)
                add(e[0], e[1]), add(e[1], e[0]);
        }

        this-> cs = cost;
        this->n = cs.size();

        res = vector<LL>(n, 1);
        dfs(0, -1);
        return res;
    }
};
```
