## [比赛链接](https://leetcode.cn/contest/weekly-contest-401/)


### [3178. 找出 K 秒后拿着球的孩子](https://leetcode.cn/problems/find-the-child-who-has-the-ball-after-k-seconds/)



```c++
class Solution {
public:
    int numberOfChild(int n, int k) {
        int p = 0, d = 1;
        while (k -- ) {
            if (d == 1) {
                if (p == n - 1)
                    d = -1;
                p += d;
            } else {
                if (p == 0)
                    d = 1;
                p += d;
            }
        }
        return p;
    }
};
```


### [3179. K 秒后第 N 个元素的值](https://leetcode.cn/problems/find-the-n-th-value-after-k-seconds/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1010, MOD = 1e9 + 7;
    
    int f[2][N];
    
    int valueAfterKSeconds(int n, int k) {
        for (int i = 0; i < n; ++ i )
            f[0 & 1][i] = 1, f[1 & 1][i] = i + 1;
        
        for (int i = 2; i <= k; ++ i ) {
            LL t = 0, s = f[(i - 1) & 1][0];
            f[i & 1][0] = 1;
            for (int j = 1; j < n; ++ j )
                s = (s + f[(i - 1) & 1][j]) % MOD, f[i & 1][j] = s;
        }
        return f[k & 1][n - 1];
    }
};
```

### [3180. 执行操作可获得的最大总奖励 I](https://leetcode.cn/problems/maximum-total-reward-using-operations-i/)



```c++
class Solution {
public:
    // ATTENTION: 本质是 0-1 背包
    // f[i][j] 考虑前i个数 总和为j 是否可行
    // f[i][j] = f[i - 1][j] || f[i - 1][j - vs[i]]
    
    const static int N = 2010, M = 4010;
    
    bool f[M];
    
    int maxTotalReward(vector<int>& rewardValues) {
        sort(rewardValues.begin(), rewardValues.end());
        int n = rewardValues.size();
        
        f[0] = true;
        for (int i = 0; i < n; ++ i ) {
            int x = rewardValues[i];
            for (int j = 0; j < x; ++ j )
                f[j + x] = f[j + x] || f[j];
        }
        
        for (int j = M - 1; j >= 0; -- j )
            if (f[j])
                return j;
        return -1;
    }
};
```

### [3181. 执行操作可获得的最大总奖励 II](https://leetcode.cn/problems/maximum-total-reward-using-operations-ii/)



```c++
class Solution {
public:
    // 根据题意理解及数据范围 总和一定不会超过 max(rewardValues)*2 => 思考
    // 可以用 bitset 快速维护
    const static int N = 5e4 + 10, M = 1e5 + 10;
    
    bitset<M> f;
    
    int maxTotalReward(vector<int>& rewardValues) {
        int n = rewardValues.size();
        sort(rewardValues.begin(), rewardValues.end());
        
        f[0] = 1;
        for (int i = 0; i < n; ++ i ) {
            int x = rewardValues[i];
            // ATTENTION 重点在于 约束只看较低的 x 位
            // for (int j = 0; j < x; ++ j )
            //     f[j + x] = f[j + x] || f[j];
            
            // ATTENTION: trick
            // 先左移 d 消除前面的 0, 再右移 d 恢复, 最后左移 x 实现状态转移
            int d = M - x;
            // f |= f << d >> d << x;
        }
        
        for (int j = M - 1; j >= 0; -- j )
            if (f[j])
                return j;
        return -1;
    }
};
```
