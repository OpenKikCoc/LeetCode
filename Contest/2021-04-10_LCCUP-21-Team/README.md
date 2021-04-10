## [比赛链接](https://leetcode-cn.com/contest/season/2021-spring/ranking/team/)

No. 376

### [LCP 33. 蓄水](https://leetcode-cn.com/problems/o8SXZn/)

思维题

一开始在贪心，实际上可以考虑枚举的思路

注意需特判 vat 的和为 0 的情况

```c++
class Solution {
public:    
    int storeWater(vector<int>& bucket, vector<int>& vat) {
        {
            int s = 0;
            for (auto v : vat)
                s += v;
            if (!s)
                return 0;
        }
        
        int n = bucket.size();
        unordered_map<int, int> hash;
        
        for (int i = 0; i < n; ++ i ) {
            int b = bucket[i], v = vat[i];
            for (int j = 1; j <= 1e4; ++ j )
                hash[j] += max((v + j - 1) / j - b, 0);
        }
        
        int res = INT_MAX;
        for (auto [k, v] : hash)
            res = min(res, k + v);
        return res;
    }
};
```

### [LCP 34. 二叉树染色](https://leetcode-cn.com/problems/er-cha-shu-ran-se-UGC/)

标准树 dp 略

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    using LL = long long;
    int k;
    LL res;
    
    vector<LL> dfs(TreeNode * root) {
        if (!root)
            return vector<LL>(k + 1, 0);
        
        auto l = dfs(root->left);
        auto r = dfs(root->right);
        
        // ret[0]为不选当前
        vector<LL> ret(k + 1, 0);
        
        ret[0] = l[k] + r[k];
        
        for (int i = 1; i <= k; ++ i )
            for (int j = 0; j < i; ++ j )
                ret[i] = max(ret[i], (LL)root->val + l[j] + r[i - j - 1]);
        for (int i = 1; i <= k; ++ i )
            ret[i] = max(ret[i - 1], ret[i]);
        
        res = max(res, ret[k]);
        
        return ret;
    }
    
    int maxValue(TreeNode* root, int k) {
        this->k = k, this->res = 0;
        dfs(root);
        return res;
    }
};
```

### [LCP 35. 电动车游城市](https://leetcode-cn.com/problems/DFPeFJ/)

踩坑。。比赛按照传统写法 TLE 

其实充电的情况可以同样认为是边拓展，这样写会减少一些 `多次入队` 的情况

```c++
const int N = 110, M = N << 2;
int h[N], e[M], w[M], ne[M], idx;

void add(int a, int b, int c) {
   e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
}

int dist[N][N];
bool st[N][N];

class Solution {
public:
    using TIII = tuple<int, int, int>;
    
    int n, start, end, cnt;
    vector<int> ch;
    
    void dijkstra() {
        memset(dist, 0x3f, sizeof dist);
        memset(st, 0, sizeof st);
        
        priority_queue<TIII, vector<TIII>, greater<TIII>> heap;
        
        dist[start][0] = 0;
        heap.push({dist[start][0], start, 0});
        
        while (heap.size()) {
            auto [dis, ver, oil] = heap.top();
            heap.pop();
            if (st[ver][oil])
                continue;
            st[ver][oil] = true;
            
            for (int i = oil + 1; i <= cnt; ++ i ) {
                if (dist[ver][i] > dis + ch[ver] * (i - oil)) {
                    dist[ver][i] = dis + ch[ver] * (i - oil);
                    heap.push({dist[ver][i], ver, i});
                }
            }
            
            for (int i = h[ver]; ~i; i = ne[i]) {
                int j = e[i];
                if (w[i] > oil)
                    continue;
                if (dist[j][oil - w[i]] > dis + w[i]) {
                    dist[j][oil - w[i]] = dis + w[i];
                    heap.push({dist[j][oil - w[i]], j, oil - w[i]});
                }
            }
        }
    }
    
    int electricCarPlan(vector<vector<int>>& paths, int cnt, int start, int end, vector<int>& charge) {
        this->n = charge.size(), this->start = start, this->end = end, this->cnt = cnt, this->ch = charge;
        memset(h, -1, sizeof h);
        idx = 0;
        
        for (auto & e : paths) {
            int u = e[0], v = e[1], w = e[2];
            add(u, v, w), add(v, u, w);
        }
        
        dijkstra();
        
        int res = INT_MAX;
        for (int i = 0; i <= cnt; ++ i )
            res = min(res, dist[end][i]);
        
        return res;
    }
};
```

```c++
// TLE
// 63 / 63 个通过测试用例

const int N = 110, M = N << 2;
int h[N], e[M], w[M], ne[M], idx;

void add(int a, int b, int c) {
   e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
}

int dist[N][N];
bool st[N][N];

class Solution {
public:
    using TIII = tuple<int, int, int>;
    
    int n, start, end, cnt;
    vector<int> ch;
    
    void dijkstra() {
        memset(dist, 0x3f, sizeof dist);
        memset(st, 0, sizeof st);
        
        priority_queue<TIII, vector<TIII>, greater<TIII>> heap;
        
        for (int i = 0; i <= cnt; ++ i ) {
            dist[start][i] = ch[start] * i;
            heap.push({dist[start][i], start, i});
        }
        
        while (heap.size()) {
            auto [dis, ver, oil] = heap.top();
            heap.pop();
            if (st[ver][oil])
                continue;
            st[ver][oil] = true;
            
            
            for (int i = h[ver]; ~i; i = ne[i]) {
                int j = e[i];
                if (w[i] > oil)
                    continue;
                int rest = oil - w[i];
                for (int k = rest; k <= cnt; ++ k ) {
                    int add = k - rest;
                    if (dist[j][k] > dis + w[i] + add * ch[j]) {
                        dist[j][k] = dis + w[i] + add * ch[j];
                        heap.push({dist[j][k], j, k});
                    }
                }
            }
        }
    }
    
    int electricCarPlan(vector<vector<int>>& paths, int cnt, int start, int end, vector<int>& charge) {
        this->n = charge.size(), this->start = start, this->end = end, this->cnt = cnt, this->ch = charge;
        memset(h, -1, sizeof h);
        idx = 0;
        
        for (auto & e : paths) {
            int u = e[0], v = e[1], w = e[2];
            add(u, v, w), add(v, u, w);
        }
        
        dijkstra();
        
        int res = INT_MAX;
        for (int i = 0; i <= cnt; ++ i )
            res = min(res, dist[end][i]);
        
        return res;
    }
};
```

### [LCP 36. 最多牌组数](https://leetcode-cn.com/problems/Up5XYM/)



```c++

```

### [LCP 37. 最小矩形面积](https://leetcode-cn.com/problems/zui-xiao-ju-xing-mian-ji/)



```c++

```

### [LCP 38. 守卫城堡](https://leetcode-cn.com/problems/7rLGCR/)



```c++

```
