#  [151. 翻转字符串里的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

## 题意



## 题解



```c++
class Solution {
public:
    string reverseWords(string s) {
        stringstream ss(s);
        string str, res;
        stack<string> st;
        while(ss >> str)
            st.push(str);
        while(!st.empty()) {
            res += st.top() + " ";
            st.pop();
        }
        if(res.size()) res.pop_back();
        return res;
    }
};
```



```python3

```

