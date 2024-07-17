#  [387. 字符串中的第一个唯一字符](https://leetcode.cn/problems/first-unique-character-in-a-string/)

## 题意



## 题解



```c++
class Solution {
public:
    int firstUniqChar(string s) {
        unordered_map<char, int> hash;
        for (auto c: s) hash[c] ++ ;
        for (int i = 0; i < s.size(); i ++ )
            if (hash[s[i]] == 1)
                return i;
        return -1;
    }
};
```



```python3

```

