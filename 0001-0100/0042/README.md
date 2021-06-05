#  [42. 接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)

## 题意



## 题解



```c++
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size(), res = 0;
        stack<int> s;
        for(int i = 0; i < n; ++i) {
            while(!s.empty() && height[s.top()] < height[i]) {
                int v = s.top(); s.pop();
                if(s.empty()) break;
                int l = s.top();
                res += (min(height[s.top()], height[i]) - height[v]) * (i-l-1);
            }
            s.push(i);
        }
        return res;
    }
};
```

```c++
// 考虑某个位置作为最低点可以接的雨水，受到左右两侧第一个比它高的高度的限制
// 维护单调递减栈，每次考虑顶部元素
// 则当前【h[i]与新的顶部】即为左右两侧第一个比它高的高度，直接计数即可
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size(), res = 0;
        stack<int> st;
        for (int i = 0; i < n; ++ i ) {
            while (st.size() && height[st.top()] < height[i]) {
                int t = st.top(); st.pop();
                if (st.size()) {
                    res += (min(height[i], height[st.top()]) - height[t]) * (i - st.top() - 1);
                }
            }
            st.push(i);
        }
        return res;
    }
};
```





```python3

```

