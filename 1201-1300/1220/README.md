# [1220. 统计元音字母序列的数目](https://leetcode.cn/problems/count-vowels-permutation/)

## 题意



## 题解



```c++
class Solution {
public:
    const int mod = 1e9 + 7;
    int countVowelPermutation(int n) {
        vector<vector<long long>> f(n + 1, vector<long long>(5));
        f[1][0] = f[1][1] = f[1][2] = f[1][3] = f[1][4] = 1;
        for (int i = 2; i <= n; ++ i ) {
            f[i][0] = (f[i - 1][1] + f[i - 1][2] + f[i - 1][4]) % mod;
            f[i][1] = (f[i - 1][0] + f[i - 1][2]) % mod;
            f[i][2] = (f[i - 1][1] + f[i - 1][3]) % mod;
            f[i][3] = (f[i - 1][2]) % mod;
            f[i][4] = (f[i - 1][2] + f[i - 1][3]) % mod;
        }
        long long res = 0;
        for (int i = 0; i < 5; ++ i ) res = (res + f[n][i]) % mod;
        return res;
    }
};

```



**思路**

> 线性dp 
>
> 1. 状态表示$：f[i, j]$ 表示长度为 $i$ 且以字符 $j$ 为结尾的字符串的数目。$j = 0, 1, 2, 3, 4$ 分别代表字母 $[a, e, i, o, u]$
>
> 2. 状态转移：见代码
>
> 3. 初始化：$f[1, j] = 1$
>
>    最后返回：$sum(f[n, j]),    0 <= j <= 4$

```python
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        mod = int(1e9+7)
        f = [[0] * 5 for _ in range(n + 1)]
        for i in range(5):
            f[1][i] = 1
        
        for i in range(2, n + 1):
            f[i][0] = (f[i - 1][1] + f[i - 1][2] + f[i - 1][4]) % mod
            f[i][1] = (f[i - 1][0] + f[i - 1][2]) % mod
            f[i][2] = (f[i - 1][1] + f[i - 1][3]) % mod
            f[i][3] = (f[i - 1][2]) % mod
            f[i][4] = (f[i - 1][2] + f[i - 1][3]) % mod 
        return sum(f[n]) % mod
      
# Pythonic
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        mod = 10**9 + 7
        a = e = i = o = u = 1
        for _ in range(n - 1):
            a, e, i, o, u = e, (a + i) % mod, (a + e + o + u) % mod, (i + u) % mod, a
        return sum([a, e, i, o, u]) % mod
```

