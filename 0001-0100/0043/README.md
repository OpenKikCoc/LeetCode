#  [43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)

## 题意



## 题解



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

```python
# 高精度乘法：先不考虑进位， 最后再从后向前遍历进位。

class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        s1, s2 = num1[::-1], num2[::-1]
        n, m = len(num1), len(num2)
        c = [0] * (n+m)
        
        for i in range(n):  # 先遍历所有位 
            for j in range(m):
                c[i+j] += int(s1[i]) * int(s2[j])
        
        t = 0
        for i in range(len(c)): # 再统一考虑进位
            t += c[i]
            c[i] = t % 10
            t //= 10 
        
        res = ''   #用字符串存储答案，方便去除掉高位0
        for i in range(len(c)-1, -1, -1):
            res += str(c[i])
        res = res[:-1].lstrip('0') + res[-1]  #去掉高位0，以及防止最后一个为0
        return res
```

