#  [264. 丑数 II](https://leetcode.cn/problems/ugly-number-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> q(1, 1);
        for (int i = 0, j = 0, k = 0; q.size() < n;) {
            int t = min(q[i] * 2, min(q[j] * 3, q[k] * 5));
            q.push_back(t);
            if (q[i] * 2 == t) i ++ ;
            if (q[j] * 3 == t) j ++ ;
            if (q[k] * 5 == t) k ++ ;
        }
        return q.back();
    }
};
```



```python
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        nums = [2, 3, 5]
        m = len(nums)
        p = [0] * m
        f = [1] * n 
        for i in range(1, n):
            f[i] = min(x * f[y] for x, y in zip(nums, p))
            for j in range(m):
                if f[i] == nums[j] * f[p[j]]:
                    p[j] += 1
        return f[-1]
```

