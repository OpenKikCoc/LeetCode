#  [391. 完美矩形](https://leetcode-cn.com/problems/perfect-rectangle/)

## 题意



## 题解



```c++
class Solution {
public:
    // 所有点次数：
    // 1次 4个
    // 3   0
    //2or4 inf
    // 总面积相同
    // ==> 如果是完美矩形 那么一定满足两点：
    // （1）最左下 最左上 最右下 最右上 的四个点只出现一次 其他点成对出现 
    // （2）四个点围城的矩形面积 = 小矩形的面积之和
    // ==> 把每个子矩形的面积累加，四个坐标放进一个vector，然后sort一下，
    // 相同的坐标消去。最后剩下4个出现奇数次的点，且这个四个点围成的矩形面积等于子矩形面积和，则为true
    bool isRectangleCover(vector<vector<int>>& rectangles) {
        map<pair<int, int>, int> cnt;
        typedef long long LL;
        LL sum = 0;
        for (auto x : rectangles) {
            LL x1 = x[0], y1 = x[1], x2 = x[2], y2 = x[3];
            ++ cnt[{x1, y1}], ++ cnt[{x1, y2}];
            ++ cnt[{x2, y1}], ++ cnt[{x2, y2}];
            sum += (x2 - x1) * (y2 - y1);
        }
        vector<vector<int>> res;
        for (auto & [k, v] : cnt)
            if (v == 1) res.push_back({k.first, k.second});
            else if (v == 3) return false;
            else if (v > 4) return false;
        if (res.size() != 4) return false;
        sort(res.begin(), res.end());
        return sum == (LL)(res[3][0] - res[0][0]) * (res[3][1] - res[0][1]);
    }
};
```



```python3

```

