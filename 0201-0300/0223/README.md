#  [223. 矩形面积](https://leetcode-cn.com/problems/rectangle-area/)

## 题意



## 题解



```c++
class Solution {
public:
    // 相交面积 = 在x轴投影的相交长度 * 在y轴投影的相交长度
    // 线段相交长度 = 右端点的最小值 - 左端点的最大值  , 小于0则不相交
    int computeArea(int A, int B, int C, int D, int E, int F, int G, int H) {
        long long X = min(C, G) + 0ll - max(A, E);
        long long Y = min(D, H) + 0ll - max(B, F);
        return (C - A) * (D - B) - max(0ll, X) * max(0ll, Y) + (G - E) * (H - F);
    }
};
```



```python3

```

