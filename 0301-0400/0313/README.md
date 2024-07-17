#  [313. 超级丑数](https://leetcode.cn/problems/super-ugly-number/)

## 题意



## 题解

类似 `丑数 II ` 的思路:

```c++
class Solution {
public:
    int nthSuperUglyNumber(int n, vector<int>& primes) {
        set<int> res={1};
        vector<set<int>::iterator> points;
        int k = primes.size();
        for (int i = 0; i < k; ++ i ) points.push_back(res.begin());
        while (res.size() < n) {
            int temp = INT_MAX;
            // 找最小数
            for (int i = 0; i < k; ++ i )
                temp = min(temp, *points[i] * primes[i]);
            res.insert(temp);
            // 更新指针 此时可能有多个指针都更新了(计算出的值相同的情况)
            for (int i = 0; i < k; ++ i )
                if (temp == *points[i] * primes[i])
                    ++ points[i] ;
        }
        return *res.rbegin();
    }
};

// yxc
// 在 k 较大的时候效果较好
class Solution {
public:
    int nthSuperUglyNumber(int n, vector<int>& primes) {
        typedef pair<int, int> PII;
        priority_queue<PII, vector<PII>, greater<PII>> heap;
        for (int x: primes) heap.push({x, 0});
        vector<int> q(n);
        q[0] = 1;
        for (int i = 1; i < n;) {
            auto t = heap.top(); heap.pop();
            if (t.first != q[i - 1]) q[i ++ ] = t.first;
            int idx = t.second, p = t.first / q[idx];
            heap.push({p * q[idx + 1], idx + 1});
        }
        return q[n - 1];
    }
};
```



```python
"""
动态规划： 记录前面的丑数，根据每个质因数当前对应的丑数进行乘积大小对比，将最小的那个作为新的丑数，并更新对应的丑数。
"""
class Solution:
    def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
        m = len(primes)
        # dp[i] 代表第i+1个丑数
        dp = [inf] * n
        dp[0] = 1
        # indexes代表每个质因子现在应该跟哪个丑数相乘
        indexes = [0] * m

        for i in range(1, n):
            # 哪个质因子相乘的丑数将会变化
            changeIndex = 0
            for j in range(m):
                # 如果当前质因子乘它的丑数小于当前的丑数，更新当前丑数并更新变化坐标
                if primes[j] * dp[indexes[j]] < dp[i]:
                    changeIndex = j
                    dp[i] = primes[j] * dp[indexes[j]]
                # 如果相等直接变化，这样可以去重复
                elif primes[j] * dp[indexes[j]] == dp[i]:
                    indexes[j] += 1
            # 变化的坐标+1
            indexes[changeIndex] += 1
        return dp[-1]
```

