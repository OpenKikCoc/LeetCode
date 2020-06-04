## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-27/)


### [1460. 通过翻转子数组使两个数组相等](https://leetcode-cn.com/problems/make-two-arrays-equal-by-reversing-sub-arrays/)

两个数组包含元素一致即可

```c++
    bool canBeEqual(vector<int>& target, vector<int>& arr) {
        sort(target.begin(), target.end());
        sort(arr.begin(), arr.end());
        for(int i = 0; i < n1; ++i) if(target[i] != arr[i]) return false;
        return true;
    }
```


### [1461. 检查一个字符串是否包含所有长度为 K 的二进制子串](https://leetcode-cn.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k/)

枚举字符串定长子串即可

```c++
    bool hasAllCodes(string s, int k) {
        int n = s.size();
        int tot = pow(2, k);
        if(n < tot) return false;
        unordered_map<string, bool> m;
        for(int i = 0; i+k <= n; ++i) {
            m[s.substr(i, k)] = true;
        }
        return m.size() == tot;
    }
```

更优的做法 * ：

```c++
public:
    bool f[1<<20];
    bool hasAllCodes(string s, int k) {
        int limit = 1 << k, mask = limit-1, now = 0;
        int ls = s.size();
        fill(f, f+limit, false);
        for (int i = 0; i < ls; i++) {
            now <<= 1; now |= s[i]-'0'; now &= mask;
            if (i >= k-1) {
                f[now] = true;
            }
        }
        for (int i = 0; i < limit; i++) if (!f[i]) return false;
        return true;
    }
```



### [1462. 课程安排 IV](https://leetcode-cn.com/problems/course-schedule-iv/) 

有向图两点连通性 floyd即可

```c++
    vector<bool> checkIfPrerequisite(int n, vector<vector<int>>& prerequisites, vector<vector<int>>& queries) {
        vector<vector<bool>> es(n, vector<bool>(n));
        for(auto e : prerequisites) es[e[0]][e[1]] = true;
        for(int k = 0; k < n; ++k) {
            for(int i = 0; i < n; ++i) {
                for(int j = 0; j < n; ++j) {
                    if(es[i][k] && es[k][j]) es[i][j] = true;
                }
            }
        }
        vector<bool> res;
        for(auto q : queries) {
            if(es[q[0]][q[1]]) res.push_back(true);
            else res.push_back(false);
        }
        return res;
    }
```

### [1463. 摘樱桃 II](https://leetcode-cn.com/problems/cherry-pickup-ii/)

dp 注意非法的状态转移

```c++
    int dx[3] = {-1, 0, 1};
    int cherryPickup(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<vector<int>>> dp(m+1, vector<vector<int>>(n+1, vector<int>(n+1, -1)));
        dp[0][0][n-1] = grid[0][0] + grid[0][n-1];
        for(int i = 1; i < m; ++i)
            for(int l = 0; l < n; ++l) for(int r = l+1; r < n; ++r)
                for(int d1 = 0; d1 < 3; ++d1) for(int d2 = 0; d2 < 3; ++d2) {
                    int p1 = l + dx[d1], p2 = r + dx[d2];
                    if(p1 < 0 || p1 >= n || p2 < 0 || p2 >= n) continue;
                    if(dp[i-1][p1][p2] < 0) continue;	// 重要
                    dp[i][l][r] = max(dp[i][l][r], dp[i-1][p1][p2] + grid[i][l] + grid[i][r]);
                }
        
        int res = 0;
        for(int i = 0; i < n; ++i) for(int j = i + 1; j < n; ++j) res = max(res, dp[m-1][i][j]);
        return res;
    }
```
