#  [724. 寻找数组的中心下标](https://leetcode-cn.com/problems/find-pivot-index/)

## 题意



## 题解



```c++
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        if (nums.empty()) return -1;
        int n = nums.size();
        vector<int> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + nums[i - 1];
        
        for (int i = 1; i <= n; ++ i )
            if (s[i - 1] == s[n] - s[i])
                return i - 1;
        return -1;
    }
};
```



```python3

```

