## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-150/)


### [1160. 拼写单词](https://leetcode-cn.com/problems/find-words-that-can-be-formed-by-characters/)

略

```c++
class Solution {
public:
    int countCharacters(vector<string>& words, string chars) {
        vector<int> has(26);
        for (auto c : chars) has[c - 'a'] ++ ;
        int res = 0;
        for (auto & s : words) {
            vector<int> need(26);
            for (auto c : s) need[c - 'a'] ++ ;

            bool f = true;
            for (int i = 0; i < 26; ++ i )
                if (need[i] > has[i]) {
                    f = false;
                    break;
                }
            if (f) res += s.size();
        }
        return res;
    }
};
```


### [1161. 最大层内元素和](https://leetcode-cn.com/problems/maximum-level-sum-of-a-binary-tree/)

bfs

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxLevelSum(TreeNode* root) {
        unordered_map<int, int> hash;
        
        queue<TreeNode*> q;
        q.push(root);
        int depth = 0;
        while (q.size()) {
            int sz = q.size(), s = 0;
            while (sz -- ) {
                auto t = q.front(); q.pop();
                s += t->val;
                if (t->left) q.push(t->left);
                if (t->right) q.push(t->right);
            }
            if (hash.count(s)) continue;
            hash[s] = ++ depth;
        }
        // May be negative value
        int t = -1e9;
        for (auto [k, v] : hash)
            if (k > t)
                t = k;
        return hash[t];
    }
};
```

### [1162. 地图分析](https://leetcode-cn.com/problems/as-far-from-land-as-possible/)

多源 bfs

```c++
class Solution {
public:
    using PII = pair<int, int>;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};

    int maxDistance(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        vector<vector<int>> dis(n, vector<int>(m, 1e9));
        vector<vector<bool>> st(n, vector<bool>(m));

        queue<PII> q;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (grid[i][j])
                    q.push({i, j}), dis[i][j] = 0;

        while (!q.empty()) {
            auto [x, y] = q.front(); q.pop();
            if (st[x][y]) continue;
            st[x][y] = true;

            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
                if (dis[nx][ny] > dis[x][y] + 1) {
                    dis[nx][ny] = dis[x][y] + 1;
                    q.push({nx, ny});
                }
            }
        }

        int res = -1;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (grid[i][j] == 0)
                    res = max(res, dis[i][j]);
        return res == 1e9 ? -1 : res;
    }
};
```

简化

```c++
class Solution {
public:
    using PII = pair<int, int>;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};

    int maxDistance(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        vector<vector<int>> dis(n, vector<int>(m, 1e9));

        queue<PII> q;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (grid[i][j])
                    q.push({i, j}), dis[i][j] = 0;

        while (!q.empty()) {
            auto [x, y] = q.front(); q.pop();

            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
                if (dis[nx][ny] != 1e9) continue;
                if (dis[nx][ny] > dis[x][y] + 1) {
                    dis[nx][ny] = dis[x][y] + 1;
                    q.push({nx, ny});
                }
            }
        }

        int res = -1;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (grid[i][j] == 0)
                    res = max(res, dis[i][j]);
        return res == 1e9 ? -1 : res;
    }
};
```

### [1163. 按字典序排在最后的子串](https://leetcode-cn.com/problems/last-substring-in-lexicographical-order/)

字符串最大表示法

https://github.com/OpenKikCoc/AcWing/blob/master/05_usaco_training/1410/README.md

```c++
class Solution {
public:
    int get_max(string s) {
        int i = 0, j = 1, n = s.size();
        while (i < n && j < n) {
            int k = 0;
            while (k < n && s[i + k] == s[j + k]) ++ k ;
            if (k == n) break;
            // `>` ---> `<`
            if (s[i + k] < s[j + k]) i += k + 1;
            else j += k + 1;
            if (i == j) ++ j ;
        }
        return min(i, j);
    }

    string lastSubstring(string s) {
        return s.substr(get_max(s));
    }
};
```
