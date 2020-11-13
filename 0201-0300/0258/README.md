#  [258. 各位相加](https://leetcode-cn.com/problems/add-digits/)

## 题意



## 题解



```c++
class Solution {
public:
    int addDigits(int num) {
        if (!num) return 0;
        if (num % 9) return num % 9;
        return 9;
    }
    int addDigits_1(int num) {
        while(num >= 10) {
            int t = 0;
            while(num) {
                t += num%10;
                num /= 10;
            }
            num = t;
        }
        return num;
    }
    int addDigits_2(int num) {
        int onum = num, nnum = 0;
        while(onum >= 10) {
            while(onum) {
                nnum += onum%10;
                onum /= 10;
            }
            onum = nnum, nnum = 0;
        }
        return onum;
    }
};
```



```python3

```

