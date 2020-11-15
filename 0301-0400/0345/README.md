#  [345. 反转字符串中的元音字母](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/)

## 题意



## 题解



```c++
class Solution {
public:
    bool checkc(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' || c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U';
    }
    string reverseVowels(string s) {
        int n = s.size();
        int l = 0, r = n-1;
        while(l < r) {
            while(l < r && !checkc(s[l])) ++l;
            if(l >= r) break;
            while(l < r && !checkc(s[r])) --r;
            if(l >= r) break;
            swap(s[l], s[r]);
            ++l, --r;
        }
        return s;
    }
};
```



```python3

```

