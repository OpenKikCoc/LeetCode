#  [632. 最小区间](https://leetcode.cn/problems/smallest-range-covering-elements-from-k-lists/)

## 题意



## 题解



```c++
class Solution {
public:
    // 显然 答案区间必然是出现在列表中的值
    // K 路归并
    typedef vector<int> VI;
    vector<int> smallestRange(vector<vector<int>>& nums) {
        // 包含所有排列
        priority_queue<VI, vector<VI>, greater<VI>> heap;
        int maxv = INT_MIN;
        for (int i = 0; i < nums.size(); ++ i ) {
            heap.push({nums[i][0], i, 0});
            maxv = max(maxv, nums[i][0]);
        }

        VI res;
        while (heap.size()) {
            auto t = heap.top(); heap.pop();
            int l = t[0], r = maxv;
            if (res.empty() || res[1] - res[0] > r - l)
                res = {l, r};
            int i = t[1], j = t[2] + 1;
            if (j < nums[i].size()) {
                heap.push({nums[i][j], i, j});
                maxv = max(maxv, nums[i][j]);
            } else break;
        }
        return res;
    }
};
```



```python3

```

