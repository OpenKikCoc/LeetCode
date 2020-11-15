#  [373. 查找和最小的K对数字](https://leetcode-cn.com/problems/find-k-pairs-with-smallest-sums/)

## 题意



## 题解



```c++
class Solution {
public:
    typedef tuple<int, int, int> tpi3;
    vector<vector<int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2, int k) {
        if (nums1.empty() || nums2.empty()) return {};
        int n = nums1.size(), m = nums2.size();
        priority_queue<tpi3, vector<tpi3>, greater<tpi3>> heap;
        for (int i = 0; i < m; ++ i )
            heap.push({nums2[i] + nums1[0], 0, i});
        vector<vector<int>> res;
        while (k -- && heap.size()) {
            auto [v, p1, p2] = heap.top(); heap.pop();
            res.push_back({nums1[p1], nums2[p2]});
            if (p1 + 1 < n)
                heap.push({nums1[p1 + 1] + nums2[p2], p1 + 1, p2});
        }
        return res;
    }
};

// tuple 也可以直接用 vector
// yxc
class Solution {
public:
    typedef vector<int> VI;
    vector<vector<int>> kSmallestPairs(vector<int>& a, vector<int>& b, int k) {
        if (a.empty() || b.empty()) return {};
        int n = a.size(), m = b.size();
        priority_queue<VI, vector<VI>, greater<VI>> heap;
        for (int i = 0; i < m; i ++ ) heap.push({b[i] + a[0], 0, i});
        vector<VI> res;
        while (k -- && heap.size()) {
            auto t = heap.top();
            heap.pop();
            res.push_back({a[t[1]], b[t[2]]});
            if (t[1] + 1 < n)
                heap.push({a[t[1] + 1] + b[t[2]], t[1] + 1, t[2]});
        }
        return res;
    }
};
```



```python3

```

