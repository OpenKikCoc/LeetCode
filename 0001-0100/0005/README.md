#  [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

## 题意



## 题解



```c++
class Solution {
public:
    string longestPalindrome(string s) {
        string ns = "$#";
        for(auto & c : s) {
            ns.push_back(c);
            ns.push_back('#');
        }
        int l = ns.size(), id = 0, mx = 0, maxidx = 0;
        vector<int> mp(l);
        for(int i = 1; i < l; ++i) {
            mp[i] = mx > i ? min(mp[2*id-i], mx-i) : 1;
            while(ns[i-mp[i]] == ns[i+mp[i]]) ++mp[i];
            if(i + mp[i] > mx) id = i, mx = i+mp[i];
            if(mp[i] > mp[maxidx]) maxidx = i;
        }
        string res;
        for(int i = maxidx-mp[maxidx]+1; i <= maxidx+mp[maxidx]-1; ++i)
            if(ns[i] != '#') res.push_back(ns[i]);
        return res;
    }
};
```



```python3

```

