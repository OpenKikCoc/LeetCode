## [比赛链接](https://leetcode.cn/contest/biweekly-contest-130/)


### [3142. 判断矩阵是否满足条件](https://leetcode.cn/problems/check-if-grid-satisfies-conditions/)



```c++
class Solution {
public:
    bool satisfiesConditions(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        for (int j = 0; j < m; ++ j )
            for (int i = 1; i < n; ++ i )
                if (grid[i][j] != grid[i - 1][j])
                    return false;
        
        for (int j = 1; j < m; ++ j )
            if (grid[0][j] == grid[0][j - 1])
                return false;
        
        return true;
    }
};
```


### [3143. 正方形中的最多点数](https://leetcode.cn/problems/maximum-points-inside-the-square/)



```c++
class Solution {
public:
    int maxPointsInsideSquare(vector<vector<int>>& points, string s) {
        int n = points.size();
        map<int, vector<int>> h;
        for (int i = 0; i < n; ++ i )
            h[max(abs(points[i][0]), abs(points[i][1]))].push_back(i);
        
        int cnt[26];
        memset(cnt, 0, sizeof cnt);
        int res = 0;
        for (auto & [d, xs] : h) {
            for (auto x : xs) {
                int t = s[x] - 'a';
                if (cnt[t])
                    return res;
                cnt[t] ++ ;
            }
            res += xs.size();
        }
        return res;
    }
};
```

### [3144. 分割字符频率相等的最少子字符串](https://leetcode.cn/problems/minimum-substring-partition-of-equal-character-frequency/)



```c++
class Solution {
public:
    // 本质是 每一段的奇偶性相同 出现的字母次数完全一样...
    const static int N = 1010, M = 26, INF = 0x3f3f3f3f;
    
    int sum[N][M];
    int f[N];
    
    bool check(int l, int r) {
        int last = -1;
        for (int j = 0; j < M; ++ j ) {
            int d = sum[r][j] - sum[l - 1][j];
            if (d == 0)
                continue;
            if (last == -1)
                last = d;
            if (last != d)
                return false;
        }
        return true;
    }
    
    int minimumSubstringsInPartition(string s) {
        int n = s.size();
        
        {
            memset(sum, 0, sizeof sum);
            for (int i = 1; i <= n; ++ i ) {
                int t = s[i - 1] - 'a';
                for (int j = 0; j < M; ++ j )
                    sum[i][j] = sum[i - 1][j] + (j == t);
            }
        }
        
        memset(f, 0x3f, sizeof f);
        f[0] = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 0; j < i; ++ j )
                if (check(j + 1, i))
                    f[i] = min(f[i], f[j] + 1);
        return f[n];
    }
};
```

### [3145. 大数组元素的乘积](https://leetcode.cn/problems/find-products-of-elements-of-big-array/) [TAG]

数位统计

注意查询类型是 `long long` 所以 get 函数入参必须是 LL 否则 TLE

```c++
class Solution {
public:
    // 考虑 本题最终求解的是乘积 而乘积元素皆为2的幂次 不妨[将强数组转化为幂次数组]
    //      [1,2,8] -> [1, 2, 1, 2, 4, 1, 4, 2, 4, 1, 2, 4, 8, ...]
    //              => [0, 1, 0, 1, 2, 0, 2, 1, 2, 0, 1, 2, 3, ...]
    // 则 [from,to] 可以转变为区间连乘 或 s[to]/s[from-1]
    // 接下来的问题是 如何判断该数组 [0, x] 总共有多少个 2 的幂次?
    // => 显然需要映射到原本真实的数值，考虑二分真实数值再根据数位统计办法得到其总长
    //      则 亦可同样按数位统计办法得到 2 的幂次的总和
    
    using LL = long long;
    const static int M = 50;
    
    LL qpow(int a, LL b, int mod) {
        int ret = 1 % mod;
        while (b) {
            if (b & 1)
                ret = (LL)ret * a % mod;
            a = (LL)a * a % mod;
            b >>= 1;
        }
        return ret;
    }
    
    // 数位统计的方法 求出不超过x的数字 二进制表示下出现1的总个数
    //   使用 sum 复用代码: 求解 [1,x] 有多少个2的幂次，计算时 t*i
    LL num(LL x, bool sum) {
        LL tot = 0;
        for (int i = 0; i < M; ++ i ) {
            // 如果不超过 1<<i 的幂次  提前结束
            if (!(x >> i))
                break;
            
            // 标准数位统计逻辑
            LL t;

            // ATTENTION 计算规则 1: 左侧任意而当前位为1，右侧随便选的 总的数字个数
            //      左侧的数值 * 2^i
            t = (x >> (i + 1)) * (1ll << i);
            if (sum)
                t *= i;
            tot += t;

            // ATTENTION 计算规则 2: 左侧固定前缀当前位为1，只取右侧的值+1
            if ((x >> i) & 1) {
                t = (x & ((1ll << i) - 1)) + 1;
                if (sum)
                    t *= i;
                tot += t;
            }
        }
        return tot;
    }
    
    // x 为强数组下标(含偏移) [1, x]
    // ATTENTION: TLE get的入参必须是 LL 类型，否则 TLE
    LL get(LL x) {
        if (x <= 0)
            return 0;
        // 通过二分找到满足 [1,m] 的最大数值m，在展开后个数不超过x
        
        LL l = 1, r = x;
        while (l < r) {
            LL m = l + (r - l) / 2;
            if (num(m, false) <= x)
                l = m + 1;
            else
                r = m;
        }
        // l 是大于的第一个
        LL ret = num(l - 1, true);
        
        // ATTENTION 先减掉前面的 再在l数字上暴力枚举
        x -= num(l - 1, false);
        for (int i = 0; i < M && x; ++ i )
            if ((l >> i) & 1) {
                ret += i;
                x -- ;
            }
        return ret;
    }
    
    vector<int> findProductsOfElements(vector<vector<long long>>& queries) {
        vector<int> res;
        for (auto & q : queries) {
            // 下标偏移 从1开始 [1, n]
            // ATTENTION: TLE get的入参必须是 LL 类型，否则 TLE
            LL t = get(q[1] + 1) - get(q[0] - 1 + 1);
            res.push_back(qpow(2, t, q[2]));
        }
        return res;
    }
};
```
