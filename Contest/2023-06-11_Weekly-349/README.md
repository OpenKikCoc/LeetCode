## [比赛链接](https://leetcode.cn/contest/weekly-contest-349/)

>   | 19/19 | 1:50:23 | 4/4  | 132/3714 |
>   | ----- | ------- | ---- | -------- |


### [2733. 既不是最小值也不是最大值](https://leetcode.cn/problems/neither-minimum-nor-maximum/)



```c++
class Solution {
public:
    int findNonMinOrMax(vector<int>& nums) {
        int n = nums.size();
        if (n <= 2)
            return -1;
        sort(nums.begin(), nums.end());
        return nums[1];
    }
};
```


### [2734. 执行子串操作后的字典序最小字符串](https://leetcode.cn/problems/lexicographically-smallest-string-after-substring-operation/)



```c++
class Solution {
public:
    string smallestString(string s) {
        // 恰好一次，意味着必须修改
        int n = s.size(), p = 0;
        while (p < n && s[p] == 'a')
            p ++ ;
        bool flag = false;
        if (p < n) {
            while (p < n && s[p] > 'a') {
                s[p ++ ] -- , flag = true;
            }
        }
        if (!flag)
            s[n - 1] = 'z';
        return s;
    }
};
```

### [2735. 收集巧克力](https://leetcode.cn/problems/collecting-chocolates/)

显然可以 rmq

```c++
class Solution {
public:
    using LL = long long;
    // 考虑 每个位置的价格是固定的，则对于任意一个类型其在不同位置的价格已知
    
    // f[i]: 转 i 次的情况下，收集所有的最小成本
    //  则对于特定的 i，每个的物品都价格都是一定区域内的最小值
    const static int N = 1010, M = 11;
    
    int n;
    LL f[N][M];
    LL query(int l, int r) {
        int len = r - l + 1;
        int k = log(len) / log(2);
        return min(f[l][k], f[r - (1 << k) + 1][k]);
    }
    
    long long minCost(vector<int>& nums, int x) {
        int n = nums.size();
        memset(f, 0, sizeof f);
        for (int j = 0; j < M; ++ j )
            for (int i = 1; i + (1 << j) - 1 <= n; ++ i )
                if (!j)
                    f[i][j] = nums[i - 1];
                else
                    f[i][j] = min(f[i][j - 1], f[i + (1 << j - 1)][j - 1]);
        
        LL res = 1e16;
        for (int i = 0; i < n; ++ i ) {
            LL sum = LL(x) * i;
            // cout << " init: i = " << i << " sum = " << sum << endl;
            for (int j = 0; j < n; ++ j ) {
                int l = j - i, r = j;
                LL t = 0;
                if (l >= 0) {
                    t = query(l + 1, r + 1);
                } else {
                    t = min(query((l + n) % n + 1, n), query(1, r + 1));
                }
                // cout << " j = " << j << " t = " << t << endl;
                sum += t;
            }
            // cout << " final: i = " << i << " sum = " << sum << endl;
            res = min(res, sum);
        }
        return res;
    }
};
```

更优：线性维护

```c++
class Solution {
public:
    // 更优的办法: 考虑到伴随着操作次数的增加，每个类型所能触及的最小值【不断变小】
    //  => 维护该最小值即可 更进一步降低复杂度

    using LL = long long;

    long long minCost(vector<int>& nums, int x) {
        int n = nums.size();
        vector<int> f = nums;
        LL res = 1e16;
        for (int i = 0; i < n; ++ i ) {
            for (int j = 0; j < n; ++ j )
                f[j] = min(f[j], nums[(j + i) % n]);
            LL t = 0;
            for (auto v : f)
                t += v;
            res = min(res, 1ll * x * i + t);
        }
        return res;
    }
};
```

### [2736. 最大和查询](https://leetcode.cn/problems/maximum-sum-queries/) [TAG]

经典：BIT 处理二维偏序问题

```c++
class Solution {
public:
    // 一个经验性的思路是离线处理 从大到小动态维护并求值
    using TIII = tuple<int, int, int>;
    const static int N = 2e5 + 10;
    
    vector<int> ys;
    int find(int y) {
        return lower_bound(ys.begin(), ys.end(), y) - ys.begin();
    }
    
    // ATTENTION 二维偏序问题常通过离线 BIT 来做
    int w[N], tr[N];
    int lowbit(int x) {
        return x & -x;
    }
    void modify(int x, int y) {
        w[x] = y;
        for (int i = x; i < N; i += lowbit(i))
            tr[i] = max(tr[i], y);
    }
    int query(int l, int r) {
        int res = 0;
        for (; l <= r;) {
            res = max(res, w[r]);
            for ( -- r ; r >= l + lowbit(r); r -= lowbit(r))
                res = max(res, tr[r]);
        }
        return res;
    }
    
    vector<int> maximumSumQueries(vector<int>& nums1, vector<int>& nums2, vector<vector<int>>& queries) {
        int n = nums1.size(), m = queries.size();
        vector<TIII> xs, qs;
        {
            for (int i = 0; i < n; ++ i )
                xs.push_back({nums1[i], nums2[i], i});
            sort(xs.begin(), xs.end());
            reverse(xs.begin(), xs.end());
        }
        {
            for (int i = 0; i < m; ++ i )
                qs.push_back({queries[i][0], queries[i][1], i});
            sort(qs.begin(), qs.end());
            reverse(qs.begin(), qs.end());
        }
        {
            // init ys
            ys.clear();
            for (int i = 0; i < n; ++ i )
                ys.push_back(nums2[i]);
            for (int i = 0; i < m; ++ i )
                ys.push_back(queries[i][1]);
            sort(ys.begin(), ys.end());
            ys.erase(unique(ys.begin(), ys.end()), ys.end());
        }
        
        vector<int> res(m, -1);
        for (int i = 0, j = 0; i < m; ++ i ) {
            auto [a, b, idx] = qs[i];
            // cout << " a = " << a << " b = " << b << " idx = " << idx << endl;
            while (j < n) {
                auto [x, y, z] = xs[j];
                if (x < a)
                    break;
                
                // 维护不同的 y 情况下，区间最大值
                if (w[find(y) + 1] < x + y) {
                    // ATTENTION 存在 y 重复的情况，需要取最大值
                    modify(find(y) + 1, x + y);
                }
                // cout << "  ... add x " << x << ' ' << y << ' ' << z << " s = " << x + y << endl;
                j ++ ;
            }
            // ATTENTION 需要实时查询，因为伴随着遍历 b 可能反而变大
            int t = query(find(b) + 1, N - 1);
            // cout << "  query got t = " << t << " all = " << query(1, N - 1) << endl;
            if (t > 0) {
                // ATTENTION 需要区分【存在与否】 因为如果 t=0 则意味着不存在
                // WA case:
                // [31]
                // [17]
                // [[1,79]]
                res[idx] = t;
            }
        }
        
        // cout << endl;
        return res;
    }
};
```
