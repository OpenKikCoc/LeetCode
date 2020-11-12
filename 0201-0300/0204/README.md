#  [204. 计数质数](https://leetcode-cn.com/problems/count-primes/)

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



```python3

```

