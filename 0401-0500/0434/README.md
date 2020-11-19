#  [434. 字符串中的单词数](https://leetcode-cn.com/problems/number-of-segments-in-a-string/)

## 题意



## 题解



```c++
class Solution {
public:
    int countSegments(string s) {
        stringstream ss(s);
        int res = 0;
        while (ss >> s) ++ res;
        return res;
    }
};
```



```python3

```

