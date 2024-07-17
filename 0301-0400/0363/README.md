#  [363. 矩形区域不超过 K 的最大数值和](https://leetcode.cn/problems/max-sum-of-rectangle-no-larger-than-k/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> s;
    int get(int x1, int y1, int x2, int y2) {
        return s[x2][y2] - s[x1 - 1][y2] - s[x2][y1 - 1] + s[x1 - 1][y1 - 1];
    }
    int maxSumSubmatrix(vector<vector<int>>& matrix, int K) {
        int n = matrix.size(), m = matrix[0].size();
        s = vector<vector<int>>(n + 1, vector<int>(m + 1));
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + matrix[i - 1][j - 1];
        int res = INT_MIN;
        for (int l = 1; l <= m; ++ l )
            for (int r = l; r <= m; ++ r ) {
                set<int> S;
                S.insert(0);
                for (int k = 1; k <= n; ++ k ) {
                    int si = get(1, l, k, r);
                    // *it 得到【当前固定左右边界时】的某前缀和的值
                    auto it = S.lower_bound(si - K);
                    if (it != S.end()) res = max(res, si - *it);
                    S.insert(si);
                }
            }
        return res;
    }
};
```



```python3

```

