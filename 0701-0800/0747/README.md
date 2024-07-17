#  [747. 至少是其他数字两倍的最大数](https://leetcode.cn/problems/largest-number-at-least-twice-of-others/)

## 题意



## 题解



```c++
class Solution {
public:
    int dominantIndex(vector<int>& nums) {
        int k = 0;
        for (int i = 1; i < nums.size(); i ++ )
            if (nums[i] > nums[k])
                k = i;
        for (int i = 0; i < nums.size(); i ++ )
            if (i != k && nums[k] < nums[i] * 2)
                return -1;
        return k;
    }
};
```



```python3

```

