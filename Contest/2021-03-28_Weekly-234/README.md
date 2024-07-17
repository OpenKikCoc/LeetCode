## [比赛链接](https://leetcode.cn/contest/weekly-contest-234/)

virtual ranking: 91 / 4997

### [1805. 字符串中不同整数的数目](https://leetcode.cn/problems/number-of-different-integers-in-a-string/)

模拟即可

```c++
class Solution {
public:
    int numDifferentIntegers(string word) {
        int n = word.size();
        for (int i = 0; i < n; ++ i )
            if (!isdigit(word[i]))
                word[i] = ' ';
        unordered_set<string> S;
        istringstream in(word);
        string s;
        while (in >> s) {
            reverse(s.begin(), s.end());
            while (s.size() > 1 && s.back() == '0')
                s.pop_back();
            reverse(s.begin(), s.end());
            S.insert(s);
        }
        return S.size();
    }
};
```


### [1806. 还原排列的最少操作步数](https://leetcode.cn/problems/minimum-number-of-operations-to-reinitialize-a-permutation/)

模拟即可 前面在想数学解法花了一些时间

```c++
class Solution {
public:
    int n;
    vector<int> get(vector<int> & t) {
        vector<int> nt(n);
        for (int i = 0; i < n; ++ i )
            if (i % 2)
                nt[i] = t[n / 2 + (i - 1) / 2];
            else
                nt[i] = t[i / 2];
        return nt;
    }
    
    int reinitializePermutation(int n) {
        this->n = n;
        vector<int> t;
        for (int i = 0; i < n; ++ i )
            t.push_back(i);
        auto tar = t;
        int res = 0;
        for (;;) {
            res ++ ;
            auto nt = get(t);
            if (nt == tar)
                break;
            else
                t = nt;
        }
        return res;
    }
};
```

本质上，每一次 `get` 都是一次矩阵映射，显然具有数学性质


推导易知 0 与 n-1 位置的数值永远不变，其余元素有 `f[i] = 2i mod n-1`


要还原序列，则需 `f[i]^k = 2^k*i = i mod n-1`


以 1 为例， `f[1]^k = 2^k = 1 mod n-1` ，故找到最小 k 使得 `2^k = 1 mod n-1` 即可

```c++
class Solution {
public:
    int reinitializePermutation(int n) {
        if (n == 2)
            return 1;

        int k = 1;
        int pow2 = 2;
        while (pow2 != 1) {
            k ++ ;
            pow2 = pow2 * 2 % (n - 1);
        }
        return k;
    }
};
```
 

### [1807. 替换字符串中的括号内容](https://leetcode.cn/problems/evaluate-the-bracket-pairs-of-a-string/)

线性扫描即可

读错题 需要用 `?` 替换而非 `(?)` WA 1

```c++
class Solution {
public:
    string evaluate(string s, vector<vector<string>>& knowledge) {
        unordered_map<string, string> hash;
        for (auto & k : knowledge) {
            auto & key = k[0]; auto & value = k[1];
            hash[key] = value;
        }
        
        int n = s.size();
        string res;
        for (int i = 0; i < n; ++ i )
            if (s[i] != '(')
                res.push_back(s[i]);
            else {
                int j = i + 1;
                while (j < n && s[j] != ')')
                    j ++ ;
                string sub = s.substr(i + 1, j - i - 1);
                if (hash.count(sub))
                    res += hash[sub];
                else
                    res += "?";
                
                i = j;
            }
        return res;
    }
};
```

### [1808. 好因子的最大数目](https://leetcode.cn/problems/maximize-number-of-nice-divisors/)

根据题意显然约数个数定理

又因定理累乘显然需要积最大，同减绳子

忘写快速幂 TLE 1

```c++
class Solution {
public:
    // 根据约数个数定理 对 p 分解
    // 变为剪绳子的题
    using LL = long long;
    const LL MOD = 1e9 + 7;
    
    LL quick_pow(LL x, LL k, LL p) {
        x %= p;
        LL ret = 1;
        while (k) {
            if (k & 1)
                ret = (ret * x) % p;
            x = (x * x) % p;
            k >>= 1;
        }
        return ret;
    }
    
    int maxNiceDivisors(int p) {
        if (p <= 2)
            return p;
        LL res = 1;
        if (p % 3 == 1)
            res *= 4, p -= 4;
        // 需快速幂
        // while (p >= 3)
        //     res = (res * 3) % MOD, p -= 3;
        if (p >= 3) {
            LL k = p / 3;
            res = (res * quick_pow(3, k, MOD)) % MOD;
            p -= k * 3;
        }
        if (p == 2)
            res = (res * 2) % MOD;
        return res;
    }
};
```
