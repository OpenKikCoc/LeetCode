## [比赛链接](https://leetcode.cn/contest/biweekly-contest-87/)


### [2409. 统计共同度过的日子数](https://leetcode.cn/problems/count-days-spent-together/)



```c++
class Solution {
public:
    int days[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    
    int get(int m, int d) {
        int ret = 0;
        for (int i = 0; i < m - 1; ++ i )
            ret += days[i];
        ret += d;
        
        // cout << " m = " << m << " d = " << d << " ret = " << ret << endl;
        return ret;
    }
    
    int countDaysTogether(string arriveAlice, string leaveAlice, string arriveBob, string leaveBob) {
        int al_m, al_d, ar_m, ar_d, bl_m, bl_d, br_m, br_d;
        sscanf(arriveAlice.c_str(), "%d-%d", &al_m, &al_d);
        sscanf(leaveAlice.c_str(), "%d-%d", &ar_m, &ar_d);
        sscanf(arriveBob.c_str(), "%d-%d", &bl_m, &bl_d);
        sscanf(leaveBob.c_str(), "%d-%d", &br_m, &br_d);
        
        int al = get(al_m, al_d), ar = get(ar_m, ar_d);
        int bl = get(bl_m, bl_d), br = get(br_m, br_d);
        return max(min(ar, br) - max(al, bl) + 1, 0);
    }
};
```


### [2410. 运动员和训练师的最大匹配数](https://leetcode.cn/problems/maximum-matching-of-players-with-trainers/)

其实完全不需要二分 双指针即可 略

```c++
class Solution {
public:
    vector<int> ps, ts;
    int n, m;
    
    bool check(int mid) {
        if (mid > m)
            return false;
        
        // [0, mid), [m - mid, m)
        for (int i = 0, j = m - mid; i < mid; ++ i , ++ j )
            if (ps[i] > ts[j])
                return false;
        return true;
    }
    
    int matchPlayersAndTrainers(vector<int>& players, vector<int>& trainers) {
        this->ps = players, this->ts = trainers;
        this->n = players.size(), m = trainers.size();
        sort(ps.begin(), ps.end());
        sort(ts.begin(), ts.end());
        
        int l = 0, r = n;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (check(mid))
                l = mid + 1;
            else
                r = mid;
        }
        if (check(l))
            return l;
        return l - 1;
    }
};
```

### [2411. 按位或最大的最小子数组长度](https://leetcode.cn/problems/smallest-subarrays-with-maximum-bitwise-or/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = 32;
    
    int f[N][M];
    
    int check(int l, int r) {
        int st = 0;
        for (int i = 0; i < M; ++ i )
            if (f[l][i] - f[r + 1][i] > 0)
                st += 1 << i;
        // cout << "  l = " << l << " r = " << r << " st = " << st << endl;
        return st;
    }
    
    vector<int> smallestSubarrays(vector<int>& nums) {
        memset(f, 0, sizeof f);
        int n = nums.size();
        for (int i = n; i >= 1; -- i ) {
            int x = nums[i - 1];
            for (int j = 0; j < M; ++ j )
                if (x >> j & 1)
                    f[i][j] = f[i + 1][j] + 1;
                else
                    f[i][j] = f[i + 1][j];
        }
        
        vector<int> res;
        for (int i = 1; i <= n; ++ i ) {
            int st = 0;
            for (int j = 0; j < M; ++ j )
                if (f[i][j])
                    st += 1 << j;
            
            int l = i, r = n;
            while (l < r) {
                int m = l + (r - l) / 2;
                if (check(i, m) != st)
                    l = m + 1;
                else
                    r = m;
            }
            // cout << " i = " << i << " l = " << l << " st = " << st << endl;
            res.push_back(l - i + 1);
        }
        return res;
    }
};
```

更简单的做法 记录右侧上一个 1 的位置

```c++
class Solution {
public:
    const static int N = 32;

    int p[N];

    vector<int> smallestSubarrays(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < N; ++ i )
            p[i] = n;
        
        vector<int> res(n);
        for (int i = n - 1; i >= 0; -- i ) {
            int x = nums[i], t = i;
            for (int j = 0; j < N; ++ j )
                if (x >> j & 1)
                    p[j] = i;
                else if (p[j] != n)
                    t = max(t, p[j]);
            res[i] = t - i + 1;
        }
        return res;
    }
};
```



### [2412. 完成所有交易的初始最少钱数](https://leetcode.cn/problems/minimum-money-required-before-transactions/) [TAG]

贪心 推导

```c++
class Solution {
public:
    using LL = long long;
    
    long long minimumMoney(vector<vector<int>>& transactions) {
        LL sum = 0; // 亏钱的交易
        for (auto & p : transactions) {
            int a = p[0], b = p[1];
            if (a > b)
                sum += a - b;
        }
        
        LL res = 0;
        for (auto & p : transactions) {
            int a = p[0], b = p[1];
            if (a > b)
                // ATTENTION 细节 思考
                res = max(res, sum - (a - b) + a);
            else
                res = max(res, sum + a);
        }
        return res;
    }
};
```
