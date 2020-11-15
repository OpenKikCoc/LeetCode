#  [347. 前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

## 题意



## 题解



```c++
/*
 * @lc app=leetcode.cn id=347 lang=cpp
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
class Solution {
public:
    // 1.
    vector<int> topKFrequent(vector<int>& nums, int k) {
        int n = nums.size();
        unordered_map<int, int> mp;
        for(auto v : nums) ++mp[v];
        vector<pair<int, int>> ve;
        for(auto [k, v] : mp) ve.push_back({v, k});
        sort(ve.begin(), ve.end());
        vector<int> res;
        n = ve.size();
        for(int i = n-1; i >= n-k; --i) res.push_back(ve[i].second);
        return res;
    }
    // 2.
    struct cless {
        bool operator()(const pair<int, int>& l, const pair<int, int>& r) {
            return l.second < r.second;
        }
    };
    vector<int> topKFrequent(vector<int>& nums, int k) {
        int len = nums.size();
        unordered_map<int, int> m;
        for(int i = 0; i < len; ++i) ++m[nums[i]];
        priority_queue<pair<int, int>, vector<pair<int, int>>, cless> pq;
        for(auto iter = m.begin(); iter != m.end(); ++iter) pq.push(*iter);
        vector<int> res(k);
        for(int i = 0; i < k; ++i) {
            res[i] = pq.top().first;
            pq.pop();
        }
        return res;
    }
};
// @lc code=end
```



```python3

```

