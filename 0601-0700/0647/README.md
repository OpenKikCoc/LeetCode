#  [647. 回文子串](https://leetcode.cn/problems/palindromic-substrings/)

## 题意



## 题解



```c++
class Solution {
public:

    int countSubstrings(string s) {
        string ms = "$#";
        for (auto c : s) ms.push_back(c), ms.push_back('#');

        int n = ms.size();
        vector<int> mp(n);
        int id = 0, mx = 0, maxid = 0;
        int res = 0;
        for (int i = 1; i < n; ++ i ) {
            mp[i] = i < mx ? min(mp[2 * id - i], mx - i) : 1;
            while (ms[i + mp[i]] == ms[i - mp[i]]) ++ mp[i];
            if (i + mp[i] > mx) {
                mx = i + mp[i];
                id = i;
            }
            // diff
            res += mp[i] / 2;
        }
        return res;
    }

    int countSubstrings_2(string s) {
        int n = s.size();
        vector<vector<bool>> f(n + 1, vector<bool>(n + 1));

        int res = n;
        for (int i = 1; i <= n; ++ i ) f[i][i] = 1;
        for (int len = 2; len <= n; ++ len )
            for (int l = 1; l + len - 1 <= n; ++ l ) {
                int r = l + len - 1;
                if (s[l - 1] == s[r - 1] && (l + 1 > r - 1 || f[l + 1][r - 1]))
                    f[l][r] = 1;
                res += f[l][r];
            }
        return res;
    }
};
```



```python
class Solution:
    def countSubstrings(self, s: str) -> int:
        self.res = 0 
        n = len(s)

        def dfs(i, j):
            while i >= 0 and j < n and s[i] == s[j]:
                self.res += 1 
                i -= 1 
                j += 1 
            
        for i in range(n):
            dfs(i, i)
            dfs(i, i + 1)
        return self.res

        
```

