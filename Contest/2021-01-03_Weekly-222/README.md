## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-222/)


### [1710. 卡车上的最大单元数](https://leetcode-cn.com/problems/maximum-units-on-a-truck/)

排序 略

```c++
class Solution {
public:
    int maximumUnits(vector<vector<int>>& boxTypes, int truckSize) {
        sort(boxTypes.begin(), boxTypes.end(), [](vector<int> & a, vector<int> & b){
            return a[1] > b[1];
        });
        int res = 0;
        for (auto ve : boxTypes) {
            int use = min(truckSize, ve[0]);
            res += use * ve[1];
            truckSize -= use;
            if (!truckSize) break;
        }
        return res;
    }
};
```


### [5642. 大餐计数](https://leetcode-cn.com/problems/count-good-meals/)

计数 略

注意需遍历至 21 因为输入可以为两个1048576 【2^21 / 2】

```c++
class Solution {
public:
    const int mod = 1e9 + 7;
    using LL = long long;
    vector<int> cnt;
    LL get(int v) {
        LL res = 0;
        for (int i = 0; i <= 21; ++ i )
            if ((1 << i) >= v)
                res = (res + cnt[(1 << i) - v]) % mod;
        return res;
    }
    int countPairs(vector<int>& a) {
        cnt.resize(1 << 21 + 1);
        LL res = 0;
        for (auto v : a) {
            res = (res + get(v)) % mod;
            cnt[v] ++ ;
        }
        return res;
    }
};
```

### [1712. 将数组分成三个子数组的方案数](https://leetcode-cn.com/problems/ways-to-split-array-into-three-subarrays/) [TAG]

注意枚举方法 单调性证明【j k只会随i向右】

```c++
class Solution {
public:
    const int mod = 1e9 + 7;
    using LL = long long;
    int waysToSplit(vector<int>& nums) {
        int n = nums.size();
        vector<LL> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + nums[i - 1];
        
        int res = 0;
        // [0, x - 1], [x, i - 1], [i, n]
        // j 为最左，k为最右
        for (int i = 3, j = 2, k = 2; i <= n; ++ i ) {
            while (s[n] - s[i - 1] < s[i - 1] - s[j - 1]) j ++ ;
            while (k + 1 < i && s[i - 1] - s[k] >= s[k]) k ++ ;
            if (j <= k && s[n] - s[i - 1] >= s[i - 1] - s[j - 1] && s[i - 1] - s[k - 1] >= s[k - 1])
                res = (res + k - j + 1) % mod;
        }
        return res;
    }
};
```

最初二分写法修正：

二分搜索时应从 `s.begin() + 1` 开始

```c++
class Solution {
public:
    const int mod = 1e9 + 7;
    using LL = long long;
    int waysToSplit(vector<int>& nums) {
        int n = nums.size();
        vector<LL> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + nums[i - 1];
        
        LL res = 0;
        for (int i = 2; i < n; ++ i ) {
            LL rv = s[n] - s[i];
            if (rv * 2 < s[i]) break;
            int ridx = upper_bound(s.begin() + 1, s.begin() + i, s[i] / 2) - s.begin();     // 保证 left <= mid
            int lidx = lower_bound(s.begin() + 1, s.begin() + i, s[i] - rv) - s.begin();    // 保证 mid <= right
            res = (res + ridx - lidx) % mod;
        }
        return res;
    }
};
```

### [1713. 得到子序列的最少操作次数](https://leetcode-cn.com/problems/minimum-operations-to-make-a-subsequence/) [TAG]

模板题

最长公共子序列 LCS 转化为 最长上升子序列 LIS

复杂度由 O(n^2) -> O(nlogn)

要求：整数互不相同

```c++
class Solution {
public:
    int minOperations(vector<int>& target, vector<int>& arr) {
        unordered_map<int, int> pos;
        for (int i = 0; i < target.size(); ++ i ) pos[target[i]] = i;   // target无重复数组
        vector<int> ve;
        for (auto & x : arr)
            if (pos.count(x)) ve.push_back(pos[x]);
        
        vector<int> f;
        for (auto & x : ve)
            if (f.empty() || f.back() < x) f.push_back(x);
            else *lower_bound(f.begin(), f.end(), x) = x;
        return target.size() - f.size();
    }
};
```
