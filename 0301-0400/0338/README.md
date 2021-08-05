#  [338. 比特位计数](https://leetcode-cn.com/problems/counting-bits/)

## 题意



## 题解

>   令 `f[i]` 表示 `i` 的二进制表示中 1 的个数。
>   则 `f[i]` 可以由 `f[i/2]` 转移过来， `i`  的二进制表示和 `⌊i/2⌋` 的二进制表示除了最后一位都一样
>
>   所以 `f[i] = f[i/2] + (i&1);`

```c++
class Solution {
public:
    vector<int> countBits(int num) {
        vector<int> f(num + 1);
        for (int i = 1; i <= num; i ++ )
            f[i] = f[i >> 1] + (i & 1);
        return f;
    }
};
```



```c++
class Solution {
public:
    vector<int> countBits(int num) {
        vector<int> dp(num + 1, 0);
        for (int i = 1; i <= num; ++ i )
            dp[i] = i & 1 ? dp[i-1] + 1 : dp[i >> 1];
        return dp;
    }
};
```



```python3

```

