#  [258. 各位相加](https://leetcode-cn.com/problems/add-digits/)

## 题意



## 题解

`x * 100 + y * 10 + z = x * 99 + y * 9 + x + y + z`

1. 能够被 9 整除的整数，各位上的数字加起来也必然能被 9 整除
  
   所以，连续累加起来，最终必然就是 9 。
   
2. 不能被 9 整除的整数，各位上的数字加起来，结果对 9 取模，和初始数对 9 取摸，是一样的
  
   所以，连续累加起来，最终必然就是初始数对 9 取摸。

```c++
class Solution {
public:
    int addDigits(int num) {
        if (!num) return 0;
        if (num % 9) return num % 9;
        return 9;
    }

    int addDigits(int num) {
        while (num >= 10) {
            int t = 0;
            while (num) {
                t += num % 10;
                num /= 10;
            }
            num = t;
        }
        return num;
    }
};
```



```python
"""
1. 能够被 9 整除的整数，各位上的数字加起来也必然能被 9 整除

   所以，连续累加起来，最终必然就是 9 。

2. 不能被 9 整除的整数，各位上的数字加起来，结果对 9 取模，和初始数对 9 取摸，是一样的

   所以，连续累加起来，最终必然就是初始数对 9 取摸。
"""

class Solution:
    def addDigits(self, num: int) -> int:
        # num=str(num)
        # while(len(num)>1):
        #     tmp=0
        #     for a in num:
        #         tmp+=int(a)
        #     tmp=str(tmp)
        #     num=tmp
        # return int(num)
        
        #法二
        # while num>=10:
        #     tot=0
        #     while num:
        #         tot+=num%10
        #         num=num//10
        #     num=tot    
        # return num

        if num<9:
            return num
        elif num%9:
            return num%9
        else:
            return 9
```

