#  [347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)

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



```python
# 法一：1. 用哈希表统计每个元素出现的次数； 2. 原地建堆，取前k个； 
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        my_cnt = collections.Counter(nums)
        q = []
        for key, v in my_cnt.items():
            heapq.heappush(q, (-v ,key))   #  堆的元素可以是元组/列表 类型; 小根堆 所以 取负数
        res = []
        for _ in range(k):
            res.append(heapq.heappop(q)[1])
        return res
```

