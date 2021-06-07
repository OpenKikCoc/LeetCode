#  [27. 移除元素](https://leetcode-cn.com/problems/remove-element/)

## 题意



## 题解



```c++
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int n = nums.size(), p = 0;
        //if(!n) return 0;
        for(int i = 0; i < n; ++i) {
            if(nums[i] != val) nums[p++] = nums[i];
        }
        return p;
    }
};
```



```python
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        n = len(nums)
        p1, p2 = 0, 0 
        while p2 < n:
            if nums[p2] != val:
                nums[p1] = nums[p2]
                p1 += 1
            p2 += 1
        return p1
```

