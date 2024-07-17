#  [509. 斐波那契数](https://leetcode.cn/problems/fibonacci-number/)

## 题意



## 题解


```c++
class Solution {
public:
    int fib(int N) {
        int a = 0, b = 1;
        while (N -- ) {
            int c = a + b;
            a = b, b = c;
        }
        return a;
    }
};
```


```c++
class Solution {
public:
    int fib(int N) {
        if (N == 0) return 0;
        vector<int> dp(N + 1);
        dp[0] = 0, dp[1] = 1;
        for (int i = 2; i <= N; ++ i ) dp[i] = dp[i - 1] + dp[i - 2];
        return dp[N];
    }
};
```



```python3

```

