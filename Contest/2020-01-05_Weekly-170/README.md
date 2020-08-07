## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-170/)

整体很简单 都是裸题


### [1309. 解码字母到整数映射](https://leetcode-cn.com/problems/decrypt-string-from-alphabet-to-integer-mapping/)

后两个位置是 `#` 的时候处理即可

```c++
    string freqAlphabets(string s) {
        int n = s.size();
        int v = 0;
        string res;
        for(int i = 0; i < n; ++i) {
            if(s[i] == '#') continue;
            if(i+2 >= n || s[i+2] != '#') {
                res.push_back('a'+(s[i]-'1'));
            } else {
                v = (s[i]-'0')*10 + s[i+1]-'1';
                res.push_back('a'+v);
                ++i;
            }
        }
        return res;
    }
```


### [1310. 子数组异或查询](https://leetcode-cn.com/problems/xor-queries-of-a-subarray/)

裸前缀和

```c++
    vector<int> xorQueries(vector<int>& arr, vector<vector<int>>& queries) {
        int n = arr.size();
        vector<int> x(n+1);
        for(int i = 1; i <= n; ++i) {
            x[i] = x[i-1]^arr[i-1];
        }
        vector<int> res;
        int l, r;
        for(auto q : queries) {
            l = q[0], r = q[1];
            res.push_back(x[r+1]^x[l]);
        }
        return res;
    }
```

### [1311. 获取你好友已观看的视频](https://leetcode-cn.com/problems/get-watched-videos-by-your-friends/)

模拟 裸的BFS

建图 先BFS得到该层节点 再扫节点统计节目个数 排序即可

```c++
vector<string> watchedVideosByFriends(vector<vector<string>>& watchedVideos, vector<vector<int>>& friends, int id, int level) {
    int vnum = watchedVideos.size(), n = friends.size();
    vector<vector<bool>> frs(n, vector<bool>(n));
    for(int i = 0; i < n; ++i) {
        for(auto v : friends[i]) frs[i][v] = frs[v][i] = true;
    }
    vector<bool> vis(n);
    queue<int> q;
    q.push(id);
    vis[id] = true;
    while(!q.empty() && level--) {
        int sz = q.size();
        while(sz--) {
            int u = q.front(); q.pop();
            for(int v = 0; v < n; ++v) if(frs[u][v] && !vis[v]) {
                vis[v] = true;
                q.push(v);
            }
        }
        //--level;
    }
    unordered_map<string, int> m;
    while(!q.empty()) {
        int x = q.front(); q.pop();
        for(auto v : watchedVideos[x]) m[v]++;
    }
    vector<pair<int, string>> ves;
    for(auto& p : m) {
        ves.push_back({p.second, p.first});
    }
    sort(ves.begin(), ves.end());
    vector<string> res;
    for(auto& p : ves) {
        res.push_back(p.second);
    }
    return res;
}
```

### [1312. 让字符串成为回文串的最少插入次数](https://leetcode-cn.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/)

裸最长公共子序列

设 `总长 n ` ，原串与其逆序串的最长公共子序列长度为 `x` 

显然有：`n - x` 为非回文部分的长度，也即需要插入使其回文的长度

```c++
    int minInsertions(string s) {
        string ns = s;
        reverse(ns.begin(), ns.end());
        int n = ns.size();
        vector<vector<int>> f(n+1, vector<int>(n+1));
        for(int i = 1; i <= n; ++i) {
            for(int j = 1; j <= n; ++j) {
                if(s[i-1] == ns[j-1]) {
                    f[i][j] = f[i-1][j-1] + 1;
                } else {
                    f[i][j] = max(f[i-1][j], f[i][j-1]);
                }
            }
        }
        return n - f[n][n];
    }
```
