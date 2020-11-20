#  [457. 环形数组循环](https://leetcode-cn.com/problems/circular-array-loop/)

## 题意



## 题解



```c++
class Solution {
public:
    bool circularArrayLoop(vector<int>& nums) {
        int n = nums.size(), Base = 10000;
        for (int i = 0; i < n; ++ i ) {
            // 已经遍历过
            if (nums[i] >= Base) continue;
            int k = i, S = Base + i, t = nums[k] > 0;
            int last = -1;  // 最后一个位置 用于判断是否自环
            do {
                // k + nums[k];
                int p = ((k + nums[k]) % n + n) % n;
                last = nums[k], nums[k] = S;
                k = p;
            } while (k != i && nums[k] < Base && (t ^ (nums[k] > 0)) == 0);
            // while 后面访问到 且初次访问 且符号相同

            // last % n 非 0 则没有自环;  nums[k] == S 说明长度大于1
            if (last % n && nums[k] == S) return true;
        }
        return false;
    }
};
```



```python3

```

