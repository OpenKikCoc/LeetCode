## [比赛链接](https://leetcode.cn/contest/weekly-contest-294/)


### [2278. 字母在字符串中的百分比](https://leetcode.cn/problems/percentage-of-letter-in-string/)



```c++
class Solution {
public:
    int percentageLetter(string s, char letter) {
        int cnt = 0;
        for (auto c : s)
            if (c == letter)
                cnt ++ ;
        return cnt * 100 / s.size();
    }
};
```


### [2279. 装满石头的背包的最大数量](https://leetcode.cn/problems/maximum-bags-with-full-capacity-of-rocks/)



```c++
class Solution {
public:
    int maximumBags(vector<int>& capacity, vector<int>& rocks, int additionalRocks) {
        int n = capacity.size();
        vector<int> t(n);
        for (int i = 0; i < n; ++ i )
            t[i] = capacity[i] - rocks[i];
        sort(t.begin(), t.end());
        for (int i = 0, j = additionalRocks; i < n; ++ i )
            if (t[i] <= j)
                j -= t[i];
            else
                return i;
        return n;
    }
};
```

### [2280. 表示一个折线图的最少线段数](https://leetcode.cn/problems/minimum-lines-to-represent-a-line-chart/)

注意精度需要足够小

```c++
class Solution {
public:
    using LD = long double;
    // day 互不相同，则斜率一定存在
    
    LD get(vector<int> & p1, vector<int> & p2) {
        LD dy = p2[1] - p1[1], dx = p2[0] - p1[0];
        // cout << " dx = " << dx << " dy = " << dy << " f = " << dy / dx << endl;
        return LD(p2[1] - p1[1]) / LD(p2[0] - p1[0]);
    }
    
    int minimumLines(vector<vector<int>>& ps) {
        if (ps.size() == 1)
            return 0;
        sort(ps.begin(), ps.end());
        int n = ps.size(), res = 1;
        
        LD f = get(ps[1], ps[0]);
        // printf("%lf\n", f);
        for (int i = 2; i < n; ++ i ) {
            LD t = get(ps[i], ps[i - 1]);
        // printf("%lf\n", t);
            if (fabs(t - f) > 1e-18)
            // if (t != f)
                res ++ ;
            f = t;
        }
        return res;
    }
};
```

### [2281. 巫师的总力量和](https://leetcode.cn/problems/sum-of-total-strength-of-wizards/) [TAG]

考虑当前值作为最小值，有哪些区间受影响

显然有单调栈求左右边界，**注意本题数值可能重复，则需要去重（一侧严格小于，另一侧小于等于）**

随后对区间内的所有数组求和即可

**问题在于时间复杂度，显然可以公式转化，使用前缀和的前缀和来 $O(1)$ 查询**

**深刻理解 重复做**

```c++
class Solution {
public:
    // https://leetcode.cn/problems/sum-of-total-strength-of-wizards/solution/ji-suan-mei-ge-shu-zi-zuo-wei-zui-xiao-z-3jvr/
    using LL = long long;
    const static int N = 1e5 + 10, MOD = 1e9 + 7;
    
    int n;
    int stk[N], top;
    int l[N], r[N];
    LL s[N], ss[N]; // 原数组前缀和，以及该前缀和的前缀和
    
    int totalStrength(vector<int>& a) {
        n = a.size();
        
        // 求右侧【严格小于】当前值的位置
        {
            top = 0;
            for (int i = 1; i <= n; ++ i ) {
                while (top && a[stk[top - 1] - 1] > a[i - 1])
                    r[stk[top - 1]] = i, top -- ;
                stk[top ++ ] = i;
            }
            while (top)
                r[stk[top - 1]] = n + 1, top -- ;
        }
        // 求左侧【小于等于】当前值的位置
        {
            top = 0;
            for (int i = n; i >= 1; -- i ) {
                while (top && a[stk[top - 1] - 1] >= a[i - 1])  // ATTENTION >= 去重 其实改任意一侧都可以
                    l[stk[top - 1]] = i, top -- ;
                stk[top ++ ] = i;
            }
            while (top)
                l[stk[top - 1]] = 0, top -- ;
        }
        
        memset(s, 0, sizeof s), memset(ss, 0, sizeof ss);
        for (int i = 1; i <= n; ++ i )
            s[i] = (s[i - 1] + a[i - 1]) % MOD;
        for (int i = 1; i <= n; ++ i )
            ss[i] = (ss[i - 1] + s[i]) % MOD;
        
        LL res = 0;
        for (int i = 1; i <= n; ++ i ) {
            int lv = l[i], rv = r[i];
            LL t = a[i - 1];
            
            // cout << " i = " << i << " lv = " << lv << " rv = " << rv << endl;
            // [lv+1,i], [i,rv-1]
            // 以i为右边界起始点，则：
            // - 每个右边界都被使用 i-lv 次，共计 ss[rv-1]-ss[i-1],
            // - 每个左边界都被使用 rv-i 次，共计 ss[i-1]-ss[lv-1]               // ATTENTION ss[lv-1]
            LL tot = (LL)(i - lv) * (ss[rv - 1] - ss[i - 1]) % MOD - (rv - i) * (ss[i - 1] - (lv ? ss[lv - 1] : 0)) % MOD;
            // cout << " i = " << i << " tot = " << tot << endl;
            // cout << " ... " << (i - lv) << " " << ss[rv-1]-ss[i-1] << " " << rv-i << " " << ss[i-1]-ss[lv] << endl;
            
            res = (res + (tot + MOD) % MOD * t % MOD) % MOD;
            
            /*
            for (int j = lv + 1; j <= i; ++ j )
                for (int k = i; k <= rv - 1; ++ k )
                    res = (res + (s[k] - s[j - 1] + MOD) % MOD * t % MOD) % MOD;
            */
        }
        return res;
    }
};
```
