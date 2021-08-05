#  [377. 组合总和 Ⅳ](https://leetcode-cn.com/problems/combination-sum-iv/)

## 题意



## 题解



```c++
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        int n = nums.size();
        vector<long long> f(target + 1);
        f[0] = 1;
        for (int i = 0; i <= target; ++ i )
            for (auto v : nums)
                if (i >= v) f[i] = (f[i] + f[i - v]) % INT_MAX;
        return f[target];
    }
};
```

```c++
// 以下状态定义是错误的
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        int n = nums.size();
        vector<long long> f(target + 1);
        f[0] = 1;
        for (auto v : nums)
            for (int i = target; i >= v; -- i )
                f[i] = (f[i] + f[i - v]) % INT_MAX;
        return f[target];
    }
};
```



```python3

```

