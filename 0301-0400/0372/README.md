#  [372. 超级次方](https://leetcode-cn.com/problems/super-pow/)

## 题意



## 题解



```c++
class Solution {
public:
    int qpow(int a, int b, int m) {
        int res = 1;
        while (b) {
            if(b & 1)
                res = (res * a) % m;
            a = a * a % m;
            b >>= 1;
        }
        return res;
    }
    int superPow(int a, vector<int>& b) {
        int n = 0, res = 1;
        for(int x : b)
            res = qpow(res, 10, 1337) * qpow(a, x, 1337) % 1337;
        return res;
    }
};
```



```python3

```

