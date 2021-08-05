#  [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

## 题意



## 题解



```c++
class Solution {
public:
    string longestPalindrome(string s) {
        string ns = "$#";
        for (auto & c : s) {
            ns.push_back(c);
            ns.push_back('#');
        }
        int l = ns.size(), id = 0, mx = 0, maxidx = 0;
        vector<int> mp(l);
        for (int i = 1; i < l; ++ i ) {
            mp[i] = mx > i ? min(mp[2 * id - i], mx - i) : 1;
            while (ns[i - mp[i]] == ns[i + mp[i]]) ++ mp[i];
            if (i + mp[i] > mx) id = i, mx = i + mp[i];
            if (mp[i] > mp[maxidx]) maxidx = i;
        }
        string res;
        for (int i = maxidx - mp[maxidx] + 1; i <= maxidx + mp[maxidx] - 1; ++ i )
            if (ns[i] != '#') res.push_back(ns[i]);
        return res;
    }
};
```



```python
# 把每个字母当成回文串的中心;这里要考虑两种情况，回文串的长度为奇数或者偶数情况。

class Solution:
    def longestPalindrome(self, s: str) -> str:
        self.res = ''
        n = len(s)

        def dfs(i, j):
            while i >= 0 and j < n and s[i] == s[j]:
                i -= 1
                j += 1
            self.res = max(self.res, s[i+1:j], key = len)
            
				# 注意：这样写 会timeout：只有其对应的两个位值的字符相等才会使 i j 发生改变，那么 如果 s[i] != s[j] ，是不是就会一直卡死在while循环出不去了呀
        #def dfs(i, j):
        #    while i >= 0 and j < n:
        #        if s[i] == s[j]:
        #            i -= 1
        #            j += 1
        #    self.res = max(self.res, s[i+1:j], key = len)
        
        for i in range(n):
            dfs(i, i)
            dfs(i, i + 1)
        return self.res
```

