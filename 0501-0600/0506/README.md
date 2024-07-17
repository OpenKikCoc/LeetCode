#  [506. 相对名次](https://leetcode.cn/problems/relative-ranks/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> findRelativeRanks(vector<int>& nums) {
        vector<pair<int, int>> q;
        for (int i = 0; i < nums.size(); ++ i ) q.push_back({nums[i], i});
        sort(q.begin(), q.end(), greater<pair<int, int>>());
        vector<string> res(q.size());
        for (int i = 0; i < q.size(); ++ i ) {
            int k = q[i].second;
            if (i == 0) res[k] = "Gold Medal";
            else if (i == 1) res[k] = "Silver Medal";
            else if (i == 2) res[k] = "Bronze Medal";
            else res[k] = to_string(i + 1);
        }
        return res;
    }
};
```



```python3

```

