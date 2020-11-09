#  [3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

## 题意



## 题解



```c++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> cnt(300);
        int res = 0, n = s.size();
        for(int i = 0, l = 0; i < n; ++i) {
            ++cnt[s[i]];
            while(l <= i && cnt[s[i]] > 1) --cnt[s[l++]];
            //while(cnt[s[i]-'a'] > 1) --cnt[s[l++]-'a'];
            res = max(res, i-l+1);
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
        for(int i = 0; i < n; ++i) {
            if(last[s[i]] > l) {
                l = last[s[i]];
            }
            res = max(res, i-l);
            last[s[i]] = i;
        }
        return res;
    }
};
```



```python3

```

