#  [540. 有序数组中的单一元素](https://leetcode.cn/problems/single-element-in-a-sorted-array/)

## 题意



## 题解



```c++
class Solution {
public:
    int singleNonDuplicate(vector<int> & nums) {
        nums.push_back(nums.back() + 1);
        int l = 0, r = nums.size() / 2 - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m * 2] != nums[m * 2 + 1]) r = m;
            else l = m + 1;
        }
        return nums[l * 2];
    }

    int singleNonDuplicate_2(vector<int>& nums) {
        int res = 0;
        for (auto v : nums) res ^= v;
        return res;
    }
};
```



```python3

```

