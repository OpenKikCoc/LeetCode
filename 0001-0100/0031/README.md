#  [31. 下一个排列](https://leetcode-cn.com/problems/next-permutation/)

## 题意



## 题解



```c++
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int k = nums.size()-1;
        while(k > 0 && nums[k-1] >= nums[k]) --k;
        if(k <= 0) reverse(nums.begin(), nums.end());
        else {
            int t = k;
            // not nums[t] >= nums[k-1]
            while(t < nums.size() && nums[t] > nums[k-1]) ++t;
            // nums[t] <= nums[k-1], 则nums[t-1] 是大于nums[k-1]的数
            swap(nums[t-1], nums[k-1]);
            reverse(nums.begin()+k, nums.end());
        }
    }
};

class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        if(n < 2) return;
        int i = n-2, j = n-1, k = n-1;
        while(i >= 0 && nums[i] >= nums[j]) --i, --j;
        if(i >= 0) {
            while(nums[i] >= nums[k]) --k;
            swap(nums[i], nums[k]);
        }
        for(i = j, j = n-1; i < j; ++i, --j) swap(nums[i], nums[j]);
    }
};
```



```python3

```

