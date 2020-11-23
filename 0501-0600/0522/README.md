#  [522. 最长特殊序列 II](https://leetcode-cn.com/problems/longest-uncommon-subsequence-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    // a 是否是 b 的子串
    bool check(string & a, string & b) {
        int k = 0;
        for (auto c : b)
            if (k < a.size() && c == a[k]) ++ k ;
        return k == a.size();
    }
    int findLUSlength(vector<string>& strs) {
        int res = -1;
        for (int i = 0; i < strs.size(); ++ i ) {
            bool is_sub = false;
            for (int j = 0; j < strs.size(); ++ j )
                if (i != j && check(strs[i], strs[j])) {
                    is_sub = true;
                    break;
                }
            if (!is_sub) res = max(res, (int)strs[i].size());
        }
        return res;
    }
};
```



```python3

```

