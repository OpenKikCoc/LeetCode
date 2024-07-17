#  [405. 数字转换为十六进制数](https://leetcode.cn/problems/convert-a-number-to-hexadecimal/)

## 题意



## 题解



```c++
class Solution {
public:
    string toHex(int num) {
        unsigned int unum = num;
        if (!unum) return "0";
        string res, nums = "0123456789abcdef";
        while (unum) {
            res += nums[unum & 0xf];
            unum >>= 4;
        }
        reverse(res.begin(), res.end());
        return res;
    }

    string toHex_2(int num) {
        if (!num) return "0";
        string res;
        for (int i = 0; i < 8; ++ i ) {
            int v = num & 15;
            //cout << v << endl;
            if (!num) break;
            if (v < 10) res.push_back('0' + v);
            else res.push_back('a' + v - 10);
            num >>= 4;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```



```python3

```

