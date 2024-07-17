#  [657. 机器人能否返回原点](https://leetcode.cn/problems/robot-return-to-origin/)

## 题意



## 题解



```c++
class Solution {
public:
    bool judgeCircle(string moves) {
        int x = 0, y = 0;
        for (auto c: moves) {
            if (c == 'U') x -- ;
            else if (c == 'R') y ++ ;
            else if (c == 'D') x ++ ;
            else y -- ;
        }
        return !x && !y;
    }
};
```



```python3

```

