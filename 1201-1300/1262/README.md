#  

# [1262. 可被三整除的最大和](https://leetcode-cn.com/problems/greatest-sum-divisible-by-three/)

## 题意



## 题解



```c++
class Solution {
public:
    const int inf = 0x3f3f3f3f;
    int maxSumDivThree(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> f(n + 1, vector<int>(3, -inf));
        f[0][0] = 0;
        for (int i = 1; i <= n; ++i)
            for (int j = 0; j < 3; ++j)
                f[i][(j + nums[i - 1]) % 3] = max(
                    f[i - 1][(j + nums[i - 1]) % 3], f[i - 1][j] + nums[i - 1]);
        return f[n][0];
    }
};

```



```python3

```

