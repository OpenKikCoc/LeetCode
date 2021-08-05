#  [125. 验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)

## 题意



## 题解



```c++
class Solution {
public:
    bool check(char c) {
        return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9';
    }

    bool isPalindrome(string s) {
        for (int i = 0, j = s.size() - 1; i < j; i ++, j -- ) {
            while (i < j && !check(s[i])) i ++ ;
            while (i < j && !check(s[j])) j -- ;
            if (i < j && tolower(s[i]) != tolower(s[j])) return false;
        }

        return true;
    }
};



// old code
class Solution {
public:
    bool isPalindrome(string s) {
        string ss;
        for (auto c : s) {
            if (isdigit(c)) ss.push_back(c);
            else if (isalpha(c)) ss.push_back(tolower(c));
        }
        int n = ss.size();
        if (!n) return true;
        for (int i = 0; i <= n / 2; ++ i )
            if (ss[i] != ss[n - 1 - i]) return false;
        return true;
    }
};
```



```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        def check(c):
            return c >= 'a' and c <= 'z' or c >= 'A' and c <= 'Z' or c >= '0' and c <= '9'
        l, r = 0, len(s) - 1
        while l < r:
            while l < r and not check(s[l]):
                l += 1
            while l < r and not check(s[r]):
                r -= 1
            if l < r and s[l].lower() != s[r].lower():
                return False 
            l += 1
            r -= 1
        return True

# class Solution:
#     def isPalindrome(self, s: str) -> bool:
#         i, j = 0, len(s) - 1
#         while i < j:
#             while i < j and not s[i].isalnum():  #  isalnum() 方法检测字符串是否由字母和数字组成
#                 i += 1
#             while i < j and not s[j].isalnum(): 
#                 j -= 1
#             if i < j:
#                 if s[i].upper() != s[j].upper():
#                     return False
#                 else:
#                     i += 1
#                     j -= 1 
#         return True
```

