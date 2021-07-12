#  [440. 字典序的第K小数字](https://leetcode-cn.com/problems/k-th-smallest-in-lexicographical-order/)

## 题意



## 题解

数位统计dp

```c++
class Solution {
public:
    #define LL long long

    int calc(int prefix, int n) {
        int tot = 0;

        LL t = prefix, k = 1;
        while (t * 10 <= n) {
            tot += k;
            k *= 10;
            t *= 10;
        }

        if (t <= n) { // 此时 t 一定和 n 数字的位数相同
            if (n - t < k)
                tot += n - t + 1;
            else
                tot += k;
        }

        return tot;
    }

    int findKthNumber(int n, int k) {
        int prefix = 1;
        while (k > 1) {
            int sz = calc(prefix, n);
            if (k > sz) {
                k -= sz;
                prefix++;
            } else {
                k--;
                prefix = prefix * 10;
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
        while(cur <= n) {
            count += min(n+1, next) - cur;
            cur *= 10;
            next *= 10;
        }
        return count;
    }

    int findKthNumber(int n, int k) {
        long p = 1;
        long prefix = 1;
        while(p < k) {
            long count = getCount(prefix, n);
            if (p + count > k) {
                /// 说明第k个数，在这个前缀范围里面
                prefix *= 10;
                p++;
            } else if (p+count <= k) {
                /// 说明第k个数，不在这个前缀范围里面，前缀需要扩大+1
                prefix++;
                p += count;
            }
        }
        return static_cast<int>(prefix);
    }
};
```



```python3

```

