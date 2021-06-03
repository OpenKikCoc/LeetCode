#  [43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)

## 题意



## 题解



```c++
/*
 * @lc app=leetcode.cn id=43 lang=cpp
 *
 * [43] 字符串相乘
 */

// @lc code=start
class Solution {
public:
    string multiply(string num1, string num2) {
        int l1 = num1.size();
        int l2 = num2.size();
        int l3 = l1 + l2;
        vector<int> sum(l3, 0);
        string res;
        int carry = 0;
        for(int i = l1 - 1; i >= 0; --i) {
            carry = 0;
            for(int j = l2 - 1; j >= 0; --j) {
                int multi = (num1[i] - '0') * (num2[j] - '0');
                sum[i+j+1] = sum[i+j+1] + multi  + carry;
                carry = sum[i+j+1] / 10;
                sum[i+j+1] %= 10;
            }
            if (carry) sum[i] = carry;
        }
        for (int i = 0; i < l3; ++i) {
            if (sum[i] == 0 && res == "") continue;
            res += char('0' + sum[i]);
        }
        if (res == "") return "0";
        return res;
    }
};
// @lc code=end
```

```c++
class Solution {
public:
    string multiply(string num1, string num2) {
        vector<int> A, B;
        int n = num1.size(), m = num2.size();
        for (int i = n - 1; i >= 0; i -- ) A.push_back(num1[i] - '0');
        for (int i = m - 1; i >= 0; i -- ) B.push_back(num2[i] - '0');

        vector<int> C(n + m);
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ )
                C[i + j] += A[i] * B[j];

        for (int i = 0, t = 0; i < C.size(); i ++ ) {
            t += C[i];
            C[i] = t % 10;
            t /= 10;
        }

        int k = C.size() - 1;
        while (k > 0 && !C[k]) k -- ;

        string res;
        while (k >= 0) res += C[k -- ] + '0';

        return res;
    }
};
```

```python3

```

