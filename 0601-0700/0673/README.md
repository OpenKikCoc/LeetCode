#  [673. 最长递增子序列的个数](https://leetcode-cn.com/problems/number-of-longest-increasing-subsequence/)

## 题意



## 题解



```c++
class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> f(n + 1), c(n + 1);
        int lmax = 0;
        for (int i = 1; i <= n; ++ i ) {
            f[i] = 1;
            c[i] = 1;
            for (int j = 1; j < i; ++ j )
                if (nums[j - 1] < nums[i - 1]) {
                    int v = f[j] + 1;
                    if (v > f[i]) {
                        f[i] = v;
                        c[i] = c[j];
                    } else if (v == f[i])
                        c[i] += c[j];
                }
            lmax = max(lmax, f[i]);
        }   
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            if (f[i] == lmax)
                res += c[i];
        return res;
    }
};
```

yxc:

```c++
class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> f(n), g(n);

        int maxl = 0, cnt = 0;
        for (int i = 0; i < n; i ++ ) {
            f[i] = g[i] = 1;
            for (int j = 0; j < i; j ++ )
                if (nums[j] < nums[i]) {
                    if (f[i] < f[j] + 1) f[i] = f[j] + 1, g[i] = g[j];
                    else if (f[i] == f[j] + 1) g[i] += g[j];
                }
            if (maxl < f[i]) maxl = f[i], cnt = g[i];
            else if (maxl == f[i]) cnt += g[i];
        }
        return cnt;
    }
};

作者：yxc
链接：https://www.acwing.com/activity/content/code/content/922870/
来源：AcWing
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```







```python3

```

