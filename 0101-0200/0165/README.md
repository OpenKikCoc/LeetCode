#  [165. 比较版本号](https://leetcode-cn.com/problems/compare-version-numbers/)

## 题意



## 题解



```c++
class Solution {
public:
    int compareVersion(string s1, string s2) {
        int i = 0, j = 0;
        while (i < s1.size() || j < s2.size()) {
            int x = i, y = j;
            while (x < s1.size() && s1[x] != '.') x ++ ;
            while (y < s2.size() && s2[y] != '.') y ++ ;
            int a = (i == x) ? 0 : stoi(s1.substr(i, x - i));
            int b = (j == y) ? 0 : stoi(s2.substr(j, y - j));
            if (a > b) return 1;
            else if (a < b) return -1;
            i = x + 1; j = y + 1;
        }
        return 0;
    }
};
```



```python
# 借助split分割方法
class Solution:
    def compareVersion(self, s1: str, s2: str) -> int:
        v1, v2 = s1.split('.'), s2.split('.')
        for i in range(max(len(v1), len(v2))):
            d1 = int(v1[i]) if i < len(v1) else 0
            d2 = int(v2[i]) if i < len(v2) else 0
            if d1 > d2:
                return 1
            elif d1 < d2:
                return -1
        return 0
```

