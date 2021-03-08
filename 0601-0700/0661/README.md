#  [661. 图片平滑器](https://leetcode-cn.com/problems/image-smoother/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> imageSmoother(vector<vector<int>>& M) {
        int n = M.size(), m = M[0].size();
        vector<vector<int>> res = M;
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ ) {
                int s = 0, c = 0;
                for (int x = i - 1; x <= i + 1; x ++ )
                    for (int y = j - 1; y <= j + 1; y ++ )
                        if (x >= 0 && x < n && y >= 0 && y < m)
                            s += M[x][y], c ++ ;
                res[i][j] = s / c;
            }
        return res;
    }
};
```



```python3

```

