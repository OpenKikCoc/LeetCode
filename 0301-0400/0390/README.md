#  [390. 消除游戏](https://leetcode-cn.com/problems/elimination-game/)

## 题意



## 题解

![image-20210705130101191](../../../../../../Library/Application Support/typora-user-images/image-20210705130101191.png)

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

