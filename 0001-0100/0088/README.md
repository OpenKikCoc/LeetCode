#  [88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/)

## 题意



## 题解



```c++
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int k = n + m - 1;
        int i = m - 1, j = n - 1;
        while (i >= 0 && j >= 0)
            if (nums1[i] >= nums2[j]) nums1[k -- ] = nums1[i -- ];
            else nums1[k -- ] = nums2[j -- ];

        while (j >= 0) nums1[k -- ] = nums2[j -- ];
    }
};
```



```python
# 双指针 + 从尾部开始插入数据
# 归并排序的核心的一步的类似题
# 注意：第一个数组的空间足够容纳所有数，所以可以把答案存到第一个数组里
# 如果我们从前往后遍历，当num2的数都小于num1的时候，就会把num1的原本的数被覆盖。
# 所以需要从后往前遍历，可以避免被覆盖。
# 第一个数组的最后的一个位置 是 所有数的最大数。
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        p = n + m - 1
        p1, p2 = m - 1, n - 1
        while p1 >= 0 and p2 >= 0:
            if nums1[p1] >= nums2[p2]:
                nums1[p] = nums1[p1]
                p1 -= 1
            else:
                nums1[p] = nums2[p2]
                p2 -= 1
            p -= 1
        while p2 >= 0:
            nums1[p] = nums2[p2]
            p2 -= 1
            p -= 1
```

