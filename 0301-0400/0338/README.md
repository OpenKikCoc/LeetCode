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



```python
# lowbit方法
class Solution:
    def countBits(self, num: int) -> List[int]:
        def lowbit(i):
            return i & -i
        res = [0]
        for i in range(1, num + 1):
            res.append(res[i - lowbit(i)] + 1)
        return res


# dp 
"""
令f[i]表示 i 的二进制表示中1的个数。
则f[i]可以由f[i/2]转移过来，ii 的二进制表示和 ⌊i/2⌋的二进制表示除了最后一位都一样，所以f[i] = f[i/2] + (i&1);

时间复杂度分析：总共有 n 个状态，每个状态进行转移的计算量是 O(1)，所以总时间复杂度是 O(n)。
"""
class Solution:
    def countBits(self, n: int) -> List[int]:
        f = (n + 1) * [0] 
        for i in range(1, n + 1):
            # 例如要看 1101
            # 我们只用看 110有多少个1 + 1101上的个位是不是1
            f[i] = f[i >> 1] + (i & 1)
        return f
```

