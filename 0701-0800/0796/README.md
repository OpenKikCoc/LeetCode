#  [796. 旋转字符串](https://leetcode-cn.com/problems/rotate-string/)

## 题意



## 题解



```c++
class Solution {
public:
    using ULL = unsigned long long;
    const static int N = 210, P = 131;
    ULL h[N], p[N];

    ULL get(int l, int r) {
        return h[r] - h[l - 1] * p[r - l + 1];
    }
    
    bool rotateString(string A, string B) {
        if (A == B) // "" 空串
            return true;
        string s = ' ' + A + B;
        int n = s.size() - 1;
        p[0] = 1;
        for (int i = 1; i <= n; ++ i ) {
            p[i] = p[i - 1] * P;
            h[i] = h[i - 1] * P + s[i];
        }

        for (int k = 1; k < A.size(); ++ k )
            if (get(1, k) == get(n - k + 1, n) && 
                get(k + 1, A.size()) == get(A.size() + 1, n - k))
                return true;
        return false;
    }
};
```



```python3

```

