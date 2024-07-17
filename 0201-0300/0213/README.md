#  [213. 打家劫舍 II](https://leetcode.cn/problems/house-robber-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        int st = 0, no = 0;
        for (int i = 0; i < n - 1; ++ i ) {
            int a = st, b = no;
            st = b + nums[i];
            no = max(a, b);
        }
        int res1 = max(st, no);
        st = 0, no = 0;
        for (int i = 1; i < n; ++ i ) {
            int a = st, b = no;
            st = b + nums[i];
            no = max(a, b);
        }
        int res2 = max(st, no);
        return max(res1, res2);
    }
};
```



**思路**

> 相比上一道题，唯一的不同就是：第一个和最后一个不能同时选；
>
> 我们可以将第一个房间单独分离进行讨论。分别是选择第一个房间和不选择第一个房间
>
> 1. 状态定义：
>
>    不选第一个: $f[i]$ 表示不选第一个，并且选第 $i$ 个的金额；
>
>    ​		   $g[i]$ 表示不选第一个，并且不选第 $i$ 个的金额。
>
>    ​		   **结果**： $max(f[n],  g[n])$ (由于第一个不选，所以最后一个可选可不选，所以可以两个取max)
>
>    选 第一个：$f'[i]$ 表示选第一个，并且选第 $i$ 个的金额；
>
>    ​		  $g'[i]$ 表示选第一个，并且不选第 $i$ 个的金额。
>
>    ​		   **结果**：由于选了第一个，所以最后一个点不能选： $max = g'[n]$
>
> 2. 状态转移见代码
>
> 3. 最后，取两个情况的最大值

```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 0:return 0
        if n == 1:return nums[0]
        res = 0
        f, g = [0] * (n + 1), [0] * (n + 1)

        # 不选1
        for i in range(2, n + 1):  
            f[i] = g[i - 1] + nums[i - 1]
            g[i] = max(f[i - 1], g[i - 1])
        res = max(f[n], g[n]) # 不选1的话，那最大值是在第n个可选 可不选里取最大
        
        # 选1 初始化
        f[1] = nums[0]  
        g[1] = float('-inf') # 选1，g[1]就不合理，置为不可达数据 即可
        for i in range(2, n + 1):
            f[i] = g[i - 1] + nums[i - 1]
            g[i] = max(f[i - 1], g[i - 1])
        res = max(res, g[n]) # 由于选了第1个，所以这里只能用g[n]（不选n） 和之前的res作对比
        return res
```

