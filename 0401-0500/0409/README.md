#  [409. 最长回文串](https://leetcode-cn.com/problems/longest-palindrome/)

## 题意



## 题解



```c++
class Solution {
public:
    int longestPalindrome(string s) {
        unordered_map<char, int> hash;
        for (auto c: s) hash[c] ++ ;
        int res = 0;
        for (auto [a, k]: hash) res += k / 2 * 2;
        if (res < s.size()) res ++ ;
        return res;
    }
    
    int longestPalindrome_2(string s) {
        unordered_map<char, int> m;
        int len = s.size(), res = 0;
        for(int i = 0; i < len; ++i) {
            ++m[s[i]];
        }
        bool sig = false;
        for(unordered_map<char, int>::iterator it = m.begin(); it != m.end(); ++it) {
            if(it->second & 1) {
                sig = true;
                --it->second;
            }
            res += it->second;
        }
        if(sig) ++res;
        return res;
    }
};
```



```python3

```

