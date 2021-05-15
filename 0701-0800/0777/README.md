#   [777. 在LR字符串中交换相邻字符](https://leetcode-cn.com/problems/swap-adjacent-in-lr-string/)

## 题意



## 题解



```c++
class Solution {
public:
    bool canTransform(string start, string end) {
        string a, b;
        for (auto c: start)
            if (c != 'X') a += c;
        for (auto c: end)
            if (c != 'X') b += c;
        if (a != b) return false;
        for (int i = 0, j = 0; i < start.size(); i ++, j ++ ) {
            while (i < start.size() && start[i] != 'L') i ++ ;
            while (j < end.size() && end[j] != 'L') j ++ ;
            if (i < j) return false;
        }
        for (int i = 0, j = 0; i < start.size(); i ++, j ++ ) {
            while (i < start.size() && start[i] != 'R') i ++ ;
            while (j < end.size() && end[j] != 'R') j ++ ;
            if (i > j) return false;
        }
        return true;
    }
};
```



```python3

```

