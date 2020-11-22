#  [495. 提莫攻击](https://leetcode-cn.com/problems/teemo-attacking/)

## 题意



## 题解



```c++
class Solution {
public:
    int findPoisonedDuration(vector<int>& timeSeries, int duration) {
        if (timeSeries.empty()) return 0;
        int res = 0;
        for (int i = 0; i < timeSeries.size() - 1; ++ i )
            res += min(timeSeries[i + 1] - timeSeries[i], duration);
        return res + duration;
    }
};
```



```python3

```

