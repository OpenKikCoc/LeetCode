#  [395. 至少有K个重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-with-at-least-k-repeating-characters/)

## 题意



## 题解



```c++
class Solution {
public:
    int K;
    unordered_map<char, int> cnt;

    void add(char c, int & x, int & y) {
        if (!cnt[c]) x ++ ;
        cnt[c] ++ ;
        if (cnt[c] == K) y ++ ;
    }
    void del(char c, int & x, int & y) {
        if (cnt[c] == K) y -- ;
        cnt[c] -- ;
        if (!cnt[c]) x -- ;
    }
    int longestSubstring(string s, int k) {
        K = k;
        int res = 0;
        // 枚举应包含多少种字符
        for (int d = 1; d <= 26; ++ d ) {
            cnt.clear();
            // x: 字符种类数
            // y: 刚好出现 K 次的字符种类数
            for (int i = 0, j = 0, x = 0, y = 0; i < s.size(); ++ i ) {
                add(s[i], x, y);
                while (x > d) del(s[j ++ ], x, y);
                if (x == y) res = max(res, i - j + 1);
            }
        }
        return res;
    }
};
```



```python3

```

