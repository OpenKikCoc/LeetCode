#  [29. 两数相除](https://leetcode-cn.com/problems/divide-two-integers/)

## 题意



## 题解



```c++
class Solution {
public:
    int divide(int dividend, int divisor) {
        if (divisor == 1) return dividend;
        else if (divisor == -1) {
            if (dividend == INT_MIN) return INT_MAX;
            else return -dividend;
        }
        int sign = 1;
        if ((dividend>0&&divisor<0) || (dividend<0&&divisor>0)) sign = -1;
        // 都转成负数 处理溢出
        if (dividend > 0) dividend = -dividend;
        if (divisor > 0) divisor = -divisor;
        if (dividend > divisor) return 0;
        int cnt = 0;
        int a = dividend;
        // 此时是负数
        while(a <= divisor) {
            int b = divisor, p = 1;
            //cout <<"before while"<< a<<" "<<b<<" "<<p<<endl;
            while(b > INT_MIN - b && a <= b + b) {
                b += b;
                p += p;
            }
            //cout <<"after while"<< a<<" "<<b<<" "<<p<<endl;
            cnt += p;
            a -= b;
        }
        if(sign == -1) cnt = -cnt;
        return cnt;
    }
};
```



```python3

```

