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



```python
# 单调栈
class Solution:
    def dailyTemperatures(self, T: List[int]) -> List[int]:
        n=len(T)
        res=[0]*n
        stack=[]
        for i in range(n):
            while stack and T[stack[-1]]<T[i]:
                res[stack[-1]]=i-stack[-1]
                stack.pop()
            stack.append(i)
        return res
```

