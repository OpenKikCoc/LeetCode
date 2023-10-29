## [比赛链接](https://leetcode.cn/contest/weekly-contest-368/)


### [2908. 元素和最小的山形三元组 I](https://leetcode.cn/problems/minimum-sum-of-mountain-triplets-i/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10, INF = 0x3f3f3f3f;
    
    int l[N], r[N];
    
    int minimumSum(vector<int>& nums) {
        int n = nums.size();
        memset(l, 0x3f, sizeof l), memset(r, 0x3f, sizeof r);
        for (int i = 1; i <= n; ++ i )
            l[i] = min(l[i - 1], nums[i - 1]);
        for (int i = n; i >= 1; -- i )
            r[i] = min(r[i + 1], nums[i - 1]);
        
        int res = INF;
        for (int i = 2; i <= n - 1; ++ i ) {
            int a = l[i - 1], b = r[i + 1], c = nums[i - 1];
            if (c > a && c > b)
                res = min(res, a + b + c);
        }
        return res > INF / 2 ? -1 : res;
    }
};
```


### [2909. 元素和最小的山形三元组 II](https://leetcode.cn/problems/minimum-sum-of-mountain-triplets-ii/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10, INF = 0x3f3f3f3f;
    
    int l[N], r[N];
    
    int minimumSum(vector<int>& nums) {
        int n = nums.size();
        memset(l, 0x3f, sizeof l), memset(r, 0x3f, sizeof r);
        for (int i = 1; i <= n; ++ i )
            l[i] = min(l[i - 1], nums[i - 1]);
        for (int i = n; i >= 1; -- i )
            r[i] = min(r[i + 1], nums[i - 1]);
        
        int res = INF;
        for (int i = 2; i <= n - 1; ++ i ) {
            int a = l[i - 1], b = r[i + 1], c = nums[i - 1];
            if (c > a && c > b)
                res = min(res, a + b + c);
        }
        return res > INF / 2 ? -1 : res;
    }
};
```

### [2910. 合法分组的最少组数](https://leetcode.cn/problems/minimum-number-of-groups-to-create-a-valid-assignment/) [TAG]

枚举的计算复杂度分析

```c++
class Solution {
public:
    vector<int> xs;

    // 按照某个 sz 分组能否得到可行解
    // ATTENTION sz 是下界，可以出现个数为 sz+1 的情况
    bool check(int sz) {
        for (auto x : xs)
            if (x % sz > x / sz)    // ATTENTION 判断规则 (可以等 相当于数量为sz+1)
                return false;
        return true;
    }

    int minGroupsForValidAssignment(vector<int>& nums) {
        // 不关心值具体是啥 只关心出现次数
        unordered_map<int, int> h;
        for (auto x : nums)
            h[x] ++ ;
        
        int minv = 1e9;
        xs.clear();
        for (auto [k, v] : h)
            xs.push_back(v), minv = min(minv, v);
        
        // 已知多个 "次数" 如何分配能够得到可行组
        // 考虑枚举某个分组状况下(大小) 是否能构造出合理方案
        int p;
        for (p = minv; p >= 2; -- p )
            if (check(p))
                break;
        
        int res = 0;
        for (auto x : xs)
            res += (x + p) / (p + 1);   // ATTENTION 向上取整
        return res;
    }
};
```

### [2911. 得到 K 个半回文串的最少修改次数](https://leetcode.cn/problems/minimum-changes-to-make-k-semi-palindromes/) [TAG]

线性 DP + 区间 DP 预处理

注意计算细节

```c++
class Solution {
public:
    const static int N = 210;

    int c[N][N], f[N][N];

    int minimumChanges(string s, int k) {
        int n = s.size();
        
        // 预处理
        // 计算每一个合法区间被修改为半回文串的代价
        // ATTENTION 是模d下不同分组的总开销
        memset(c, 0x3f, sizeof c);

        // 区间 dp 预处理
        for (int d = 1; d < n; ++ d ) {
            // 临时数组 记录当前d形态下的单组的回文开销
            static int t[N][N];
            for (int i = 0; i < N; ++ i )
                t[i][i] = 0;
            // 思考 枚举顺序与数据维护的顺序
            for (int r = d; r < n; ++ r ) {
                int l = r - d;
                t[l][r] = s[l] != s[r];
                for (int k = l - d; k >= 0; k -= d )
                    t[k][r] = t[k + d][r - d] + (s[k] != s[r]);
            }

            /*
            for (int i = 0; i < n - d; ++ i )
                // ATTENTION j = i + d - 1 就会 WA
                for (int j = i + d; j < n; ++ j ) {
                    int len = j - i + 1;
                    if (len % d)
                        continue;
                    
                    int sum = 0;
                    for (int x = 0; x < d; ++ x )
                        sum += t[i + x][j + 1 - d + x];
                    c[i][j] = min(c[i][j], sum);
                }
            */

            // 在d形态下 一段区间内按模d划分后的总开销
            for (int r = d - 1; r < n; ++ r )
                // int w = r - l + 1;
                // ATTENTION w % d == 0 是必要条件
                //
                // ATTENTION 必须要减2个d ==> 否则是单个元素 无法算价值 ==> 思考
                for (int l = r - d + 1 - d; l >= 0; l -= d ) {
                    int sum = 0;
                    for (int x = 0; x < d; ++ x )
                        sum += t[l + x][r - d + 1 + x];
                    c[l][r] = min(c[l][r], sum);
                }
        }

        memset(f, 0x3f, sizeof f);
        f[0][0] = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= k; ++ j )
                // 上一个结束的位置在 p (已经偏移 1-idx)
                // 新带来的开销是 c[p][i - 1]
                for (int p = 0; p < i; ++ p )
                    f[i][j] = min(f[i][j], f[p][j - 1] + c[p][i - 1]);
        return f[n][k];
    }
};
```
