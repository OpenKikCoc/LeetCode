## [比赛链接](https://leetcode.cn/contest/biweekly-contest-53/)


### [1876. 长度为三且各字符不同的子字符串](https://leetcode.cn/problems/substrings-of-size-three-with-distinct-characters/)

略

```c++
class Solution {
public:
    bool check(string s) {
        return s[0] != s[1] && s[0] != s[2] && s[1] != s[2];
    }
    
    int countGoodSubstrings(string s) {
        int n = s.size(), res = 0;
        for (int i = 0; i <= n - 3; ++ i ) {
            auto sub = s.substr(i, 3);
            if (check(sub))
                res ++ ;
        }
        return res;
    }
};
```


### [1877. 数组中最大数对和的最小值](https://leetcode.cn/problems/minimize-maximum-pair-sum-in-array/)

贪心即可 略

```c++
class Solution {
public:
    int minPairSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int res = 0;
        for (int i = 0; i < n / 2; ++ i )
            res = max(res, nums[i] + nums[n - i - 1]);
        return res;
    }
};
```

### [1878. 矩阵中最大的三个菱形和](https://leetcode.cn/problems/get-biggest-three-rhombus-sums-in-a-grid/)

暴力可过

```c++
class Solution {
public:
    vector<vector<int>> g;
    vector<int> t;
    int n, m;
    
    bool check(int x, int y, int d) {
        return x - d >= 0 && x + d < n && y - d >= 0 && y + d < m;
    }
    
    int sum(int x, int y, int d) {
        int ret = 0;
        if (d)
            ret = g[x - d][y] + g[x + d][y] + g[x][y - d] + g[x][y + d];
        else
            ret = g[x][y];
        
        for (int i = x - 1, j = y - d + 1; j < y; i -- , j ++ )
            ret += g[i][j];
        for (int i = x + 1, j = y - d + 1; j < y; i ++ , j ++ )
            ret += g[i][j];
        for (int i = x - 1, j = y + d - 1; j > y; i -- , j -- )
            ret += g[i][j];
        for (int i = x + 1, j = y + d - 1; j > y; i ++ , j -- )
            ret += g[i][j];
        return ret;
    }
    
    void get(int x, int y) {
        int d = 0;
        while (check(x, y, d)) {
            t.push_back(sum(x, y, d));
            d ++ ;
        }
    }
    
    vector<int> getBiggestThree(vector<vector<int>>& grid) {
        this->g = grid;
        n = g.size(), m = g[0].size();
        
        t.clear();
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                get(i, j);
        sort(t.begin(), t.end());
        t.erase(unique(t.begin(), t.end()), t.end());
        reverse(t.begin(), t.end());
        
        vector<int> res;
        for (int i = 0; i < 3 && i < t.size(); ++ i )
            res.push_back(t[i]);
        return res;
    }
};
```

更优雅的实现 即写的时候想的利用前缀和思想 `TAG`

> 存以每个点为底点的两个斜方向的前缀和
>
> 形如
>
>  \     /
>   \   /
>    \ /
>     V (x, y)
>    s1 计算左上斜着的和 s2 计算右上

```c++
// yxc
const int N = 110;

int s1[N][N], s2[N][N];

class Solution {
public:
    vector<int> getBiggestThree(vector<vector<int>>& g) {
        memset(s1, 0, sizeof s1);
        memset(s2, 0, sizeof s2);
        int n = g.size(), m = g[0].size();
        for (int i = 1; i <= n; i ++ )
            for (int j = 1; j <= m; j ++ ) {
                s1[i][j] = s1[i - 1][j - 1] + g[i - 1][j - 1];
                s2[i][j] = s2[i - 1][j + 1] + g[i - 1][j - 1];
            }
        
        set<int> S;
        for (int i = 1; i <= n; i ++ )
            for (int j = 1; j <= m; j ++ ) {
                S.insert(g[i - 1][j - 1]);
                for (int k = 1; i - k >= 1 && i + k <= n && j - k >= 1 && j + k <= m; k ++ ) {
                    int a = s2[i][j - k] - s2[i - k][j];
                    int b = s1[i - 1][j + k - 1] - s1[i - k - 1][j - 1];
                    int c = s2[i + k - 1][j + 1] - s2[i - 1][j + k + 1];
                    int d = s1[i + k][j] - s1[i][j - k];
                    S.insert(a + b + c + d);
                }
                while (S.size() > 3) S.erase(S.begin());
            }
        return vector<int>(S.rbegin(), S.rend());
    }
};
```

### [1879. 两个数组最小的异或值之和](https://leetcode.cn/problems/minimum-xor-sum-of-two-arrays/) [TAG]

数据范围 n = 14

dp 或 爆搜

> **标准的 n! => 2^n 模型**
>
> 每一步只关心前面用过哪些数&最小和多少 不关心具体顺序 ==> 考虑状态压缩

> a[s] 对应第 s+1 个数字
>
> a[s-1] 对应第 s 个数字

```c++
class Solution {
public:
    int minimumXORSum(vector<int>& a, vector<int>& b) {
        int n = a.size();
        vector<int> f(1 << n, 1e9);
        f[0] = 0;
        for (int mask = 0; mask < (1 << n); ++ mask ) {
            int s = 0;
            for (int i = 0; i < n; ++ i )
                if (mask >> i & 1)
                    s ++ ;
            // 枚举下一步走哪
            for (int i = 0; i < n; ++ i )
                if (!(mask >> i & 1))
                    f[mask | (1 << i)] = min(f[mask | (1 << i)], f[mask] + (a[s] ^ b[i]));
        }
        return f[(1 << n) - 1];
    }
};
```

```c++
class Solution {
public:
    int minimumXORSum(vector<int>& a, vector<int>& b) {
        int n = a.size();
        vector<int> f(1 << n, 1e9);
        f[0] = 0;
        for (int mask = 0; mask < (1 << n); ++ mask ) {
            int s = 0;
            for (int i = 0; i < n; ++ i )
                if (mask >> i & 1)
                    s ++ ;
            // 枚举上一步从哪走来
            for (int i = 0; i < n; ++ i )
                if (mask >> i & 1)
                    f[mask] = min(f[mask], f[mask ^ (1 << i)] + (a[s - 1] ^ b[i]));
        }
        return f[(1 << n) - 1];
    }
};
```
