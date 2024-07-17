#  [42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)

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

进一步的，前面做法本质是求每行（横向）累积的雨水。

实际上可以通过记录某位置两侧分别最大的高度，来直接累积每列（纵向）累积的雨水。

分别记录的过程可以双指针优化：

```c++
class Solution {
public:
    int trap(vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int lmax = 0, rmax = 0, res = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] > lmax)
                    lmax = height[l ++ ];
                else
                    res += lmax - height[l ++ ];
            } else {
                if (height[r] > rmax)
                    rmax = height[r -- ];
                else
                    res += rmax - height[r -- ];
            }
        }
        return res;
    }
};
```



```python
# 维护一个【单调递减栈】
#处理当前数时，需要把栈里小于或者等于它的数值都弹出去
#高度：栈顶元素和上一个元素的高度差；宽度：是1
#宽度：当前柱子的左边界到下一个柱子的右边界


class Solution:
    def trap(self, h: List[int]) -> int:
        stack = []  # 栈里存储的是下标
        res = 0; n = len(h)
        for i in range(n):
            while stack and h[stack[-1]] < h[i]:
                t = stack.pop()
                if stack:
                    res += (min(h[i], h[stack[-1]]) - h[t]) * (i - stack[-1] - 1)
            stack.append(i)
        return res
```

