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
#本贪心算法的核心：如果一个位置能够到达，那么这个位置左侧所有位置都能到达

class Solution:
    def canJump(self, nums) :
        max_i = 0       #初始化当前能到达最远的位置
        for i, jump in enumerate(nums):   #i为当前位置，jump是当前位置的跳数
            if max_i >= i and i + jump > max_i:  #如果当前位置能到达，并且当前位置+跳数>最远位置  
                max_i = i + jump  #更新最远能到达位置
        return max_i >= i 
```

