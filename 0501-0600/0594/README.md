#  [594. 最长和谐子序列](https://leetcode.cn/problems/longest-harmonious-subsequence/)

## 题意



## 题解



```c++
class Solution {
public:
    int findLHS(vector<int>& nums) {
        unordered_map<int, int> mp;
        for (auto v : nums) ++ mp[v];
        int res = 0;
        for (auto [k, v] : mp)
            if (mp.count(k - 1))
                res = max(res, mp[k] + mp[k - 1]);
        return res;
    }
};
```



```python3

```

