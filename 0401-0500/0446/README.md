#  [446. 等差数列划分 II - 子序列](https://leetcode.cn/problems/arithmetic-slices-ii-subsequence/)

## 题意



## 题解



```c++
class Solution {
public:
/*
关于弱等差数列的转换，以及转换后求真等差数列。

求真等差数列有两种方法：

其一，我们可以对真弱等差数列的数量进行直接计数。真弱等差数列即为长度为 2 的弱等差数列，故其数量为 (i, j) 对的格数，即为 n * (n - 1) / 2

其二，对于 f[i][A[i] - A[j]] += (f[j][A[i] - A[j]] + 1)，f[j][A[i] - A[j]] 是现有的弱等差数列个数，而 1 是根据 A[i] 和 A[j] 新建的子序列。根据性质二【若在弱等差数列后添加一个元素且保持等差，则一定得到一个等差数列】，新增加的序列必为等差数列。故 f[j][A[i] - A[j]] 为新生成的等差数列的个数。
==>也因此 真正的等差数列可以由 
        res += f[j][k] 统计而来
*/
    typedef long long LL;
    int numberOfArithmeticSlices(vector<int>& A) {
        if (A.empty()) return 0;
        int n = A.size();
        int res = 0;
        vector<unordered_map<LL, int>> f(n + 1);
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < i; ++ j ) {
                LL k = (LL)A[i] - A[j];
                // 等同:
                // res += f[j][k];
                // f[i][k] = f[j][k] + 1
                int t = 0;
                if (f[j].count(k)) {
                    t = f[j][k];
                    res += t;
                }
                f[i][k] += t + 1;
            }
        return res;
    }
};
```



```python3

```

