#  [453. 最小移动次数使数组元素相等](https://leetcode.cn/problems/minimum-moves-to-equal-array-elements/)

## 题意



## 题解



```c++
class Solution {
public:
    int minMoves(vector<int>& nums) {
        // 每次移动相当于某个值相对-1
        long long sum = 0, minv = INT_MAX, n = nums.size();
        for (auto v : nums) sum += v, minv = min(minv, (long long)v);
        return sum - minv * n;
    }
};
```



```python3

```

