#  [60. 排列序列](https://leetcode-cn.com/problems/permutation-sequence/)

## 题意



## 题解



```c++
/*
 * @lc app=leetcode.cn id=60 lang=cpp
 *
 * [60] 第k个排列
 */

// @lc code=start
class Solution {
public:
    // 康托展开和逆康托展开  https://blog.csdn.net/ajaxlt/article/details/86544074
    string getPermutation(int n, int k) {
        int fac[10] = {1};
        for (int i = 1; i < 10; ++ i ) fac[i] = fac[i - 1] * i;
        k = k - 1;
        vector<char> chs = {'1','2','3','4','5','6','7','8','9'};
        string res;
        while (n -- ) {
            int min = k / fac[n]; // 得到小的个数
            res += chs[min];
            chs.erase(chs.begin() + min);
            k %= fac[n];
        }
        return res;
    }
};
// @lc code=end
```

```c++
class Solution {
public:
    string getPermutation(int n, int k) {
        string res;
        vector<bool> st(n);

        for (int i = 0; i < n; ++ i ) {
            // 剩下的个数
            int f = 1;
            for (int j = 1; j < n - i; ++ j ) f *= j;

            for (int j = 0; j < n; ++ j )
                if (!st[j]) {
                    if (k <= f) {
                        res += to_string(j + 1);
                        st[j] = true;
                        break;
                    }
                    k -= f;
                }
        }
        return res;
    }
};

class Solution {
public:
    string getPermutation(int n, int k) {
        string res;
        for (int i = 1; i <= n; i ++ ) res += to_string(i);
        for (int i = 0; i < k - 1; i ++ ) {
            next_permutation(res.begin(), res.end());
        }
        return res;
    }
};
```



```python3

```

