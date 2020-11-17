#  [387. 字符串中的第一个唯一字符](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

## 题意



## 题解



```c++
class Solution {
public:
    int firstUniqChar(string s) {
        unordered_map<char, int> m;
        int n = s.size();
        for(int i = 0; i < n; ++i) {
            if(!m[s[i]]) m[s[i]] = i+1;
            else m[s[i]] = -1;
        }
        for(int i = 0; i < n; ++i)
            if(m[s[i]] > 0) return m[s[i]]-1;
        
        return -1;
    }
};
```



```python3

```

