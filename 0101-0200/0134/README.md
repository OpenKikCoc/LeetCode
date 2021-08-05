#  [134. 加油站](https://leetcode-cn.com/problems/gas-station/)

## 题意



## 题解



```c++
// 最优
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int n = gas.size();
        int tot = 0, cur = 0, s = 0;
        for (int i = 0; i < n; ++ i ) {
            tot += gas[i] - cost[i];
            cur += gas[i] - cost[i];
            if (cur < 0) {
                s = i + 1;
                cur = 0;
            }
        }
        return tot < 0 ? -1 : s;
    }
};
```

```c++
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int n = gas.size();
        for (int i = 0, j; i < n; ) {  // 枚举起点
            int left = 0;
            for (j = 0; j < n; j ++ ) {
                int k = (i + j) % n;
                left += gas[k] - cost[k];
                if (left < 0) break;
            }
            if (j == n) return i;
            i = i + j + 1;
        }

        return -1;
    }
};
```


```python
# 先枚举，然后优化。
# 枚举所有起点，去循环判断一边，有没有出现负数的情况。
# 在i个点，判断在当前点加的油量，能不能走到第i+1个站，依次循环向下走。如果走到第j个战后，没有办法走到j+1个站，说明第i个点开始走，不合法。
# 那就开始遍历其他点作为起点。贪心的部分就是：如果第i个站 不合法，那第【i+1,j】这些站点 都不可能作为起始站点。
# 所以每个站 最多只能被遍历一遍。

class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        n = len(gas)
        for i in range(n): # 枚举起点
            left = 0 
            for j in range(n):
                k = (i + j) % n 
                left += gas[k] - cost[k]
                if left < 0:
                    break 
            if left >= 0:return i
            i = i + j + 1
        return -1
```

