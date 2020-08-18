## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-16/)


### [1299. 将每个元素替换为右侧最大元素](https://leetcode-cn.com/problems/replace-elements-with-greatest-element-on-right-side/)

新建一个数组逆序遍历即可

```c++
    vector<int> replaceElements(vector<int>& arr) {
        int n = arr.size();
        vector<int> res(n);
        res[n-1] = -1;
        for(int i = n-2; i >= 0; --i)
            res[i] = max(res[i+1], arr[i+1]);
        return res;
    }
```


### [1300. 转变数组后最接近目标值的数组和](https://leetcode-cn.com/problems/sum-of-mutated-array-closest-to-target/)

显然二分check

需要注意：

**1) 题目要求返回的方案值最小，因而右边界 r 需要设置为数组最大值而非任意大。**

**2) 题目要求比较的是绝对值，因而使用 `<` 以及 `l = m + 1` ，求出比 target 大的方案**

**3) 比较比 target 小的方案和 2) 中方案何种最有并返回**


```c++
    int check(vector<int>& arr, int m) {
        int sum = 0;
        for(auto v : arr) {
            if(v >= m) sum += m;
            else sum += v;
        }
        return sum;
    }
    int findBestValue(vector<int>& arr, int target) {
        int n = arr.size(), maxv = 0;
        for(auto v : arr) maxv = max(maxv, v);
        int l = 0, r = maxv;
        while(l < r) {
            int m = l + (r-l)/2;
            // sum < target 说明m需要变大
            if(check(arr, m) < target) l = m+1;
            else r = m;
        }
        if(check(arr, l)-target < target-check(arr, l-1)) return l;
        return l-1;
    }
```

题解区在计算 check 的时候有 `排序 / 前缀和` 的小优化，可以参考，但不关键。


### [1302. 层数最深叶子节点的和](https://leetcode-cn.com/problems/deepest-leaves-sum/)

bfs 即可

```c++
    int deepestLeavesSum(TreeNode* root) {
        // if(!root) return 0; // 这种情况不存在 至少有一个节点
        queue<TreeNode*> q;
        q.push(root);
        int res = 0;
        while(!q.empty()) {
            int sz = q.size();
            int sum = 0;
            while(sz--) {
                auto r = q.front(); q.pop();
                sum += r->val;
                if(r->left) q.push(r->left);
                if(r->right) q.push(r->right);
            }
            res = sum;
        }
        return res;
    }
```

赛榜大多是 dfs 做法

```c++
  map<int, int> M;
  void dfs(TreeNode* root, int d) {
    if (root == NULL) return;
    M[d] += root->val;
    dfs(root->left, d +1);
    dfs(root->right, d +1);
  }
  int deepestLeavesSum(TreeNode* root) {
    M.clear();
    dfs(root, 0);
    return M.rbegin()->second;
  }
```

```c++
    int maxLevel = 0, ans = 0;
    void dfs(TreeNode* node, int level) {
        if(node == nullptr) return;
        if(level == maxLevel) ans += node->val;
        if(level > maxLevel) ans = node->val, maxLevel = level;
        dfs(node->left, level + 1);
        dfs(node->right, level + 1);
    }
    int deepestLeavesSum(TreeNode* root) {
        dfs(root, 0);
        return ans;
    }
```

### [1301. 最大得分的路径数目](https://leetcode-cn.com/problems/number-of-paths-with-max-score/)

二维dp 记录方案数即可

```c++
    const int mod = 1e9+7;
    vector<vector<int>> f;
    vector<vector<long long>> p;
    int m, n;
    vector<int> pathsWithMaxScore(vector<string>& board) {
        m = board.size(), n = board[0].size();
        f = vector<vector<int>>(m+1, vector<int>(n+1, 0));
        p = vector<vector<long long>>(m+1, vector<long long>(n+1, 0));
        //
        board[0][0] = '0';
        board[m-1][n-1] = '0';
        //
        p[m-1][n-1] = 1;
        for(int i = n-2; i >= 0; --i) {
            if(board[m-1][i] == 'X') break;
            f[m-1][i] = f[m-1][i+1] + board[m-1][i]-'0';
            p[m-1][i] = 1;
        }
        for(int i = m-2; i >= 0; --i) {
            if(board[i][n-1] == 'X') break;
            f[i][n-1] = f[i+1][n-1] + board[i][n-1]-'0';
            p[i][n-1] = 1;
        }
        
        for(int i = m-2; i >= 0; --i)
            for(int j = n-2; j >= 0; --j) {
                if(board[i][j] == 'X') continue;
                int oldv = 0;
                long long oldp = 0;
                // p[i][j+1]
                if(p[i][j+1]) {
                    if(f[i][j+1] > oldv) oldv = f[i][j+1], oldp = p[i][j+1];
                    else if(f[i][j+1] == oldv) oldp += p[i][j+1];
                }
                if(p[i+1][j]) {
                    if(f[i+1][j] > oldv) oldv = f[i+1][j], oldp = p[i+1][j];
                    else if(f[i+1][j] == oldv) oldp += p[i+1][j];
                }
                if(p[i+1][j+1]) {
                    if(f[i+1][j+1] > oldv) oldv = f[i+1][j+1], oldp = p[i+1][j+1];
                    else if(f[i+1][j+1] == oldv) oldp += p[i+1][j+1];
                }
                if(oldp) {
                    f[i][j] = oldv + board[i][j]-'0';
                    p[i][j] = oldp % mod;
                }
            }
        return vector<int>{f[0][0], int(p[0][0]%mod)};
    }
```

稍优雅的写法

```c++
    int f[105][105];
    int q[105][105];
    const int mod = 1e9 + 7;
    vector<int> pathsWithMaxScore(vector<string>& board) {
        int n = board.size();
        int m = board[0].size();
        
        for (int i = n - 1 ; i >= 0 ; -- i) {
            for (int j = m - 1 ; j >= 0 ; -- j) {
                f[i][j] = -(1 << 30);
                q[i][j] = 0;
                if (board[i][j] != 'X') {
                    int v = isdigit(board[i][j]) ? board[i][j] - '0' : 0;
                    if (board[i][j] == 'S') {
                        f[i][j] = 0;
                        q[i][j] = 1;
                    } else {
                        if (i + 1 < n) {
                            f[i][j] = f[i + 1][j];
                            q[i][j] = q[i + 1][j];
                        }
                        if (j + 1 < m) {
                            if (f[i][j + 1] > f[i][j]) {
                                f[i][j] = f[i][j + 1];
                                q[i][j] = q[i][j + 1];
                            } else if (f[i][j + 1] == f[i][j]) {
                                q[i][j] += q[i][j + 1];
                                q[i][j] %= mod;
                            }
                        }
                        if (i + 1 < n && j + 1 < m) {
                            if (f[i + 1][j + 1] > f[i][j]) {
                                f[i][j] = f[i + 1][j + 1];
                                q[i][j] = q[i + 1][j + 1];
                            } else if (f[i + 1][j + 1] == f[i][j]) {
                                q[i][j] += q[i + 1][j + 1];
                                q[i][j] %= mod;
                            } 
                        }
                        f[i][j] += v;
                    }
                }
            }
        }
        if (f[0][0] < 0) {
            return {0, 0};
        }
        return {f[0][0], q[0][0]};
    }
```

官方写法

```c++
using PII = pair<int, int>;

class Solution {
private:
    static constexpr int mod = (int)1e9 + 7;

public:
    void update(vector<vector<PII>>& dp, int n, int x, int y, int u, int v) {
        if (u >= n || v >= n || dp[u][v].first == -1) {
            return;
        }
        if (dp[u][v].first > dp[x][y].first) {
            dp[x][y] = dp[u][v];
        }
        else if (dp[u][v].first == dp[x][y].first) {
            dp[x][y].second += dp[u][v].second;
            if (dp[x][y].second >= mod) {
                dp[x][y].second -= mod;
            }
        }
    }

    vector<int> pathsWithMaxScore(vector<string>& board) {
        int n = board.size();
        vector<vector<PII>> dp(n, vector<PII>(n, {-1, 0}));
        dp[n - 1][n - 1] = {0, 1};
        for (int i = n - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 0; --j) {
                if (!(i == n - 1 && j == n - 1) && board[i][j] != 'X') {
                    update(dp, n, i, j, i + 1, j);
                    update(dp, n, i, j, i, j + 1);
                    update(dp, n, i, j, i + 1, j + 1);
                    if (dp[i][j].first != -1) {
                        dp[i][j].first += (board[i][j] == 'E' ? 0 : board[i][j] - '0');
                    }
                }
            }
        }
        return dp[0][0].first == -1 ? vector<int>{0, 0} : vector<int>{dp[0][0].first, dp[0][0].second};
    }
};
```

