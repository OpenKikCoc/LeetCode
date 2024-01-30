## [比赛链接](https://leetcode.cn/contest/biweekly-contest-121/)


### [2996. 大于等于顺序前缀和的最小缺失整数](https://leetcode.cn/problems/smallest-missing-integer-greater-than-sequential-prefix-sum/)



```c++
class Solution {
public:
    int missingInteger(vector<int>& nums) {
        int p = -1, s = 0;
        for (int i = 0; i < nums.size(); ++ i )
            if (i == 0 || nums[i] == nums[i - 1] + 1)
                p = i, s += nums[i];
            else
                break;
        
        set<int> S;
        for (auto x : nums)
            S.insert(x);
        while (S.count(s))
            s ++ ;
        return s;
    }
};
```


### [2997. 使数组异或和等于 K 的最少操作次数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-array-xor-equal-to-k/)



```c++
class Solution {
public:
    // 1e6 不超过 2^20
    const static int N = 22;
    
    int minOperations(vector<int>& nums, int k) {
        int t = 0;
        for (auto x : nums)
            t ^= x;
        int res = 0;
        for (int j = 0; j < N; ++ j )
            if ((t >> j & 1) != (k >> j & 1))
                res ++ ;
        return res;
    }
};
```

### [2998. 使 X 和 Y 相等的最少操作次数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-x-and-y-equal/)

显然跑最短路即可

```c++
class Solution {
public:
    const static int N = 1e4 + 10, INF = 0x3f3f3f3f;
    
    int d[N];
    int q[N + N], hh, tt;
    
    int minimumOperationsToMakeEqual(int x, int y) {
        memset(d, 0x3f, sizeof d);
        d[x] = 0;
        hh = 0, tt = -1;
        q[ ++ tt] = x;
        while (hh <= tt) {
            int t = q[hh ++ ];
            if (t == y)
                break;
            
            if (t % 11 == 0) {
                int nd = d[t] + 1;
                if (d[t / 11] > nd)
                    d[t / 11] = nd, q[ ++ tt ] = t / 11;
            }
            if (t % 5 == 0) {
                int nd = d[t] + 1;
                if (d[t / 5] > nd)
                    d[t / 5] = nd, q[ ++ tt ] = t / 5;
            }
            if (t - 1 > 0) {
                int nd = d[t] + 1;
                if (d[t - 1] > nd)
                    d[t - 1] = nd, q[ ++ tt ] = t - 1;
            }
            if (t + 1 < N) {
                int nd = d[t] + 1;
                if (d[t + 1] > nd)
                    d[t + 1] = nd, q[ ++ tt ] = t + 1;
            }
        }
        return d[y];
    }
};
```

### [2999. 统计强大整数的数目](https://leetcode.cn/problems/count-the-number-of-powerful-integers/) [TAG]

较显然的数位 dp

重点在于分情况讨论细节

```c++
class Solution {
public:
    // 显然数位dp 先把区间问题转化为单值问题
    using LL = long long;
    const static int N = 17;
    
    string s;
    int m, limit;
    
    LL f[N][N]; // 剩下i位 当前位是j的不超过limit的可行数量 => 其实也可以直接 pow(limit+1, ...)
    void init() {
        memset(f, 0, sizeof f);
        for (int j = 0; j <= limit; ++ j )
            f[1][j] = 1;
        for (int i = 2; i < N; ++ i )
            for (int j = 0; j <= limit; ++ j )
                for (int k = 0; k <= limit; ++ k )
                    f[i][j] += f[i - 1][k];
    }
    
    LL get(LL x) {
        string t = to_string(x);
        int n = t.size();
        {
            if (n < m)
                return 0;
            else if (n == m)
                return t >= s;  
        }
        // n > m
        int w = n - m;
        
        LL ret = 0;
        for (int i = 0; i < w /*ATTENTION*/; ++ i ) {
            int v = t[i] - '0';
            
            // 写法1 个人更习惯
            for (int j = 0; j < v && j <= limit; ++ j )
                ret += f[w - i][j];
            if (v > limit)  // ATTENTION 则无论后面如何 都已经被 for-loop 计算过【细节推导】
                return ret;
            
            /* 写法2
            if (v <= limit) {
                // 填的值受限制
                for (int j = 0; j < v; ++ j )
                    ret += f[w - i][j];
            } else {
                // 后面随便填都可以 提前返回
                ret += f[w - i + 1][0];
                return ret;
            }*/
        }
        
        // ATTENTION 如果中间没有return，则需要单独看最后一段
        // => 推理: 此时 ret 的含义是严格小于x数位值的情况下的总数  需要加上等于(但不大于limit)的情况 (t.substr(w))
        return ret + (t.substr(w) >= s);
    }
    
    long long numberOfPowerfulInt(long long start, long long finish, int limit, string s) {
        this->s = s, this->m = s.size(), this->limit = limit;
        init();
        return get(finish) - get(start - 1);
    }
};
```
