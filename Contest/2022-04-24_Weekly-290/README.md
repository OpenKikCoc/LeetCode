## [比赛链接](https://leetcode.cn/contest/weekly-contest-290/)

>   virtual rank: 226 / 6275
>
>   第三题卡常，当然也有一些经验可以总结


### [2248. 多个数组求交集](https://leetcode.cn/problems/intersection-of-multiple-arrays/)



```c++
class Solution {
public:
    const static int N = 1010;
    
    int c[N];
    vector<int> intersection(vector<vector<int>>& nums) {
        for (auto & a : nums)
            for (auto & x : a)
                c[x] ++ ;
        int n = nums.size();
        vector<int> res;
        for (int i = 1; i < N; ++ i )
            if (c[i] == n)
                res.push_back(i);
        return res;
    }
};
```


### [2249. 统计圆内格点数目](https://leetcode.cn/problems/count-lattice-points-inside-a-circle/)



```c++
class Solution {
public:
    const static int N = 210;
    
    vector<vector<int>> cs;
    bool check(int x, int y) {
        for (auto & c : cs) {
            int x0 = c[0], y0 = c[1], r = c[2];
            int dx = abs(x - x0), dy = abs(y - y0);
            if (dx * dx + dy * dy <= r * r)
                return true;
        }
        return false;
    }
    
    int countLatticePoints(vector<vector<int>>& circles) {
        this->cs = circles;
        int res = 0;
        for (int i = 0; i < N; ++ i )
            for (int j = 0; j < N; ++ j )
                if (check(i, j))
                    res ++ ;
        return res;
    }
};
```

### [6043. 统计包含每个点的矩形数目](https://leetcode.cn/problems/count-number-of-rectangles-containing-each-point/)

貌似卡常数。。。蛋疼

经验：离散化映射时直接 lower_bound 比建立个 unordered_map 更快

```c++
class Solution {
public:
    // using LL = long long;
    // 本质对每个点求 在其右上方的矩阵右上顶点的数量
    const static int N = 1e5 + 10, M = 110;
    
    // int s[N][M];
    
    vector<int> countRectangles(vector<vector<int>>& rectangles, vector<vector<int>>& points) {
        int n = 0, m = 0;
        vector<int> ids;
        {
            // 离散化
            ids.push_back(0);
            for (auto & r : rectangles)
                ids.push_back(r[0]), m = max(m, r[1]);
            for (auto & p : points)
                ids.push_back(p[0]), m = max(m, p[1]);
            sort(ids.begin(), ids.end());
            ids.erase(unique(ids.begin(), ids.end()), ids.end());
            
            // 转换映射
            for (auto & r : rectangles)
                r[0] = lower_bound(ids.begin(), ids.end(), r[0]) - ids.begin();
            for (auto & p : points)
                p[0] = lower_bound(ids.begin(), ids.end(), p[0]) - ids.begin();
        }
        n = ids.size();
        vector<vector<int>> s(n + 1, vector<int>(m + 1));
        {
            for (auto & r : rectangles)
                s[r[0]][r[1]] ++ ;
            for (int i = 1; i < n + 1; ++ i )
                for (int j = 1; j < m + 1; ++ j )
                    s[i][j] += s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1];
        }
        
        vector<int> res;
        for (auto & p : points) {
            int t = s[n][m] - s[p[0] - 1][m] - s[n][p[1] - 1] + s[p[0] - 1][p[1] - 1];
            res.push_back(t);
        }
        return res;
    }
};
```

标准解答

```c++
class Solution {
public:
    const static int N = 110;

    vector<int> v[N];  // 按列统计（横向）

    vector<int> countRectangles(vector<vector<int>>& rectangles, vector<vector<int>>& points) {
        for (auto & r : rectangles)
            v[r[1]].push_back(r[0]);
        for (int i = 1; i < N; ++ i )
            sort(v[i].begin(), v[i].end());
        
        vector<int> res;
        for (auto & p : points) {
            int t = 0;
            for (int i = p[1]; i < N; ++ i )
                t += v[i].end() - lower_bound(v[i].begin(), v[i].end(), p[0]);
            res.push_back(t);
        }
        return res;
    }
};
```

### [2251. 花期内花的数目](https://leetcode.cn/problems/number-of-flowers-in-full-bloom/)

写了 BIT

实际上 BIT 不会修改，所以直接用差分最后求和得原数组即可，不需要 query

```c++
class Solution {
public:
    const static int N = 2e5 + 10;
    
    int tr[N];
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int c) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += c;
    }
    int query(int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& persons) {
        vector<int> ids;
        ids.push_back(0);
        for (auto & f : flowers)
            ids.push_back(f[0]), ids.push_back(f[1]);
        for (auto & p : persons)
            ids.push_back(p);
        sort(ids.begin(), ids.end());
        ids.erase(unique(ids.begin(), ids.end()), ids.end());
        // return {};
        
        for (auto & f : flowers) {
            f[0] = lower_bound(ids.begin(), ids.end(), f[0]) - ids.begin();
            f[1] = lower_bound(ids.begin(), ids.end(), f[1]) - ids.begin();
            add(f[0], 1), add(f[1] + 1, -1);
        }
        vector<int> res;
        for (auto & p : persons) {
            p = lower_bound(ids.begin(), ids.end(), p) - ids.begin();
            res.push_back(query(p));
        }
        return res;
    }
};
```
