#  [377. 组合总和 Ⅳ](https://leetcode-cn.com/problems/combination-sum-iv/)

## 题意



## 题解



```c++
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        int n = nums.size();
        vector<long long> f(target + 1);
        f[0] = 1;
        for (int i = 0; i <= target; ++ i )
            for (auto v : nums)
                if (i >= v) f[i] = (f[i] + f[i - v]) % INT_MAX;
        return f[target];
    }
};
```

```c++
// 以下状态定义是错误的
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        int n = nums.size();
        vector<long long> f(target + 1);
        f[0] = 1;
        for (auto v : nums)
            for (int i = target; i >= v; -- i )
                f[i] = (f[i] + f[i - v]) % INT_MAX;
        return f[target];
    }
};
```



```python
#法一：用dfs，会超时
class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        self.ans=0
        nums.sort()

        def dfs(index,target):
            if target==0:
                self.ans+=1             
            for i in range(len(nums)):
                if nums[i]>target:
                    return
                dfs(i,target-nums[i])
                
        dfs(0,target)
        return self.ans
        
#法二，用dp（其实就是经典的完全背包问题）：每个数字可以用无数次，不区分先后顺序
#dp[i]：表示总和为i的所有方案(有多少个数字无所谓)
#状态转移计算：以最后一个数的数值为转移，最后一个数可以是[nums[0],num[1],nums[2],..nums[k],...,nums[n-1]]
#当最后一个数是nums[k], dp[i]=dp[i-nums[k]]
#由于nums[k]>0, 所以从小到达循环就可以算出来了。

class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        n=len(nums)
        if n==0 or target<=0:return 0
        dp=[0 for _ in range(target+1)]
        dp[0]=1
        for i in range(1,target+1):
            for j in range(n):
                if i>=nums[j]:
                    dp[i]+=dp[i-nums[j]]
        return dp[target]


```

