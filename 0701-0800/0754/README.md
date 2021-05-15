#  [754. 到达终点数字](https://leetcode-cn.com/problems/reach-a-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int reachNumber(int target) {
        target = abs(target);
        int s = 0, p = 0;
        while (s < target || (s - target) % 2)
            p ++ , s += p;
        return p;
    }
};
```



```python3

```

