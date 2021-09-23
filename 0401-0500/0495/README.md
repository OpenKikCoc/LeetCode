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



```python
#1. 考虑相邻两个攻击时间点 A[i] 和 A[i + 1] 以及中毒持续时间 t;
#2. 如果 A[i]-A[i-1] <t ，说明这一段时间都是中毒的，那就把这段长度加上；反之，那最多加上中毒时间这么长；
#3. 最后加上 最后一次的攻击持续时间就可以了。
class Solution:
    def findPoisonedDuration(self, timeSeries: List[int], duration: int) -> int:
        res=0
        for i in range(1,len(timeSeries)):
            res+=min(timeSeries[i]-timeSeries[i-1],duration)
        if timeSeries:res+=duration
        return res
```

