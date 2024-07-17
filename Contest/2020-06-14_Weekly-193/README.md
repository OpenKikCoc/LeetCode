## [比赛链接](https://leetcode.cn/contest/weekly-contest-193)

### [5436. 一维数组的动态和](https://leetcode.cn/problems/running-sum-of-1d-array/)

求前缀和即可

```c++
    vector<int> runningSum(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);
        for(int i = 0; i < n; ++i) {
            if(i) res[i] += res[i-1];
            res[i] += nums[i];
        }
        return res;
    }
```


### [5437. 不同整数的最少数目](https://leetcode.cn/problems/least-number-of-unique-integers-after-k-removals/)

求移除k个数后 剩下的不同整数的最小数目

先统计每个数出现多少次 随后按照出现次数从小到大排序 遍历处理即可

```c++
    int findLeastNumOfUniqueInts(vector<int>& arr, int k) {
        map<int, int> m;
        int n = arr.size();
        for(auto v : arr) ++m[v];
        vector<pair<int, int>> ve;
        for(auto p : m) {
            int v = p.first, c = p.second;
            ve.push_back({c, v});
        }
        sort(ve.begin(), ve.end());
        int res = 0;
        for(auto p : ve) {
            //cout <<p.first<<" "<<p.second<<endl;
            if(k >= p.first) {
                k -= p.first;
                ++res;
            } else {
                break;
            }
        }
        return ve.size() - res;
    }
```

赛榜写法优化

```c++
    int findLeastNumOfUniqueInts(vector<int>& arr, int k) {
        sort(arr.begin(), arr.end());
        int n = arr.size();
        vector<int> ve;
        for(int i = 0; i < n;) {
            int j = i;
            while(j < n && arr[i] == arr[j]) ++j;
            ve.push_back(j-i);  //个数
            i = j;
        }
        sort(ve.begin(), ve.end());
        int t = ve.size(), res = 0;
        for(int i = 0; i < t; ++i) {
            if(k >= ve[i]) k -= ve[i];
            else {
                res = t - i;
                break;
            }
        }
        return res;
    }
```



### [5438. 制作 m 束花所需的最少天数](https://leetcode.cn/problems/minimum-number-of-days-to-make-m-bouquets/) 

二分答案即可 (以及做了当天的每日一题巧了233)

赛榜 r 全部选1e9就可以过

```c++
    // 最少在第几天会有 m个连续子序列 其中每一个子序列长度都大于等于k且数值小于res
    // 二分天数 1～maxv 如果不可以分成m个连续子序列则 l = l+1
    // 分析复杂度 30 * 每一次扫描 1e5
    bool check(vector<int>& b, int n, int m, int k, int t) {
        int d = 0, cnt = 0;
        for(int i = 0; i < n; ++i) {
            if(b[i] <= t) {
                ++cnt;
                if(cnt == k) {
                    ++d;
                    cnt = 0;
                }
            } else cnt = 0;
            if(d >= m) break;
        }
        return d >= m;
    }
    int minDays(vector<int>& bloomDay, int m, int k) {
        int n = bloomDay.size();
        if((long long)n < (long long)m*(long long)k) return -1;
        // 以后可以这样写
        // if(1ll * m * k > n) return -1;
        int l = 1, r = 0;
        for(auto v : bloomDay) if(v > r) r = v;
        // ++r?
        while(l < r) {
            int mid = l+(r-l)/2;
            //cout <<"l="<<l<<" r="<<r<<" mid="<<mid<<endl;
            if(!check(bloomDay, n, m, k, mid)) l = mid+1;
            else r = mid;
        }
        return l;
    }
```

### [5188. 树节点的第 K 个祖先](https://leetcode.cn/problems/kth-ancestor-of-a-tree-node/) [TAG]

LCA的简易版本 **leetcode要注意初始化 cnt 和 head 数组**

```c++
const int N=1e5+10;
int cnt,f[N][21],dep[N],head[N];
struct node {
    int to,next;
}e[N<<1];

void add(int x,int y) {
    e[cnt].to=y;
    e[cnt].next=head[x];
    head[x]=cnt++;
}

void dfs(int u,int father) {
    dep[u]=dep[father]+1;
    f[u][0]=father;
    for(int i=1;i<=20;i++)
        f[u][i]=f[f[u][i-1]][i-1];
    for(int i=head[u];i!=-1;i=e[i].next) {
        int v=e[i].to;
        if(v != father) dfs(v,u);
    }
}

int get_fa(int x,int k) {
    int t=dep[x]-k;
    for(int i=20;i>=0;i--)
        if(dep[f[x][i]]>t)x=f[x][i];
    return f[x][0];
}

class TreeAncestor {
public:
    TreeAncestor(int n, vector<int>& parent) {
        cnt = 0;
        memset(head,-1,sizeof(head));
        for(int i = 1; i <= n; ++i) {
            //cout <<i<<" pa[i]="<<parent[i-1]+1<<endl;
            add(i, parent[i-1]+1);
            add(parent[i-1]+1, i);
        }
        dfs(1, 0);
    }
    
    int getKthAncestor(int node, int k) {
        int res = get_fa(node+1, k);
        return res-1;
    }
};
```

赛榜代码 [用vector]：

```c++
    vector<int> dep;
    vector<int> f[20];
    vector<vector<int>> G;
    void DFS(int u){
        for(int i = 1; i < 20; i += 1) f[i][u] = f[i - 1][f[i - 1][u]];
        for(int v : G[u]){
            dep[v] = dep[u] + 1;
            f[0][v] = u;
            DFS(v);
        }
    }
    TreeAncestor(int n, vector<int>& parent) {
        G.resize(n);
        dep.resize(n);
        for(int i = 0; i < 20; i += 1) f[i].resize(n);
        for(int i = 1; i < n; i += 1) G[parent[i]].push_back(i);
        DFS(0);
    }
    
    int getKthAncestor(int node, int k) {
        if(dep[node] < k) return -1;
        for(int i = 19; ~i; i -= 1)
            if(k >= (1 << i)){
                k -= 1 << i;
                node = f[i][node];
            }
        return node;
    }
// 来源: Heltion
```

另一个 [直接用全局数组]：

```c++
vector<int> v[200001];
int d[100001][19];

class TreeAncestor {
public:
    void dfs(int x, int fa) {
        d[x][0] = fa;
        for (int j = 1; j <= 18; j ++)
            d[x][j] = d[d[x][j - 1]][j - 1];
        for (int i = 0; i < (int )v[x].size(); i ++) {
            if (v[x][i] == fa) continue;
            dfs(v[x][i], x);
        }
    }
    TreeAncestor(int n, vector<int>& parent) {
        for (int i = 1; i <= n; i ++) v[i].clear();
        for (int i = 0; i < n; i ++) {
            if (i == 0) continue;
            v[i + 1].push_back(parent[i] + 1);
            v[parent[i] + 1].push_back(i + 1);
        }
        dfs(1, 0);
    }
    
    int getKthAncestor(int node, int k) {
        int x = node + 1;
        for (int i = 18; i >= 0; i --)
            if ((k >> i) & 1) x = d[x][i];
        return x - 1;
    }
};
// ZhuolinYang
```

