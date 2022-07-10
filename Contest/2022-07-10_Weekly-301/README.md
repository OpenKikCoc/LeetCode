## [比赛链接](https://leetcode.cn/contest/weekly-contest-301)


### [6112. 装满杯子需要的最短总时长](https://leetcode.cn/problems/minimum-amount-of-time-to-fill-cups/) [TAG]

比赛代码

```c++
// 试图优先消耗剩下的较多的
// 随后均匀消耗
class Solution {
public:
    int fillCups(vector<int>& amount) {
        int a = amount[0], b = amount[1], c = amount[2];
        int maxv = max({a, b, c}), minv = min({a, b, c}), midv = a + b + c - maxv - minv;
        int diff = midv - minv, res = diff;
        maxv -= diff, midv -= diff;
        if (maxv >= minv + midv) {
            res += maxv;
        } else {
            int cost = maxv / 2;
            midv -= cost, minv -= maxv - cost;
            // cout << " maxv = " << maxv <<"  midv = " << midv << " minv = " << minv << endl;
            res += maxv;
            res += midv;
        }
        return res;
    }
};
```

可以更简单些

```c++
class Solution {
public:
    int fillCups(vector<int>& amount) {
        int a = amount[0], b = amount[1], c = amount[2];
        int maxv = max({a, b, c}), minv = min({a, b, c}), midv = a + b + c - maxv - minv;
        if (maxv >= midv + minv)
            return maxv;
        // 剩下的一定可以配对，直到只留一个 ==> Why
        // 思考
        return (maxv + midv + minv + 1) / 2;    // sum_of_amount / 2 向上取整
    }
};
```

### [6113. 无限集中的最小数字](https://leetcode.cn/problems/smallest-number-in-infinite-set/)



```c++
class SmallestInfiniteSet {
public:
    const static int N = 1000;
    set<int> S;
    SmallestInfiniteSet() {
        S.clear();
        for (int i = 1; i <= N; ++ i )
            S.insert(i);
    }
    
    int popSmallest() {
        auto x = *S.begin();
        S.erase(S.begin());
        return x;
    }
    
    void addBack(int num) {
        if (!S.count(num))
            S.insert(num);
    }
};

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * SmallestInfiniteSet* obj = new SmallestInfiniteSet();
 * int param_1 = obj->popSmallest();
 * obj->addBack(num);
 */
```

### [6114. 移动片段得到字符串](https://leetcode.cn/problems/move-pieces-to-obtain-a-string/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int l[N], r[N];
    
    string strim(string s) {
        string t;
        for (auto c : s)
            if (c != '_')
                t.push_back(c);
        return t;
    }
    
    bool canChange(string start, string target) {
        if (strim(start) != strim(target))
            return false;
        int n = start.size();
        vector<int> a, b;
        {
            stack<int> st;
            for (int i = n - 1; i >= 0; -- i ) {
                if (start[i] == '_')
                    continue;
                if (start[i] == 'R') {
                    while (st.size())
                        l[st.top()] = i, st.pop();
                } else
                    st.push(i);
            }
            while (st.size())
                l[st.top()] = -1, st.pop();
            for (int i = 0; i < n; ++ i )
                if (start[i] == 'L')
                    a.push_back(i);
        }
        {
            stack<int> st;
            for (int i = 0; i < n; ++ i ) {
                if (start[i] == '_')
                    continue;
                if (start[i] == 'L') {
                    while (st.size())
                        r[st.top()] = i, st.pop();
                } else
                    st.push(i);
            }
            while (st.size())
                r[st.top()] = n, st.pop();
            for (int i = 0; i < n; ++ i )
                if (start[i] == 'R')
                    b.push_back(i);
        }
        for (int i = 0, j = 0, k = 0; i < n; ++ i ) {
            if (target[i] == '_')
                continue;
            if (target[i] == 'L') {
                int id = a[j];
                if (i > id || i < l[id])
                    return false;
                j ++ ;
            } else {
                int id = b[k];
                if (i < id || i > r[id])
                    return false;
                k ++ ;
            }
        }
        return true;
    }
};
```

更优雅的写法

```c++
class Solution {
public:
    using PII = pair<int, int>;
    vector<PII> get(string & s) {
        int n = s.size();
        vector<PII> t;
        for (int i = 0; i < n; ++ i )
            if (s[i] == 'L')
                t.push_back({i, 0});
            else if (s[i] == 'R')
                t.push_back({i, 1});
        return t;
    }

    bool canChange(string start, string target) {
        auto a = get(start), b = get(target);
        if (a.size() != b.size())
            return false;
        
        int m = a.size();
        for (int i = 0; i < m; ++ i ) {
            if (a[i].second != b[i].second)
                return false;
            // 'L'
            if (a[i].second == 0) {
                if (b[i].first > a[i].first)
                    return false;
            } else {
                if (b[i].first < a[i].first)
                    return false;
            }
        }
        return true;
    }
};
```

### [6115. 统计理想数组的数目](https://leetcode.cn/problems/count-the-number-of-ideal-arrays/) [TAG]

先考虑数列无重复数字的情况，显然可以 DP 递推来求每个长度下不同结尾数字的方案数

进一步考虑，在无重复数字情况下，每一种方案按隔板法求有重复数字下的方案数

求和即可

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e4 + 10, M = 15, MOD = 1e9 + 7;  // 对于 1e4 在一个数组内最多存在 log1e4 + 1 = 14 个不同的数
    
    int fact[N], infact[N];
    int qmi(int a, int k, int p) {
        int ret = 1;
        while (k) {
            if (k & 1)
                ret = ((LL)ret * a) % MOD;
            a = (LL)a * a % MOD;
            k >>= 1;
        }
        return ret;
    }
    void init() {
        fact[0] = infact[0] = 1;
        for (int i = 1; i < N; ++ i ) {
            fact[i] = (LL)fact[i - 1] * i % MOD;
            infact[i] = (LL)infact[i - 1] * qmi(i, MOD - 2, MOD) % MOD;
        }
    }
    int C(int x, int y) {
        return (LL)fact[x] * infact[x - y] % MOD * infact[y] % MOD;
    }
    
    int f[M][N];    // 长度为 i 末尾数值为 j 的所有不重复数方案数
    
    int idealArrays(int n, int maxValue) {
        init();
        
        memset(f, 0, sizeof f);
        for (int i = 1; i <= maxValue; ++ i )
            f[1][i] = 1;
        for (int i = 1; i < M - 1; ++ i )
            for (int j = 1; j <= maxValue; ++ j )
                for (int k = 2; k * j <= maxValue; ++ k )   // log
                    f[i + 1][k * j] = (f[i + 1][k * j] + f[i][j]) % MOD;
        
        int res = 0;
        for (int i = 1; i <= n && i < M; ++ i )
            for (int j = 1; j <= maxValue; ++ j )
                // C_{n - 1}^{i - 1} 隔板法
                res = (res + (LL)f[i][j] * C(n - 1, i - 1)) % MOD;
        return res;
    }
};
```
