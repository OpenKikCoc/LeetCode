## [比赛链接](https://leetcode.cn/contest/weekly-contest-152/)


### [1175. 质数排列](https://leetcode.cn/problems/prime-arrangements/)

数值较大，筛法求质数以及快速乘

```c++
class Solution {
public:
    using LL = long long;
    const int mod = 1e9 + 7;
    
    vector<int> primes;
    
    void init(int n) {
        primes.clear();
        vector<bool> st(n + 1);
        for (int i = 2; i <= n; ++ i ) {
            if (!st[i]) primes.push_back(i);
            for (int j = 0; primes[j] <= n / i; ++ j ) {
                st[i * primes[j]] = true;
                if (i % primes[j] == 0) break;
            }
        }
    }
    
    LL qadd(LL a, int b) {
        LL res = 0;
        while (b) {
            if (b & 1) res = (res + a) % mod;
            a = (a + a) % mod;
            b >>= 1;
        }
        return res;
    }
    
    int numPrimeArrangements(int n) {
        init(n);
        
        int pc = primes.size();
        
        vector<LL> ve(n + 1);
        ve[0] = 1;
        for (int i = 1; i <= n; ++ i )
            ve[i] = qadd(ve[i - 1], i);
        
        return ve[pc] * ve[n - pc] % mod;
    }
};
```


### [1176. 健身计划评估](https://leetcode.cn/problems/diet-plan-performance/)

窗口即可 略

```c++
class Solution {
public:
    using LL = long long;
    int res, l, u;
    LL s;
    
    void f() {
        if (s < l) -- res;
        else if (s > u) ++ res;
    }
    
    int dietPlanPerformance(vector<int>& c, int k, int lower, int upper) {
        int n = c.size();
        res = 0, s = 0; l = lower, u = upper;
        for (int i = 0; i < k; ++ i ) s += c[i];
        f();
        
        for (int i = 1; i + k - 1 < n; ++ i ) {
            s -= c[i - 1];
            s += c[i + k - 1];
            f();
        }
        return res;
    }
};
```

### [1177. 构建回文串检测](https://leetcode.cn/problems/can-make-palindrome-from-substring/)

每修改一个字符，可以消灭两个奇数字符

```c++
class Solution {
public:
    vector<bool> canMakePaliQueries(string S, vector<vector<int>>& queries) {
        int n = S.size();
        vector<vector<int>> s(n + 1, vector<int>(26));
        for (int i = 1; i <= n; ++ i )
            for (int j = 0; j < 26; ++ j )
                s[i][j] = s[i - 1][j] + (j == S[i - 1] - 'a');
        
        vector<bool> res;
        for (auto & q : queries) {
            int l = q[0], r = q[1], k = q[2];
            int odd = 0;
            for (int i = 0; i < 26; ++ i )
                if ((s[r + 1][i] - s[l][i]) % 2) ++ odd;
            // cout << l << ' ' << r << ' ' << odd << endl;
            
            if (odd - k * 2 <= 1) res.push_back(true);
            else res.push_back(false);
        }
        return res;
    }
};
```

### [1178. 猜字谜](https://leetcode.cn/problems/number-of-valid-words-for-each-puzzle/)

位运算即可 注意细节

```c++
class Solution {
public:
    unordered_map<int, int> hash;
    vector<int> findNumOfValidWords(vector<string>& words, vector<string>& puzzles) {
        int n = words.size();
        for (int i = 0; i < n; ++ i ) {
            int v = 0;
            for (auto & c : words[i])
                v |= 1 << (c - 'a');
            hash[v] ++ ;
        }
        
        vector<int> res;
        for (auto & p : puzzles) {
            int base = 1 << (p[0] - 'a');
            int v = 0, cnt = hash.count(base) ? hash[base] : 0;
            for (int i = 1; i < 7; ++ i )
                v |= 1 << (p[i] - 'a');
            
            for (int i = v; i; i = i - 1 & v)
                if (hash.count(i | base))
                    cnt += hash[i | base];
            
            res.push_back(cnt);
        }
        return res;
    }
};
```
