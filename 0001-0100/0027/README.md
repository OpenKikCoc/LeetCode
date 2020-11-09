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



```python3

```

