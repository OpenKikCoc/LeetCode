#  [316. 去除重复字母](https://leetcode-cn.com/problems/remove-duplicate-letters/)

## 题意



## 题解



```c++
class Solution {
public:
    string removeDuplicateLetters(string s) {
        string stk;
        unordered_map<char, bool> ins;
        unordered_map<char, int> last;
        for (int i = 0; i < s.size(); i ++ ) last[s[i]] = i;

        for (int i = 0; i < s.size(); i ++ ) {
            if (ins[s[i]]) continue;
            while (stk.size() && stk.back() > s[i] && last[stk.back()] > i) {
                ins[stk.back()] = false;
                stk.pop_back();
            }
            stk += s[i];
            ins[s[i]] = true;
        }

        return stk;
    }
};
```



```c++
class Solution {
public:
    string removeDuplicateLetters(string s) {
        string stk;
        size_t i = 0;
        for(size_t i = 0;i < s.size(); ++i) {
            if(stk.find(s[i]) != string::npos) continue;
            // 遇到一个新字符 如果比栈顶小 并且在新字符后面还有和栈顶一样的 就把栈顶的字符抛弃了
            while(!stk.empty() && stk.back() > s[i] && s.find(stk.back(), i) != string::npos) stk.pop_back();
            stk.push_back(s[i]);
        }
        return stk;
    }
};
```



```python3

```

