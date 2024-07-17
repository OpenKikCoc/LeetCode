## [比赛链接](https://leetcode.cn/contest/weekly-contest-173/)


### [1332. 删除回文子序列](https://leetcode.cn/problems/remove-palindromic-subsequences/)

有点脑筋急转弯 其实只有两个字符 且删除的是回文 `子序列` 意味着最多两次就可以删干净（因为把每一个字母删一次）

返回值：  ` 回文 OR 只有一个字母(这种情况本质上也是回文) ` ?  ` 1`  : ` 2 `

```c++
    int removePalindromeSub(string s) {
        int n = s.size();
        if(!n) return 0;
        for(int i = 0; i < n/2; ++i)
            if(s[i] != s[n-i-1]) return 2;
        return 1;
    }
```


### [1333. 餐厅过滤器](https://leetcode.cn/problems/filter-restaurants-by-vegan-friendly-price-and-distance/)

利用pair特性简单排序即可

```c++
    vector<int> filterRestaurants(vector<vector<int>>& restaurants, int veganFriendly, int maxPrice, int maxDistance) {
        vector<pair<int, int>> v;   // rating id 先按rating排再按id
        for(auto r : restaurants) {
            if(!r[2] && veganFriendly) continue;
            if(r[3] > maxPrice) continue;
            if(r[4] > maxDistance) continue;
            v.push_back({r[1], r[0]});
        }
        sort(v.begin(), v.end());
        vector<int> res;
        int n = v.size();
        for(int i = n-1; i >= 0; --i) {
            //cout <<"i="<<i<<" rating="<<v[i].first<<" id="<<v[i].second<<endl;
            res.push_back(v[i].second);
        }
        return res;
    }
```

### [1334. 阈值距离内邻居最少的城市](https://leetcode.cn/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)

从每一个起点 最多经历距离dis 可以到达的城市数量最少且起点下标最大的节点

每一个点起始 跑最短路 数据范围很小floyd即可 => 得到距离

每一个起点 计算可以到达的数量 为方便拿到起点下标最大的 倒序统计

```c++
    int maxv = 1e9;
    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
        vector<vector<int>> G(n, vector<int>(n, maxv));
        for(auto e : edges) G[e[0]][e[1]] = G[e[1]][e[0]] = e[2];
        for(int i = 0; i < n; ++i) G[i][i] = 0;
        for(int k = 0; k < n; ++k)
            for(int i = 0; i < n; ++i)
                for(int j = 0; j < n; ++j)
                    G[i][j] = min(G[i][j], G[i][k]+G[k][j]);
        unordered_map<int, int> m;
        int minc = INT_MAX;
        for(int i = n-1; i >= 0; --i) {
            int cnt = 0;
            for(int j = 0; j < n; ++j) if(j != i) {
                if(G[i][j] <= distanceThreshold) ++cnt;
            }
            if(cnt >= minc) continue;
            minc = min(minc, cnt);
            m[cnt] = i;
        }
        return m[minc];
    }
```

### [1335. 工作计划的最低难度](https://leetcode.cn/problems/minimum-difficulty-of-a-job-schedule/)

把 n 个 job 分成连续的 d 段，每一段的代价是本段最大数值的值

线性dp即可

```c++
    // 线性dp 第i个工作作为第j天结束 返回 dp[n][d];
    // dp[i][j] = min(dp[i][j], dp[k][j-1] + max(k+1...i));   // j-1 < k < i
    int minDifficulty(vector<int>& jobDifficulty, int d) {
        int n = jobDifficulty.size();
        if(n < d) return -1;
        vector<vector<int>> dp(n+1, vector<int>(d+1, INT_MAX));
        dp[0][0] = 0;
        
        for(int i = 1; i <= n; ++i) {                               // 第i天
            for(int j = 1; j <= i && j <= d; ++j) {                 // 作为第j天的结束 1 <= j <= min(i,d);
                for(int k = j-1; k < i; ++k) {                      // 选择j-1天结束的位置k  j-1 <= k < i
                    if(dp[k][j-1] == INT_MAX) continue;             // 不可能直接跳过 否则会有 INT_MAX+v
                    int maxv = INT_MIN;
                    // 从 k+1 ~ i 选择最大的作为本天的消耗
                    for(int p = k+1; p <= i; ++p) maxv = max(maxv, jobDifficulty[p-1]);
                    dp[i][j] = min(dp[i][j], dp[k][j-1]+maxv);
                    //cout<<"i="<<i<<" j="<<j<<" k="<<k<<" dp["<<k<<"]["<<j-1<<"]="<<dp[k][j-1]<<" maxv="<<maxv<<" dp[i][j]="<<dp[i][j]<<endl;
                }
            }
        }
        return dp[n][d];
    }
```

这里每次都计算了 k+1 ~ i 的最大值 也可以预处理减少一些复杂度 这里的数据范围 预处理不太重要