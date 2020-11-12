#  [214. 最短回文串](https://leetcode-cn.com/problems/shortest-palindrome/)

## 题意



## 题解



```c++
class Solution {
public:
    int lp;
    vector<int> f;
    int getNext(string& p) {
        lp = p.size();
        f.push_back(0); f.push_back(0);
        for(int i = 1; i < lp; ++i) {
            int j = f[i];
            while(j && p[i] != p[j]) j = f[j];
            if(p[i] == p[j]) f.push_back(j+1);
            else f.push_back(0);
        }
        return f[lp];
    }
    string shortestPalindrome(string s) {
        int n = s.size();
        string ns(s.rbegin(), s.rend());
        ns = s + '#' + ns;
        int coml = getNext(ns);
        string res;
        for(int i = n-1; i >= coml; --i) res.push_back(s[i]);
        res += s;
        return res;
    }
};
```



```python3

```

