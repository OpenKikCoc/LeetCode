#  [567. 字符串的排列](https://leetcode.cn/problems/permutation-in-string/)

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



```python
# 用哈希表统计s1中字符出现的次数，用size表示字符种类；
# 在s2中 固定s1字符数量 即为 窗口大小，遍历s2中的字符，同时也用一个哈希表维护s2中字符出现的次数。最后判断 s2中字符次数 满足 s1字符次数的 个数 是否和 size相等 即可。

import collections
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        def check(c):
            if hs1[c] == hs2[c]: # 如果c在hs1中不存在，也会自动创建使得hs1[c] == 0，这样会让种类变多。
                return True
            return False
            
        hs1, hs2 = collections.defaultdict(int), collections.defaultdict(int)
        for c in s1:
            hs1[c] += 1
        size = len(hs1) # size表示有多少种字符，防止后续比较的时候hs1里的种类发生变化！
        l, cnt = 0, 0 # cnt表示 窗口内当前字符的个数 和 s1中的字符个数相等
        for r in range(len(s2)):
            if check(s2[r]):
                cnt -= 1
            hs2[s2[r]] += 1
            if check(s2[r]):
                cnt += 1
            
            if r - l >= len(s1):
                if check(s2[l]):
                    cnt -= 1
                hs2[s2[l]] -= 1
                if check(s2[l]):
                    cnt += 1
                l += 1 # 踩坑 不要忘了写了！
            if cnt == size:
                return True
        return False
```

