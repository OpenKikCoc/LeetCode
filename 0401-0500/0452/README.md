#  [452. 用最少数量的箭引爆气球](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/)

## 题意



## 题解

```c++
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        if (points.empty()) return 0;
        sort(points.begin(), points.end(), [](vector<int> a, vector<int> b) {
            return a[1] < b[1];
        });
        int res = 1, r = points[0][1];
        for (int i = 1; i < points.size(); i ++ )
            if (points[i][0] > r) {
                res ++ ;
                r = points[i][1];
            }
        return res;
    }
};
```



```python3

```

