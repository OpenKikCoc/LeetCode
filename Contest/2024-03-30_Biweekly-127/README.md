## [比赛链接](https://leetcode.cn/contest/biweekly-contest-127/)


### [3095. 或值至少 K 的最短子数组 I](https://leetcode.cn/problems/shortest-subarray-with-or-at-least-k-i/)



```c++
class Solution {
public:
    int minimumSubarrayLength(vector<int>& nums, int k) {
        int n = nums.size();
        for (int w = 1; w <= n; ++ w )
            for (int i = 0; i + w <= n; ++ i ) {
                int st = 0;
                for (int j = 0; j < w; ++ j )
                    st = st | nums[i + j];
                if (st >= k)
                    return w;
            }
                
        return -1;
    }
};
```


### [3096. 得到更多分数的最少关卡数目](https://leetcode.cn/problems/minimum-levels-to-gain-more-points/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int s[N];
    int get(int l, int r) {
        return s[r] - s[l - 1];
    }
    
    int minimumLevels(vector<int>& possible) {
        int n = possible.size();
        
        s[0] = 0;
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + (possible[i - 1] ? 1 : -1);
        
        for (int i = 1; i < n; ++ i ) {
            int a = get(1, i), b = get(i + 1, n);
            if (a - b > 0)
                return i;
        }
        
        return -1;
    }
};
```

### [3097. 或值至少为 K 的最短子数组 II](https://leetcode.cn/problems/shortest-subarray-with-or-at-least-k-ii/)



```c++
class Solution {
public:
    const static int N = 2e5 + 10, M = 32;
    
    int s[N][M];
    
    int get(int l, int r) {
        int x = 0;
        for (int i = 0; i < M; ++ i )
            if (s[r][i] - s[l - 1][i])
                x |= 1 << i;
        return x;
    }
    
    int minimumSubarrayLength(vector<int>& nums, int k) {
        int n = nums.size();
        {
            memset(s, 0, sizeof s);
            for (int i = 1; i <= n; ++ i )
                for (int j = 0; j < M; ++ j )
                    s[i][j] = s[i - 1][j] + ((nums[i - 1] >> j & 1) ? 1 : 0);
        }
        
        int res = -1;
        for (int l = 1, r = 1; r <= n; ++ r ) {
            while (l <= r && get(l, r) >= k)
                l ++ ;
            
            // 第一个不满足 >= k 的位置，看左侧是否满足
            if (l > 1 && get(l - 1, r) >= k) {
                if (res == -1 || r - l + 2 < res)
                    res = r- l + 2;
            }
        }
        return res;
    }
};
```

### [3098. 求出所有子序列的能量和](https://leetcode.cn/problems/find-the-sum-of-subsequence-powers/) [TAG]

如果将所有差值离散化 统一求复杂度会爆掉

考虑随用随算 并借助 trick 的转移方式实现

```c++
class Solution {
public:
    // 长度等于k...
    // 1. 排序 显然不影响结果
    // 2. 枚举差值发生的两个下标对 则中间元素都不能被选 且两侧也存在部分不能选(以某个位置为端点 左侧差值不小于x 总共有多少种方案)
    // 3. 去重.. 两侧区分对待即可 【经典思维】
    //
    // 长度恰好为k怎么解决? => 确定性状态 作为dp定义其中一个维度
    //
    // 【考虑 结合数据范围】
    // ls[i][j][k] 左侧到i的位置 长度为j 差值不小于k 的所有方案数
    //
    // 【重要：状态转移方式 + 复杂度分析】

    using LL = long long;
    const static int N = 55, MOD = 1e9 + 7;
    const int INF = 0x3f3f3f3f;
    
    int n;
    vector<int> ns;
    

    int sumOfPowers(vector<int>& nums, int k) {
        this->ns = nums;
        this->n = ns.size();
        sort(ns.begin(), ns.end());
        
        unordered_map<int, LL> f[N][N]; // k 作为离散 hash
        
        for (int i = 1; i <= n; ++ i ) {
            f[i][1][INF] = 1;
            for (int j = 2; j <= k; ++ j )
                // ATTENTION 第三维并非枚举所有差值可能，而是只枚举一定可能出现的，也即枚举前面的数字
                for (int last = 1; last < i; ++ last ) {
                    // ATTENTION trick
                    for (auto & [d, cnt] : f[last][j - 1]) {
                        LL nd = min(d, ns[i - 1] - ns[last - 1]);  // trick
                        f[i][j][nd] = (f[i][j][nd] + cnt) % MOD;
                    }
                }
        }
        
        LL res = 0;
        for (int i = 1; i <= n; ++ i )
            for (auto & [d, cnt] : f[i][k])
                res = (res + d * cnt % MOD) % MOD;
        
        return res;
    }
};
```

更 general 的前后缀分解，计算过程必须正确消除不可行情况

解决办法 => 必须包含边界值 => 求差值+初始化

```c++
int tot = 0;

class Solution {
public:
    // 天然的想法：
    // 1. 排序 不影响正确性
    // 2. 枚举贡献 选择特定两个下标 x,y 作为值
    // 3. x 左侧、y 右侧  分别统计有多少种可能 [为了避免重复统计 需要区分对待]
    // 4. 枚举左右侧长度
    //
    // 考虑状态定义:
    // f[i][j][k] 到前i个位置 选择了j个 且差值不小于k的 所有方案数
    // 50*50*1300 *50 = 3e6 复杂度容易爆掉
    // 
    // 考虑随算随取
    // => f[i][j] 到【第】i个位置 选择了j个 且差值满足特定条件的 所有方案数
    // 50*50*50
    // 在左右两侧区分统计时 【必须避免第一个区间间隔不够的情况 解决办法=>求差值+初始化】思考
    
    using LL = long long;
    const static int N = 55, MOD = 1e9 + 7;
    
    int n, k;
    vector<int> ns;
    
    vector<int> calc(vector<int> & xs, int d) {
        int m = xs.size();
        static int f[N][N];
        memset(f, 0, sizeof f);
        
        f[1][1] = 1;    // ATTENTION init 关联到取差值
        
        for (int i = 2; i <= m; ++ i )
            for (int last = 1; last < i; ++ last ) {
                if (xs[i - 1] - xs[last - 1] < d)
                    break;
                for (int j = 1; j <= k; ++ j )
                    f[i][j] = (f[i][j] + f[last][j - 1]) % MOD;
            }
        
        vector<int> ret(k + 1);
        for (int i = 1; i <= m; ++ i )
            for (int j = 1; j <= k; ++ j )
                ret[j] = (ret[j] + f[i][j]) % MOD;
        return ret;
    }
    
    int sumOfPowers(vector<int>& nums, int k) {
        this->ns = nums;
        this->n = ns.size(), this->k = k;
        sort(ns.begin(), ns.end());
        
        LL res = 0;
        for (int x = 0; x < n; ++ x )
            for (int y = x + 1; y < n; ++ y ) {
                int d = ns[y] - ns[x];
                vector<int> ls, rs;
                {
                    vector<int> xs;
                    // for (int z = 0; z <= x; ++ z )   // => WA
                    //     xs.push_back(ns[z]);
                    for (int z = x; z >= 0; -- z )      // ATTENTION 1 顺序
                        xs.push_back(ns[x] - ns[z]);    // ATTENTION 2 差值
                    ls = calc(xs, d);
                }
                {
                    vector<int> xs;
                    for (int z = y; z < n; ++ z )
                        xs.push_back(ns[z] - ns[y]);    // ATTENTION 2 差值
                    rs = calc(xs, d + 1 /*ATTENTION 3 求+1*/);
                }
                
                for (int a = 1; a < k; ++ a ) {
                    int b = k - a;
                    // cout << " x = " << x << " y = " << y << " d = " << d << " a = " << a << " ls = " << ls[a] << " b = " << b << " rs = " << rs[b] << " val = " << ls[a] * rs[b] * d << endl;
                    res = (res + (LL)ls[a] * rs[b] % MOD * d % MOD) % MOD;
                }
            }
        
        return res;
    }
};
```