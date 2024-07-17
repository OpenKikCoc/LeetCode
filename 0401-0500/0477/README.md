#  [477. 汉明距离总和](https://leetcode.cn/problems/total-hamming-distance/)

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



```python
# 如果去枚举每个数，再进行计算汉明距离，那根据数据范围，会超时；所以换一种思路：
# 1. 枚举每个数字的每一位，一共32位
# 2. 遍历数组，统计每个数字当前位为0个数总和为x，为1的个数总和为y；res += x * y 
class Solution:
    def totalHammingDistance(self, nums: List[int]) -> int:
        res = 0 
        for i in range(31):
            x, y = 0, 0 
            for c in nums:
                if c >> i & 1:y += 1
                else:x += 1
            res += x * y 
        return res
```

