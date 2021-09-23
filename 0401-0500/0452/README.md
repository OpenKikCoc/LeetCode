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



```python
#这道题大意：有一堆线段，问至少有多少个点 使得每个区间至少包含一个点。==> 这是一个经典的贪心模型
#方法：1）将所有区间按照右端点排序；2）从左往右扫描，end值初始化为无穷小：如果本次区间不能覆盖上次区间的右端点,ed<range[i].l, 说明需要一个新的点，res++;ed=range[i].r; 如果本次区间可以覆盖上次区间的右端点，则进行下一轮循环。

class Solution:
    def findMinArrowShots(self, nums: List[List[int]]) -> int:
        q=sorted(nums,key=lambda x:x[1])
        if not q:return 0
        res=1;r=q[0][1]
        for i in range(len(q)):
            if q[i][0]>r:
                res+=1
                r=q[i][1]
        return res
```

