## [比赛链接](https://leetcode.cn/contest/weekly-contest-224/)


### [1725. 可以形成最大正方形的矩形数目](https://leetcode.cn/problems/number-of-rectangles-that-can-form-the-largest-square/)

模拟即可

```c++
class Solution {
public:
    int countGoodRectangles(vector<vector<int>>& rectangles) {
        unordered_map<int, int> cnt;
        for (auto r : rectangles) {
            int l = r[0], w = r[1];
            int v = min(l, w);
            ++ cnt[v];
        }
        int r1 = 0, r2 = 0;
        for (auto & [k, v] : cnt)
            if (k > r1) r1 = k, r2 = v;
        return r2;
    }
};
```


### [1726. 同积元组](https://leetcode.cn/problems/tuple-with-same-product/)

一个四元组改变顺序可以拓展为 8 个可行解

> v * (v - 1) / 2 * 8

```c++
class Solution {
public:
    int tupleSameProduct(vector<int>& nums) {
        int n = nums.size();
        unordered_map<int, int> hash;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                ++ hash[nums[i] * nums[j]];
    
        int res = 0;
        for (auto & [k, v] : hash) res += v * (v - 1) * 4;
        return res;
    }
};
```

老代码

```c++
class Solution {
public:
    int tupleSameProduct(vector<int>& nums) {
        int n = nums.size();
        unordered_map<int, vector<int>> hash;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j ) {
                int t = nums[i] * nums[j];
                hash[t].push_back(nums[i]);
            }
    
        int res = 0;
        for (auto & [v, ve] : hash) {
            int t = ve.size();
            res += t * (t - 1) * 4;
        }
        return res;
    }
};
```

### [1727. 重新排列后的最大子矩阵](https://leetcode.cn/problems/largest-submatrix-with-rearrangements/)

最大连续子树组基础 + 排序统计即可

```c++
class Solution {
public:
    int largestSubmatrix(vector<vector<int>>& matrix) {
        int n = matrix.size(), m = matrix[0].size();
        vector<vector<int>> q(n + 1, vector<int>(m + 1));
        for (int j = 1; j <= m; ++ j )
            for (int i = 1; i <= n; ++ i )
                if (matrix[i - 1][j - 1]) q[i][j] = q[i - 1][j] + 1;
                else q[i][j] = 0;
        
        int res = 0;
        for (int i = 1; i <= n; ++ i ) {
            sort(q[i].begin(), q[i].end());
            for (int j = 1; j <= m; ++ j )
                res = max(res, q[i][j] * (m - j + 1));
        }
        return res;
    }
};
```

q 数组可以省略 参见

```c++
class Solution {
public:
    int largestSubmatrix(vector<vector<int>>& w) {
        int n = w.size(), m = w[0].size();
        for (int i = 1; i < n; i ++ )
            for (int j = 0; j < m; j ++ )
                if (w[i][j])
                    w[i][j] += w[i - 1][j];

        int res = 0;
        vector<int> q(m);
        for (int i = 0; i < n; i ++ ) {
            for (int j = 0; j < m; j ++ ) q[j] = w[i][j];
            sort(q.begin(), q.end(), greater<int>());
            for (int j = 0; j < m; j ++ )
                res = max(res, q[j] * (j + 1));
        }

        return res;
    }
};
```

### [1728. 猫和老鼠 II](https://leetcode.cn/problems/cat-and-mouse-ii/) [TAG]

博弈论

```c++
// 可能会有循环 走 x 步之后 [cx, cy]  [mx, my] 又回到原来的位置
// 故加一维 k 记录步数   至于出现 1000 步的情况推测在之前某个位置就循环
// 某个位置设置为 200
int f[8][8][8][8][200];

class Solution {
public:
    int n, m, cj, mj;
    vector<string> g;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, 1, -1, 0};
    
    int dp(int cx, int cy, int mx, int my, int k) {
        if (k >= 200) return 0;
        auto & v = f[cx][cy][mx][my][k];
        if (v != -1) return v;
        
        if (k & 1) {    // 猫
            for (int i = 0; i < 4; ++ i )
                for (int j = 0; j <= cj; ++ j ) {
                    int x = cx + dx[i] * j, y = cy + dy[i] * j;
                    if (x < 0 || x >= n || y < 0 || y >= m || g[x][y] == '#') break;
                    if (x == mx && y == my) return v = 0;
                    if (g[x][y] == 'F') return v = 0;
                    if (!dp(x, y, mx, my, k + 1)) return v = 0;
                }
            return v = 1;
        } else {        // 老鼠
            for (int i = 0; i < 4; ++ i )
                for (int j = 0; j <= mj; ++ j ) {
                    int x = mx + dx[i] * j, y = my + dy[i] * j;
                    if (x < 0 || x >= n || y < 0 || y >= m || g[x][y] == '#') break;
                    if (x == cx && y == cy) continue;
                    if (g[x][y] == 'F') return v = 1;
                    if (dp(cx, cy, x, y, k + 1)) return v = 1;
                }
            return v = 0;
        }
    }
    
    bool canMouseWin(vector<string>& grid, int catJump, int mouseJump) {
        g = grid;
        n = g.size(), m = g[0].size(), cj = catJump, mj = mouseJump;
        int cx, cy, mx, my;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j] == 'C') cx = i, cy = j;
                else if (g[i][j] == 'M') mx = i, my = j;
        memset(f, -1, sizeof f);
        return dp(cx, cy, mx, my, 0);
    }
};
```
