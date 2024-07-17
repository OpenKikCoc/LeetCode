## [比赛链接](https://leetcode.cn/contest/weekly-contest-189/)


### [1450. 在既定时间做作业的学生人数](https://leetcode.cn/problems/number-of-students-doing-homework-at-a-given-time/)

扫一遍即可

```c++
    int busyStudent(vector<int>& startTime, vector<int>& endTime, int queryTime) {
        int n = startTime.size(), res = 0;
        for(int i = 0; i < n; ++i) {
            if(startTime[i] <= queryTime && endTime[i] >= queryTime) ++res;
        }
        return res;
    }
```

### [1451. 重新排列句子中的单词](https://leetcode.cn/problems/rearrange-words-in-a-sentence/)

按长度稳定排序。

`stringstream`

```c++
    string arrangeWords(string text) {
        vector<string> ws;
        stringstream ss(text);
        string t;
        while(ss >> t) ws.push_back(t);
        if(!ws.empty()) ws[0][0] = tolower(ws[0][0]);
        
        stable_sort(ws.begin(), ws.end(), [](const string& a, const string& b) {
            return a.size() < b.size();
        });
        string res;
        for(auto s : ws) {
            res += s;
            res += " ";
        }
        if(!res.empty()) res[0] = toupper(res[0]);
        res.pop_back();	// 去除空格
        return res;
    }
```

### [1452. 收藏清单](https://leetcode.cn/problems/people-whose-list-of-favorite-companies-is-not-a-subset-of-another-list/)

多组字符串，返回不是其他组子集的组。

排序后暴力即可

bitset可以优化 因为每一个字符串都不同 可以对字符串编码

```c++
    bool check(vector<vector<string>>& f, int x, int y) {
        int p = 0;
        for(int k = 0; k < f[x].size(); ++k) {
            while(p < f[y].size() && f[x][k] != f[y][p]) ++p;
            if(p == f[y].size()) return false;
        }
        return true;
    }
    vector<int> peopleIndexes(vector<vector<string>>& f) {
        int n = f.size();
        vector<int> res;
        vector<set<string>> v;
        for(int i = 0; i < n; ++i) sort(f[i].begin(), f[i].end());
        for(int i = 0; i < n; ++i) {
            bool flag = false;
            for(int j = 0; j < n; ++j)
                if(j != i && f[i].size() < f[j].size() && check(f, i, j)) {
                    flag = true;
                    break;
                }
            if(!flag) res.push_back(i);
        }
        return res;
    }
// 优化 bitset
    vector<int> peopleIndexes(vector<vector<string>>& a) {
        int n = a.size();
        unordered_map<string, int> vis;
        int vcnt = 0;   // 1~vcnt 闭区间
        for(int i = 0; i < n; ++i)
            for(int j = 0; j < a[i].size(); ++j)
                if(!vis[a[i][j]]) vis[a[i][j]] = ++vcnt;
        bitset<50500> f[110];
        for(int i = 0; i < n; ++i)
            for(int j = 0; j < a[i].size(); ++j) f[i][vis[a[i][j]]] = 1;
        vector<int> res;
        for(int i = 0; i < n; ++i) {
            bool flag = false;
            for(int j = 0; j < n; ++j) if(j != i) {
                if((f[i] & f[j]) == f[i]) {
                    flag = true;
                    break;
                }
            }
            if(!flag) res.push_back(i);
        }
        return res;
    }
```

### [1453. 圆形靶内的最大飞镖数量](https://leetcode.cn/problems/maximum-number-of-darts-inside-of-a-circular-dartboard/) [TAG]

已知数个点坐标和一个圆半径（圆心任意），求最多有多少个点在圆上（包括边界）。

计算几何题，同 `2019网易春招第三题` 进阶 `JSOI2016`[这里](https://www.luogu.com.cn/problem/P5544)。

这里暴力枚举每两个点的中点垂线计算圆心，扫描其他所有点是否在圆上即可。

```c++
    int check(const vector<vector<int>>& points, double xc, double yc, double r) {
        int ans = 0;
        for (int i = 0; i < points.size(); ++i) {
            int x1 = points[i][0], y1 = points[i][1];
            double dist = (x1 - xc) * (x1 - xc) + (y1 - yc) * (y1 - yc);
            if(dist < r * r + 1e-8) ++ans;
        }
        return ans;
    }
    int numPoints(vector<vector<int>>& points, int r) {
        int n = points.size();
        int res = 1;
        for(int i = 0; i < n; ++i) {
            int x1 = points[i][0], y1 = points[i][1];
            for(int j = i+1; j < n; ++j) {
                int x2 = points[j][0], y2 = points[j][1];
                if((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) > r*r*4) continue;
                double xm = (x1+x2)/2.0, ym = (y1+y2)/2.0;
                double xdir = x1-xm, ydir = y1-ym;
                double norm = sqrt(xdir*xdir + ydir*ydir);
                xdir /= norm; ydir /= norm;

                double xc1 = -ydir, yc1 = xdir;
                double xc2 = ydir, yc2 = -xdir;

                double dist = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
                double lent = sqrt(r*r-dist/4);
                xc1 = xm + lent * xc1;
                yc1 = ym + lent * yc2;
                xc2 = xm + lent * xc2;
                yc2 = ym + lent * yc2;

                int c1 = check(points, xc1, yc1, r), c2 = check(points, xc2, yc2, r);
                //cout <<c1<<" "<<c2<<endl;
                res = max(res, max(c1, c2));
            }
        }
        return res;
    }
```

这样快一些：

```c++
double r;
struct Point {
    double x,y;
    Point() {}
    Point(double tx,double ty) : x(tx), y(ty) {}
};
double dist(Point p1,Point p2) {
    return sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
}
Point get_circle(Point p1,Point p2) {
    Point mid = Point((p1.x+p2.x)/2,(p1.y+p2.y)/2);
    double angle = atan2(p1.x-p2.x,p2.y-p1.y);
    double d = sqrt(r*r-pow(dist(p1,mid),2));
    return Point(mid.x+d*cos(angle),mid.y+d*sin(angle));
}
Point ps[105];

class Solution {
public:
    int numPoints(vector<vector<int>>& p, int ri) {
        r = ri;
        int res = 1;
        int lp = p.size();
        for (int i = 0; i < lp; i++) {
            ps[i].x = p[i][0];
            ps[i].y = p[i][1];
        }
        
        for (int i = 0; i < lp; i++) {
            for (int j = i+1; j < lp; j++) {
                if (dist(ps[i], ps[j]) > 2.0*r) continue;
                Point center = get_circle(ps[i], ps[j]);
                int c = 0;
                for (int k = 0;  k < lp; k++) {
                    if (dist(center, ps[k]) <= r+1e-6) c++;
                }
                res = max(res, c);
            }
        }
        return res;
    }
};
```

