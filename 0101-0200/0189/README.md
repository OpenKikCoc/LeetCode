#  [189. 旋转数组](https://leetcode-cn.com/problems/rotate-array/)

## 题意



## 题解



```c++
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        if(!k) return;
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
        return;
    }
};
```



```python3

```

