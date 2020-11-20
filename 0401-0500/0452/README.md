#  [452. 用最少数量的箭引爆气球](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/)

## 题意



## 题解



```c++
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        int len = points.size();
        if (len == 0) return 0;
        sort(points.begin(), points.end(), [](vector<int> a, vector<int> b) {
            //return a[1] == b[1] ? a[0] < b[0] : a[1] < b[1];
            return a[1] < b[1];
        });
        int fast = 1, last = points[0][1], ans = 1;
        while(fast < len) {
            if (points[fast][0] > last) {
                ++ans;
                last = points[fast][1];
            }
            ++fast;
        }
        return ans;
    }
};
```



```python3

```

