## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-203/)


### [1560. 圆形赛道上经过次数最多的扇区](https://leetcode-cn.com/problems/most-visited-sector-in-a-circular-track/)

题意：

 从某个下标 s 延1-n的圈转 k 圈到下标 t ，求经过的最多次数的点，按序号输出。

其实不必模拟 显然易知从 s 开始到 t 的所有点就是答案，因为总比其他所有点多走k圈

因此分 s <= t 和 s > t 两种情况直接输出即可

```c++
    vector<int> mostVisited(int n, vector<int>& rounds) {
        int m = rounds.size();
        int s = rounds[0], t = rounds[m-1];
        vector<int> res;
        if(s <= t) for(int i = s; i <= t; ++i) res.push_back(i);
        else {
            for(int i = 1; i <= t; ++i) res.push_back(i);
            for(int i = s; i <= n; ++i) res.push_back(i);
        }
        return res;
    }
```


### [1561. 你可以获得的最大硬币数目](https://leetcode-cn.com/problems/maximum-number-of-coins-you-can-get/)

容易推出贪心策略：

排序后 Bob 总是从前面拿，Alice 和 你 轮流拿，so直接加即可

```c++
    int maxCoins(vector<int>& piles) {
        int res = 0, n = piles.size()/3;
        sort(piles.begin(), piles.end());
        for(int i = n; i < 3*n; i += 2) res += piles[i];
        return res;
    }
```

### [1562. 查找大小为 M 的最新分组](https://leetcode-cn.com/problems/find-latest-group-of-size-m/)

长度为 n 起始全 0 的串，每次会有一位变成 1（因此共n次操作），求满足存在一个连续长为 m 的最后一个操作的次数。

自己做法：考虑维护 起点->连续1个数

这个做法其实和题解区 O(n) 解法的思路有一点点像：
> 题解区考虑记录 每一个长度区间=>有多少个

```c++
    int findLatestStep(vector<int>& arr, int m) {
        int n = arr.size(), step = 0, res = -1;
        // 如果直接记录个数 显然 o(n^2)会超时
        // 维护int 起始位置 连续个数
        map<int, int> mp;
        map<int, int> vis;
        for(auto v : arr) {
            ++step;
            auto t = mp.lower_bound(v);
            int start = v, cnt = 1;
            if(!mp.empty() && t != mp.begin()) {
                auto [ts, tcnt] = *t;
                auto s = --t; ++t;
                auto [ss, scnt] = *s;
                if(scnt) {
                    if(ss + scnt == v) {
                        mp.erase(s);
                        --vis[scnt];
                        start = ss, cnt = scnt+1;
                    }
                }
            }
            if(!mp.empty() && t != mp.end()) {
                auto [ts, tcnt] = *t;
                if(tcnt) {
                    if(start + cnt == ts) {
                        mp.erase(t);
                        --vis[tcnt];
                        cnt += tcnt;
                    }
                }
            }
            ++vis[cnt];
            if(vis[m]) res = step;
            mp[start] = cnt;
        }
        return res;
    }
```

后续考虑代码优化

也有并查集写法：
```c++
class Solution {
public:
    static const int maxn=100005;
    int par[maxn],sz[maxn],b[maxn];
    int find(int x) {
        return x==par[x]?x:par[x]=find(par[x]);
    }
    int cnt[maxn];
    void merge(int x,int y) {
        int a=find(x),b=find(y);
        if(a!=b) {
            cnt[sz[a]]--;
            cnt[sz[b]]--;
            par[a]=b;
            sz[b]+=sz[a];
            cnt[sz[b]]++;
        }
    }
    
    int findLatestStep(vector<int>& a, int m) {
        int n=a.size();
        for(int i=1;i<=n;++i) par[i]=i,sz[i]=1;
        int ret=0,tp=1;
        for(int i:a) {
            b[i]=1;
            cnt[1]++;
            if(b[i-1]) {
                merge(i,i-1);
            }
            if(b[i+1]) {
                merge(i,i+1);
            }
            if(cnt[m]) ret=tp;
            ++tp;
        }
        if(!ret) return -1;
        return ret;
    }
};

```


### [1563. 石子游戏 V](https://leetcode-cn.com/problems/stone-game-v/) [TAG]

题意理解有问题，其实这题是每次选中点切分成两组。

显然区间DP

```c++
    int stoneGameV(vector<int>& stoneValue) {
        int n = stoneValue.size();
        vector<int> sum(n+1);
        for(int i = 1; i <= n; ++i) sum[i] = sum[i-1] + stoneValue[i-1];
        vector<vector<int>> f(n+1, vector<int>(n+1));
        for(int len = 2; len <= n; ++len)
            for(int l = 1; l+len-1 <= n; ++l) {
                int r = l+len-1;
                for(int k = l; k < r; k++) {
                    int lv = sum[k] - sum[l-1];
                    int rv = sum[r] - sum[k];
                    if(lv > rv) f[l][r] = max(f[l][r], rv+f[k+1][r]);
                    else if(lv < rv) f[l][r] = max(f[l][r], lv+f[l][k]);
                    else f[l][r] = max(f[l][r], max(f[k+1][r], f[l][k])+lv);
                }
            }
        return f[1][n];
    }
```

但直接这样写会超时

(以及记忆化搜索能过)
```c++
int vis[601][601], f[601][601];
int idx = 101, a[10001], sum[10001];

    int dfs(int l, int r) {
        if (l == r) return 0;
        if (vis[l][r] == idx) return f[l][r];
        vis[l][r] = idx;
        int ans = 0;
        for (int i = l; i < r; i ++) {
            int x = sum[i] - sum[l - 1], y = sum[r] - sum[i];
            int tmp = 0;
            if (x > y) tmp = dfs(i + 1, r) + y;
            else if (x < y) tmp = dfs(l, i) + x;
            else tmp = max(dfs(i + 1, r), dfs(l, i)) + x;
            ans = max(ans, tmp);
        }
        return f[l][r] = ans;
    }
    int stoneGameV(vector<int>& stoneValue) {
        int n = (int )stoneValue.size(); ++ idx;
        for (int i = 1; i <= n; i ++) a[i] = stoneValue[i - 1], sum[i] = sum[i - 1] + a[i];
        return dfs(1, n);
    }

```

考虑不用记忆化搜索的优化：
https://leetcode-cn.com/problems/stone-game-v/solution/on2dong-tai-gui-hua-jie-fa-by-huangyuyang/

```c++
const int N = 505;
int s[N][N], g[N][N], f[N][N], mxl[N][N], mxr[N][N];
class Solution {
public:
    int stoneGameV(vector<int>& a) {
        int n = a.size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                f[i][j] = g[i][j] = s[i][j] = 0;
                mxl[i][j] = mxr[i][j] = 0;
            }
        }
        for (int i = 0; i < n; i++) {
            s[i][i] = a[i];
            g[i][i] = i;
            for (int j = i + 1; j < n; j++) {
                s[i][j] = s[i][j - 1] + a[j];
                int now = g[i][j - 1];
                while (s[i][j] - s[i][now] > s[i][now]) {
                    now++;
                }
                g[i][j] = now;
            }
        }
        
        for (int len = 1; len <= n; len++) {
            for (int l = 0; l + len - 1 < n; l++) {
                int r = l + len - 1;
                int mid = g[l][r];
                int ls = s[l][mid];
                int rs = s[mid + 1][r];
                if (ls == rs) {
                    f[l][r] = max(f[l][r], mxl[l][mid]);
                    f[l][r] = max(f[l][r], mxr[mid + 1][r]);
                } else {
                    if (mid > l) {
                        int ls = s[l][mid - 1];
                        f[l][r] = max(f[l][r], mxl[l][mid - 1]);
                    }
                    if (mid < r) {
                        int rs = s[mid + 1][r];
                        f[l][r] = max(f[l][r], mxr[mid + 1][r]);
                    }
                }
                int v = f[l][r] + s[l][r];
                if (l == r) {
                    mxl[l][r] = mxr[l][r] = v;
                } else {
                    mxl[l][r] = max(v, mxl[l][r - 1]);
                    mxr[l][r] = max(v, mxr[l + 1][r]);
                }
            }
        }
        return f[0][n - 1];
    }
};
```
