#  [739. 每日温度](https://leetcode-cn.com/problems/daily-temperatures/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& T) {
        int n = T.size();
        vector<int> res(n);
        stack<int> st;
        for (int i = 0; i < n; ++ i ) {
            while (st.size() && T[st.top()] < T[i]) {
                res[st.top()] = i - st.top();
                st.pop();
            }
            st.push(i);
        }
        return res;
    }
};
```



```python3

```

