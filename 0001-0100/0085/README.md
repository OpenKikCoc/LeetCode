#  [85. 最大矩形](https://leetcode-cn.com/problems/maximal-rectangle/)

## 题意



## 题解



```c++
class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        int m = matrix.size();
        if (!m) return 0;
        int n = matrix[0].size();
        vector<int> h(n + 1); // 默认h[n] = 0;
        int res = 0;
        for (int i = 0; i < m; ++ i ) {
            for (int j = 0; j < n; ++ j )
                h[j] = matrix[i][j] == '1' ? h[j] + 1 : 0;
            res = max(res, maxArea(h, n));
        }
        return res;
    }
    int maxArea(vector<int>& h, int n) {
        int res = 0;
        stack<int> s;
        for (int i = 0; i <= n; ++ i ) {
            while (!s.empty() && h[s.top()] >= h[i]) {
                int l = s.top(); s.pop();
                res = max(res, h[l] * (s.empty() ? i : i - s.top() - 1));
            }
            s.push(i);
        }
        return res;
    }
};
```



```python
"""
1. 将 Largest Rectangle in Histogram 问题扩展到二维。
2. 一行一行考虑，类比 Largest Rectangle in Histogram，一行内所有柱形条的高度 heights 就是当前 (i, j) 位置能往上延伸的最大高度。
3. 直接套用 Largest Rectangle in Histogram 的单调栈算法即可。

枚举每一行的时间复杂度是 O(n)O(n)，行内单调栈的时间复杂度是 O(m)O(m)，故总时间复杂度为 $O(nm)
"""
class Solution:
    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        # the same as 84.
        if not matrix or not matrix[0]: return 0
        res, n = 0, len(matrix[0])
        heights = [0] * (n + 1)
        for row in matrix:
            for i in range(n):
                if row[i] == "1":
                    heights[i] += 1
                else:
                    heights[i] = 0
            stack = [-1]
            for i in range(len(heights)):
                while stack and heights[i] < heights[stack[-1]]:
                    res = max(res, heights[stack.pop()] * (i - stack[-1] - 1)) # height x width
                stack.append(i)
        return res
```

