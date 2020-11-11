#  [125. 验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isPalindrome(string s) {
        string ss;
        for(auto c : s) {
            if(isdigit(c)) ss.push_back(c);
            else if(isalpha(c)) ss.push_back(tolower(c));
        }
        int n = ss.size();
        if(!n) return true;
        for(int i = 0; i <= n/2; ++i)
            if(ss[i] != ss[n-1-i]) return false;
        return true;
    }
};
```



```python3

```

