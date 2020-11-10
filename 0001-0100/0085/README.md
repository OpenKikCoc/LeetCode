#  [85. 最大矩形](https://leetcode-cn.com/problems/maximal-rectangle/)

## 题意



## 题解



```c++
class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        int m = matrix.size();
        if(!m) return 0;
        int n = matrix[0].size();
        vector<int> h(n+1); // 默认h[n] = 0;
        int res = 0;
        for(int i = 0; i < m; ++i) {
            for(int j = 0; j < n; ++j)
                h[j] = matrix[i][j] == '1' ? h[j]+1 : 0;
            res = max(res, maxArea(h, n));
        }
        return res;
    }
    int maxArea(vector<int>& h, int n) {
        int res = 0;
        stack<int> s;
        for(int i = 0; i <= n; ++i) {
            while(!s.empty() && h[s.top()] >= h[i]) {
                int l = s.top(); s.pop();
                res = max(res, h[l] * (s.empty() ? i : i-s.top()-1));
            }
            s.push(i);
        }
        return res;
    }
};
```



```python3

```

