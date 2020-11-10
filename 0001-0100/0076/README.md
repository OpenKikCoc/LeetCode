#  [76. 最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)

## 题意



## 题解



```c++
class Solution {
public:
    string minWindow(string s, string t) {
        unordered_map<char, int> hs, ht;
        for(auto & c : t) ++ht[c];

        int cnt = 0;
        string res;
        for(int i = 0, j = 0; i < s.size(); ++i) {
            ++hs[s[i]];
            if(hs[s[i]] <= ht[s[i]]) ++cnt;

            while(hs[s[j]] > ht[s[j]]) --hs[s[j++]];

            if(cnt == t.size()) {
                if(res.empty() || i - j + 1 < res.size())
                    res = s.substr(j, i - j + 1);
            }
        }
        return res;
    }
};


class Solution {
public:
    string minWindow(string s, string t) {
        vector<int> cnt(128);
        for(auto c : t) ++cnt[c];
        int l = 0, r = 0, start = 0, len = INT_MAX, remain = t.size(), n = s.size();
        while(r < n) {
            while(r < n && (cnt[s[r++]]-- <= 0 || --remain != 0));
            while(++cnt[s[l++]] <= 0);
            if(remain++ == 0 && r - l < len) start = l, len = r-l;
        }
        return len == INT_MAX ? "" : s.substr(start-1, len+1);
    }
};
```



```python3

```

