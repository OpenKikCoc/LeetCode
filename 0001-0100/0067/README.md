#  [67. 二进制求和](https://leetcode-cn.com/problems/add-binary/)

## 题意



## 题解



```c++
class Solution {
public:
    string addBinary(string a, string b) {
        int l1 = a.size(), l2 = b.size();
        int l3 = max(l1, l2);
        string res(l3, '0');
        int carry = 0, p = l3;
        for (int i = l1 - 1, j = l2 - 1, p = l3 - 1; p >= 0; -- i , -- j , -- p ) {
            int v1 = (i >= 0 ? a[i] - '0' : 0), v2 = (j >= 0 ? b[j] - '0' : 0);
            int v = v1 + v2 + carry;
            carry = v / 2;
            v %= 2;
            res[p] = '0' + v;
        }
        if (carry) res = "1" + res;
        return res;
    }
};
```

```c++
class Solution {
public:
    string addBinary(string a, string b) {
        reverse(a.begin(), a.end());
        reverse(b.begin(), b.end());

        string c;
        for (int i = 0, t = 0; i < a.size() || i < b.size() || t; i ++ ) {
            if (i < a.size()) t += a[i] - '0';
            if (i < b.size()) t += b[i] - '0';
            c += to_string(t % 2);
            t /= 2;
        }

        reverse(c.begin(), c.end());
        return c;
    }
};
```



```python
"""
模拟人工进行二进制加法的过程。
1、对a字符串和b字符串进行反转
2、枚举所有位，将t = t + a[i] + b[i]对t % 2 (2取模)的值放在当前位，将t / 2 (剩下的)放在下一位
3、若枚举完所有位后，t > 0，将t再次存入到下一位
4、将ans字符串进行反转返回

时间复杂度分析：两个字符串遍历的次数是常数，所以总时间复杂度是 O(n)
"""

class Solution:
    def addBinary(self, a: str, b: str) -> str:
        n, m = len(a), len(b)
        i, j, t = n - 1, m - 1, 0 
        res = []
        while i >= 0 or j >= 0 or t:
            a1 = int(a[i]) if i >=0 else 0
            a2 = int(b[j]) if j >=0 else 0
            t += a1 + a2 
            res.append(str(t % 2))
            t //= 2
            i -= 1
            j -= 1
        return ''.join(res[::-1])
      
      
# 用字符串存储结果      
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        i, j = len(a)-1, len(b)-1
        res, carry = "", 0
        while i >= 0 or j >= 0 or carry:
            if i >= 0:
                carry += int(a[i])
                i -= 1 
            if j >= 0:
                carry += int(b[j])
                j -= 1 
            res = str(carry % 2) + res
            carry //= 2
        return res
```

