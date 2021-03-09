#  [696. 计数二进制子串](https://leetcode-cn.com/problems/count-binary-substrings/)

## 题意



## 题解



```c++
class Solution {
public:
    int countBinarySubstrings(string s) {
        int res = 0, last = 0;
        for (int i = 0; i < s.size(); i ++ ) {
            int j = i + 1;
            while (j < s.size() && s[j] == s[i]) j ++ ;
            int cur = j - i;
            i = j - 1;
            res += min(last, cur);
            last = cur;
        }
        return res;
    }
};
```



```python3

```

