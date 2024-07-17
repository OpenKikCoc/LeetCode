## [比赛链接](https://leetcode.cn/contest/biweekly-contest-126/)

>   virtual rank: 223 / 3234  1:42:57
>   0:02:30 / 0:11:49 / 0:28:27  1 / 1:12:57  5


### [3079. 求出加密整数的和](https://leetcode.cn/problems/find-the-sum-of-encrypted-integers/)



```c++
class Solution {
public:
    int sumOfEncryptedInt(vector<int>& nums) {
        int res = 0;
        for (auto & x : nums) {
            string t = to_string(x);
            char mx = '0';
            for (auto c : t)
                mx = max(mx, c);
            for (auto & c : t)
                c = mx;
            int v = stoi(t);
            res += v;
        }
        return res;
    }
};
```


### [3080. 执行操作标记数组中的元素](https://leetcode.cn/problems/mark-elements-on-array-by-performing-queries/)

模拟即可

```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;
    
    const static int N = 1e5 + 10;
    
    bool st[N];
    
    vector<long long> unmarkedSumArray(vector<int>& nums, vector<vector<int>>& queries) {
        int n = nums.size();
        vector<PII> xs;
        LL sum = 0; memset(st, 0, sizeof st);
        {
            for (int i = 0; i < n; ++ i ) {
                int x = nums[i];
                xs.push_back({x, i});
                sum += x;
            }
            sort(xs.begin(), xs.end());
        }
        
        vector<LL> res;
        int p = 0;
        for (auto & q : queries) {
            int index = q[0], k = q[1];
            if (!st[index]) {   // not marked yet
                st[index] = true;
                sum -= nums[index];
            }
            for (int i = 0; i < k; ++ i ) {
                while (p < n && st[xs[p].second])
                    p ++ ;
                if (p < n) {
                    sum -= xs[p].first;
                    st[xs[p].second] = true;
                    p ++ ;
                } else
                    break;
            }
            res.push_back(sum);
        }
        return res;
    }
};
```

### [3081. 替换字符串中的问号使分数最小](https://leetcode.cn/problems/replace-question-marks-in-string-to-minimize-its-value/)

贪心 推导与证明

注意 需要满足字典序最小

```c++
class Solution {
public:
    // 考虑多种字符 每个字符带来的开销只与整个其出现总数相关 所以天然选最小的就可以
    using PII = pair<int, int>;
    
    string minimizeStringValue(string s) {
        // cnt less, char less
        priority_queue<PII, vector<PII>, greater<PII>> heap;
        
        int cnt[26], tot = 0;
        for (auto c : s)
            if (c != '?')
                cnt[c - 'a'] ++ ;
            else
                tot ++ ;
        
        for (int i = 0; i < 26; ++ i )
            heap.push({cnt[i], i});
        
        string t;
        while (tot -- ) {
            auto [cnt, chr] = heap.top(); heap.pop();
            t.push_back('a' + chr);
            heap.push({cnt + 1, chr});
        }
        sort(t.begin(), t.end());   // ATTENTION
        
        int p = 0;
        for (auto & c : s)
            if (c == '?')
                c = t[p ++ ];
        
        return s;
    }
};
```

### [3082. 求出所有子序列的能量和](https://leetcode.cn/problems/find-the-sum-of-the-power-of-all-subsequences/)

显然无法枚举 考虑每个数字组合的贡献 两种思路

-   依次考虑每个数字 0-1 背包
-   分类所有数字 多重背包

多重背包需要结合数据范围 分两次统计得到正确的值

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 110, M = 10010, MOD = 1e9 + 7;
    
    LL C[N][N];
    void init() {
        for (int i = 0; i < N; ++ i )
            for (int j = 0; j <= i; ++ j )
                if (!j)
                    C[i][j] = 1;
                else
                    C[i][j] = (C[i - 1][j] + C[i - 1][j - 1]) % MOD;
    }
    
    LL qpow(int a, int b) {
        LL ret = 1;
        while (b) {
            if (b & 1)
                ret = (ret * a) % MOD;
            a = LL(a) * a % MOD;
            b >>= 1;
        }
        return ret;
    }
    
    int cnt[M];
    LL f[N][M];
    
    int sumOfPower(vector<int>& nums, int k) {
        init();
        
        memset(cnt, 0, sizeof cnt);
        for (auto x : nums)
            cnt[x] ++ ;
        
        memset(f, 0, sizeof f);
        f[0][0] = 1;
        for (int i = 1; i < N; ++ i ) {     // ATTENTION: N
            int count = cnt[i];
            
            for (int j = 0; j < N; ++ j )   // ATTENTION: N
                for (int c = 0; c <= count && c * i <= j; ++ c )
                    f[i][j] = (f[i][j] + f[i - 1][j - c * i] * C[count][c] % MOD * qpow(2, count - c) % MOD) % MOD;
        }
        
        LL res = f[N - 1][k];
        for (int i = N; i < M; ++ i ) {
            int count = cnt[i];
            res = (res * qpow(2, count)) % MOD;
        }

        return res;
    }
};
```
