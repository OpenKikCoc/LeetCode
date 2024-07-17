#  [552. 学生出勤记录 II](https://leetcode.cn/problems/student-attendance-record-ii/)

## 题意



## 题解



```c++
const int mod = 1e9 + 7, N = 100010;
int f[N][2][3];

// 技巧：不好根据前面的来计算当前作为后面的
// 那么 计算当前作为前面的 后面可以转移为什么

class Solution {
public:
    int checkRecord(int n) {
        memset(f, 0, sizeof f);
        f[0][0][0] = 1;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < 2; ++ j )
                for (int k = 0; k < 3; ++ k ) {
                    // 出现 A
                    if (!j) f[i + 1][j + 1][0] = (f[i + 1][j + 1][0] + f[i][j][k]) % mod;
                    // 出现 L
                    if (k + 1 <= 2) f[i + 1][j][k + 1] = (f[i + 1][j][k + 1] + f[i][j][k]) % mod;
                    // 出现 P
                    f[i + 1][j][0] = (f[i + 1][j][0] + f[i][j][k]) % mod;
                }
        int res = 0;
        for (int j = 0; j < 2; ++ j )
            for (int k = 0; k < 3; ++ k )
                res = (res + f[n][j][k]) % mod;
        return res;
    }
};
```



```python3

```

