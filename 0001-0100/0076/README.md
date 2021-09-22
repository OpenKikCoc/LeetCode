#  [76. 最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)

## 题意



## 题解



```c++
class Solution {
public:
    string minWindow(string s, string t) {
        unordered_map<char, int> hs, ht;
        for (auto c: t) ht[c] ++ ;

        string res;
        int cnt = 0;
        for (int i = 0, j = 0; i < s.size(); i ++ ) {
            hs[s[i]] ++ ;
            if (hs[s[i]] <= ht[s[i]]) cnt ++ ;

            while (hs[s[j]] > ht[s[j]]) hs[s[j ++ ]] -- ;
            if (cnt == t.size()) {
                if (res.empty() || i - j + 1 < res.size())
                    res = s.substr(j, i - j + 1);
            }
        }

        return res;
    }
};
```



```python
"""
先想清楚暴力写法如何写：
暴力枚举所有子串，查找有没有包含t里的所有字母。（双指针 一定要具备单调性 才可以用）
优化：对于某一个固定的r 都可以找到唯一的最近的l：当r往后走（值变大）r对应的l 一定不会向前走（你不会变小），l也是一定往后走的（值变大）==> 这就是具备单调性的。（简单证明：反证法）

另外一个问题：如何快速判断当前字符是否包含了t中的所有字符？
非常巧妙的地方：1. 用一个hash表统计t里每个字符出现的次数，用另外一个hash表统计窗口[l,r]内每个字符出现的次数;
2. 接着用一个变量cnt统计t里有多少个字符已经被包含了，当cnt==len(t)，说明窗口已经包含了t里所有字符；
3.考虑r往前走的时候，字符是否能被记录到cnt中；考虑什么时候l可以往前移动。

时间复杂度：每个字符只会遍历一次，而且哈希表操作常数次，所以是O(N)
"""

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        hs, ht = collections.defaultdict(int), collections.defaultdict(int)
        for c in t:
            ht[c] += 1
        cnt, l = 0, 0
        res = ''
        for r in range(len(s)):
            hs[s[r]] += 1
            if hs[s[r]] <= ht[s[r]]:
                cnt += 1
            while l <= r and hs[s[l]] > ht[s[l]]:  # 踩坑！l <= r 记得写上等于！
                hs[s[l]] -= 1
                l += 1
            if cnt == len(t):
                if not res or r - l + 1 < len(res):
                    res = s[l:r + 1]
        return res
```

