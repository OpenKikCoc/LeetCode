## [比赛链接](https://leetcode.cn/contest/biweekly-contest-137/)


###  [3254. 长度为 K 的子数组的能量值 I](https://leetcode.cn/problems/find-the-power-of-k-size-subarrays-i/) 



```c++
// 同下
```


###  [3255. 长度为 K 的子数组的能量值 II](https://leetcode.cn/problems/find-the-power-of-k-size-subarrays-ii/) 



```c++
class Solution {
public:
    vector<int> resultsArray(vector<int>& nums, int k) {
        int n = nums.size();
        
        vector<int> res(n - k + 1, -1);
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n && nums[j] == nums[j - 1] + 1)
                j ++ ;
            
            if (j - i >= k) {
                for (int x = i + k - 1; x < j; ++ x )
                    res[x - k + 1] = nums[x];
            }
            i = j - 1;
        }
        return res;
    }
};
```

###  [3256. 放三个车的价值之和最大 I](https://leetcode.cn/problems/maximum-value-sum-by-placing-three-rooks-i/) 



```c++
// 同下
```

###  [3257. 放三个车的价值之和最大 II](https://leetcode.cn/problems/maximum-value-sum-by-placing-three-rooks-ii/) [TAG]

根据数据范围求解

重点在于 update 维护逻辑【每一行只能存一个】

```c++
class Solution {
public:
    using LL = long long;
    using PLI = pair<LL, int>;
    const static int N = 510;

    int m, n;
    PLI l[N][3], r[N][3];

    void update(PLI f[], vector<int> & b) {
        for (int j = 1; j <= b.size(); ++ j ) {
            int x = b[j - 1];
            if (x > f[0].first) {
                // ATTENTION WA 注意f[0]是否要传导影响f[1] 取决于j,f[0].second
                // f[2] = f[1], f[1] = f[0];
                if (j != f[0].second) {
                    // WA: f[2] = f[1], f[1] = f[0];
                    if (j != f[1].second)   // 需要判断
                        f[2] = f[1];
                    f[1] = f[0];
                }
                f[0] = {x, j};
            } else if (x > f[1].first && j != f[0].second) {
                if (j != f[1].second)       // 同样
                    f[2] = f[1];
                f[1] = {x, j};
            } else if (x > f[2].first && j != f[0].second && j != f[1].second)
                f[2] = {x, j};
        }
    }

    long long maximumValueSum(vector<vector<int>>& board) {
        this->m = board.size(), this->n = board[0].size();

        l[0][0] = l[0][1] = l[0][2] = {-1e15, 0};
        for (int i = 1; i <= m; ++ i ) {
            l[i][0] = l[i - 1][0];
            l[i][1] = l[i - 1][1];
            l[i][2] = l[i - 1][2];
            update(l[i], board[i - 1]);
        }

        r[m + 1][0] = r[m + 1][1] = r[m + 1][2] = {-1e15, 0};
        for (int i = m; i >= 1; -- i ) {
            r[i][0] = r[i + 1][0];
            r[i][1] = r[i + 1][1];
            r[i][2] = r[i + 1][2];
            update(r[i], board[i - 1]);
        }

        LL res = -1e15;
        for (int i = 1; i <= m; ++ i )
            for (int j = 1; j <= n; ++ j )
                for (int x = 0; x < 3; ++ x )
                    for (int y = 0; y < 3; ++ y ) {
                        auto [v1, j1] = l[i - 1][x];
                        auto [v2, j2] = r[i + 1][y];
                        if (j1 == j || j2 == j || j1 == j2)
                            continue;
                        // cout << " i = " << i << " j = " << j << " x = " << x << " y = " << y << " v1 = " << v1 << " v2 = " << v2 << " tot = " << v1 + v2 + board[i - 1][j - 1] << endl;
                        res = max(res, v1 + v2 + board[i - 1][j - 1]);
                    }
        return res;
    }
};
```
