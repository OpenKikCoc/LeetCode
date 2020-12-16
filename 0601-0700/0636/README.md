#  [636. 函数的独占时间](https://leetcode-cn.com/problems/exclusive-time-of-functions/)

## 题意



## 题解



```c++
class Solution {
public:
    // 是时间 不是时刻
    vector<int> exclusiveTime(int n, vector<string>& logs) {
        vector<int> res(n);
        stack<int> st;
        int last;
        for (auto & log : logs) {
            int x = log.find(':'), y = log.substr(x + 1).find(':') + x + 1;
            int id = stoi(log.substr(0, x)), ts = stoi(log.substr(y + 1));
            if (log[x + 1] == 's') {
                if (st.size()) res[st.top()] += ts - last;
                st.push(id);
                last = ts;
            } else {
                // 对于同一个数 开始的时候是作为后一段 结束的时候作为前一段
                res[st.top()] += ts - last + 1;
                st.pop();
                last = ts + 1;
            }
        }
        return res;
    }
};
```



```python3

```

