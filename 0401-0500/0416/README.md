#  [416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)

## 题意



## 题解

```c++
class Solution {
public:
    // bitset
    bool canPartition(vector<int>& nums) {
        bitset<10001> f;
        f[0] = 1;
        int sum = 0;
        for (auto x: nums) {
            f |= f << x;
            sum += x;
        }
        if (sum % 2) return false;
        return f[sum / 2];
    }
};

class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int n = nums.size(), m = 0;
        for (auto x: nums) m += x;
        if (m % 2) return false;
        m /= 2;
        vector<int> f(m + 1);
        f[0] = 1;
        for (auto x: nums)
            for (int j = m; j >= x; j -- )
                f[j] |= f[j - x];
        return f[m];
    }
};
```



> **思路**
>
> 两个子集的和要想等，说明 $sum(nums) 模 2 == 0$ ，且每个子集的和应该是 $sum(nums) / 2$
>
> 可以把这道题转化为：从 $nums$ 中任选若干数字，这些数字之和要等于 $sum(nums)/2$ ，那么剩下数字就自动构成另一个子集
>
> $==>$ 这就是经典的**01背包问题**：背包的容积是  $sum(nums)/2$，从 $n = len(nums)$ 中选，每个物品的体积是 $nums[i]$ ，问能否恰好装满这个包
>
> 1. 状态定义：$f[i,j]$ 表示遍历到第 $i$ 个物品时是否可凑出  $sum(nums)/2$
>
> 2. 状态转移：
>
>    1） 第 $i$ 个物品装: $f[i, j] = f[i - 1, j - nums[i]]$
>
>    2） 第 $i$ 个物品不装： $f[i, j] = f[i - 1, j]$
>
>    两个状态有一个为 $True$ 就说明存在符合题意的方案
>
> 3. 初始化：$f[i, 0] = True; $ 表示： $0$ 个物品凑成体积为 $0$ 的方案是存在的

```python
# 朴素dp
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        # 剪枝
        if sum(nums) % 2 == 1 or len(nums) == 1:return False
        n, v = len(nums), int(sum(nums) / 2)

        f = [[False] * (v + 1) for _ in range(n + 1)]
        f[i][0] = True
        for i in range(1, n + 1):
            for j in range(v + 1):
                if j < nums[i - 1]:
                    f[i][j] = f[i - 1][j]
                else:
                    f[i][j] = f[i - 1][j - nums[i - 1]] or f[i - 1][j]
        return f[n][v]
```

```python
# 滚动数组优化
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        # 剪枝
        if sum(nums) % 2 == 1 or len(nums) == 1:return False
        n, v = len(nums), int(sum(nums) / 2)

        f = [[False] * (v + 1) for _ in range(2)]
        f[0][0] = True
        for i in range(1, n + 1):
            for j in range(v + 1):
                if j < nums[i - 1]:
                    f[i & 1][j] = f[(i - 1) & 1][j]
                else:
                    f[i & 1][j] = f[(i - 1) & 1][j - nums[i - 1]] or f[(i - 1) & 1][j]
        return f[n & 1][v]

# 空间压缩
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
      	# 剪枝
        if sum(nums) % 2 == 1 or len(nums) == 1:return False
        n, v = len(nums), int(sum(nums) / 2)
        
        f = [False] * (v + 1)
        f[0] = True

        for i in range(n):
            for j in range(v, nums[i - 1] - 1, -1):
                f[j] = f[j - nums[i - 1]] or f[j]
        return f[v]
```

