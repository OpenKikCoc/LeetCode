#  [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

## 题意



## 题解



```c++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> cnt(300);
        int res = 0, n = s.size();
        for (int i = 0, l = 0; i < n; ++ i ) {
            ++ cnt[s[i]];
            while (l <= i && cnt[s[i]] > 1) -- cnt[s[l ++ ]];
            //while(cnt[s[i] - 'a'] > 1) --cnt[s[l ++ ] - 'a'];
            res = max(res, i - l + 1);
        }
        return res;
    }
};
```

自己用的比较顺手的写法：

```c++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int n = s.size();
        vector<int> last(256,-1);
        int res = 0, l = -1;
        for (int i = 0; i < n; ++i) {
            if (last[s[i]] > l) {
                l = last[s[i]];
            }
            res = max(res, i - l);
            last[s[i]] = i;
        }
        return res;
    }
};
```



```python
# 哈希表 + 双指针；用哈希来统计窗口内每个字符出现的次数
# 初始化 l 为0， 用指针 r 遍历 s, 对于每一个s[r]，my_dict[s[r]]的个数+1，当该字符出现次数 > 1时，就要把左指针 l 缩进，直到 s[r]的次数 == 1后， 统计当前没有重复字符的窗口大小，并更新答案

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        import collections
        my_dict = collections.defaultdict(int)
        l = 0; res = 0
        for r in range(len(s)):
            my_dict[s[r]] += 1
            # 踩坑：想要把l指针往右边移动，那就是判断当前r的数量是否大于1
            while my_dict[s[r]] > 1:  
                my_dict[s[l]] -= 1
                l += 1
            res = max(res, r - l + 1)
        return res
```

