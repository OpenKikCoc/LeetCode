#  [313. 超级丑数](https://leetcode-cn.com/problems/super-ugly-number/)

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



```python3

```

