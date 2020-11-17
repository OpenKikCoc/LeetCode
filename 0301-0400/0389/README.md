#  [389. 找不同](https://leetcode-cn.com/problems/find-the-difference/)

## 题意



## 题解



```c++
class Solution {
public:
    char findTheDifference(string s, string t) {
        int x = 0;
        for (auto c: s) x ^= c;
        for (auto c: t) x ^= c;
        return x;
    }
    char findTheDifference_2(string s, string t) {
        sort(s.begin(), s.end());
        sort(t.begin(), t.end());
        int n1 = s.size(), n2 = t.size();
        for(int i = 0; i < n1; ++i) {
            if(s[i] != t[i]) return t[i];
        }
        return t[n2-1];
    }
};
```



```python3

```

