#  [458. 可怜的小猪](https://leetcode-cn.com/problems/poor-pigs/)

## 题意



## 题解



```c++
class Solution {
public:
    int poorPigs(int buckets, int minutesToDie, int minutesToTest) {
        // 轮次： minutesToTest / minutesToDie
        // 第 x 轮死或一直不死 则可表达如下 states 种状态
        int states = minutesToTest / minutesToDie + 1;
        // (k + 1) ^ x >= buckets
        // k+1 即为测试时间除以中毒检验时间再加一（之前说过可以通过排除法确定最后一列）
        // 把 buckets 转化为 k+1 位进制数
        return ceil(log(buckets) / log(states));
    }
};
```



```python3

```

