## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-47/)


### [1779. 找到最近的有相同 X 或 Y 坐标的点](https://leetcode-cn.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate/)

略

```c++
class Solution {
public:
    using TIII = tuple<int, int, int>;
    int nearestValidPoint(int x, int y, vector<vector<int>>& points) {
        vector<TIII> ve;
        int dis = 1e9, n = points.size();
        for (int i = 0; i < n; ++ i ) {
            auto & p = points[i];
            int nx = p[0], ny = p[1];
            if (nx == x || ny == y) {
                int d = abs(x - nx) + abs(y - ny);
                if (d < dis)
                    ve.clear(), ve.push_back({nx, ny, i}), dis = d;
            }
        }
        if (ve.empty())
            return -1;
        auto [a, b, id] = ve[0];
        return id;
    }
};
```

```c++
class Solution {
public:
    int nearestValidPoint(int x, int y, vector<vector<int>>& points) {
        int ans = -1, dis = INT_MAX, i = 0;
        for(auto p : points){
            if(p[0] == x or p[1] == y){
                int d = abs(p[0] - x) + abs(p[1] - y);
                if(d < dis){
                    dis = d;
                    ans = i;
                }
            }
            i += 1;
        }
        return ans;
    }
};
```

### [1780. 判断一个数字是否可以表示成三的幂的和](https://leetcode-cn.com/problems/check-if-number-is-a-sum-of-powers-of-three/)

思考转化三进制即可

```c++
class Solution {
public:
    bool checkPowersOfThree(int n) {
        for (; n; n /= 3)
            if (n % 3 == 2)
                return false;
        return true;
    }
};
```

### [1781. 所有子字符串美丽值之和](https://leetcode-cn.com/problems/sum-of-beauty-of-all-substrings/)

暴力即可 扫描的实现有小优化

```c++
class Solution {
public:
    int beautySum(string s) {
        int n = s.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            unordered_map<char, int> hash;
            for (int j = i; j < n; ++ j ) {
                hash[s[j]] ++ ;
                int maxv = 0, minv = n;
                for (auto [c, v] : hash)
                    maxv = max(maxv, v), minv = min(minv, v);
                res += maxv - minv;
            }
        }
        return res;
    }
};
```

### [1782. 统计点对的数目](https://leetcode-cn.com/problems/count-pairs-of-nodes/) [TAG]

需优化枚举点对的过程

**容斥原理**

```c++
class Solution {
public:
    vector<int> countPairs(int n, vector<vector<int>>& edges, vector<int>& queries) {
        vector<int> d(n + 1);
        unordered_map<int, int> cnt;
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            if (a > b)
                swap(a, b);
            cnt[a * 100000 + b] ++ ;
            d[a] ++ , d[b] ++ ;
        }
        vector<int> ds(d.begin() + 1, d.end());
        sort(ds.begin(), ds.end());
        
        vector<int> res;
        for (auto & q : queries) {
            // 遍历所有边
            // 先求满足条件且 d[a,b] > 0 的部分
            // s1:  d[a] + d[b] - d[a,b] > cnt && d[a,b] > 0
            // 容斥求满足条件且 d[a,b] = 0 的部分
            // s2:  d[a] + d[b] > cnt && d[a,b] > 0
            // s3:  d[a] + d[b] > cnt
            int s1 = 0, s2 = 0, s3 = 0;
            for (auto [k, v] : cnt) {
                // 循环内所有点对的 v 都不为 0
                int a = k / 100000, b = k % 100000;
                if (d[a] + d[b] - v > q) s1 ++ ;
                if (d[a] + d[b] > q) s2 ++ ;
            }
            // 双指针计算 s3
            for (int i = n - 1, j = 0; j < i; -- i ) {
                while (j < i && ds[i] + ds[j] <= q) ++ j ;
                if (j < i && ds[i] + ds[j] > q) s3 += i - j;
            }
            res.push_back(s1 + s3 - s2);
        }
        return res;
    }
};
```


```c++
// 48 / 63 个通过测试用例
// TLE

class Solution {
public:
    using TIII = tuple<int, int, int>;
    using PII = pair<int, int>;
    
    const static int N = 20010;
    unordered_map<int, int> es[N];
    int tot[N];
    
    vector<int> countPairs(int n, vector<vector<int>>& edges, vector<int>& queries) {
        for (int i = 1; i <= n; ++ i )
            es[i].clear();
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            es[a][b] ++ , es[b][a] ++ ;
            tot[a] ++ , tot[b] ++ ;
        }
        
        vector<TIII> ps;
        for (int i = 1; i <= n; ++ i )
            for (int j = i + 1; j <= n; ++ j ) {
                int c = tot[i] + tot[j];
                if (es[i].count(j))
                    c -= es[i][j];
                ps.push_back({c, i, j});
            }
        sort(ps.begin(), ps.end());
        int sz = ps.size();
        
        int m = queries.size();
        vector<PII> qs;
        for (int i = 0; i < m; ++ i )
            qs.push_back({queries[i], i});
        sort(qs.begin(), qs.end());
    
        vector<int> res(m);
        for (int i = 0, j = 0; i < m; ++ i ) {
            while (j < sz && get<0>(ps[j]) <= qs[i].first)
                ++ j ;
            res[qs[i].second] = sz - j;
        }
        
        return res;
    }
};
```
