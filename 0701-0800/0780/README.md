#   [780. 到达终点](https://leetcode-cn.com/problems/reaching-points/)

## 题意



## 题解



```c++
class Solution {
public:
    bool reachingPoints(int sx, int sy, int tx, int ty) {
        while (tx >= sx && ty >= sy) {
            if (tx == ty) break;
            if (tx > ty) {
                if (ty > sy) tx %= ty;
                else return (tx - sx) % ty == 0;
            } else {
                if (tx > sx) ty %= tx;
                else return (ty - sy) % tx == 0;
            }
        }

        return sx == tx && sy == ty;
    }
};
```



```python3

```

