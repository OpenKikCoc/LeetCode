#  [415. 字符串相加](https://leetcode.cn/problems/add-strings/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> add(vector<int>& A, vector<int>& B) {
        vector<int> C;
        for (int i = 0, t = 0; i < A.size() || i < B.size() || t; i ++ ) {
            if (i < A.size()) t += A[i];
            if (i < B.size()) t += B[i];
            C.push_back(t % 10);
            t /= 10;
        }
        return C;
    }

    string addStrings(string a, string b) {
        vector<int> A, B;
        for (int i = a.size() - 1; i >= 0; i -- ) A.push_back(a[i] - '0');
        for (int i = b.size() - 1; i >= 0; i -- ) B.push_back(b[i] - '0');
        auto C = add(A, B);
        string c;
        for (int i = C.size() - 1; i >= 0; i -- ) c += to_string(C[i]);
        return c;
    }
    
    string addStrings_2(string num1, string num2) {
        int n1 = num1.size(), n2 = num2.size();
        int p1 = n1 - 1, p2 = n2 - 1, carry = 0;
        string res;
        while (p1 >= 0 || p2 >= 0) {
            int v1 = (p1 >= 0 ? num1[p1] - '0' : 0), v2 = (p2 >= 0 ? num2[p2] - '0' : 0);
            int v = v1 + v2 + carry;
            carry = v / 10;
            v = v % 10;
            res.push_back('0' + v);
            --p1, --p2;
        }
        if (carry) res.push_back('1');
        reverse(res.begin(), res.end());
        return res;
    }
};
```



```python
class Solution:
    def addStrings(self, num1: str, num2: str) -> str:
        s1, s2 = num1[::-1], num2[::-1]
        n, m = len(s1), len(s2)

        res= []
        i, t = 0, 0 
        while i < n or i < m or t:
            a = int(s1[i]) if i < n else 0 
            b = int(s2[i]) if i < m else 0 
            t, k = divmod(a + b + t, 10)
            res.append(str(k))
            i += 1
        return ''.join(res[::-1])
```

