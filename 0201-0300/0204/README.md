#  [204. 计数质数](https://leetcode.cn/problems/count-primes/)

## 题意



## 题解



```c++
class Solution {
public:
    int countPrimes(int n) {
        vector<bool> st(n + 1);
        vector<int> primes;
        for (int i = 2; i < n; ++i) {
            if (!st[i]) primes.push_back(i);
            for (int j = 0; i * primes[j] < n; ++j) {
                st[i * primes[j]] = true;
                if (i % primes[j] == 0) break;
            }
        }
        return primes.size();
    }
};
```



```python
class Solution:
    def countPrimes(self, n: int) -> int:
        isPrimes = [1] * n
        res = 0
        for i in range(2, n):
            if isPrimes[i] == 1: res += 1
            j = i
            while i * j < n:
                isPrimes[i * j] = 0
                j += 1
        return res
```

