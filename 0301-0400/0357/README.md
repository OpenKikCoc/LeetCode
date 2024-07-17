#  [357. 计算各个位数不同的数字个数](https://leetcode.cn/problems/count-numbers-with-unique-digits/)

## 题意



## 题解

首先总共有0-9十个不同的数字，所以我们只需要考虑 n≤10 的情况。

然后我们从最高位开始计数，为了方便，我们先不考虑 x=0 的情况：

1.  最高位不能选0，只有9种选法；
2.  次高位不能和最高位相同，但可以选0，有9种选法；
3.  下一位不能和前两位相同，有8种选法；
4.  以此类推，枚举 n 位；

最后根据乘法原理，把每一位的选法数量相乘就是总方案数。
最后不要忘记加上 x=0
 的情况，让答案加1。

```c++
class Solution {
public:
    int countNumbersWithUniqueDigits(int n) {
        if (!n) return 1;
        n = min(n, 10);
        vector<int> f(n);
        f[0] = 9;
        for (int i = 1; i < n; ++ i ) f[i] = f[i - 1] * (10 - i);
        int res = 0;
        for (int i = 0; i < n; ++ i ) res += f[i];
        return res + 1;
    }
};

// yxc
class Solution {
public:
    int countNumbersWithUniqueDigits(int n) {
        n = min(n, 10);
        if (!n) return 1;
        vector<int> f(n + 1);
        f[1] = 9;
        for (int i = 2; i <= n; i ++ )
            f[i] = f[i - 1] * (11 - i);

        int res = 1;
        for (int i = 1; i <= n; i ++ ) res += f[i];
        return res;
    }
};
```



```python3

```

