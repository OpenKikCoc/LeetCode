#  [455. 分发饼干](https://leetcode.cn/problems/assign-cookies/)

## 题意



## 题解



```c++
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(), g.end());
        sort(s.begin(), s.end());
        int res = 0;
        for (int i = 0, j = 0; i < g.size(); i ++ ) {
            while (j < s.size() && s[j] < g[i]) j ++ ;
            if (j < s.size()) {
                res ++ ;
                j ++ ;
            }
            else break;
        }
        return res;
    }

    // 注意 一定是 g 中的指针移动：g 从小到大排序 一定优先满足 g 前面的
    int findContentChildren_2(vector<int>& g, vector<int>& s) {
        sort(g.begin(), g.end());
        sort(s.begin(), s.end());
        int n = g.size(), res = 0, p = 0;
        for (auto v : s)
            if (p < n && v >= g[p]) ++ p, ++ res;
        return res;
    }
};
```



```python3

```

