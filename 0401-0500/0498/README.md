#  [498. 对角线遍历](https://leetcode-cn.com/problems/diagonal-traverse/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> findDiagonalOrder(vector<vector<int>>& w) {
        vector<int> res;
        if (w.empty() || w[0].empty()) return res;
        int n = w.size(), m = w[0].size();
        for (int i = 0; i < n + m -1; ++ i ) {
            if (i % 2 == 0)
                for (int j = min(i, n - 1); j >= max(0, 1 - m + i); -- j )
                    res.push_back(w[j][i - j]);
            else
                for (int j = max(0, 1 - m + i); j <= min(i, n - 1); ++ j )
                    res.push_back(w[j][i - j]);
        }
        return res;
    }
};
```



```python3

```

