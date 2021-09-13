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



```python
#方法：枚举所有柱形的上边界，作为整个矩形的上边界。
#然后找出左右边界：1. 找出左边离它最近的并且比它小的柱形；2.找出右边离它最近并且比它小的柱形。
#这就是要找“在一个数组中，每个数的左边第一个比它小/大的数”，于是可以想到用单调栈来解决这类问题。

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        n=len(heights)
        left,right=[0]*n,[0]*n
        #栈里保存的是元素下标
        stack=[]
        res=0
        for i in range(n):
            while stack and heights[stack[-1]]>=heights[i]:
                stack.pop()
            if not stack:
                left[i]=-1
            else:
                left[i]=stack[-1]
            stack.append(i)
        while len(stack) > 0: stack.pop() # 先清空单调栈
        #stack.clear()
        for i in range(n-1,-1,-1):
            while stack and heights[stack[-1]]>=heights[i]:
                stack.pop()
            if not stack:
                #右边界的下一个位置    
                right[i]=n
            else:
                right[i]=stack[-1]
            stack.append(i)
        #更新答案：
        for i in range(n):
            res=max(res,heights[i]*(right[i]-left[i]-1))
        return res
      
```

