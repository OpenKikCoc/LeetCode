## [比赛链接](https://leetcode.cn/contest/biweekly-contest-109/)

>   virtual rank
>
>   113 / 2461
>   0:03:26
>   0:13:38
>   0:16:22
>   0:39:16


### [2784. 检查数组是否是好的](https://leetcode.cn/problems/check-if-array-is-good/)



```c++
class Solution {
public:
    bool isGood(vector<int>& nums) {
        {
            int maxv = 0;
            for (auto x : nums)
                maxv = max(maxv, x);
            if (nums.size() != maxv + 1)
                return false;
        }
        
        sort(nums.begin(), nums.end());
        int n = nums.size();
        for (int i = 0; i < n - 2; ++ i )
            if (nums[i] != i + 1)
                return false;
        if (nums[n - 2] != n - 1 || nums[n - 1] != n - 1)
            return false;
        return true;
    }
};
```


### [2785. 将字符串中的元音字母排序](https://leetcode.cn/problems/sort-vowels-in-a-string/)

直接按 ascii 码排序即可，不需要关心大小写

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    unordered_set<char> S = {'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'};
    
    string sortVowels(string s) {
        int n = s.size();
        vector<PII> xs;
        for (int i = 0; i < n; ++ i )
            if (S.count(s[i]))
                xs.push_back({s[i], i});
        sort(xs.begin(), xs.end());
        
        for (int i = 0, j = 0; i < n; ++ i )
            if (S.count(s[i]))
                s[i] = xs[j ++ ].first;
        return s;
    }
};
```

### [2786. 访问数组中的位置使分数最大](https://leetcode.cn/problems/visit-array-positions-to-maximize-score/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;

    LL f[2]; // 第二维表示最后选择的数的奇偶性

    long long maxScore(vector<int>& nums, int x) {
        memset(f, 0xcf, sizeof f);
        int n = nums.size();
        
        f[nums[0] & 1] = nums[0];

        for (int i = 2; i <= n; ++ i ) {
            int z = nums[i - 1] & 1;

            // 不选
            // f[i][0] = f[i - 1][0], f[i][1] = f[i - 1][1];
            // 选
            LL t = max(f[z] + nums[i - 1], f[!z] + nums[i - 1] - x);
            f[z] = max(f[z], t);
        }
        return max(f[0], f[1]);
    }
};
```

### [2787. 将一个数字表示成幂的和的方案数](https://leetcode.cn/problems/ways-to-express-an-integer-as-sum-of-powers/)

一个比较冗余的状态定义做法

```c++
class Solution {
public:
    // 根据数据范围 次数越高数值范围越小 考虑次数最低的情况值也不会超过 300
    using LL = long long;
    const static int N = 310, MOD = 1e9 + 7;
    
    LL p[N];
    LL f[N][N]; // 总和为 i 上次选的最大为 j 的 方案数
    
    int numberOfWays(int n, int x) {
        int cnt = 0;
        for (int i = 1; i < N; ++ i ) {
            p[i] = 1ll;
            for (int j = 0; j < x; ++ j ) {
                p[i] = p[i] * i;
                if (p[i] > n) {
                    p[i] = -1;
                    break;
                }
            }
            if (p[i] == -1) // optional
                break;
            cnt ++ ;
        }
        // 考虑: 截止到现在 总共有多少个不同值?
        // cout << cnt << endl;
        
        memset(f, 0, sizeof f);
        f[0][0] = 1;   // 1^x=1
        for (int i = 1; i <= n; ++ i ) {
            for (int j = 1; p[j] != -1 && p[j] <= i; ++ j ) {           // 最新选的是 j
                for (int k = 0; k < j & k <= i - p[j]; ++ k ) {         // 上次选的是 k
                    f[i][j] = (f[i][j] + f[i - p[j]][k]) % MOD;
                }
            }
        }
        
        LL res = 0;
        for (int i = 1; i <= n; ++ i )
            res = (res + f[n][i]) % MOD;
        return res;
    }
};
```

实际上直接看作 01 背包即可

```c++
class Solution {
public:
    // 根据数据范围 次数越高数值范围越小 考虑次数最低的情况值也不会超过 300
    using LL = long long;
    const static int N = 310, MOD = 1e9 + 7;
    
    LL p[N];
    LL f[N]; // 总和为 i (上次选的最大为 j 的) 方案数
    
    int numberOfWays(int n, int x) {
        for (int i = 1; i < N; ++ i ) {
            p[i] = 1ll;
            for (int j = 0; j < x; ++ j )
                p[i] = p[i] * i;
        }
        
        // 背包
        f[0] = 1;
        for (int i = 1; i <= n; ++ i )
            for (int j = n; j >= p[i]; -- j )
                f[j] = (f[j] + f[j - p[i]]) % MOD;
        
        return f[n];
    }
};
```

