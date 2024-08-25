## [比赛链接](https://leetcode.cn/contest/weekly-contest-408/)


### [3232. 判断是否可以赢得数字游戏](https://leetcode.cn/problems/find-if-digit-game-can-be-won/)



```c++
class Solution {
public:
    bool canAliceWin(vector<int>& nums) {
        int a = 0, b = 0;
        for (auto x : nums)
            if (x > 9)
                a += x;
            else
                b += x;
        if (a < b)
            swap(a, b);
        return a > b;
    }
};
```


### [3233. 统计不是特殊数字的数字数量](https://leetcode.cn/problems/find-the-count-of-numbers-which-are-not-special/)



```c++
class Solution {
public:
    // special: 意味着这个数是个完全平方数, 且开方为质数
    
    bool check(int x) {
        if (x == 1) // 特判断
            return false;
        for (int i = 2; i <= x / i; ++ i )
            if (x % i == 0)
                return false;
        return true;
    }
    
    int nonSpecialCount(int l, int r) {
        int x = sqrt(l), y = sqrt(r), cnt = 0;
        for (int i = x; i <= y; ++ i )
            if (check(i)) {
                int t = i * i;
                if (t < l || t > r)
                    continue;
                cnt ++ ;
            }
        return r - l + 1 - cnt;
    }
};
```

### [3234. 统计 1 显著的字符串的数量](https://leetcode.cn/problems/count-the-number-of-substrings-with-dominant-ones/) [TAG]

时间复杂度证明

以及 计算逻辑细节

```c++
class Solution {
public:
    // 类似题目 考虑枚举右端点 计算合法左端点的数量
    //
    // 感觉像是 O(n^2) 的做法...
    // => 实际上 0 的数量不会超过 log(len)
    //  考虑枚举 0 的数量，总的时间复杂度为 O(n*log(n))
    
    int numberOfSubstrings(string s) {
        int n = s.size();
        int res = 0;
        vector<int> zeros;
        zeros.push_back(0); // 哨兵
        for (int i = 1; i <= n; ++ i ) {
            int t = s[i - 1] - '0';
            if (t)  // 当前位置为 1
                res += i - zeros.back();    // ATTENTION 1. 不包含任何0的情况
            else
                zeros.push_back(i);
            
            // ATTENTION 2. 包含至少 1 个 0 的情况
            //
            // m-j 用来优化复杂度 避免无意义的遍历 k*k <= num_of_ones = i-m
            int m = zeros.size();
            for (int j = m - 1; j > 0 /*ATTENTION > 0*/ && (m - j) <= (i - (m - 1)) / (m - j); -- j ) {
                // 该区间内 0,1 的数量
                int c0 = m - j;
                int c1 = (i - zeros[j] + 1/*总长度 ATTENTION: +1*/) - c0;
                
                // 在 zeros[j] 左侧还有一段1 数量为 tot = zeros[j]-zeros[j-1]-1
                // 问题在于这些1 有一部分是已经不得不消耗的 具体为 cost = c0*c0-c1
                //      剩下的 比较灵活 即为 tot - cost + 1
                //                  zeros[j]-zeros[j-1] -1 - cost +1
                res += max(0, zeros[j] - zeros[j - 1] - max(0, c0 * c0 - c1));
            }
        }
        return res;
    }
};
```

### [3235. 判断矩形的两个角落是否可达](https://leetcode.cn/problems/check-if-the-rectangle-corner-is-reachable/) [TAG]

1. 定义 n+4 个点：所有的圆都看做一个点，矩形的四条边各看做一个点。两个圆相切或相交，或者圆与矩形的边相交就可以看做架了一座桥，如果发现从矩形的左边可以通过桥到右边，则说明路都被堵死了。其余情况同理。分析下面几种建图的情况：

   - 如果圆与矩形的某条边相切或相交，则这个圆与这条边连边。

   - 如果两个圆相切或相交，且这两个圆的交集全部都在矩形内，则这两个圆连边。

   - 如果两个圆相切或相交，但这两个圆的交集都在矩形外，则这两个圆一定不连边。

   - 如果两个圆相切或相交，这两个圆的交集一部分在圆内，一部分在圆外，则这两个圆可连边也可不连边，不会影响最终答案。

   - 如果两个圆没有相切或相交，则这两个圆不连边。

2. 根据以上结论，如果两个圆有交集，则可以任取交集的一点，如果这个点在矩形内，则连边，否则不连边。这个点可以取两个圆心连线的线段上，按半径比例的分点。
3. 使用并查集或 BFS 判断左边和底边，或左边和右边，或顶边和底边，或顶边和右边是否连通，如果连通，则答案为 false。

> ref: https://www.acwing.com/solution/content/249388/

```c++
class Solution {
private:
    using LL = long long;
    
    vector<int> f, sz;
    int find(int x) {
        return x == f[x] ? x : f[x] = find(f[x]);
    }
    void add(int x, int y) {
        int fx = find(x), fy = find(y);
        if (fx == fy)
            return;

        if (sz[fx] < sz[fy]) {
            sz[fy] += sz[fx];
            f[fx] = fy;
        } else {
            sz[fx] += sz[fy];
            f[fy] = fx;
        }
    }

    inline LL sqr(int x) {
        return (LL)(x) * x;
    }

    inline bool intersect(const vector<int> &c1, const vector<int> &c2) {
        int x1 = c1[0], y1 = c1[1], r1 = c1[2];
        int x2 = c2[0], y2 = c2[1], r2 = c2[2];
        return sqr(x1 - x2) + sqr(y1 - y2) <= sqr(r1 + r2);
    }

    inline bool intersect_in_square(
        const vector<int> &c1, const vector<int> &c2, int X, int Y
    ) {
        LL x1 = c1[0], y1 = c1[1], r1 = c1[2];
        LL x2 = c2[0], y2 = c2[1], r2 = c2[2];

        if (x1 * r2 + x2 * r1 < 0)
            return false;

        if (x1 * r2 + x2 * r1 > (r1 + r2) * X)
            return false;

        if (y1 * r2 + y2 * r1 < 0)
            return false;

        if (y1 * r2 + y2 * r1  > (r1 + r2) * Y)
            return false;

        return true;
    }

    inline bool cross_v(const vector<int> &c, int X, int Y1, int Y2) {
        LL x = c[0], y = c[1], r = c[2];

        if (y <= Y1)
            return sqr(x - X) + sqr(y - Y1) <= sqr(r);

        if (y >= Y2)
            return sqr(x - X) + sqr(y - Y2) <= sqr(r);

        return abs(x - X) <= r;
    }

    inline bool cross_h(const vector<int> &c, int X1, int X2, int Y) {
        LL x = c[0], y = c[1], r = c[2];

        if (x <= X1)
            return sqr(x - X1) + sqr(y - Y) <= sqr(r);

        if (x >= X2)
            return sqr(x - X2) + sqr(y - Y) <= sqr(r);

        return abs(y - Y) <= r;
    }

public:
    bool canReachCorner(int X, int Y, vector<vector<int>>& circles) {
        const int n = circles.size();
        f.resize(n + 4);
        sz.resize(n + 4);

        for (int i = 0; i < n + 4; i++) {
            f[i] = i;
            sz[i] = 1;
        }

        for (int i = 0; i < n; i++) {
            if (cross_v(circles[i], 0, 0, Y)) add(i, n);
            if (cross_h(circles[i], 0, X, Y)) add(i, n + 1);
            if (cross_v(circles[i], X, 0, Y)) add(i, n + 2);
            if (cross_h(circles[i], 0, X, 0)) add(i, n + 3);
        }

        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                if (intersect(circles[i], circles[j]) && 
                intersect_in_square(circles[i], circles[j], X, Y))
                    add(i, j);

        int f0 = find(n), f1 = find(n + 1), f2 = find(n + 2), f3 = find(n + 3);

        return !(f0 == f2 || f1 == f3 || f0 == f3 || f1 == f2);
    }
};
```
