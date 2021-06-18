#  [169. 多数元素](https://leetcode-cn.com/problems/majority-element/)

## 题意



## 题解



```c++
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int n = nums.size();
        int res = nums[0], vote = 1;
        for(int i = 1; i < n; ++i) {
            if(nums[i] != res) {
                --vote;
                if(!vote) {
                    vote = 1;
                    res = nums[i];
                }
            } else ++vote;
        }
        return res;
    }
};
```



```python
# 投票计数法
class Solution:
    def twoSum(self, arr: List[int], target: int) -> List[int]:
        n = len(arr)
        sumn = 0
        l, r = 0, n - 1
        while l < r:
            sumn = arr[l] + arr[r]
            if sumn > target:
                r -= 1
            elif sumn < target:
                l += 1
            else:return [l + 1, r + 1]
        return [-1, -1]
```

