#  [319. 灯泡开关](https://leetcode.cn/problems/bulb-switcher/)

## 题意



## 题解

>每个灯泡开关被按的次数等于它的编号的约数个数。
>
>最终灯泡是亮的，说明编号有奇数个约数。
>
>下面我们证明：一个数有奇数个约数，等价于它是平方数。
>
>略

```c++
class Solution {
public:
    int bulbSwitch(int n) {
        return sqrt(n);
    }
};
```



```python3

```

