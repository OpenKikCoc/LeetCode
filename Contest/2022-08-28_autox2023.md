## [比赛链接](https://leetcode.cn/contest/autox2023/)


### [网页瀑布流](https://leetcode.cn/contest/autox2023/problems/l9HbCJ/)

也可以直接用堆

```c++
class Solution {
public:
    const static int N = 110;
    
    int n;
    int s[N];
    
    int getLengthOfWaterfallFlow(int num, vector<int>& block) {
        memset(s, 0, sizeof s);
        this->n = num;
        
        for (auto x : block) {
            int p = 1;
            for (int i = 1; i <= n; ++ i )
                if (s[i] < s[p])
                    p = i;
            s[p] += x;
        }
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            res = max(res, s[i]);
        return res;
    }
};
```


### [蚂蚁王国的蜂蜜](https://leetcode.cn/contest/autox2023/problems/8p6t8R/)



```c++
class Solution {
public:
    const static int N = 110;
    
    int c[N], s, t;
    vector<double> honeyQuotes(vector<vector<int>>& handle) {
        memset(c, 0, sizeof c);
        s = 0, t = 0;
        
        vector<double> res;
        for (auto & h : handle) {
            int type = h[0];
            if (type == 1) {
                int p = h[1];
                c[p] ++ ;
                s += p, t ++ ;
            } else if (type == 2) {
                int p = h[1];
                c[p] -- ;
                s -= p, t -- ;
            } else if (type == 3) {
                if (t == 0)
                    res.push_back(-1);
                else
                    res.push_back((double)s / t);
            } else {
                if (t == 0)
                    res.push_back(-1);
                else {
                    double x = (double)s / t;
                    double y = 0;
                    for (int i = 0; i < N; ++ i )
                        if (c[i]) {
                            double v = (double)(i - x);
                            y += v * v * c[i];
                        }
                    res.push_back(y / t);
                }
            }
        }
        return res;
    }
};
```

方差又等于 $平方的均值 - 均值的平方$

```c++
class Solution {
public:
    vector<double> honeyQuotes(vector<vector<int>>& handle) {
        double s = 0, t = 0, c = 0;
        vector<double> res;
        for (auto & h : handle) {
            int type = h[0];
            if (type == 1) {
                int x = h[1];
                s += x, t += x * x, c ++ ;
            } else if (type == 2) {
                int x = h[1];
                s -= x, t -= x * x, c -- ;
            } else if (type == 3) {
                res.push_back(c ? s / c : -1);
            } else {
                res.push_back(c ? t / c - s / c * s / c : -1);
            }
        }
        return res;
    }
};
```



### [出行的最少购票费用](https://leetcode.cn/contest/autox2023/problems/BjAFy9/)



```c++
class Solution {
public:
    // 从贪心的角度看，必定存在一种最优方案，满足所有套票在某次飞行的当天过期
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL f[N];
    
    long long minCostToTravelOnDays(vector<int>& days, vector<vector<int>>& tickets) {
        memset(f, 0x3f, sizeof f);
        for (auto & t : tickets)
            f[0] = min(f[0], (LL)t[1]);
        
        for (int i = 1; i < days.size(); ++ i ) {
            int d = days[i];
            for (auto & t : tickets) {
                int x = d - t[0];
                
                // ATTENTION 细节
                // 找到不能包含在本次套票内的最后一个位置 显然必须 <= x
                int y = lower_bound(days.begin(), days.end(), x + 1) - days.begin() - 1;
                if (y < 0)
                    f[i] = min(f[i], 0ll + t[1]);
                else
                    f[i] = min(f[i], f[y] + t[1]);
                // f[d] = min(f[d], g[d - max(0, d - t[0])] + t[1]);
            }
        }
        
        return f[days.size() - 1];
    }
};
```

注意到每种票所对应最终的二分结果都是随着 $i$ 单调不减的，所以可以使用多个「双指针」替代二分。

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL f[N];
    
    long long minCostToTravelOnDays(vector<int>& days, vector<vector<int>>& tickets) {
        memset(f, 0x3f, sizeof f);
        for (auto & t : tickets)
            f[0] = min(f[0], (LL)t[1]);
        
        vector<int> last(tickets.size(), 0);
        
        for (int i = 1; i < days.size(); ++ i )
            for (int j = 0; j < tickets.size(); ++ j ) {
                auto & t = tickets[j];
                int x = days[i] - t[0];
                while (days[last[j]] <= x)
                    last[j] ++ ;
                
                int y = last[j] - 1;
                if (y < 0)
                    f[i] = min(f[i], 0ll + t[1]);
                else
                    f[i] = min(f[i], f[y] + t[1]);
            }
        return f[days.size() - 1];
    }
};
```



### [蚂蚁爬行](https://leetcode.cn/contest/autox2023/problems/TcdlJS/) [TAG]



```c++
class Solution {
    using LL = long long;
private:
    vector<int> f, sz;

    int find(int x) {
        return x == f[x] ? x : f[x] = find(f[x]);
    }

    void add(int x, int y) {
        int fx = find(x), fy = find(y);
        if (fx == fy)
            return;

        if (sz[fx] < sz[fy]) {
            f[fx] = fy;
            sz[fy] += sz[fx];
        } else {
            f[fy] = fx;
            sz[fx] += sz[fy];
        }
    }

    bool segment(const vector<int> &p, const vector<int> &q) {
        // 快速排斥实验

        if (!(
            min(p[0], p[2]) <= max(q[0], q[2]) && 
            min(q[0], q[2]) <= max(p[0], p[2]) &&
            min(p[1], p[3]) <= max(q[1], q[3]) &&
            min(q[1], q[3]) <= max(p[1], p[3])
        ))
            return false;

        // 跨立实验
        LL x1 = q[0] - p[0], y1 = q[1] - p[1];
        LL x2 = q[2] - p[0], y2 = q[3] - p[1];
        LL x3 = q[0] - p[2], y3 = q[1] - p[3];
        LL x4 = q[2] - p[2], y4 = q[3] - p[3];

        if (x1 * y2 - y1 * x2 > 0 && x3 * y4 - y3 * x4 > 0)
            return false;

        if (x1 * y2 - y1 * x2 < 0 && x3 * y4 - y3 * x4 < 0)
            return false;

        x1 = -x1; y1 = -y1;
        x2 = -x2; y2 = -y2;
        x3 = -x3; y3 = -y3;
        x4 = -x4; y4 = -y4;

        if (x1 * y3 - y1 * x3 > 0 && x2 * y4 - y2 * x4 > 0)
            return false;

        if (x1 * y3 - y1 * x3 < 0 && x2 * y4 - y2 * x4 < 0)
            return false;

        return true;
    }

    bool circle(const vector<int> &p, const vector<int> &q) {
        LL x1 = p[0], y1 = p[1], r1 = p[2];
        LL x2 = q[0], y2 = q[1], r2 = q[2];

        // 判断圆心距是否大于半径之和
        if ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) > (r1 + r2) * (r1 + r2))
            return false;

        // 判断圆心距是否小于半径之差
        if ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) < (r1 - r2) * (r1 - r2))
            return false;

        return true;
    }

    bool segment_circle(const vector<int> &p, const vector<int> &q) {
        LL x1 = p[0], y1 = p[1], x2 = p[2], y2 = p[3];
        LL x = q[0], y = q[1], r = q[2];

        // 判断端点是否在圆内
        bool in1 = false, in2 = false;

        if ((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y) < r * r)
            in1 = true;

        if ((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y) < r * r)
            in2 = true;

        // 如果端点都在圆内都不相交
        if (in1 && in2)
            return false;

        // 端点一个在圆内，一个在圆上或圆外，则相交
        if (in1 || in2)
            return true;

        // 端点都在圆外
        // 求圆心到直线的垂线距离
        double a = y1 - y2, b = x2 - x1, c = x1 * y2 - x2 * y1;

        // 垂线距离大于半径，则不相交
        if ((a * x + b * y + c) * (a * x + b * y + c) - r * r * (a * a + b * b) > 1e-8)
            return false;

        // 判断 ABO 和 BAO 都是锐角
        if ((x1 - x2) * (x - x2) + (y1 - y2) * (y - y2) < 0)
            return false;

        if ((x2 - x1) * (x - x1) + (y2 - y1) * (y - y1) < 0)
            return false;

        return true;
    }

    bool intersected(const vector<int> &g1, const vector<int> &g2) {
        if (g1.size() == 4 && g2.size() == 4)
            return segment(g1, g2);

        if (g1.size() == 3 && g2.size() == 3)
            return circle(g1, g2);

        if (g1.size() == 4)
            return segment_circle(g1, g2);

        return segment_circle(g2, g1);
    }

public:
    vector<bool> antPass(vector<vector<int>>& geometry, vector<vector<int>>& path) {
        const int n = geometry.size();

        f.resize(n);
        sz.resize(n, 1);

        for (int i = 0; i < n; i++)
            f[i] = i;

        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                if (find(i) == find(j))
                    continue;

                if (intersected(geometry[i], geometry[j])) 
                    add(i, j);
            }

        vector<bool> ans;
        for (const auto &p : path)
            ans.push_back(find(p[0]) == find(p[1]));

        return ans;
    }
};\
```
