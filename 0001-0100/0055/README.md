#  [55. 跳跃游戏](https://leetcode-cn.com/problems/jump-game/)

## 题意



## 题解



```c++
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int n = nums.size();
        int l = n-1;
        for (int i = n - 1; i >= 0; -- i ) {
            if (i + nums[i] >= l) l = i;
        }
        return l == 0;
    }
};
```

```c++
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int n = nums.size(), k = 0;
        for (int i = 0; i < n; ++ i ) {
            if (k < i)
                return false;
            k = max(k, i + nums[i]);
        }
        return true;
    }
};
```



```python
"""
本贪心算法的核心：如果一个位置能够到达，那么这个位置左侧所有位置都能到达
1. 用一个变量记录，前一个位置能到达最远的位置
2. 若前i - 1个位置中跳，跳到最远的位置是 max_i 比 i 小，表示从前i - 1个位置中跳，跳不到i的位置，因此一定不能跳到最后一个的位置
3. 若前i - 1个位置中跳，能跳到i，则继续尝试从i位置跳，可能会跳得更远，更新 max_i 的值
"""

class Solution:
    def canJump(self, nums):
        #初始化当前能到达最远的位置
        last = 0      
        #i为当前位置，jump是当前位置的跳数
        for i, jump in enumerate(nums):   
            # 更新最远能到达位置
            if last >= i and i + jump > last:  
                last = i + jump  
        return last >= i 
  
  
# 写法2  
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        last = 0 
        for i, jump in enumerate(nums):
            if last < i:
                return False
            last = max(last, i + jump)
        return True
```

