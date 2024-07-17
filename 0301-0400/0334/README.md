#  [334. 递增的三元子序列](https://leetcode.cn/problems/increasing-triplet-subsequence/)

## 题意



## 题解



```c++
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        int v1 = INT_MAX, v2 = INT_MAX;
        for (int v : nums) {
            // 已满足三个数
            if (v > v2) return true;
            // 更新两个数
            if (v1 != INT_MAX && v > v1 && v < v2) v2 = v;
            // 更新一个数
            if (v < v1) v1 = v;
        }
        return false;
    }
};
```

```c++
// yxc
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        vector<int> q(2, INT_MAX);
        for (auto a: nums) {
            int k = 2;
            while (k > 0 && q[k - 1] >= a) k -- ;
            if (k == 2) return true;
            q[k] = a;
        }
        return false;
    }
};
```


```python3

```

