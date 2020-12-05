#  [567. 字符串的排列](https://leetcode-cn.com/problems/permutation-in-string/)

## 题意



## 题解



```c++
class Solution {
public:
    unordered_map<char, int> need, has;

    bool check(char c) {
        return need.count(c) && has[c] == need[c];
    }

    bool checkInclusion(string s1, string s2) {
        for (auto c : s1) ++ need[c];
        for (int r = 0, l = 0, cnt = 0; r < s2.size(); ++ r ) {
            if (check(s2[r])) -- cnt;
            ++ has[s2[r]];
            if (check(s2[r])) ++ cnt;
            while (l <= r - int(s1.size())) {
                if (check(s2[l])) -- cnt;
                -- has[s2[l]];
                if (check(s2[l])) ++ cnt;
                ++ l;
            }
            if (cnt == need.size()) return true;
        }
        return false;
    }
};
```



```python3

```

