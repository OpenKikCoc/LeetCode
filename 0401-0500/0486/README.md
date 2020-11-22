#  [486. 预测赢家](https://leetcode-cn.com/problems/predict-the-winner/)

## 题意



## 题解



```c++
class Solution {
public:
    bool PredictTheWinner(vector<int>& nums) {
        int n = nums.size();
        vector<int> psum(n+1);
        for(int i = 1; i <= n; ++i) psum[i] = psum[i-1] + nums[i-1];
        vector<vector<int>> f(n+1, vector<int>(n+1));
        for(int i = 1; i <= n; ++i) f[i][i] = nums[i-1];
        for(int len = 2; len <= n; ++len)
            for(int l = 1; l+len-1 <= n; ++l) {
                int r = l+len-1;
                int lsum = psum[r]-psum[l-1];
                f[l][r] = max(-f[l+1][r]+nums[l-1], -f[l][r-1]+nums[r-1]);
            }
        return f[1][n] >= 0;
    }
};


class Solution {
public:
    bool PredictTheWinner(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> f(n, vector<int>(n));
        for (int len = 1; len <= n; len ++ ) {
            for (int i = 0; i + len - 1 < n; i ++ ) {
                int j = i + len - 1;
                if (len == 1) f[i][j] = nums[i];
                else {
                    f[i][j] = max(nums[i] - f[i + 1][j], nums[j] - f[i][j - 1]);
                }
            }
        }
        return f[0][n - 1] >= 0;
    }
};
```



```python3

```

