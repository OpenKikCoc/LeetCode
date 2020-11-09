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
        for(int i = l1-1, j = l2-1, p = l3-1; p >= 0; --i, --j, --p) {
            int v1 = (i >= 0 ? a[i] - '0' : 0), v2 = (j >= 0 ? b[j] - '0' : 0);
            int v = v1 + v2 + carry;
            carry = v / 2;
            v %= 2;
            res[p] = '0' + v;
        }
        if(carry) res = "1" + res;
        return res;
    }
};
```



```python3

```

