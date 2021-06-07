#  [88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

## 题意



## 题解



```c++
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int p = m+n-1, p1 = m-1, p2 = n-1;
        while(p1 >= 0 && p2 >= 0)
            nums1[p--] = nums1[p1] > nums2[p2] ? nums1[p1--]: nums2[p2--];
        // 这里可以优化：本质上只有 p2 >= 0 才需要拷贝 如果是 p1 >= 0 则不需要再拷贝（p1 = p）
        // while(p1>=0) nums1[p--] = nums1[p1--];
        while(p2 >= 0) nums1[p--] = nums2[p2--];
        return;
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

