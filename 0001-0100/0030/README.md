#  [30. 串联所有单词的子串](https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        vector<int> res;
        if (words.empty()) return res;
        int n = s.size(), m = words.size(), w = words[0].size();
        unordered_map<string, int> tot;
        for (auto& word : words) tot[word] ++ ;

        for (int i = 0; i < w; i ++ ) {
            unordered_map<string, int> wd;
            int cnt = 0;
            for (int j = i; j + w <= n; j += w) {
                if (j >= i + m * w) {
                    auto word = s.substr(j - m * w, w);
                    wd[word] -- ;
                    if (wd[word] < tot[word]) cnt -- ;
                }
                auto word = s.substr(j, w);
                wd[word] ++ ;
                if (wd[word] <= tot[word]) cnt ++ ;
                if (cnt == m) res.push_back(j - (m - 1) * w);
            }
        }

        return res;
    }
};
```



```python
#枚举所有起始位置，长度len(words[0])，0，w,2w,...; 1,w+1,w+2,...;w-1,2w-1,...
#这样枚举的好处：每一个单词会出现在某一区间，不存在跨区间的情况。
#每个区间看成一整体，问题变成：找到连续区间 恰好是我们给定的元素
#每次滑动窗口往前移动一位，后面也会往前走一位。（加一个新的区间，删除一个旧的区间）
#如何判断两个集合（哈希）是否相等？
#用一个变量cnt存滑动窗口里的集合 也在words集合里出现的集合的有效数。cnt是否和words的集合数是够一致，就可以判断是否满足题意。

#时间复杂度，每组：O((n/w)*w) w组，所以O(N)=O(NW)

class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        from collections import defaultdict
        res = []
        if not words:return res
        
        n = len(s); m = len(words); w = len(words[0])
        tot = collections.defaultdict(int)
        for i in words:
            tot[i] += 1

        for l in range(w):
            cnt = 0
            wd = collections.defaultdict(int)
            r = l
            while r + w <= n:
                #维护窗口大小，把左边往前缩紧一个（因为r也是每次遍历只加入一个）
                if r >= l + m * w:
                    word = s[r - m * w : r - (m - 1) * w]
                    wd[word] -= 1
                    if wd[word] < tot[word]:
                        cnt -= 1
                #加入当前处理的右指针指向的即将加入的单词
                word = s[r: r + w]
                wd[word] += 1
                if wd[word] <= tot[word]:
                    cnt += 1
                if cnt == m:
                    res.append(r - (m - 1) * w)
                r += w
        return res
```

