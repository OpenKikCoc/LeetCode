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



> **思路**
>
> 1. 状态定义：
>
>    $f[i, 0]$: 表示前 $i$ 项的和 模三余零的最大和
>
>    $f[i, 1]$: 表示前 $i$ 项的和 模三余一的最大和
>
>    $f[i, 2]$: 表示前 $i$ 项的和 模三余二的最大和
>
> 2. 状态转移：
>
>    根据当前数模三的余数来进行转移。详细见代码
>    
> 3. 初始化：前0个数，余数为0是合法的，所以 $f[0, 0] = 0$, 其他的都初始化为负无穷

```python
class Solution:
    def maxSumDivThree(self, nums: List[int]) -> int:
        n = len(nums)
        f = [[float("-inf") for _ in range(3)] for _ in range(n + 1)]
        f[0][0] = 0
        for i in range(1, n + 1):
            if nums[i - 1] % 3 == 0:
                f[i][0] = max(f[i - 1][0], f[i - 1][0] + nums[i - 1])
                f[i][1] = max(f[i - 1][1], f[i - 1][1] + nums[i - 1])
                f[i][2] = max(f[i - 1][2], f[i - 1][2] + nums[i - 1])
            elif nums[i - 1] % 3 == 1:
                f[i][0] = max(f[i - 1][0], f[i - 1][2] + nums[i - 1])
                f[i][1] = max(f[i - 1][1], f[i - 1][0] + nums[i - 1])
                f[i][2] = max(f[i - 1][2], f[i - 1][1] + nums[i - 1])
            elif nums[i - 1] % 3 == 2:
                f[i][0] = max(f[i - 1][0], f[i - 1][1] + nums[i - 1])
                f[i][1] = max(f[i - 1][1], f[i - 1][2] + nums[i - 1])
                f[i][2] = max(f[i - 1][2], f[i - 1][0] + nums[i - 1])
        
        return 0 if f[n][0] == float("-inf") else f[n][0]
```

