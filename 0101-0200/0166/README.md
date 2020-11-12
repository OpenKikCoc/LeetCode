#  [166. 分数到小数](https://leetcode-cn.com/problems/fraction-to-recurring-decimal/)

## 题意



## 题解



```c++
class Solution {
public:
    typedef long long LL;
    string fractionToDecimal(int numerator, int denominator) {
        LL x = numerator, y = denominator;
        if (x % y == 0) return to_string(x / y);
        
        string res;
        if ((x < 0) ^ (y < 0)) res += '-';
        x = abs(x), y = abs(y);
        res += to_string(x / y) + '.', x %= y;

        unordered_map<LL, int> hash;    // 记录下标
        while (x) {
            hash[x] = res.size();
            x *= 10;
            res += to_string(x / y);
            x %= y;
            if(hash.count(x)) {
                res = res.substr(0, hash[x]) + '(' + res.substr(hash[x]) + ')';
                break;
            }
        }
        return res;
    }
};
```



```python3

```

