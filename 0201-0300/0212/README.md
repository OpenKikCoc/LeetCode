#  [212. 单词搜索 II](https://leetcode-cn.com/problems/word-search-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    struct Node {
        int id;
        Node *son[26];
        Node() {
            id = -1;
            for (int i = 0; i < 26; i ++ ) son[i] = nullptr;
        }
    }*root;

    void insert(string & word, int id) {
        auto p = root;
        for (auto c : word) {
            int u = c - 'a';
            if (!p->son[u]) p->son[u] = new Node();
            p = p->son[u];
        }
        p->id = id;
    }

    vector<vector<char>> g;
    int n, m;
    unordered_set<int> ids;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    void dfs(int x, int y, Node * p) {
        if (p->id != -1) ids.insert(p->id);
        char t = g[x][y];
        g[x][y] = '.';
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m || g[nx][ny] == '.') continue;
            int u = g[nx][ny] - 'a';
            if (p->son[u]) dfs(nx, ny, p->son[u]);
        }
        g[x][y] = t;
    }

    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        g = board; n = g.size(), m = g[0].size();
        root = new Node();
        for (int i = 0; i < words.size(); ++ i ) insert(words[i], i);

        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++) {
                int u = g[i][j] - 'a';
                if (root->son[u])
                    dfs(i, j, root->son[u]);
            }
        
        vector<string> res;
        for (auto id : ids) res.push_back(words[id]);
        return res;
    }
};
```



```python3

```

