#  [462. 最少移动次数使数组元素相等 II](https://leetcode.cn/problems/minimum-moves-to-equal-array-elements-ii/)

## 题意



## 题解


```c++
// yxc
class Solution {
public:
    int minMoves2(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        int res = 0;
        for (int i = 0; i < n; i ++ )
            res += abs(nums[i] - nums[n / 2]);
        return res;
    }
};
```


```c++
class Solution {
public:
    int minMoves2(vector<int>& nums) {
        int res = 0, l = 0, r = nums.size() - 1;
        sort(nums.begin(), nums.end());
        while (l < r) {
            res += nums[r -- ] - nums[l ++ ];
        }
        return res;
    }
};
```



```python3

```

