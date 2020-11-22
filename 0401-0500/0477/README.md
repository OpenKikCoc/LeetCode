#  [477. 汉明距离总和](https://leetcode-cn.com/problems/total-hamming-distance/)

## 题意



## 题解



```c++
class Solution {
public:
/*
将所有数对距离的计算过程按位分离，固定第 i 个二进制位，
统计数组中数字 i 位为 1 的个数 ones，则第 i 位贡献的答案为 ones∗(n−ones)
*/
    int totalHammingDistance(vector<int>& nums) {
        int res = 0;
        for (int i = 0; i <= 30; ++ i ) {
            int x = 0, y = 0;
            for (auto v : nums)
                if (v >> i & 1) ++ y ;
                else ++ x ;
            res += x * y;
        }
        return res;
    }
};
```



```python3

```

