#  [242. 有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isAnagram(string s, string t) {
        int l1 = s.size(), l2 = t.size();
        if (l1 != l2) return false;
        vector<int> cnt(26);
        for (int i = 0; i < l1; ++ i ) {
            ++ cnt[s[i] - 'a'];
            -- cnt[t[i] - 'a'];
        }
        for (int i = 0; i < 26; ++ i )
            if (cnt[i])
                return false;
        return true;
    }
};
```

```c++
class Solution {
public:
    bool isAnagram(string s, string t) {
        unordered_map<char, int> a, b;
        for (auto c: s) a[c] ++ ;
        for (auto c: t) b[c] ++ ;
        return a == b;
    }
};
```



```python3

```

