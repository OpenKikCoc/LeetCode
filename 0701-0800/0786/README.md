#  [786. 第 K 个最小的素数分数](https://leetcode-cn.com/problems/k-th-smallest-prime-fraction/)

## 题意



## 题解



```c++
class Solution {
public:
    const double eps = 1e-8;
    int A, B, n;
    vector<int> a;

    // 仍然可优化 显然随着i增加j只会更靠右 具有单调性
    int get(double m) {
        int ret = 0;
        for (int i = 0, j = 0; i < n; ++ i ) {
            while ((double)a[j + 1] / a[i] <= m)
                j ++ ;
            if ((double)a[j] / a[i] <= m)
                ret += j + 1;
            if (fabs((double)a[j] / a[i] - m) < eps)
                A = a[j], B = a[i];
        }
        return ret;
    }

    vector<int> kthSmallestPrimeFraction(vector<int>& arr, int k) {
        this->a = arr; n = a.size();
        double l = 0, r = 1;
        while (r - l > eps) {
            double m = (l + r) / 2;
            if (get(m) < k)
                l = m;
            else
                r = m;
        }
        get(l);
        return {A, B};
    }
};
```



```python3

```

