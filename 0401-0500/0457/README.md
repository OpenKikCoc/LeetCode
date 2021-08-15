#  [457. 环形数组循环](https://leetcode-cn.com/problems/circular-array-loop/)

## 题意



## 题解

将问题抽象，**每个点最多只有一个出边**，故其一定是一个类似链表环的形式（因为如果还能在环内出去的话一定是在环上某点有两个出边，显然不可能）。

这样显然有一个快慢指针的实现方式。

考虑枚举的思路：

>   如果遍历到一个【本次】【在此前遍历到】的点
>
>   为什么 `last % n` 可以判断是否自环？
>
>   >   

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

            // last % n 非 0 则没有自环;  nums[k] == S 说明是本次遍历此前遍历到的，长度大于1
            if (last % n && nums[k] == S) return true;
        }
        return false;
    }
};
```



```python3

```

