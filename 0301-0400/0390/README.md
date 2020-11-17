#  [390. 消除游戏](https://leetcode-cn.com/problems/elimination-game/)

## 题意



## 题解



```c++
class Solution {
public:
    // 变种约瑟夫环
    int lastRemaining(int n) {
        if (n == 1) return 1;
        return 2 * (n / 2 + 1 - lastRemaining(n / 2));
    }
};
```



```python3

```

