#  [448. 找到所有数组中消失的数字](https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        int n = nums.size();
        vector<int> res;
        for (auto x : nums) {
            x = abs(x);
            if (nums[x - 1] > 0) nums[x - 1] *= -1;
        }
        for (int i = 0; i < n; ++ i )
            if (nums[i] > 0) res.push_back(i + 1);
        return res;
    }

    vector<int> findDisappearedNumbers_2(vector<int>& nums) {
        int n = nums.size();
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            while (nums[nums[i] - 1] != nums[i]) swap(nums[nums[i] - 1], nums[i]); 
        for (int i = 0; i < n; ++ i ) if (nums[i] != i + 1) res.push_back(i + 1);
        return res;
    }
};
```



```python3

```

