## [比赛链接](https://leetcode.cn/contest/weekly-contest-192/)


### [1470. 重新排列数组](https://leetcode.cn/problems/shuffle-the-array/)

`[x1,x2,...,xn,y1,y2,...,yn]`  ==> `[x1,y1,x2,y2,...,xn,yn]` 模拟即可

```c++
    vector<int> shuffle(vector<int>& nums, int n) {
        vector<int> res;
        for(int i = 0; i < n; ++i) {
            res.push_back(nums[i]);
            res.push_back(nums[i+n]);
        }
        return res;
    }
```


### [5429. 数组中的 k 个最强值](https://leetcode.cn/problems/the-k-strongest-values-in-an-array/)

找到中位数 然后依据中位数重新定义排序规则即可

```c++
    int m;
    vector<int> getStrongest(vector<int>& arr, int k) {
        int n = arr.size();
        sort(arr.begin(), arr.end());
        int mid = (n-1)/2;
        m = arr[mid];
        // [&](int a, int b) 或直接把m传递进去 [m](int a, int b)
        sort(arr.begin(), arr.end(), [&](int a, int b){
            int ca = abs(a-m), cb = abs(b-m);
            return ca == cb ? a > b : ca > cb;
        });
        vector<int> res;
        for(int i = 0; i < k; ++i) res.push_back(arr[i]);
        return res;
    }
```

### [5430. 设计浏览器历史记录](https://leetcode.cn/problems/design-browser-history/)

模拟即可

赛榜大多用的数组，自己用栈的代码如下：

```c++
    stack<string> b, f;
    string now;
    BrowserHistory(string homepage) {
        this->now = homepage;
    }
    
    void visit(string url) {
        b.push(now);
        while(!f.empty()) f.pop();
        now = url;
    }
    
    string back(int steps) {
        string res = now;
        while(steps && !b.empty()) {
            f.push(res);
            res = b.top();
            b.pop();
            --steps;
        }
        now = res;
        return res;
    }
    
    string forward(int steps) {
        string res = now;
        while(steps && !f.empty()) {
            b.push(res);
            res = f.top();
            f.pop();
            --steps;
        }
        now = res;
        return res;
    }
```

数组：

```c++
    int n,m;
    string a[5005];
    BrowserHistory(string homepage) {
        n = m = 0;
        a[0] = homepage;
    }
    
    void visit(string url) {
        a[n=m=m+1] = url;
    }
    
    string back(int steps) {
        steps = min(steps, m);
        m -= steps;
        return a[m];
    }
    
    string forward(int steps) {
        steps = min(steps, n-m);
        m += steps;
        return a[m];
    }
```



### [5431. 给房子涂色 III](https://leetcode.cn/problems/paint-house-iii/)

dp 状态：`dp[i][j][k]`第 i 个房子 用第 j 种颜色此时形成了 k 个街区

```c++
int dp[105][105][25];
const int INF = 0x3f3f3f3f;
class Solution {
public:
    int minCost(vector<int>& houses, vector<vector<int>>& cost, int m, int n, int target) {
        memset(dp, 0x3f, sizeof(dp));
        if(houses[0] == 0) {
            for(int i = 1; i <= n; ++i)
                dp[1][1][i] = cost[0][i - 1];
        } else dp[1][1][houses[0]] = 0;
        for(int i = 1; i < m; ++i) {
            for(int j = 1; j <= target; ++j)
                for(int k = 1; k <= n; ++k) {
                    if(dp[i][j][k] == INF) continue;
                    if(houses[i] == 0) {
                        for(int p = 1; p <= n; ++p) {
                            if(p == k) dp[i + 1][j][k] = min(dp[i + 1][j][k], dp[i][j][k] + cost[i][k - 1]);
                            else if(j + 1 <= target) dp[i + 1][j + 1][p] = min(dp[i + 1][j + 1][p], dp[i][j][k] + cost[i][p - 1]);
                        }
                    } else {
                        if(houses[i] == k) dp[i + 1][j][k] = min(dp[i + 1][j][k], dp[i][j][k]);
                        else if(j + 1 <= target) dp[i + 1][j + 1][houses[i]] = min(dp[i + 1][j + 1][houses[i]], dp[i][j][k]);
                    }
                }
        }
        int ans = INF;
        for(int i = 1; i <= n; ++i)
            ans = min(ans, dp[m][target][i]);
        return ans == INF ? -1 : ans;
    }
};
```

看到一种新判断思路，写法更优雅（但判断耗时），整理如下：

```c++
    int dp[105][22][105];
    int minCost(vector<int>& houses, vector<vector<int>>& cost, int m, int n, int target) {
        for(int i = 0; i <= m; ++i)
            for(int j = 0; j <= n; ++j)
                for(int k = 0; k <= target; ++k)
                    dp[i][j][k] = 1e9;
        for(int j = 1; j <= n; ++j) {
            if(houses[0] && houses[0] != j) continue;
            int c = houses[0] ? 0 : cost[0][j-1];
            dp[1][j][1] = c;
        }
        for(int i = 1; i <= m; ++i) {
            for(int j = 1; j <= n; ++j) {
                if(houses[i-1] && houses[i-1] != j) continue;
                int c = houses[i-1] ? 0 : cost[i-1][j-1];
                for(int k = 1; k <= target; ++k) {
                    for(int l = 1; l <= n; ++l) {
                        if(l == j) dp[i][j][k] = min(dp[i][j][k], dp[i-1][l][k]+c);
                        else dp[i][j][k] = min(dp[i][j][k], dp[i-1][l][k-1]+c);
                    }
                }
            }
        }
        int res = 1e9;
        for(int j = 1; j <= n; ++j) res = min(res, dp[m][j][target]);
        return res == 1e9 ? -1 : res;
    }
```

