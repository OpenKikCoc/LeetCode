## [比赛链接](https://leetcode.cn/contest/biweekly-contest-117/)


### [2928. 给小朋友们分糖果 I](https://leetcode.cn/problems/distribute-candies-among-children-i/)



```c++
class Solution {
public:
    using LL = long long;
    
    int distributeCandies(int n, int limit) {
        if (n > limit * 3)
            return 0;
        
        // 枚举第一个选多少，则剩余可选的固定
        LL res = 0;
        for (int i = 0; i <= limit; ++ i ) {
            LL left = n - i;
            if (left > 2 * limit)
                continue;
            LL x = max(0ll, left - limit), y = min(LL(limit), left);
            res += max(0ll, y - x + 1);
        }
        
        return res;
    }
};
```


### [2929. 给小朋友们分糖果 II](https://leetcode.cn/problems/distribute-candies-among-children-ii/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long distributeCandies(int n, int limit) {
        if (n > limit * 3)
            return 0;
        
        // 枚举第一个选多少，则剩余可选的固定
        LL res = 0;
        for (int i = 0; i <= limit; ++ i ) {
            LL left = n - i;
            if (left > 2 * limit)
                continue;
            LL x = max(0ll, left - limit), y = min(LL(limit), left);
            res += max(0ll, y - x + 1);
        }
        
        return res;
    }
};
```

### [2930. 重新排列后包含指定子字符串的字符串数目](https://leetcode.cn/problems/number-of-strings-which-can-be-rearranged-to-contain-substring/)

DP 或 容斥

```c++
class Solution {
public:
    // 初步思想: 直接 dp
    // 
    // 进阶 考虑容斥 直接排除"不好"的即可
    using LL = long long;
    const static int N = 1e5 + 10, MOD = 1e9 + 7;

    // 容斥
    LL qpow(LL a, LL b) {
        LL ret = 1;
        while (b) {
            if (b & 1)
                ret = ret * a % MOD;
            a = a * a % MOD;
            b >>= 1;
        }
        return ret;
    }
    int stringCount(int n) {
        // 反向考虑
        return ((qpow(26, n)                                    // 所有字符串
            - qpow(25, n - 1) * (25 * 3 + n) % MOD              // 不含至少某一种 (中间有重复统计)
            + qpow(24, n - 1) * (24 * 3 + n * 2) % MOD          // 不含至少其中两种
            - qpow(23, n - 1) * (23 + n)) % MOD + MOD) % MOD;   // 都不含
    }

    /*
    LL f[N][2][3][2];   // 考虑前 i 个字符: l 个数 0/>=1 e个数0/1/>=2 ...

    void madd(LL & a, LL b) {
        a = (a + b) % MOD;
    }

    int stringCount(int n) {
        memset(f, 0, sizeof f);
        f[0][0][0][0] = 1;

        // 正推更好实现
        for (int i = 0; i < n; ++ i ) {
            for (int x = 0; x < 2; ++ x )
                for (int y = 0; y < 3; ++ y )
                    for (int z = 0; z < 2; ++ z ) {
                        LL t = f[i][x][y][z];
                        
                        madd(f[i + 1][x][y][z], t * 23 % MOD);
                        madd(f[i + 1][min(x + 1, 1)][y][z], t);
                        madd(f[i + 1][x][min(y + 1, 2)][z], t);
                        madd(f[i + 1][x][y][min(z + 1, 1)], t);
                    }
        }

        // 逆推
        for (int i = 1; i <= n; ++ i ) {
            for (int x = 0; x < 2; ++ x )
                for (int y = 0; y < 3; ++ y )
                    for (int z = 0; z < 2; ++ z ) {
                        LL & t = f[i][x][y][z];
                        
                        madd(t, f[i - 1][x][y][z] * 23 % MOD);
                        madd(t, f[i - 1][max(x - 1, 0)][y][z]);
                        madd(t, f[i - 1][x][max(y - 1, 0)][z]);
                        madd(t, f[i - 1][x][y][max(z - 1, 0)]);
                    }
        }

        return f[n][1][2][1];
    }
    */
};
```

### [2931. 购买物品的最大开销](https://leetcode.cn/problems/maximum-spending-after-buying-items/)

简单推理易知 按顺序购买即可

```c++
class Solution {
public:
    // 每行都已经排序了，那么显然操作顺序唯一确定...
    // 直接排序求和即可
    // 
    // 思考: 如果每行未排序? => DP => TODO confirm details

    using LL = long long;

    long long maxSpending(vector<vector<int>>& values) {
        vector<int> t;
        for (auto & vs : values)
            for (auto x : vs)
                t.push_back(x);
        sort(t.begin(), t.end());
        int n = t.size();
        LL res = 0;
        for (int i = 1; i <= n; ++ i )
            res += (LL)t[i - 1] * i;
        return res;
    }
};
```
