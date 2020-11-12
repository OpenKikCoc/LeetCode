#  

## 题意



## 题解



```c++
class Solution {
public:
    int countDigitOne(int n) {
        int res = 0;
        long long base = 1;
        while(base <= n) {
            int t = (n/base)%10;
            if(t == 0) res += n/(base*10)*base; // front
            else if(t == 1) res += n/(base*10)*base + n%base + 1;
            else res += (n/(base*10)+1)*base;
            base *= 10;
        }
        return res;
    }
};
```

数位dp

```c++
class Solution {
public:
    int countDigitOne(int n) {
        if (n <= 0)
            return 0;

        vector<int> f(10, 0), pow(10, 0);
        f[0] = 0;
        pow[0] = 1;
        for (int i = 1; i <= 9; i++) {
            f[i] = f[i - 1] * 10 + pow[i - 1];
            pow[i] = pow[i - 1] * 10;
        }

        string num = to_string(n);
        reverse(num.begin(), num.end());
        int ans = 0, ones = 0;

        for (int i = num.length() - 1; i >= 0; i--) {
            ans += ones * ((num[i] - '0') * pow[i]);
            if (num[i] == '1') {
                ones++;
                ans += f[i];
            }
            else if (num[i] != '0')
                ans += pow[i] + f[i] * (num[i] - '0');
        }

        return ans + ones;
    }
};
```





```python3

```

