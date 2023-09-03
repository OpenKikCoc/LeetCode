## [比赛链接](https://leetcode.cn/contest/biweekly-contest-112/)

>   virtual rank
>
>   116 / 2900  0:40:55  0:04:15  0:04:46  0:10:32  0:35:55 1


### [判断通过操作能否让字符串相等 I](https://leetcode.cn/problems/check-if-strings-can-be-made-equal-with-operations-i/)



```c++
class Solution {
public:
    pair<vector<int>, vector<int>> get(string & s) {
        int n = s.size();
        vector<int> a, b;
        for (int i = 0; i < n; ++ i )
            if (i & 1)
                a.push_back(s[i]);
            else
                b.push_back(s[i]);
        sort(a.begin(), a.end());
        sort(b.begin(), b.end());
        return {a, b};
    }
    
    bool canBeEqual(string s1, string s2) {
        auto [a1, b1] = get(s1);
        auto [a2, b2] = get(s2);
        for (int i = 0; i < a1.size(); ++ i )
            if (a1[i] != a2[i])
                return false;
        for (int i = 0; i < b1.size(); ++ i )
            if (b1[i] != b2[i])
                return false;
        return true;
    }
};
```


### [判断通过操作能否让字符串相等 II](https://leetcode.cn/problems/check-if-strings-can-be-made-equal-with-operations-ii/)



```c++
class Solution {
public:
    pair<vector<int>, vector<int>> get(string & s) {
        int n = s.size();
        vector<int> a, b;
        for (int i = 0; i < n; ++ i )
            if (i & 1)
                a.push_back(s[i]);
            else
                b.push_back(s[i]);
        sort(a.begin(), a.end());
        sort(b.begin(), b.end());
        return {a, b};
    }
    
    bool checkStrings(string s1, string s2) {
        auto [a1, b1] = get(s1);
        auto [a2, b2] = get(s2);
        for (int i = 0; i < a1.size(); ++ i )
            if (a1[i] != a2[i])
                return false;
        for (int i = 0; i < b1.size(); ++ i )
            if (b1[i] != b2[i])
                return false;
        return true;
    }
};
```

### [几乎唯一子数组的最大和](https://leetcode.cn/problems/maximum-sum-of-almost-unique-subarray/)



```c++
class Solution {
public:
    using LL = long long;
    
    LL s, diff;
    unordered_map<int, int> h;
    void add(int x) {
        s += x;
        h[x] ++ ;
        if (h[x] == 1)
            diff ++ ;
    }
    void sub(int x) {
        s -= x;
        h[x] -- ;
        if (h[x] == 0)
            diff -- ;
    }
    
    long long maxSum(vector<int>& nums, int m, int k) {
        this->s = 0, this->diff = 0;
        
        int n = nums.size();
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            add(nums[i]);
            if (i - k >= 0)
                sub(nums[i - k]);
            
            if (i >= k - 1) {
                if (diff >= m)
                    res = max(res, s);
            } 
        }
        return res;
    }
};
```

### [统计一个字符串的 k 子序列美丽值最大的数目](https://leetcode.cn/problems/count-k-subsequences-of-a-string-with-maximum-beauty/)

经典组合数 加快速度

```c++
using LL = long long;
using PII = pair<int, int>;
const static int N = 2e5 + 10, M = 30, MOD = 1e9 + 7;

LL qpow(int x, int y) {
    LL ret = 1;
    while (y) {
        if (y & 1)
            ret = ret * x % MOD;
        x = (LL)x * x % MOD;
        y >>= 1;
    }
    return ret;
}

bool flag = false;
int fact[N], infact[N];
void init() {
    if (flag)
        return;
    flag = true;
    fact[0] = infact[0] = 1;
    for (int i = 1; i < N; ++ i ) {
        fact[i] = (LL)fact[i - 1] * i % MOD;
        infact[i] = (LL)infact[i - 1] * qpow(i, MOD - 2) % MOD;
    }
}

LL C(int x, int y) {
    return (LL)fact[x] * infact[y] % MOD * infact[x - y] % MOD;
}


class Solution {
public:
    int c[M];
    int n;
    
    int countKSubsequencesWithMaxBeauty(string s, int k) {
        init();
        memset(c, 0, sizeof c);
        this->n = s.size();
        for (auto ch : s)
            c[ch - 'a'] ++ ;
        
        {
            int cnt = 0;
            for (int i = 0; i < M; ++ i )
                if (c[i])
                    cnt ++ ;
            // cout << " s = " << s << " cnt = " << cnt << endl;
            if (cnt < k)
                return 0;
        }
        
        unordered_map<int, int> h;
        for (int i = 0; i < 26; ++ i )
            if (c[i])
                h[c[i]] ++ ;        // 出现了 x 次的有 y 个
        
        vector<PII> xs;
        for (auto [x, y] : h)
            xs.push_back({x, y});   // 按 x 次数降序排序
        
        sort(xs.begin(), xs.end());
        reverse(xs.begin(), xs.end());
        
        LL res = 1;
        for (auto [x, y] : xs) {
            if (k >= y) {
                // 这么多个(y)必然全选, 每一个都是 x 种可能
                res = res * qpow(x, y) % MOD;
                k -= y;
            } else {
                // 这么多个(y)只挑 k 个选, 每一个都是 x 种可能
                res = res * qpow(x, k) % MOD * C(y, k) % MOD;
                k = 0;
            }
            if (k == 0)
                break;
        }
        return res;
    }
};
```
