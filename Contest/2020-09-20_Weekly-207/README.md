## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-207/)

rating 269/4115

46分钟 3/4 wa2

### [1592. 重新排列单词间的空格](https://leetcode-cn.com/problems/rearrange-spaces-between-words/)

统计模拟即可 注意一个单词的情况 wa了一次

```c++
    string reorderSpaces(string text) {
        int b = 0, n = text.size();
        for(auto c : text) b += (c == ' ');
        istringstream istr(text);
        string s;
        vector<string> ve;
        while(istr >> s) ve.push_back(s);
        int nn = ve.size();
        string res;
        if(nn == 1) {
            res = ve[0];
            while(b--) res.push_back(' ');
        } else {
            int d = b / (nn-1), m = b % (nn-1);
            //cout <<"nn="<<nn << " b="<<b<<" d="<<d<<" m="<<m<<endl;
            for(int i = 0; i < ve.size(); ++i) {
                if(i) for(int j = 0; j < d; ++j) res.push_back(' ');
                res += ve[i];
            }
            while(m--) res.push_back(' ');
        }
        return res;
    }
```


### [1593. 拆分字符串使唯一子字符串的数目最大](https://leetcode-cn.com/problems/split-a-string-into-the-max-number-of-unique-substrings/)

搜索 pos是当前产生的字符串截断的位置

```c++
    // 数据范围16 最多16个字符串
    int res, n;
    vector<string> ss;
    unordered_map<string, bool> mp;
    // pos 是开区间右端点
    void dfs(string& s, int pos) {
        if(pos == s.size()) {
            // 放之前判断 这里一定满足条件 直接返回
            res = max(res, int(ss.size()));
            return;
        }
        for(int i = pos+1; i <= n; ++i) {
            string ns = s.substr(pos, i-pos);
            if(mp[ns]) continue;
            mp[ns] = true;
            ss.push_back(ns);
            dfs(s, i);
            ss.pop_back();
            mp[ns] = false;
        }
    }
    int maxUniqueSplit(string s) {
        res = 0;
        n = s.size();
        dfs(s, 0);
        return res;
    }
```

### [1594. 矩阵的最大非负积](https://leetcode-cn.com/problems/maximum-non-negative-product-in-a-matrix/)

简单dp 忘了取模wa了一发 = =

```c++
    // 最大最小值为 4^30 = 2^60 ll
    typedef long long ll;
    const ll inf = 2e9;
    const ll mod = 1e9+7;
    int maxProductPath(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<ll>> mx(m+1, vector<ll>(n+1, -inf)), mn(m+1, vector<ll>(n+1, inf));
        mx[1][0] = mx[0][1] = 1;
        for(int i = 1; i <= n; ++i) mx[1][i] = mn[1][i] = grid[0][i-1]*mx[1][i-1];
        for(int i = 1; i <= m; ++i) mx[i][1] = mn[i][1] = grid[i-1][0]*mx[i-1][1];
        //cout <<"xxxxx" << mn[1][2]<<" "<<mn[2][1]<<endl;
        for(int i = 2; i <= m; ++i)
            for(int j = 2; j <= n; ++j) {
                if(mx[i-1][j] > -inf) mx[i][j] = max(mx[i][j], mx[i-1][j]*grid[i-1][j-1]);
                if(mx[i][j-1] > -inf) mx[i][j] = max(mx[i][j], mx[i][j-1]*grid[i-1][j-1]);
                if(mn[i-1][j] < inf) mx[i][j] = max(mx[i][j], mn[i-1][j]*grid[i-1][j-1]);
                if(mn[i][j-1] < inf) mx[i][j] = max(mx[i][j], mn[i][j-1]*grid[i-1][j-1]);
                
                if(mx[i-1][j] > -inf) mn[i][j] = min(mn[i][j], mx[i-1][j]*grid[i-1][j-1]);
                if(mx[i][j-1] > -inf) mn[i][j] = min(mn[i][j], mx[i][j-1]*grid[i-1][j-1]);
                if(mn[i-1][j] < inf) mn[i][j] = min(mn[i][j], mn[i-1][j]*grid[i-1][j-1]);
                if(mn[i][j-1] < inf) mn[i][j] = min(mn[i][j], mn[i][j-1]*grid[i-1][j-1]);
                //cout << "i="<<i<<" j="<<j<<" mx="<<mx[i][j]<<" mn="<<mn[i][j]<<endl;
            }
        ll res = max(mx[m][n], mn[m][n]);
        return res < 0 ? -1 : res%mod;
    }
```

### [1595. 连通两组点的最小成本](https://leetcode-cn.com/problems/minimum-cost-to-connect-two-groups-of-points/) [TAG]

想半天二分图。。。

结果很多dp过

二分图的确可以过，先看二分：

>
> [Reducing a minimum cost edge-cover problem to minimum cost weighted bipartie perfect matching](https://cstheory.stackexchange.com/questions/14690/reducing-a-minimum-cost-edge-cover-problem-to-minimum-cost-weighted-bipartie-per)
>
> 当最小带权边覆盖问题的权值均为非负数时，可以转换成最大带权匹配问题
>
> 后者有多项式时间复杂度的解法（例如 KM 算法、最小费用流等）
>

（还是太菜了
 
```c++
template <typename T>
struct hungarian {  // km
  int n;
  vector<int> matchx;  // 左集合对应的匹配点
  vector<int> matchy;  // 右集合对应的匹配点
  vector<int> pre;     // 连接右集合的左点
  vector<bool> visx;   // 拜访数组 左
  vector<bool> visy;   // 拜访数组 右
  vector<T> lx;
  vector<T> ly;
  vector<vector<T> > g;
  vector<T> slack;
  T inf;
  T res;
  queue<int> q;
  int org_n;
  int org_m;

  hungarian(int _n, int _m) {
    org_n = _n;
    org_m = _m;
    n = max(_n, _m);
    inf = numeric_limits<T>::max();
    res = 0;
    g = vector<vector<T> >(n, vector<T>(n));
    matchx = vector<int>(n, -1);
    matchy = vector<int>(n, -1);
    pre = vector<int>(n);
    visx = vector<bool>(n);
    visy = vector<bool>(n);
    lx = vector<T>(n, -inf);
    ly = vector<T>(n);
    slack = vector<T>(n);
  }

  void addEdge(int u, int v, int w) {
    g[u][v] = max(w, 0);  // 负值还不如不匹配 因此设为0不影响
  }

  bool check(int v) {
    visy[v] = true;
    if (matchy[v] != -1) {
      q.push(matchy[v]);
      visx[matchy[v]] = true;  // in S
      return false;
    }
    // 找到新的未匹配点 更新匹配点 pre 数组记录着"非匹配边"上与之相连的点
    while (v != -1) {
      matchy[v] = pre[v];
      swap(v, matchx[pre[v]]);
    }
    return true;
  }

  void bfs(int i) {
    while (!q.empty()) {
      q.pop();
    }
    q.push(i);
    visx[i] = true;
    while (true) {
      while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v = 0; v < n; v++) {
          if (!visy[v]) {
            T delta = lx[u] + ly[v] - g[u][v];
            if (slack[v] >= delta) {
              pre[v] = u;
              if (delta) {
                slack[v] = delta;
              } else if (check(v)) {  // delta=0 代表有机会加入相等子图 找增广路
                                      // 找到就return 重建交错树
                return;
              }
            }
          }
        }
      }
      // 没有增广路 修改顶标
      T a = inf;
      for (int j = 0; j < n; j++) {
        if (!visy[j]) {
          a = min(a, slack[j]);
        }
      }
      for (int j = 0; j < n; j++) {
        if (visx[j]) {  // S
          lx[j] -= a;
        }
        if (visy[j]) {  // T
          ly[j] += a;
        } else {  // T'
          slack[j] -= a;
        }
      }
      for (int j = 0; j < n; j++) {
        if (!visy[j] && slack[j] == 0 && check(j)) {
          return;
        }
      }
    }
  }

  int solve() {
    // 初始顶标
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        lx[i] = max(lx[i], g[i][j]);
      }
    }

    for (int i = 0; i < n; i++) {
      fill(slack.begin(), slack.end(), inf);
      fill(visx.begin(), visx.end(), false);
      fill(visy.begin(), visy.end(), false);
      bfs(i);
    }

    // custom
    for (int i = 0; i < n; i++) {
      if (g[i][matchx[i]] > 0) {
        res += g[i][matchx[i]];
      } else {
        matchx[i] = -1;
      }
    }
    return res;
  }
};

class Solution {
public:
    int connectTwoGroups(vector<vector<int>>& cost) {
        int n = cost.size();
        int m = cost[0].size();
        hungarian<int> hg(n, m);
        vector<int> lmin(n, INT_MAX), rmin(m, INT_MAX);
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                lmin[i] = min(lmin[i], cost[i][j]);
                rmin[j] = min(rmin[j], cost[i][j]);
            }
        }
        int ans = accumulate(lmin.begin(), lmin.end(), 0) + accumulate(rmin.begin(), rmin.end(), 0);
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                hg.addEdge(i, j, lmin[i] + rmin[j] - cost[i][j]);
            }
        }
        return ans - hg.solve();
    }
};

作者：zerotrac2
```

```c++
class Solution {
public:    
    int link[15], visx[15], visy[15],lx[15],ly[15];
    int n, m;
    vector<vector<int>> w;
    Solution() : w(vector<vector<int>>(15, vector<int> (15))) {}
    int can(int t){
        visx[t] = 1;
        for(int i = 1; i <= m; i++){
            //这里“lx[t]+ly[i]==w[t][i]”决定了这是在相等子图中找增广路的前提，非常重要
            if(!visy[i] && lx[t] + ly[i] == w[t][i]){
                visy[i] = 1;
                if(link[i] == -1 || can(link[i])){
                    link[i] = t;
                    return 1;
                }
            }
        }
        return 0;
    }
    int km(){
        int sum = 0; memset(ly, 0, sizeof(ly));
        for(int i = 1; i <= n; i++){//把各个lx的值都设为当前w[i][j]的最大值
        lx[i] = INT_MIN;
        for(int j = 1; j <= n; j++){
            if(lx[i] < w[i][j])
                lx[i] = w[i][j];
            }
        }
        memset(link, -1, sizeof(link));
        for(int i = 1; i <= n; i++){
            while(1){
                memset(visx, 0, sizeof(visx));
                memset(visy, 0, sizeof(visy));
                if(can(i))//如果它能够形成一条增广路径，那么就break
                    break;
                int d = INT_MAX;//否则，后面应该加入新的边,这里应该先计算d值
                //对于搜索过的路径上的XY点，设该路径上的X顶点集为S，Y顶点集为T，对所有在S中的点xi及不在T中的点yj
                for(int j = 1; j <= n; j++)        
                    if(visx[j])
                    for(int k = 1; k <= m; k++)
                       if(!visy[k])
                            d = min(d, lx[j] + ly[k] - w[j][k]);
                if(d == INT_MAX)
                    return -1;//找不到可以加入的边，返回失败（即找不到完美匹配）
                for (int j = 1; j <= n; j++)
                    if (visx[j])
                        lx[j] -= d;
                for(int j = 1; j <= m; j++)
                    if(visy[j])
                        ly[j] += d;
                }
        }
        for(int i = 1; i <= m; i++)
            if(link[i] > -1)
                sum += w[link[i]][i];
        return sum;
    }
    int connectTwoGroups(vector<vector<int>>& cost) {
        n = cost.size();
        m = cost[0].size();
        int tn = n, tm = m;
        n = max(n, m);
        m = max(m, n);  //转换成方阵才能过    
        vector<int> lmin(tn + 1, INT_MAX), rmin(tm + 1, INT_MAX);
        for (int i = 1; i <= tn; ++i) {
            for (int j = 1; j <= tm; ++j) {
                lmin[i] = min(lmin[i], cost[i - 1][j - 1]);
                rmin[j] = min(rmin[j], cost[i - 1][j - 1]);
            }
        }
        int ans = accumulate(lmin.begin() + 1, lmin.end(), 0) + accumulate(rmin.begin() + 1, rmin.end(), 0);
        for (int i = 1; i <= tn; ++i) {
            for (int j = 1; j <= tm; ++j) {
                w[i][j] = max(0 , lmin[i] + rmin[j] - cost[i - 1][j - 1]);
            }
        }
        return ans - km();
    }
};

作者：jin-wan-da-lao-hu-51
```

状态压缩dp

>
> 因为已知第二组点的数量较少，所以对第二组点的连通状态进行状态压缩，然后依次处理第一组中的点即可。
>
> 对于第一组中的每个点，第一种做法是直接连一条边，第二种做法是连接若干个第二组中当前还没有连通的点。
>
> 对于第一种做法，直接枚举MM个点；
>
> 对于第二种做法，假设当前未连通的点为maskmask，我们需要枚举它的子集，这里可以用位运算枚举子集的方法来进行优化。

```c++
class Solution {
    int f[15][5005], sum[5005];
public:
    int connectTwoGroups(vector<vector<int>>& cost) {
        memset(f, 0x3f, sizeof(f));
        f[0][0] = 0;
        int n = cost.size(), m = cost[0].size();
        int lim = (1 << m) - 1;
        for (int i = 1; i <= n; ++i){
            for (int j = 0; j <= lim; ++j){
                sum[j] = 0;
                for (int u = 1, v = 1; u <= m; ++u, v <<= 1){
                    if (v & j) sum[j] += cost[i - 1][u - 1];
                }
            }
            for (int j = 0; j <= lim; ++j){
                // with a connected
                for (int u = 1, v = 1; u <= m; ++u, v <<= 1){
                    if (!(v & j)) continue;
                    f[i][j] = min(f[i][j], f[i - 1][j] + cost[i - 1][u - 1]);
                }
                // with unconnected
                int jj = (lim ^ j);
                for (int u = jj; u > 0; u = (u - 1) & jj){
                    f[i][j | u] = min(f[i][j | u], f[i - 1][j] + sum[u]);
                }
            }
        }
        return f[n][lim];
    }
};
```

