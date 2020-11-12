#  [165. 比较版本号](https://leetcode-cn.com/problems/compare-version-numbers/)

## 题意



## 题解



```c++
class Solution {
public:
    int compareVersion(string s1, string s2) {
        int i = 0, j = 0;
        while(i < s1.size() || j < s2.size()) {
            int x = i, y = j;
            while(x < s1.size() && s1[x] != '.') x++;
            while(y < s2.size() && s2[y] != '.') y++;
            int a = (i == x) ? 0 : atoi(s1.substr(i, x - i).c_str());
            int b = (j == y) ? 0 : atoi(s2.substr(j, y - j).c_str());
            if(a > b) return 1;
            else if(a < b) return -1;
            i = x + 1; j = y + 1;
        }
        return 0;
    }
};
```



```python3

```

