#  [668. 乘法表中第k小的数](https://leetcode.cn/problems/kth-smallest-number-in-multiplication-table/)

## 题意



## 题解



```c++
class Solution {
public:
    // 可以用堆
    // 性质 显然可以二分
    int get(int m, int n, int mid) {
        int ret = 0;
        // 每一列有多少个小于等于 mid 的数
        for (int i = 1; i <= n; ++ i )
            ret += min(m, mid / i);
        return ret;
    }

    int findKthNumber(int m, int n, int k) {
        int l = 1, r = n * m;
        while (l < r) {
            int mid = l + r >> 1;
            if (get(m, n, mid) >= k)
                r = mid;
            else
                l = mid + 1;
        }
        return l;
    }
};
```



```python3

```

