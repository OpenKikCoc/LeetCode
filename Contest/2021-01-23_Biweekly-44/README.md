## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-44/)


### [1732. 找到最高海拔](https://leetcode-cn.com/problems/find-the-highest-altitude/)

差分 略

```c++
class Solution {
public:
    int largestAltitude(vector<int>& gain) {
        int res = 0, sum = 0;
        for (auto & v : gain) {
            sum += v;
            res = max(res, sum);
        }
        return res;
    }
};
```


### [1733. 需要教语言的最少人数](https://leetcode-cn.com/problems/minimum-number-of-people-to-teach/) [TAG]

要教的语言必定是最终 persons 中交流所使用的语言

选择剩余 persons 中会的人最多的语言即可

```c++
class Solution {
public:
    int minimumTeachings(int n, vector<vector<int>>& lg, vector<vector<int>>& fs) {
        int m = lg.size();
        vector<vector<bool>> g(m + 1, vector<bool>(n + 1));
        
        for (int i = 0; i < lg.size(); ++ i )
            for (auto x : lg[i])
                g[i + 1][x] = true;
        
        set<int> persons;
        for (auto & f : fs) {
            int x = f[0], y = f[1];
            bool flag = false;
            for (int i = 1; i <= n; ++ i )
                if (g[x][i] && g[y][i]) {
                    flag = true;
                    break;
                }
            if (flag) continue;
            persons.insert(x), persons.insert(y);
        }
        
        int s = 0;
        vector<int> cnt(n + 1);
        for (auto x : persons)
            for (int i = 1; i <= n; ++ i )
                if (g[x][i]) {
                    cnt[i] ++ ;
                    s = max(s, cnt[i]);
                }
        return persons.size() - s;
    }
};
```

### [1734. 解码异或后的排列](https://leetcode-cn.com/problems/decode-xored-permutation/)

扫一遍即可

```c++
class Solution {
public:
    vector<int> decode(vector<int>& encoded) {
        int m = encoded.size(), n = m + 1;
        int v1 = 0, v2 = 0;
        for (int i = 1; i <= n; ++ i ) v1 ^= i;
        for (int i = 0; i < m; ++ i ) if (i % 2 == 1) v2 ^= encoded[i];
        vector<int> res;
        v1 ^= v2;
        res.push_back(v1);
        for (auto & v : encoded) {
            v1 ^= v;
            res.push_back(v1);
        }
        return res;
    }
};
```

**扩展** n 为奇数:

```c++
class Solution {
public:
    vector<int> decode(vector<int>& b) {
        int sum = 0;
        int n = b.size() + 1;
        for (int i = 1; i <= n; i ++ ) sum ^= i;  // a1 ^ ... ^ an
        for (int i = b.size() - 1; i >= 0; i -= 2)
            sum ^= b[i];
        vector<int> a(1, sum);
        for (int i = 0; i < b.size(); i ++ )
            a.push_back(a.back() ^ b[i]);
        return a;
    }
};
```

**扩展** n 不一定奇数:

```c++
int son[2100000][2];

class Solution {
public:
    int idx;

    void insert(int x) {
        int p = 0;
        for (int i = 20; i >= 0; i -- ) {
            int u = x >> i & 1;
            if (!son[p][u]) son[p][u] = ++ idx;
            p = son[p][u];
        }
    }

    int query(int x) {
        int res = 0, p = 0;
        for (int i = 20; i >= 0; i -- ) {
            int u = x >> i & 1;
            if (son[p][!u]) p = son[p][!u], res = res * 2 + 1;
            else p = son[p][u], res *= 2;
        }
        return res;
    }

    vector<int> decode(vector<int>& b) {
        int n = b.size() + 1;
        idx = 0;
        memset(son, 0, sizeof son);
        for (int i = 1; i < b.size(); i ++ ) b[i] ^= b[i - 1];
        unordered_set<int> hash;
        for (auto x: b) hash.insert(x), insert(x);

        vector<int> res;
        for (int i = 1; i <= n; i ++ ) {
            if (!hash.count(i)) {
                if (query(i) <= n) {
                    res.push_back(i);
                    for (int j = 0; j < b.size(); j ++ )
                        res.push_back(i ^ b[j]);
                    break;
                }
            }
        }

        return res;
    }
};
```

### [1735. 生成乘积数组的方案数](https://leetcode-cn.com/problems/count-ways-to-make-array-with-product/)

对每个质因数的幂次求组合数即可

```c++
using LL = long long;
const int N = 10010;
const int mod = 1e9 + 7;

class Solution {
public:
    int f[N], g[N];
    
    int qmi(int a, int b) {
        int res = 1;
        while (b) {
            if (b & 1) res = (LL)res * a % mod;
            a = (LL)a * a % mod;
            b >>= 1;
        }
        return res;
    }

    // a!  /  [(a - b)! * (b)!]
    int C(int a, int b) {
        return (LL)f[a] * g[b] % mod * g[a - b] % mod;
    }
    
    vector<int> waysToFillArray(vector<vector<int>>& queries) {
        f[0] = g[0] = 1;
        for (int i = 1; i < N; ++ i ) {
            f[i] = (LL)f[i - 1] * i % mod;
            g[i] = qmi(f[i], mod - 2);
        }
        
        vector<int> res;
        for (auto & q : queries) {
            int n = q[0], k = q[1];
            int ret = 1;
            for (int i = 2; i <= k / i; ++ i )
                if (k % i == 0) {
                    int s = 0;
                    while (k % i == 0)
                        k /= i, ++ s ;
                    ret = (LL)ret * C(n + s - 1, n - 1) % mod;
                }
            if (k > 1) ret = (LL)ret * C(n, n - 1) % mod;
            res.push_back(ret);
        }
        return res;
    }
};
```
