#   [768. 最多能完成排序的块 II](https://leetcode.cn/problems/max-chunks-to-make-sorted-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    // 考虑: 能分尽分
    // 1. 如果当前值 `v >= lastMax` 则 v 可以单独成块
    // 2. 如果当前值 `v < lastMax` 则需往前一直找到一个块
    //      使得 `v >= someMax` 合并其间所有块
    int maxChunksToSorted(vector<int>& arr) {
        stack<int> st;
        for (auto v : arr) {
            // 维护当前块的最大值
            int t = st.empty() ? 0 : st.top();
            while (st.size() && v < st.top())
                st.pop();
            st.push(max(t, v));
        }
        return st.size();
    }
};
```



```python3

```

