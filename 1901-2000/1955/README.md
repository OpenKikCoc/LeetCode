# [1955. 统计特殊子序列的数目](https://leetcode.cn/problems/count-number-of-special-subsequences/) 

## 题意



## 题解



```c++

```



**思路**

> 线性 DP 求方案数，首先明确状态定义和状态转移
>
> 经典求方案，定义及转移、滚动数字压缩空间
>
> 核心在于 状态定义 和 转移
>
> 前 i 个位置分别构成 0 / 01 / 012 形式序列的方案数。
>
> 1. 状态表示：
>
>    1） $f[i，  0]$ 表示前 $i$ 个数都是0组成的子序列的个数
>
>    2） $f[i，1]$ 表示前 $i$ 个数是先0后1子序列的个数
>
>    3） $f[i，2]$ 表示前 $i$ 个数是先0后1最后是2的子序列的个数，也就是特殊子序列
>
> 2. 状态转移，根据第 i 项的值进行转移
>
>    1） 当 $nums[i] == 0$，
>
>    对于 $f[i, 0]$: 不选 0 时，$f[i，0] = f[i-1，0]$；
>
>    ​		   选 0 时，可以单独组成一个子序列，也可以与前面的 0 组合，也是 $f[i-1, 0]$；最后相加，$f[i, 0] = 2 * f[i - 1, 0] + 1$
>
>    对于 $f[i, 1], f[i, 2]$ 都不能用当前0，所以都依赖于 $i-1$ 项对应的值
>
>    2） 当 $nums[i] == 1$，
>
>    对于 $f[i, 1]$: 不选 1 时，$f[i，1]$ 的值取决于 $f[i-1，1]$
>
>    ​		   选 0 时，可以单独和前 $i-1$ 项的0组成子序列，也可以和前面 $i-1$ 项的1组成子序列；最后相加，$f[i,1] = f[i-1,1] + f[i-1,0] + f[i-1,1]$
>
>    对于 $f[i, 1], f[i, 0]$ 都不能用当前1，所以都依赖于 $i-1$ 项对应的值
>    3） 当 $nums[i] == 2$，同理可得：$f[i,2] = f[i-1,2] + f[i-1,1] + f[i-1,2]$
>
> 3. 优化：
>
>    1） 滚动数组优化
>
>    由于当前项 $f[i]$ 永远只依赖 $f[i-1]$ ，这种情况下可以用**滚动数组**压缩空间
>
>    - 做法是：第 i 项和 i - 1项都和1做**位与运算**
>
>    - 在二进制里，我们总可以在末尾加1，使得当前0变成1，1变成0
>
>    2） 用常量代替滚动数组进一步优化

```python
# 暴力dp
class Solution:
    def countSpecialSubsequences(self, nums: List[int]) -> int:
        n = len(nums)
        f = [[0] * 3 for _ in range(n + 1)]

        for i in range(1, n + 1):
            if nums[i - 1] == 0:
                f[i][0] = f[i - 1][0] * 2 + 1
                f[i][1] = f[i - 1][1]
                f[i][2] = f[i - 1][2]
            elif nums[i - 1] == 1:
                f[i][0] = f[i - 1][0]
                f[i][1] = f[i - 1][0]  + f[i - 1][1] * 2
                f[i][2] = f[i - 1][2]
            else:
                f[i][0] = f[i - 1][0]
                f[i][1] = f[i - 1][1]
                f[i][2] = f[i - 1][2] * 2 + f[i - 1][1]
        return f[n][2] % int(1e9 + 7)
      
# 滚动数组优化
class Solution:
    def countSpecialSubsequences(self, nums: List[int]) -> int:
        n = len(nums)
        f = [[0] * 3 for _ in range(2)]

        for i in range(1, n + 1):
            if nums[i - 1] == 0:
                f[i & 1][0] = f[(i - 1) & 1][0] * 2 + 1
                f[i & 1][1] = f[(i - 1) & 1][1]
                f[i & 1][2] = f[(i - 1) & 1][2]
            elif nums[i - 1] == 1:
                f[i & 1][0] = f[(i - 1) & 1][0]
                f[i & 1][1] = f[(i - 1) & 1][0]  + f[(i - 1) & 1][1] * 2
                f[i & 1][2] = f[(i - 1) & 1][2]
            else:
                f[i & 1][0] = f[(i - 1) & 1][0]
                f[i & 1][1] = f[(i - 1) & 1][1]
                f[i & 1][2] = f[(i - 1) & 1][2] * 2 + f[(i - 1) & 1][1]
        return f[n & 1][2] % int(1e9 + 7)
      
# 常量优化
# 执行时间1824ms...
class Solution:
    def countSpecialSubsequences(self, nums: List[int]) -> int:
        n = len(nums)
        a, b, c = 0, 0, 0

        for i in range(1, n + 1):            
            if nums[i - 1] == 2:
                c += c + b
            if nums[i - 1] == 1:
                b += a + b
            if nums[i - 1] == 0:
                a += a + 1
        return c % int(1e9 + 7)
      
      
# 执行时间268ms...   
class Solution:
    def countSpecialSubsequences(self, nums: List[int]) -> int:
        mod = int(1e9 + 7)
        a, b, c = 0, 0, 0

        for x in nums:         
            if x == 2:
                c = (c * 2 + b) % mod
            if x == 1:
                b = (b * 2 + a) % mod
            if x == 0:
                a = (a * 2 + 1) % mod
        return c 
```

