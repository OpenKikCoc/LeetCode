#  [42. 接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)

## 题意



## 题解


```c++
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        stack<int> st;
        int res = 0;
        for (int i = 0; i < n; ++ i ) {
            while (st.size() && height[st.top()] <= height[i]) {
                int t = st.top(); st.pop();
                if (st.size()) {
                    int l = st.top();
                    res += (min(height[i], height[l]) - height[t]) * (i - l - 1);
                }
            }
            st.push(i);
        }
        return res;
    }
};
```

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





```python
#这不是一道典型的单调栈的应用题，和单调栈一般的用法关系不大
#用单调栈的思想，比较难构想和模拟
#更好的写法是双指针，但是这道题用单调栈的思路可以帮忙熟悉单调栈的用法，对以后的写单调栈类型的题有帮助的哦 

#处理当前数时，需要把栈里小于或者等于它的数值都弹出去
#高度：栈顶元素和上一个元素的高度差；宽度：是1
#宽度：当前柱子的左边界到下一个柱子的右边界


class Solution:
    def trap(self, h: List[int]) -> int:
        stack = []  # 栈里存储的是下标
        res = 0; n = len(h)
        for i in range(n):
            last = 0
            while stack and h[stack[-1]] <= h[i]:
                res += (h[stack[-1]] - last) * (i - stack[-1] - 1)
                last = h[stack[-1]]
                stack.pop()
            if stack:
                res += (h[i] - last) * (i - stack[-1] - 1)
            stack.append(i)
        return res   
```

