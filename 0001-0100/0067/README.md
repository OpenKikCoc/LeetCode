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
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        n, m = len(a), len(b)
        i, j, t = n - 1, m - 1, 0 
        res = []
        while i >=0 or j >= 0 or t:
            a1 = int(a[i]) if i >=0 else 0
            a2 = int(b[j]) if j >=0 else 0
            t += a1 + a2 
            res.append(str(t % 2))
            t //= 2
            i -= 1
            j -= 1
        return ''.join(res[::-1])
```

