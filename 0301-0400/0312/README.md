#  [312. 戳气球](https://leetcode-cn.com/problems/burst-balloons/)

## 题意



## 题解

```c++
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> a(n + 2, 1);
        for (int i = 1; i <= n; i ++ ) a[i] = nums[i - 1];
        vector<vector<int>> f(n + 2, vector<int>(n + 2));
        for (int len = 3; len <= n + 2; len ++ )
            for (int i = 0; i + len - 1 <= n + 1; i ++ ) {
                int j = i + len - 1;
                for (int k = i + 1; k < j; k ++ )
                    f[i][j] = max(f[i][j], f[i][k] + f[k][j] + a[i] * a[k] * a[j]);
            }

        return f[0][n + 1];
    }
};
```

```c++
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        vector<vector<int>> f(n + 2, vector<int>(n + 2));
        // for (int i = 1; i <= n; ++ i ) f[i][i] = nums[i]; // NOT
        for (int len = 1; len <= n; ++ len )
            for (int l = 1; l + len - 1 <= n; ++ l ) {
                int r = l + len - 1;
                for (int k = l; k <= r; ++ k )
                    f[l][r] = max(f[l][r], f[l][k - 1] + f[k + 1][r] + nums[l - 1] * nums[r + 1] * nums[k]);
            }
        return f[1][n];
    }
};
```



```python3

```

