#  [517. 超级洗衣机](https://leetcode-cn.com/problems/super-washing-machines/)

## 题意



## 题解



```c++
class Solution {
public:
    // 由于每次操作每台洗衣机只能选择向左或者向右运送一件衣服，且多个洗衣机可以并行同时运送，
    // 故必定存在一个洗衣机，它运送的衣服数量等于答案。
    // 遍历取最大的下届 证明参考acwing
    int findMinMoves(vector<int>& machines) {
        int n = machines.size(), sum = 0;
        for (auto v : machines) sum += v;
        if (sum % n) return -1;
        int avg = sum / n, left = 0, right = sum;
        int res = 0;
        for (int i = 0; i < n; ++ i ) {
            right -= machines[i];
            if (i) left += machines[i - 1];
            int l = max(avg * i - left, 0), r = max(avg * (n - i - 1) - right, 0);
            res = max(res, l + r);
        }
        return res;
    }
};
```



```python3

```

