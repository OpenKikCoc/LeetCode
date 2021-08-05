#  [84. 柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)

## 题意



## 题解



```c++
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        heights.insert(heights.begin(), 0);
        heights.push_back(0);
        int n = heights.size(), res = 0;
        stack<int> st;
        for (int i = 0; i < n; ++ i ) {
            while (st.size() && heights[st.top()] > heights[i]) {
                int t = st.top(); st.pop();
                res = max(res, heights[t] * (i - st.top() - 1));
            }
            st.push(i);
        }
        return res;
    }
};
```

```c++
// 考虑某个位置作为最高点的矩形面积，受到左右两侧第一个比它低的高度的限制
// 维护单调递增栈，每次考虑顶部元素
// 则当前【h[i]与新的顶部】即为左右两侧第一个比它高的高度，直接计数即可
// TRICK 在末尾加入0方便处理case
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        heights.push_back(0);
        int n = heights.size(), res = 0;
        stack<int> st;
        for (int i = 0; i < n; ++ i ) {
            while (st.size() && heights[st.top()] > heights[i]) {
                int t = st.top(); st.pop();
                if (st.empty())
                    res = max(res, heights[t] * (i - (-1) - 1));
                else
                    res = max(res, heights[t] * (i - st.top() - 1));
            }
            st.push(i);
        }
        return res;
    }
};

// TRICK 在起始也加入0简化判断逻辑
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        heights.insert(heights.begin(), 0);
        heights.push_back(0);
        int n = heights.size(), res = 0;
        stack<int> st;
        for (int i = 0; i < n; ++ i ) {
            while (st.size() && heights[st.top()] > heights[i]) {
                int t = st.top(); st.pop();
                res = max(res, heights[t] * (i - st.top() - 1));
            }
            st.push(i);
        }
        return res;
    }
};
```



```python3

```

