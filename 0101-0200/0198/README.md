#  [198. 打家劫舍](https://leetcode.cn/problems/house-robber/)

## 题意



## 题解



```c++
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        int st = 0, no = 0;
        for (int i = 0; i < n; ++ i ) {
            int a = st, b = no;
            st = b + nums[i];
            no = max(a, b);
        }
        return max(st, no);
    }
};

// yxc
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        vector<int> f(n + 1), g(n + 1);
        for (int i = 1; i <= n; i ++ ) {
            f[i] = g[i - 1] + nums[i - 1];
            g[i] = max(f[i - 1], g[i - 1]);
        }
        return max(f[n], g[n]);
    }
};
```



**思路**

> **普通dp**
>
> 1. 状态表示：$f[i]$: 前 $i$ 天可以最多赚到多少钱；
> 2. 状态转移：1）第 $i$ 天不偷，那就是 $f[i-1]$ ；2. 第 $i$ 天偷，那就只能 $i-2$ 天偷
>
> ------
>
> **状态机dp**
>
> 1. 状态表示：
>
>    $f[i]$ 表示考虑了前 $i$ 个房间，且盗窃了第 $i$ 个房间所能得到的最大收益
>
>    $g[i]$ 表示考虑了前 $i$ 个房间，且不盗窃第 $i$ 个房间所能得到的最大收益
>
> 2. 状态转移
>
>    $f[i]$：表示在第 $i$ 家偷，那 $i-1$ 家就不能偷，$f[i] = g[i-1] + nums[i-1]$
>
>    $g[i]$: 表示不偷第 $i$ 家，那 $i-1$ 家也是可偷可不偷, $g[i] = max(g[i-1], f[i-1])$

```python
# dp

class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        f = [0] * (n + 1)
        for i in range(1, n + 1):
            f[i] = max(f[i - 1], f[i - 2] + nums[i - 1])
        return f[n]
```

```python
# 状态机dp
class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        f, g = [0] * (n + 1), [0] * (n + 1)
        for i in range(1, n + 1):
            f[i] = g[i - 1] + nums[i - 1]
            g[i] = max(f[i - 1], g[i - 1])
        return max(f[n], g[n])
```

