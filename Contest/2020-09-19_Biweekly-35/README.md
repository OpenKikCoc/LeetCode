## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-35/)

模拟 200+/2800+

### [1588. 所有奇数长度子数组的和](https://leetcode-cn.com/problems/sum-of-all-odd-length-subarrays/)

模拟累加即可

```c++
    int sumOddLengthSubarrays(vector<int>& arr) {
        int res = 0, n = arr.size();
        for(int len = 1; len <= n; len += 2)
            for(int l = 0; l+len-1 < n; ++l)
                for(int i = l; i <= l+len-1; ++i) res += arr[i];
        return res;
    }
```


### [1589. 所有排列中的最大和](https://leetcode-cn.com/problems/maximum-sum-obtained-of-any-permutation/)

每次取一个区间，最后统计所有下标在区间中出现的次数。为减少复杂度显然差分数组

因为区间可以随意排列，所以两者排序相乘即可

```c++
    // 查分数组 统计每个位置的数值作用了多少次
    const int mod = 1e9+7;
    int maxSumRangeQuery(vector<int>& nums, vector<vector<int>>& requests) {
        int n = nums.size();
        vector<long long> c(n+1); //c[n]会被影响但是不发挥作用
        long long res = 0;
        sort(nums.begin(), nums.end());
        for(auto& req : requests) {
            int s = req[0], t = req[1];
            c[s] += 1, c[t+1] -= 1;
        }
        for(int i = 0; i < n; ++i) if(i) c[i] += c[i-1];
        c.pop_back();
        sort(c.begin(), c.end());
        for(int i = 0; i < n; ++i) res += c[i]*(long long)nums[i];
        return res % mod;
    }
```

### [1590. 使数组和能被 P 整除](https://leetcode-cn.com/problems/make-sum-divisible-by-p/)

删除尽量少的数使得剩余非空数组的和可以整除p

题意理解有问题 其实本质是移除 `最短且连续的子数组` 

显然前缀和

```c++
    int minSubarray(vector<int>& nums, int p) {
        int n = nums.size();
        long long sum = 0;
        for(auto& v : nums) sum += v;
        if(sum < p) return -1;
        if(sum % p == 0) return 0;
        int m = sum%p;
        unordered_map<int, int> mp; // mod=>idx
        mp[0] = -1; sum = 0;
        int res = n;
        for(int i = 0; i < n; ++i) {
            sum += nums[i];
            int now = sum%p, tar;
            if(now >= m) tar = now - m;
            else tar = now - m + p;
            if(mp.count(tar)) res = min(res, i-mp[tar]);
            mp[now] = i;
        }
        return res == n ? -1 : res;
    }
```

liuzhou_101:

```c++
    int minSubarray(vector<int>& a, int p) {
        int n = a.size();
        vector<int> s(n+1);
        for (int i = 1; i <= n; ++i) s[i] = (s[i-1]+a[i-1])%p;
        int sum = s[n];
        if (sum == 0) return 0;
        
        unordered_map<int, int> F;
        F[0] = 0;
        int res = n;
        for (int i = 1; i <= n; ++i)
        {
            if (F.count((s[i]-sum+p)%p)) res = min(res, i-F[(s[i]-sum+p)%p]);
            F[s[i]] = i;
        }
        if (res == n) res = -1;
        return res;
    }
```

### [1591. 奇怪的打印机 II](https://leetcode-cn.com/problems/strange-printer-ii/) [TAG]

每个颜色染一个矩形 颜色不能重复使用 问能否达成目标染色情况

显然先统计颜色并求每个颜色的左上与右下边界

随后：**枚举每个矩阵内的所有其他颜色，建图，跑拓扑排序**

判断是否有环，原理是：颜色只能用一次 则前述有向图不能有环

```c++
    // 考虑统计每个颜色出现的左上、右下坐标
    int m, n;
    vector<vector<int>> G;
    vector<unordered_set<int>> es;
    vector<int> vis;
    bool dfs(int u) {
        vis[u] = -1;
        for(auto& v : es[u]) {
            if(vis[v] < 0) return false;
            else if(!vis[v] && !dfs(v)) return false;
        }
        vis[u] = 1;
        return true;
    }
    bool isPrintable(vector<vector<int>>& targetGrid) {
        this->G = targetGrid;
        m = G.size(), n = G[0].size();
        vector<int> l(61, 60), u(61, 60), r(61, -1), d(61, -1);
        es = vector<unordered_set<int>>(61);
        vis = vector<int>(61);
        unordered_set<int> color;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) {
                int c = G[i][j];
                color.insert(c);
                l[c] = min(l[c], j);
                u[c] = min(u[c], i);
                r[c] = max(r[c], j);
                d[c] = max(d[c], i);
            }
        for(int i = 0; i < m; ++i) for(int j = 0; j < n; ++j) {
            int c = G[i][j];
            for(auto& uc : color)
                if(c != uc && l[uc] <= j && u[uc] <= i && r[uc] >= j && d[uc] >= i) es[uc].insert(c);
        }
        for(auto& c : color)
            if(!vis[c]) if(!dfs(c)) return false;
        return true;
    }
```
