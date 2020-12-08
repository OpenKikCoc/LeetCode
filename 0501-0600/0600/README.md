#  [600. 不含连续1的非负整数](https://leetcode-cn.com/problems/non-negative-integers-without-consecutive-ones/)

## 题意



## 题解



```c++
class Solution {
public:
    int findIntegers(int num) {
        vector<int> nums;
        while (num) nums.push_back(num % 2), num /= 2;
        vector<vector<int>> f(nums.size() + 1, vector<int>(2));
        f[1][0] = f[1][1] = 1;
        for (int i = 2; i <= nums.size(); ++ i ) {
            f[i][0] = f[i - 1][0] + f[i - 1][1];
            f[i][1] = f[i - 1][0];
        }

        int res = 0;
        for (int i = nums.size(), last = 0; i; -- i ) {
            int x = nums[i - 1];
            if (x) {
                res += f[i][0];
                // 前面已经是1 必然不合法 直接return
                if (last) return res;
            }
            last = x;
        }
        return res + 1;
    }
};
```



```python3

```

