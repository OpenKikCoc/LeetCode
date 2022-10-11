#  [860. 柠檬水找零](https://leetcode.cn/problems/lemonade-change/)

## 题意



## 题解



```c++

```



```python3
class Solution:
    def lemonadeChange(self, bills: List[int]) -> bool:
        cash=Counter({5:0,10:0,20:0})
        for bill in bills:
            if bill==5:
                cash[5]+=1
            if bill==10:
                if cash[5]<=0:return False
                cash[5]-=1
                cash[10]+=1
            elif bill==20:
                if cash[5]>=1 and cash[10]>=1:
                    cash[5]-=1
                    cash[10]-=1
                elif cash[5]>=3:
                    cash[5]-=3
                else:return False
        return True
```

