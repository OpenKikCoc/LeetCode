#  [330. 按要求补齐数组](https://leetcode-cn.com/problems/patching-array/)

## 题意



## 题解

>   1.  假设当前我们能生成的数字为[0, x)，如果 nums[i] 存在小于等于 x 的数，那么我们先选择添加这个数并将我们的 x = x + nums[i] 。
>
>   2.  如果不存在的话，那么说明我们需要自己添加一个新数了，我们选择加入 x ,所以 x = x + x ，同时记录答案。

```c++
class Solution {
public:
    int minPatches(vector<int>& nums, int n) {
        long long x = 1;
        int i = 0, res = 0;
        while (x <= n) {
            if (i < nums.size() && nums[i] <= x) x += nums[i ++ ];
            else x += x, ++ res;
        }
        return res;
    }
};
```



```python3

```

