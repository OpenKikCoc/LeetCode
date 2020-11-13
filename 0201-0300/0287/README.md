#  [287. 寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        for(int i = 0; i < nums.size(); ++ i){
            while(nums[i] != i + 1){
                if(nums[nums[i] - 1] == nums[i]) return nums[i];
                swap(nums[i], nums[nums[i] - 1]);
            }
        }

        return -1;
    }

    int findDuplicate(vector<int>& nums) {
        int n = nums.size();
        int p = 0;
        while(p < n) {
            while(nums[p] != p && nums[nums[p]] != nums[p]) swap(nums[p], nums[nums[p]]);
            if(nums[p] == nums[nums[p]]) return nums[p];
            ++p;
        }
        return 0;
    }
};
```



```python3

```

