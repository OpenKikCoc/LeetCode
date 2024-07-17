#  [268. 丢失的数字](https://leetcode.cn/problems/missing-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int res = n;
        for (int i = 0; i < n; ++ i )
            res ^= i ^ nums[i];
        return res;
    }

    int missingNumber(vector<int>& nums) {
        int n = nums.size(), sum = (n + 1) * n / 2, res = 0;
        for (int i = 0; i < n; ++ i )
            res += nums[i];
        return sum - res;
    }
};
```

```c++
// yxc
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int res = n * (n + 1) / 2;
        for (auto x: nums) res -= x;
        return res;
    }
};
```



```python3

```

