#  [478. 在圆内随机生成点](https://leetcode.cn/problems/generate-random-point-in-a-circle/)

## 题意



## 题解



```c++
// 矩阵内采样
class Solution {
public:
    double r, cx, cy;
    Solution(double radius, double x_center, double y_center) {
        r = radius, cx = x_center, cy = y_center;
    }

    vector<double> randPoint() {
        double a = (double)rand() / RAND_MAX * 2 - 1;
        double b = (double)rand() / RAND_MAX * 2 - 1;
        if (a * a + b * b > 1) return randPoint();
        return {cx + r * a, cy + r * b};
    }
};

// 直接采样
// 圆内的点有两个参数，距离圆心的距离和角度。
// 距离圆心的距离是二维的，需要在 [0, r^2] 内采样然后开方，才能保证是均匀分布。
// 角度直接在 [0, 2 * pi] 内采样就可以。
class Solution {
private:
    double r, x, y;

public:
    Solution(double radius, double x_center, double y_center) {
        r = radius, x = x_center, y = y_center;
    }

    vector<double> randPoint() {
        double cr = r * sqrt(1.0 * rand() / RAND_MAX);
        double angle = 2 * M_PI * rand() / RAND_MAX;
        double cx = x + cr * cos(angle), cy = y + cr * sin(angle);
        return {cx, cy};
    }
};
```



```python3

```

