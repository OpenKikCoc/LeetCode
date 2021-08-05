#  [347. 前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

## 题意



## 题解



```c++
class Solution {
public:
    // 1.
    vector<int> topKFrequent(vector<int>& nums, int k) {
        int n = nums.size();
        unordered_map<int, int> mp;
        for (auto v : nums) ++ mp[v] ;
        vector<pair<int, int>> ve;
        for (auto [k, v] : mp) ve.push_back({v, k});
        sort(ve.begin(), ve.end());
        vector<int> res;
        n = ve.size();
        for (int i = n - 1; i >= n - k; --i) res.push_back(ve[i].second);
        return res;
    }
```



```python3

```

