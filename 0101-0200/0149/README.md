#  [149. 直线上最多的点数](https://leetcode.cn/problems/max-points-on-a-line/)

## 题意



## 题解



```c++
// yxc
class Solution {
public:
    int maxPoints(vector<Point>& points) {
        if (points.empty()) return 0;
        int res = 1;
        for (int i = 0; i < points.size(); i ++ ) {
            unordered_map<long double, int> map;
            int duplicates = 0, verticals = 1;

            for (int j = i + 1; j < points.size(); j ++ )
                if (points[i].x == points[j].x) {
                    verticals ++ ;
                    if (points[i].y == points[j].y) duplicates ++ ;
                }

            for (int j = i + 1; j < points.size(); j ++ )
                if (points[i].x != points[j].x) {
                    long double slope = (long double)(points[i].y - points[j].y) / (points[i].x - points[j].x);
                    if (map[slope] == 0) map[slope] = 2;
                    else map[slope] ++ ;
                    res = max(res, map[slope] + duplicates);
                }

            res = max(res, verticals);
        }
        return res;
    }
};

// yxc new
class Solution {
public:
    int maxPoints(vector<vector<int>>& points) {
        typedef long double LD;

        int res = 0;
        for (auto& p: points) {
            int ss = 0, vs = 0;
            unordered_map<LD, int> cnt;
            for (auto& q: points)
                if (p == q) ss ++ ;
                else if (p[0] == q[0]) vs ++ ;
                else {
                    LD k = (LD)(q[1] - p[1]) / (q[0] - p[0]);
                    cnt[k] ++ ;
                }
            int c = vs;
            for (auto [k, t]: cnt) c = max(c, t);
            res = max(res, c + ss);
        }
        return res;
    }
};
```



```c++
class Solution {
public:
    int maxPoints(vector<vector<int>>& points) {
        int len = points.size();
        if (len < 3) return len;
        int result = 0;
        for (int i = 0; i < len; ++ i ) {
            int duplicate = 0;
            int curMax = 0;
            unordered_map<string, int> oneline;
            for (int j = i+1; j < len; ++ j ) {
                if (points[i][0] == points[j][0] && points[i][1] == points[j][1]) {
                    duplicate += 1;
                    continue;
                }
                int diffX = points[i][0] - points[j][0];
                int diffY = points[i][1] - points[j][1];
                int tmp = gcd(diffX, diffY);
                string key = to_string(diffX/tmp) + "/" + to_string(diffY/tmp);

                oneline[key] ++ ;
                curMax = max(curMax, oneline[key]);
            }
            result = max(result, curMax + duplicate + 1);
        }
        return result;
    }
    int gcd(int a, int b) {
        if (b) return gcd(b, a % b);
        return a;
    }
};
```



```python3

```

