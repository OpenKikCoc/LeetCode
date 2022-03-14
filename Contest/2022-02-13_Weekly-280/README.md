## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-280/)


### [2169. 得到 0 的操作数](https://leetcode-cn.com/problems/count-operations-to-obtain-zero/)

略

```c++
class Solution {
public:
    int countOperations(int num1, int num2) {
        int res = 0;
        while (num1 && num2) {
            if (num1 >= num2)
                num1 -= num2, res ++ ;
            else
                num2 -= num1, res ++ ;
        }
        return res;
    }
};
```


### [2170. 使数组变成交替数组的最少操作数](https://leetcode-cn.com/problems/minimum-operations-to-make-the-array-alternating/)

显然分奇偶位置找到最多的俩 比较即可

加速

```c++
class Solution {
public:
    using PII = pair<int, int>;
    int minimumOperations(vector<int>& nums) {
        int n = nums.size();
        if (n == 1)
            return 0;
        unordered_map<int, int> a, b;
        for (int i = 0; i < n; ++ i )
            if (i & 1)
                b[nums[i]] ++ ;
            else
                a[nums[i]] ++ ;
        
        vector<PII> va, vb;
        for (auto [k, v] : a)
            va.push_back({v, k});
        for (auto [k, v] : b)
            vb.push_back({v, k});
        sort(va.begin(), va.end());
        sort(vb.begin(), vb.end());
        reverse(va.begin(), va.end());
        reverse(vb.begin(), vb.end());
        
        if (va[0].second != vb[0].second)
            return n - va[0].first - vb[0].first;
        else {
            int res = 1e8;
            {
                // va[0] + vb[1]
                res = min(res, n - va[0].first - (vb.size() > 1 ? vb[1].first : 0));
            }
            {
                res = min(res, n - (va.size() > 1 ? va[1].first : 0) - vb[0].first);
            }
            return res;
        }
        return -1;
    }
};
```

### [2171. 拿出最少数目的魔法豆](https://leetcode-cn.com/problems/removing-minimum-number-of-magic-beans/)

前缀和经典应用

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    int cnt[N];
    LL s[N];
    
    long long minimumRemoval(vector<int>& beans) {
        int n = beans.size();
        memset(cnt, 0, sizeof cnt);
        for (auto x : beans)
            cnt[x] ++ ;
        for (int i = 1; i < N; ++ i )
            s[i] = s[i - 1] + (LL)cnt[i] * i;
        for (int i = 1; i < N; ++ i )
            cnt[i] += cnt[i - 1];
        
        LL res = 1e18;
        for (int i = 1; i < N; ++ i ) {
            LL a = s[i - 1], b = s[N - 1] - s[i] - (LL)(cnt[N - 1] - cnt[i]) * i;
            res = min(res, a + b);
        }
        return res;
    }
};
```

更简单的代码

```c++
class Solution {
public:
    using LL = long long;

    long long minimumRemoval(vector<int>& beans) {
        sort(beans.begin(), beans.end());
        LL s = 0;
        for (auto x : beans)
            s += x;
        
        LL res = s;
        int n = beans.size();
        for (int i = 0; i < n; ++ i )
            res = min(res, s - (LL)beans[i] * (n - i));
        return res;
    }
};
```

### [2172. 数组的最大与和](https://leetcode-cn.com/problems/maximum-and-sum-of-array/) [TAG]

ATTENTION部分

```c++
class Solution {
public:
    const static int N = 19, M = 2e4;   // 2e4 -> 3^9
    
    // 考虑前 i 个整数, 篮子可用状态是 j 的最大与和
    int f[N][M];
    
    int maximumANDSum(vector<int>& nums, int numSlots) {
        int n = nums.size(), m = pow(3, numSlots);
        memset(f, 0, sizeof f);
        for (int i = 1; i <= n; ++ i )
            for (int j = 0; j < M; ++ j )
                // 第 i 个数放到第 k 个篮子里, 对应状态范围为 j / w % 3
                for (int k = 1, w = 1; k <= numSlots; ++ k , w *= 3 )
                    // j / w % 3 != 0 说明还可以放
                    if (j / w % 3)
                        // ATTENTION: f[i - 1][mask - 3^(k-1)], 后者表示将第k个篮子对应三进制减一
                        f[i][j] = max(f[i][j], f[i - 1][j - w] + (k & nums[i - 1]));
        return f[n][m - 1];
    }
};
```

```c++
// 空间压缩
class Solution {
public:
    const static int N = 19, M = 2e4;   // 2e4 -> 3^9
    
    int f[M];
    
    int maximumANDSum(vector<int>& nums, int numSlots) {
        int n = nums.size(), m = pow(3, numSlots);
        memset(f, 0, sizeof f);
        for (int i = 1; i <= n; ++ i )
            for (int j = M - 1; j >= 0; -- j )
                for (int k = 1, w = 1; k <= numSlots; ++ k , w *= 3 )
                    if ((j / w % 3) && j - w >= 0)
                        f[j] = max(f[j], f[j - w] + (k & nums[i - 1]));
        return f[m - 1];
    }
};
```

