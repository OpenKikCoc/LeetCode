#  [447. 回旋镖的数量](https://leetcode.cn/problems/number-of-boomerangs/)

## 题意



## 题解



```c++
class Solution {
public:
    // 对 On^3 的优化，枚举 i 检查多少个相同距离的点
    int numberOfBoomerangs(vector<vector<int>>& points) {
        int res = 0;
        for (int i = 0; i < points.size(); ++ i ) {
            unordered_map<int, int> cnt;
            for (int j = 0; j < points.size(); ++ j ) {
                if (i != j) {
                    int dx = points[i][0] - points[j][0], dy = points[i][1] - points[j][1];
                    int dist = dx * dx + dy * dy;
                    ++ cnt[dist];
                }
            }
            for (auto [d, c] : cnt) res += c * (c - 1);
        }
        return res;
    }
};
```



```python3

```

