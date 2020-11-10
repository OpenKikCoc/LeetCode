#  [84. 柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

## 题意



## 题解



```c++
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        heights.push_back(0);
        int n = heights.size();
        int res = 0;
        stack<int> s;
        for(int i = 0; i < n; ++i) {
            while(!s.empty() && heights[s.top()] >= heights[i]) {
                int l = s.top(); s.pop();
                res = max(res, heights[l] * (s.empty() ? i : i-s.top()-1));
            }
            s.push(i);
        }
        return res;
    }
};
```



```python3

```

