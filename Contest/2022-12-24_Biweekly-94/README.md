## [比赛链接](https://leetcode.cn/contest/biweekly-contest-94/)

> virtual rank: 195 / 2298


### [2511. 最多可以摧毁的敌人城堡数目](https://leetcode.cn/problems/maximum-enemy-forts-that-can-be-captured/)



```c++
class Solution {
public:
    int captureForts(vector<int>& forts) {
        int n = forts.size();
        int res = 0;
        for (int i = 0; i < n; ++ i ) {
            if (forts[i])
                continue;
            int j = i;
            while (j < n && !forts[j])
                j ++ ;
            
            int w = j - i;
            // cout << " i = " << i << "  j = " << j << " w = " << w << endl;
            
            bool flag = false;
            if (i > 0 && j < n) {
                if (forts[i - 1] == -1 && forts[j] == 1)
                    flag = true;
                if (forts[i - 1] == 1 && forts[j] == -1)
                    flag = true;
            }
            if (flag)
                res = max(res, w);
            i = j - 1;
        }
        return res;
    }
};
```


### [2512. 奖励最顶尖的 K 名学生](https://leetcode.cn/problems/reward-top-k-students/)

理解错题意 wa1

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    unordered_set<string> add, sub;
    
    vector<int> topStudents(vector<string>& positive_feedback, vector<string>& negative_feedback, vector<string>& report, vector<int>& student_id, int k) {
        for (auto s : positive_feedback)
            add.insert(s);
        for (auto s : negative_feedback)
            sub.insert(s);
        
        unordered_map<int, int> hash;
        int n = report.size();
        for (int i = 0; i < n; ++ i ) {
            int t = 0;
            string s;
            stringstream ss(report[i]);
            while (ss >> s) {
                if (add.count(s)) {
                    t += 3;
                } else if (sub.count(s)) {
                    t += -1;
                }
            }
            hash[student_id[i]] += t;
        }
        
        vector<PII> xs;
        for (auto [k, v] : hash)
            xs.push_back({k, v});
        sort(xs.begin(), xs.end(), [](const PII & a, const PII & b) {
            if (a.second == b.second)
                return a.first < b.first;
            return a.second > b.second;
        });
        
        // for (int i = 0; i < xs.size(); ++ i )
        //     cout << " i = " << i << " id = " << xs[i].first << " score = " << xs[i].second << endl;
        
        vector<int> res;
        for (int i = 0; i < xs.size() && i < k; ++ i )
            res.push_back(xs[i].first);
        return res;
    }
};
```

### [2513. 最小化两个数组中的最大值](https://leetcode.cn/problems/minimize-the-maximum-of-two-arrays/)

二分即可

重点是理清楚二分校验逻辑

```c++
class Solution {
public:
    // 本质是容斥
    // 假定答案为 n 则 n 以内不能给 n1 的有 x1 个，不能给 n2 的有 x2 个，两个都不能的有 x3 个
    // 则可以用的数量为  个
    
    using LL = long long;
    
    LL d1, d2, lcm, u1, u2;
    
    bool check(LL m) {
        LL x1 = m / d1, x2 = m / d2, x3 = m / lcm;
        x1 -= x3, x2 -= x3;
        m -= x1 + x2 + x3;
        return m >= max(0ll, u2 - x1) + max(0ll, u1 - x2);
    }
    
    int minimizeSet(int divisor1, int divisor2, int uniqueCnt1, int uniqueCnt2) {
        this->d1 = divisor1, this->d2 = divisor2, this->u1 = uniqueCnt1, this->u2 = uniqueCnt2;
        this->lcm = d1 / __gcd(d1, d2) * d2;
        
        LL l = 0ll, r = (LL)1e12;
        while (l < r) {
            LL m = l + (r - l) / 2;
            if (check(m))
                r = m;
            else
                l = m + 1;
        }
        return l;
    }
};
```

### [2514. 统计同位异构字符串数目](https://leetcode.cn/problems/count-anagrams/)

标准 可重集排列问题

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10, MOD = 1e9 + 7;
    
    LL f[N], g[N];
    LL qmi(int a, int k) {
        LL ret = 1;
        while (k) {
            if (k & 1)
                ret = (LL)ret * a % MOD;
            a = (LL)a * a % MOD;
            k >>= 1;
        }
        return ret;
    }
    void init() {
        f[0] = g[0] = 1;
        for (int i = 1; i < N; ++ i ) {
            f[i] = f[i - 1] * (LL)i % MOD;
            g[i] = g[i - 1] * qmi(i, MOD - 2) % MOD;
        }
    }
    
    LL get(string & s) {
        unordered_map<char, int> hash;
        for (auto c : s)
            hash[c] ++ ;
        
        LL ret = f[s.size()] % MOD;
        for (auto [k, v] : hash)
            ret = ret * g[v] % MOD;
        return ret;
    }
    
    int countAnagrams(string s) {
        init();
        
        stringstream ss(s);
        string t;
        LL res = 1;
        while (ss >> t)
            res = (res * get(t)) % MOD;
        return res;
    }
};
```
