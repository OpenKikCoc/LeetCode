#  [395. 至少有K个重复字符的最长子串](https://leetcode.cn/problems/longest-substring-with-at-least-k-repeating-characters/)

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



```python
# r往后走的时候，l有可能往前走，这个不满足单调性，所以直接做 不单调
# 不单调怎么办，我们考虑枚举一些条件，使得变得单调
# ！！！精髓：枚举 区间中最多包含的不同字符的数量。 不同的字符 只有26个，所以枚举26次就可以了。
# 在扫描的时候，最多包含的字符的数量就确定了，比如k个。l一定是离r越远越好，那肯定某种字符的数量更多。对于每个终点r, 需要找到一个最左边的l使得[l,r]之前最多包含k个字符。（这个过程 就有单调性了）
# 维护：不同字符的数量，满足要求的字符数量。（用哈希表来维护）

import collections
class Solution:   
    def longestSubstring(self, s: str, k: int) -> int:
        max_len = 0
        for num in range(1, 27): # 枚举子串包含多少个不同的字符
            cnt = collections.defaultdict(int)
            l = 0
            for r in range(len(s)):
                cnt[s[r]] += 1
                while len(cnt) > num: # 移动左指针，找最长的合法区间
                    cnt[s[l]] -= 1
                    if cnt[s[l]] == 0:
                        del cnt[s[l]]
                    l += 1
                if len(cnt) == num:#此时区间有l个不同的字符，判断是否满足每个字符都至少出现k次
                    valid = True
                    for c in cnt:
                        if cnt[c] < k:
                            valid = False
                    if valid:
                        max_len = max(max_len, r - l + 1)
        return max_len
```

