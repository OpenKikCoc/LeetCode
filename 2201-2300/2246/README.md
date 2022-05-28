#  

## 题意



## 题解



```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = N << 1;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n, d;
    bool st[N];
    int d1[N], d2[N];
    
    void dfs(int u, int fa) {
        st[u] = true;
        d1[u] = d2[u] = 1;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            if (j == fa)
                continue;
            dfs(j, u);
            if (d1[j] + 1 >= d1[u])
                d2[u] = d1[u], d1[u] = d1[j] + 1;
            else if (d1[j] + 1 > d2[u])
                d2[u] = d1[j] + 1;
        }
        // cout << "... u = " << u << " " << d1[u] << " " << d2[u] << endl;
        d = max(d, d1[u] + d2[u] - 1);
    }
    
    int longestPath(vector<int>& parent, string s) {
        init();
        
        n = parent.size();
        for (int i = 1; i < n; ++ i ) {
            int a = parent[i], b = i;
            if (s[a] != s[b])
                add(a, b), add(b, a);
        }
        
        int res = 0;
        memset(st, 0, sizeof st);
        for (int i = 0; i < n; ++ i )
            if (!st[i]) {
                d = 0;
                dfs(i, -1);
                res = max(res, d);
                // cout << " i = " << i << " d = " << d << endl;
            }
        return res;
    }
};
```



```python3

```

