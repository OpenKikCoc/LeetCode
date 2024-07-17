#  [665. 非递减数列](https://leetcode.cn/problems/non-decreasing-array/)

## 题意



## 题解



```c++
class Solution {
public:
    bool check(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i ++ )
            if (nums[i] < nums[i - 1])
                return false;
        return true;
    }

    bool checkPossibility(vector<int>& nums) {
        for (int i = 1; i < nums.size(); i ++ )
            if (nums[i] < nums[i - 1]) {
                int a = nums[i - 1], b = nums[i];
                nums[i - 1] = nums[i] = a;
                if (check(nums)) return true;
                nums[i - 1] = nums[i] = b;
                if (check(nums)) return true;
                return false;
            }
        return true;
    }
};
```

早期代码:

```c++
class Solution {
public:
    bool checkPossibility(vector<int>& nums) {
        int len = nums.size();
        if (len <= 1) return true;
        bool change = false;
        for (int i = 1; i < len; ++ i ) {
            if (nums[i - 1] > nums[i]) {
                // 应该修改前面的数
                // for [3,4,2,3]
                // for [2,3,3,2,4]
                // for [4,2,3]
                if (!change) {
                    if(i >= 2 && nums[i - 2] > nums[i]) nums[i] = nums[i - 1];
                    else nums[i - 1] = nums[i];
                    change = true;
                } else return false;
            }
        }
        return true;
    }
};
```







```python3

```

