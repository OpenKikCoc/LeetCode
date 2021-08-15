## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-254)

>   rank: 133 / 4348


### [5843. 作为子字符串出现在单词中的字符串数目](https://leetcode-cn.com/problems/number-of-strings-that-appear-as-substrings-in-word/)

模拟即可

```c++
class Solution {
public:
    bool check(string & a, string & b) {
        int n = b.size(), m = a.size();
        for (int i = 0; i <= n - m; ++ i ) {
            int p = 0, j = i;
            while (p < m && b[j] == a[p])
                p ++ , j ++ ;
            if (p == m)
                return true;
        }
        return false;
    }
    
    int numOfStrings(vector<string>& patterns, string word) {
        int res = 0;
        for (auto p : patterns)
            if (check(p, word))
                res ++ ;
        return res;
    }
};
```

优雅写法：

```c++
class Solution {
public:
    int numOfStrings(vector<string>& patterns, string word) {
        int a = 0;
        for (auto x: patterns)
            a += (word.find(x) != string::npos);
        return a;
    }
};
```

### [5832. 构造元素不等于两相邻元素平均值的数组](https://leetcode-cn.com/problems/array-with-elements-not-equal-to-average-of-neighbors/)

思维题

显然排序再间隙排，构造摆动序列，此时必然满足题目要求

```c++
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        vector<int> res(n);
        int p = 0;
        for (int i = 0; i < n; i += 2)
            res[i] = nums[p ++ ];
        for (int i = 1; i < n; i += 2)
            res[i] = nums[p ++ ];
        return res;
    }
};
```

### [5844. 数组元素的最小非零乘积](https://leetcode-cn.com/problems/minimum-non-zero-product-of-the-array-elements/)

分析知：

-   所有元素的和总是一样的（交换 `0`  `1`  本质是加减某个 `2 次幂`）

-   乘积最小则各元素的差别应尽可能大（向两侧离散）

    以 n = 3 为例

    ```markdown
    0 1 2 3 | 4 5 6 7
    -->
    0 1 6 1 | 6 1 6 7
    ```

    增加一个数 `0` 与 `7` 对应，则余下位置一定是 `1` 和 `(1 << p) - 1 - 1` 一一对应

显然最终答案即 `res = ((1 << p) - 1) * pow((1 << p) - 1 - 1, (1 << p - 1) - 1)`

>   以 3 为例
>
>   最终答案即 7 * pow(6, 3)

**注意写 long long  `1ll << p` wa 2发**

```c++
class Solution {
public:
    using LL = long long;
    const LL MOD = 1e9 + 7;
    
    LL quick_pow(LL a, LL b) {
        a %= MOD;
        LL ret = 1;
        while (b) {
            if (b & 1)
                ret = ret * a % MOD;
            a = a * a % MOD;
            b >>= 1;
        }
        return ret;
    }
    
    int minNonZeroProduct(int p) {
        LL t = (1ll << p) - 1ll;
        LL g = (t - 1);
        t %= MOD, g %= MOD;
        LL res = t;
        res = res * quick_pow(g, (1ll << p - 1) - 1) % MOD;
        return res;
    }
};
```

```c++
// Heltion
using LL = long long;
constexpr LL mod = 1'000'000'007;
LL power(LL a, LL r) {
    LL res = 1;
    for (a %= mod; r; r >>= 1, a = a * a % mod)
        if (r & 1) res = res * a % mod;
    return res;
}
class Solution {
public:
    int minNonZeroProduct(int p) {
        return ((1LL << p) - 1) % mod * power((1LL << p) - 2, (1LL << (p - 1)) - 1) % mod;
    }
};
```



### [5845. 你能穿过矩阵的最后一天](https://leetcode-cn.com/problems/last-day-where-you-can-still-cross/)

显然二分即可

直接申请 `2e4 * 2e4` 的静态数组显然会爆    换 vector 即可

另有并查集做法

```c++
class Solution {
public:
    const int INF = 0x3f3f3f3f;
    
    int n, m, mid;
    vector<vector<int>> g;
    vector<vector<bool>> st;
    
    int dx[8] = {-1, -1, -1, 0, 1, 1, 1, 0}, dy[8] = {-1, 0, 1, 1, 1, 0, -1, -1};
    
    bool dfs(int x, int y) {
        if (y == m)
            return true;
        st[x][y] = true;
        for (int i = 0; i < 8; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx > 0 && nx <= n && ny > 0 && ny <= m && g[nx][ny] <= mid && !st[nx][ny]) {
                if (dfs(nx, ny))
                    return true;
            }
        }
        return false;
    }
    
    bool check() {
        st = vector<vector<bool>>(n + 1, vector<bool>(m + 1, false));
        for (int i = 1; i <= n; ++ i )
            if (g[i][1] <= mid && dfs(i, 1))
                return false;
        return true;
    }
    
    int latestDayToCross(int row, int col, vector<vector<int>>& cells) {
        this->n = row; this->m = col;
        this->g = vector<vector<int>>(n + 1, vector<int>(m + 1, INF));
        int sz = cells.size();
        for (int i = 0; i < sz; ++ i )
            g[cells[i][0]][cells[i][1]] = i + 1;
        int l = 0, r = n * m;
        while (l < r) {
            mid = l + r >> 1;
            if (check())
                l = mid + 1;
            else
                r = mid;
        }
        return l - 1;
    }
};
```

因为最后一天一定是全部都是水域，因此考虑倒序**且无需预处理的**往前推进并还原陆地

```c++
// 逆序并查集
class Solution {
public:
    int find(vector<int>& f, int x) {
        if (f[x] == x) { return x; }
        int nf = find(f, f[x]);
        f[x] = nf;
        return nf;
    }

    void merge(vector<int>& f, int x, int y) {
        int fx = find(f, x);
        int fy = find(f, y);
        f[fx] = fy;
    }

    int latestDayToCross(int row, int col, vector<vector<int>>& cells) {
        auto idx = [=](int i, int j) { return i * col + j; };
        auto check = [=](int i, int j) { return i >= 0 && i < row && j >= 0 && j < col; };
        int tot = (row * col);
        vector<int> f(tot + 2);
        for (int i = 0; i < tot + 2; i++) f[i] = i;

        // tot 和 tot + 1 分别代表上下界
        vector<vector<int>> state(row, vector<int>(col, 1));
        vector<pair<int, int>> directions{{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        for (int day = cells.size() - 1; day >= 0; day--) {
            int i = cells[day][0] - 1, j = cells[day][1] - 1;

            if (i == 0) { merge(f, tot, idx(0, j)); }
            if (i == row - 1) { merge(f, tot + 1, idx(row - 1, j)); }

            for (auto [di, dj] : directions) {
                int ni = i + di, nj = j + dj;
                if (check(ni, nj) && state[ni][nj] == 0)
                    merge(f, idx(i, j), idx(ni, nj));
            }
            state[i][j] = 0;

            if (find(f, tot) == find(f, tot + 1)) return day;
        }
        return 0;
    }
};
```

