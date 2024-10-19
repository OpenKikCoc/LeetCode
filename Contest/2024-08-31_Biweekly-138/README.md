## [比赛链接](https://leetcode.cn/contest/biweekly-contest-138/)


### [3270. 求出数字答案](https://leetcode.cn/problems/find-the-key-of-the-numbers/)

模拟的 trick

理清思路 加快速度

```c++
class Solution {
public:
    int generateKey(int num1, int num2, int num3) {
        auto bs = vector<int>{1, 10, 100, 1000};
        auto xs = vector<int>{num1, num2, num3};
        
        string res;
        for (auto b : bs) {
            int minv = 9;
            for (auto & x : xs) {
                int d = x % (b * 10) / b;   // ATTENTION
                minv = min(minv, d);
                x -= d * b / 10;
            }
            res.push_back('0' + minv);
        }
        reverse(res.begin(), res.end());
        return stoi(res);
    }
};
```


### [3271. 哈希分割字符串](https://leetcode.cn/problems/hash-divided-string/)

纯模拟

```c++
class Solution {
public:
    string stringHash(string s, int k) {
        int n = s.size();
        string res;
        for (int i = 0; i < n; i += k ) {
            int cnt = 0;
            for (int j = i; j < i + k; ++ j )
                cnt = (cnt + (s[j] - 'a')) % 26;
            res.push_back('a' + cnt);
        }
        return res;
    }
};
```

### [3272. 统计好整数的数目](https://leetcode.cn/problems/find-the-count-of-good-integers/) [TAG]

经典 回文数生成+组合数学

枚举生成回文串：

-   对于不同串需要去重 (sort + unsorted_set)
-   对于特定串需要排除 0 前缀 (`(n-c[0])*p[n-1]` 随后累除 `p[c[i]]` 实现可重集去重)

```c++
class Solution {
public:
    using LL = long long;

    LL p[11];
    void init() {
        p[0] = 1;
        for (int i = 1; i < 11; ++ i )
            p[i] = p[i - 1] * i;
    }
    
    bool check(LL x, int k) {
        if (x % k)
            return false;
        return true;
        // string s = to_string(x);
        // for (int i = 0, j = s.size() - 1; i < j; ++ i , -- j )
        //     if (s[i] != s[j]) {
        //         cout << " bingo" << endl;
        //         return false;
        //     }
        // return true;
    }

    LL calc(string & s) {
        static int c[10];
        memset(c, 0, sizeof c);
        for (auto x : s)
            c[x - '0'] ++ ;
        
        // 不能以0作为开头 剩下的全排列
        int n = s.size();
        LL ret = (n - c[0]) * p[n - 1];
        // 去重
        for (int i = 0; i < 10; ++ i )
            ret = ret / p[c[i]];    // ATTENTION: c[i]
        return ret;
    }

    long long countGoodIntegers(int n, int k) {
        // WA
        // if (n == 1)
        //     return 10 / k;
        init();
        
        int base = pow(10, (n - 1) / 2);
        int op = (n & 1) ? 10 : 1;
        LL r = pow(10, n);
        
        LL res = 0;
        unordered_set<string> S;
        for (LL i = base; i < r; ++ i ) {
            LL t = i / op;
            LL conbined = i;
            while (t)
                conbined = conbined * 10 + t % 10, t /= 10;
            
            if (conbined >= r)
                break;
            if (check(conbined, k)) {
                string str = to_string(conbined);
                sort(str.begin(), str.end());
                if (S.count(str))
                    continue;
                res += calc(str);
                S.insert(str);
            }
        }
        return res;
    }
};
```

### [3273. 对 Bob 造成的最少伤害](https://leetcode.cn/problems/minimum-amount-of-damage-dealt-to-bob/)

经典 贪心排序 => 相邻交换法

加快推导速度

```c++
class Solution {
public:
    using LL = long long;
    // using PII = pair<int, int>;
    using PDII = tuple<double, int, int>;
    
    long long minDamage(int power, vector<int>& damage, vector<int>& health) {
        int n = damage.size();
        vector<PDII> xs;
        for (int i = 0; i < n; ++ i ) {
            int d = damage[i], t = (health[i] + power - 1) / power;
            double f = (double)d / t;
            xs.push_back({f, d, t});
        }
        sort(xs.begin(), xs.end(), [](const PDII & a, const PDII & b) {
            // ATTENTION 并非直接按照 damage 的降序排序
            // 实际上，需要考虑影响时间。对于下面的 case 显然先选择第二个是最优的
            // 62
            // [80,79]
            // [86,13] => [2, 1] (按照时间算)
            //
            // a1/a2 >= b1/b2
            // a1*b2 >= b1*a2
            // return (LL)a.first * b.second >= (LL)b.first * a.second;
            return get<0>(a) > get<0>(b);
        });
        
        LL res = 0, sum = 0;
        for (auto [_, d, t] : xs) {
            sum += t;
            res += sum * d;
        }
        return res;
    }
};
```
