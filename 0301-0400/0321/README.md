#  [321. 拼接最大数](https://leetcode.cn/problems/create-maximum-number/)

## 题意



## 题解

dp解法数值会溢出

```c++
class Solution {
public:
    typedef long long LL;
    // dp
    vector<int> maxNumber(vector<int>& nums1, vector<int>& nums2, int k) {
        int n1 = nums1.size(), n2 = nums2.size();
        vector<int> res;
        vector<vector<vector<LL>>> f(n1 + 1, vector<vector<LL>>(n2 + 1, vector<LL>(k + 1)));
        for (int t = 1; t <= k; ++ t)
            for (int i = 0; i <= n1; ++ i)
                for (int j = 0; j <= n2; ++ j) {
                    if (i > 0)
                        f[i][j][t] = max(f[i][j][t], max(f[i-1][j][t], f[i-1][j][t-1] * 10 + nums1[i-1]));
                    if (j > 0)
                        f[i][j][t] = max(f[i][j][t], max(f[i][j-1][t], f[i][j-1][t-1] * 10 + nums2[j-1]));
                }
        LL val = f[n1][n2][k];
        while (val) res.push_back(val % 10), val /= 10;
        reverse(res.begin(), res.end());
        return res;
    }
};
```

贪心 + 单调栈:

>原问题直接处理比较困难，我们分成三步来做：
>
>1.  先枚举从两个数组中分别选多少个数；
>2.  然后分别贪心求解每个数组中需要选那些数；
>3.  将选出的两个数列合并；

```c++
class Solution {
public:
    vector<int> maxArray(vector<int> & nums, int k) {
        int n = nums.size();
        vector<int> res(k);
        for (int i = 0, j = 0; i < n; ++ i ) {
            while (n - i + j > k && j && res[j - 1] < nums[i]) -- j;
            if (j < k) res[j ++ ] = nums[i];
        }
        return res;
    }
    vector<int> merge(vector<int> & N, vector<int> & M) {
        vector<int> res;
        while (N.size() && M.size())
            if (N > M) res.push_back(N[0]), N.erase(N.begin());
            else res.push_back(M[0]), M.erase(M.begin());
        while (N.size()) res.push_back(N[0]), N.erase(N.begin());
        while (M.size()) res.push_back(M[0]), M.erase(M.begin());
        return res;
    }

    vector<int> maxNumber(vector<int>& nums1, vector<int>& nums2, int k) {
        int n1 = nums1.size(), n2 = nums2.size();
        vector<int> res(k, INT_MIN);
        // i 是右边界开区间
        for (int i = max(0, k - n2); i <= k && i <= n1; ++ i ) {
            vector<int> N = maxArray(nums1, i);
            vector<int> M = maxArray(nums2, k - i);
            vector<int> t = merge(M, N);
            if (res < t) res = t;
        }
        return res;
    }
};
```



```python3

```

