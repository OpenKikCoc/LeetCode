## [比赛链接](https://leetcode.cn/contest/weekly-contest-326/)

> virtual rank: 114 / 3873
>
> 加快手速


### [2520. 统计能整除数字的位数](https://leetcode.cn/problems/count-the-digits-that-divide-a-number/)



```c++
class Solution {
public:
    int countDigits(int num) {
        int res = 0;
        string s = to_string(num);
        for (auto c : s) {
            int t = c - '0';
            if (num % t == 0)
                res ++ ;
        }
        return res;
    }
};
```


### [2521. 数组乘积中的不同质因数数目](https://leetcode.cn/problems/distinct-prime-factors-of-product-of-array/)



```c++
class Solution {
public:
    const static int N = 1010;
    
    int primes[N], cnt;
    bool st[N];
    void init() {
        for (int i = 2; i < N; ++ i ) {
            if (!st[i])
                primes[cnt ++ ] = i;
            for (int j = 0; primes[j] <= (N - 1) / i; ++ j ) {
                st[primes[j] * i] = true;
                if (i % primes[j] == 0)
                    break;
            }
        }
    }
    
    int distinctPrimeFactors(vector<int>& nums) {
        init();
        unordered_set<int> S;
        for (auto x : nums) {
            for (int j = 0; j < cnt && primes[j] <= x; ++ j ) {
                int p = primes[j];
                if (x % p == 0) {
                    S.insert(p);
                    while (x % p == 0)
                        x /= p;
                }
            }
        }
        return S.size();
    }
};
```

### [2522. 将字符串分割成值不超过 K 的子字符串](https://leetcode.cn/problems/partition-string-into-substrings-with-values-at-most-k/)



```c++
class Solution {
public:
    using LL = long long;
    
    int minimumPartition(string s, int k) {
        int n = s.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            LL x = 0;
            while (j < n && x * 10 + s[j] - '0' <= k) {
                x = x * 10 + s[j] - '0';
                j ++ ;
            }
            if (j == i)
                return -1;
            res ++ ;
            i = j - 1;
        }
        return res;
    }
};
```

### [2523. 范围内最接近的两个质数](https://leetcode.cn/problems/closest-prime-numbers-in-range/)



```c++
class Solution {
public:
    const static int N = 1e6 + 10;
    
    int primes[N], cnt;
    bool st[N];
    void init() {
        cnt = 0;
        for (int i = 2; i < N; ++ i ) {
            if (!st[i])
                primes[cnt ++ ] = i;
            for (int j = 0; primes[j] <= (N - 1) / i; ++ j ) {
                st[primes[j] * i] = true;
                if (i % primes[j] == 0)
                    break;
            }
        }
    }
    
    vector<int> closestPrimes(int left, int right) {
        init();
        
        int p1 = -1, p2 = -1, x = 1e9;
        for (int i = 0; i < cnt; ++ i ) {	// ATTENTION i < cnt
            if (i >= 1 && primes[i] <= right && primes[i - 1] >= left) {
                int t = primes[i] - primes[i - 1];
                if (t < x)
                    p1 = primes[i - 1], p2 = primes[i], x = t;
            }
        }
        return {p1, p2};
    }
};
```
