#  [440. 字典序的第K小数字](https://leetcode-cn.com/problems/k-th-smallest-in-lexicographical-order/)

## 题意



## 题解

数位统计dp

```c++
class Solution {
public:
    using LL = long long;

    int calc(int prefix, int n) {
        LL t = prefix, k = 1;
        int tot = 0;
        while (t * 10 <= n) {
            tot += k;
            t *= 10, k *= 10;
        }

        // 注意 此时 t 与 n 位数未必相同
        // 形如
        // Case 1: n = 12321, prefix = 1, t = 1000, k = 10000, tot = 1111
        //          n - t + 1 < k
        // Case 2: n = 12321, prefix = 2, t = 2000, k = 1000, tot = 111
        //          n - t + 1 >= k

        // if (t <= n) {
            if (n - t + 1 < k)
                tot += n - t + 1;
            else
                tot += k;
        // }
        return tot;
    }

    int findKthNumber(int n, int k) {
        int prefix = 1;
        while (k > 1) {
            int sz = calc(prefix, n);
            if (k > sz) {
                k -= sz;
                prefix ++ ;
            } else {
                k -- ;
                prefix *= 10;
            }
        }
        return prefix;
    }
};
```

```c++
class Solution {
public:
    long getCount(long prefix, long n) {
        long cur = prefix;
        long next = cur + 1;
        long count = 0;
        while (cur <= n) {
            count += min(n + 1, next) - cur;
            cur *= 10;
            next *= 10;
        }
        return count;
    }

    int findKthNumber(int n, int k) {
        long p = 1;
        long prefix = 1;
        while (p < k) {
            long count = getCount(prefix, n);
            if (p + count > k) {
                /// 说明第k个数，在这个前缀范围里面
                prefix *= 10;
                p ++ ;
            } else if (p + count <= k) {
                /// 说明第k个数，不在这个前缀范围里面，前缀需要扩大+1
                prefix ++ ;
                p += count;
            }
        }
        return static_cast<int>(prefix);
    }
};
```



```python3

```

