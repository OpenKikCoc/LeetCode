#  [547. 朋友圈](https://leetcode-cn.com/problems/friend-circles/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> p;

    int find(int x) {
        if (p[x] != x) p[x] = find(p[x]);
        return p[x];
    }

    int findCircleNum(vector<vector<int>>& M) {
        int n = M.size();
        for (int i = 0; i < n; i ++ ) p.push_back(i);

        int cnt = n;
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < n; j ++ )
                if (M[i][j] && find(i) != find(j)) {
                    p[find(i)] = find(j);
                    cnt -- ;
                }

        return cnt;
    }
};

class Solution_2 {
public:
    int n;
    void dfs(int x, vector<vector<int>>& M, vector<bool>& vis) {
        vis[x] = true;
        for(int i = 0; i < n; ++i) {
            if (M[x][i] == 1 && !vis[i]) {
                dfs(i, M, vis);
            }
        }
    }
    int findCircleNum(vector<vector<int>>& M) {
        n = M.size();
        int res = 0;
        vector<bool> vis(n);
        for(int i = 0; i < n; ++i) {
            if (!vis[i]) {
                dfs(i, M, vis);
                res++;
            }
        }
        return res;
    }
};
```



```python3

```

