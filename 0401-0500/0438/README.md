#  [438. 找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> res;
        unordered_map<char, int> need;
        for (auto c : p) ++ need[c];
        int size = need.size();
        for (int l = 0, r = 0, tot = 0; r < s.size(); ++ r ) {
            if ( -- need[s[r]] == 0) ++ tot;
            while (l <= r && need[s[l]] < 0) ++ need[s[l ++ ]];
            if (size == tot && r - l + 1 == p.size()) res.push_back(l);
        }
        return res;
    }

    vector<int> findAnagrams_1(string s, string p) {
        vector<int> res;
        unordered_map<char, int> need;
        for (auto c : p) ++ need[c];
        int size = need.size();
        for (int l = 0, r = 0, tot = 0; r < s.size(); ++ r ) {
            if ( -- need[s[r]] == 0) ++ tot;
            while (r - l + 1 > p.size()) {
                if (need[s[l]] == 0) -- tot;
                ++ need[s[l ++ ]];
            }
            if (tot == size) res.push_back(l);
        }
        return res;
    }

    vector<int> findAnagrams_2(string s, string p) {
        vector<int> res;
        unordered_map<char, int> need, cnt;
        for (auto c : p) ++ need[c];

        for (int l = 0, r = 0; r < s.size(); ++ r ) {
            ++ cnt[s[r]];
            while (l <= r && cnt[s[l]] > need[s[l]]) -- cnt[s[l ++ ]];
            if (cnt == need && r - l + 1 == p.size()) res.push_back(l);
        }
        return res;
    }
};
```



```python3

```

