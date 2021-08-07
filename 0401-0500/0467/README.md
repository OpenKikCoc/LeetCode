#  [467. 环绕字符串中唯一的子字符串](https://leetcode-cn.com/problems/unique-substrings-in-wraparound-string/)

## 题意



## 题解



```c++
class Solution {
public:
    int findSubstringInWraproundString(string p) {
        // 本质求 p 中有多少个不同子串 使得子串是连续字符
        unordered_map<char, int> cnt;
        for (int i = 0; i < p.size();) {
            int j = i + 1;
            // 相连 一直向右
            while (j < p.size() && (p[j] - p[j - 1] == 1 || p[j] == 'a' && p[j - 1] == 'z')) ++ j ;
            while (i < j) cnt[p[i]] = max(cnt[p[i]], j - i), ++ i ;
        }
        int res = 0;
        for (auto [k, v] : cnt) res += v;
        return res;
    }
};
```



```python3

```

