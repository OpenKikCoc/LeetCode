## [比赛链接]()


### [1243. 数组变换](https://leetcode.cn/problems/array-transformation/)

略

```c++
    vector<int> transformArray(vector<int>& arr) {
        int n = arr.size();
        vector<int> narr = arr;
        for(;;) {
            bool f = false;
            for(int i = 1; i < n-1; ++i) {
                if(arr[i] > arr[i-1] && arr[i] > arr[i+1]) --narr[i], f = true;
                else if(arr[i] < arr[i-1] && arr[i] < arr[i+1]) ++narr[i], f = true;
            }
            arr = narr;
            if(!f) break;
        }
        return narr;
    }
```

### [1244. 力扣排行榜](https://leetcode.cn/problems/design-a-leaderboard/)


```c++
    unordered_map<int, int> mp;
    multiset<int> s;
    multiset<int>::iterator it;
    Leaderboard() {
        mp.clear();
        s.clear();
    }
    
    void addScore(int playerId, int score) {
        if(mp[playerId]) s.erase(s.find(-mp[playerId]));
        mp[playerId] += score;
        s.insert(-mp[playerId]);
    }
    
    int top(int K) {
        int res = 0;
        for(it = s.begin(); K--; ++it) res += *it;
        return -res;
    }
    
    void reset(int playerId) {
        s.erase(s.find(-mp[playerId]));
        mp[playerId] = 0;
    }
```

### [1245. 树的直径](https://leetcode.cn/problems/tree-diameter/)

树 DP

```c++
    vector<vector<int>> es;
    int res;
    int dfs(int u, int fa) {
        int ret = 0, mx1 = 0, mx2 = 0;
        for(auto & v : es[u]) {
            if(v == fa) continue;
            int d = dfs(v, u)+1;
            if(d > mx1) mx2 = mx1, mx1 = d;
            else if(d > mx2) mx2 = d;
        }
        res = max(res, mx1 + mx2);
        return mx1;
    }
    int treeDiameter(vector<vector<int>>& edges) {
        es.resize(10000);
        for(auto & e : edges) {
            es[e[0]].push_back(e[1]);
            es[e[1]].push_back(e[0]);
        }
        res = 0;
        dfs(0, -1);
        return res;
    }
```

### [1246. 删除回文子数组](https://leetcode.cn/problems/palindrome-removal/)

区间dp

```c++
    const int inf = 0x3f3f3f3f;
    int minimumMoves(vector<int>& arr) {
        int n = arr.size();
        vector<vector<int>> f(n+1, vector<int>(n+1, inf));
        for(int i = 1; i <= n; ++i) f[i][i] = 1;
        for(int len = 2; len <= n; ++len)
            for(int l = 1; l+len-1 <= n; ++l) {
                int r = l+len-1;
                for(int k = l; k < r; ++k) f[l][r] = min(f[l][r], f[l][k] + f[k+1][r]);
                if(arr[l-1] == arr[r-1])
                    if(len == 2) f[l][r] = 1;
                    else f[l][r] = min(f[l][r], f[l+1][r-1]);
            }
        return f[1][n];
    }
```
