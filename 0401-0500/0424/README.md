#  [424. 替换后的最长重复字符](https://leetcode.cn/problems/longest-repeating-character-replacement/)

## 题意



## 题解



```c++
class Solution {
public:
    int characterReplacement(string s, int k) {
        int res = 0;
        for (auto c = 'A'; c <= 'Z'; ++ c ) {
            for (int l = 0, r = 0, cnt = 0; r < s.size(); ++ r ) {
                if (s[r] == c) ++ cnt ;
                while (r - l + 1 - cnt > k) {
                    if (s[l] == c) -- cnt;
                    ++ l ;
                }
                res = max(res, r - l + 1);
            }
        }
        return res;
    }
};
```



```python
# (题解区的 题解不严谨，没有解释为什么)
# 更严谨的做法：1. 先枚举出现最多的字符是什么（枚举26个大写字母）；2. 后续的双指针就很好想到。
# 对于每一个指针r, 找到最靠左的指针l，使得这个区间内 不是c字符的次数 <= k; 整个过程只需要维护c的次数

class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        res = 0 
        for c in range(ord('A'), ord('Z') + 1):
            c = chr(c)
            l, r = 0, 0
            cnt = 0
            while r < len(s):
                if s[r] == c:
                    cnt += 1
                while r - l + 1 - cnt > k:
                    if s[l] == c:
                        cnt -= 1
                    l += 1
                res = max(res, r - l + 1)
                r += 1
        return res
```

