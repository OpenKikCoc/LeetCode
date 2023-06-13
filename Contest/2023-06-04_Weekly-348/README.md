## [比赛链接](https://leetcode.cn/contest/weekly-contest-348/)


### [2716. 最小化字符串长度](https://leetcode.cn/problems/minimize-string-length/)

略

```c++
class Solution {
public:
    int minimizedStringLength(string s) {
        unordered_set<char> S;
        for (auto c : s)
            S.insert(c);
        return S.size();
    }
};
```


### [2717. 半有序排列](https://leetcode.cn/problems/semi-ordered-permutation/)

略

```c++
class Solution {
public:
    int semiOrderedPermutation(vector<int>& nums) {
        int p1, pn, n = nums.size();
        for (int i = 0; i < n; ++ i )
            if (nums[i] == 1)
                p1 = i;
            else if (nums[i] == n)
                pn = i;
        
        int res = p1 + (n - pn - 1);
        if (p1 >= pn)
            res -- ;
        return res;
    }
};
```

### [2718. 查询后矩阵的和](https://leetcode.cn/problems/sum-of-matrix-after-queries/)

逆序处理思路 略

```c++
class Solution {
public:
    // 思考：显然不能暴力操作
    // 考虑：类似疯狂的馒头的思路，既然正序后面会覆盖前面的，那么逆序则【已经填充过的不会再变】
    // => 问题变为：逆序填充，每次填充时判断能填充多少个空位，则 sum += 空位数 * val
    using LL = long long;
    const static int N = 1e4 + 10;
    
    bool r[N], c[N];
    
    long long matrixSumQueries(int n, vector<vector<int>>& queries) {
        LL res = 0;
        memset(r, 0, sizeof r), memset(c, 0, sizeof c);
        int x = 0, y = 0;   // r_cnt, c_cnt
        
        for (int i = queries.size() - 1; i >= 0; -- i ) {
            int t = queries[i][0], idx = queries[i][1], v = queries[i][2];
            if (t == 0) {
                // 行
                if (r[idx])
                    continue;
                r[idx] = true, x ++ ;
                res += (LL)(n - y) * v;
            } else {
                if (c[idx])
                    continue;
                c[idx] = true, y ++ ;
                res += (LL)(n - x) * v;
            }
        }
        return res;
    }
};
```

### [2719. 统计整数数目](https://leetcode.cn/problems/count-of-integers/)

标准数位 dp

还得写个高精度减法（也可以直接枚举下 num1 是否是一个合法方案）

加快速度

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 30, M = 500, MOD = 1e9 + 7;
    
    LL f[N][M]; // 共计 i 个长度的数字，总和不超过 j 的方案数
    void init() {
        memset(f, 0, sizeof f);
        for (int i = 0; i < N; ++ i )
            f[i][0] = 1;
        for (int i = 1; i < N; ++ i ) {
            for (int j = 1; j < M; ++ j )
                for (int k = 0; k < 10; ++ k )  // 最后一位的数值
                    if (j - k >= 0)
                        f[i][j] = (f[i][j] + f[i - 1][j - k]) % MOD;
        }
        for (int i = 0; i < N; ++ i )
            for (int j = 1; j < M; ++ j )
                f[i][j] = (f[i][j] + f[i][j - 1]) % MOD;
        
        // for (int i = 0; i < 5; ++ i ) {
        //     for (int j = 0; j <= 15; ++ j )
        //         cout << f[i][j] << ' ';
        //     cout << endl;
        // }
    }
    
    LL get(string s, int mx) {
        int n = s.size();
        LL res = 0;
        for (int i = 0; i < s.size(); ++ i ) {
            int x = s[i] - '0';
            for (int j = 0; j < x; ++ j )
                if (mx - j >= 0)
                    res = (res + f[n - i - 1][mx - j]);
            mx -= x;
            if (mx < 0)
                break;
            if (i == n - 1)
                res = (res + 1) % MOD;
        }
        return res;
    }
    
    string sub_one(string s) {
        vector<int> xs;
        for (auto c : s)
            xs.push_back(c - '0');
        reverse(xs.begin(), xs.end());
        
        bool has_sub = false;
        
        vector<int> res;
        for (int i = 0, t = 0; i < xs.size(); ++ i ) {
            t = xs[i] - t;
            if (!has_sub)
                t -= 1, has_sub = true;
            res.push_back((t + 10) % 10);
            if (t < 0)
                t = 1;
            else
                t = 0;
        }
        while (res.size() > 1 && res.back() == 0)
            res.pop_back();
        reverse(res.begin(), res.end());
        
        string ns;
        for (auto x : res)
            ns.push_back('0' + x);
        // cout << " origin = " << s << " got ns = " << ns << endl;
        return ns;
    }
    
    int count(string num1, string num2, int min_sum, int max_sum) {
        init();
        
        LL t1 = (get(num2, max_sum) - get(num2, min_sum - 1) + MOD) % MOD;
        {
            num1 = sub_one(num1);
        }
        LL t2 = (get(num1, max_sum) - get(num1, min_sum - 1) + MOD) % MOD;
        // cout << " t1 = " << t1 << " t2 = " << t2 << endl;
        return (t1 - t2 + MOD) % MOD;
    }
};
```
