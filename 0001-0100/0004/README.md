#  [4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

## 题意



## 题解



```c++
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size(), n2 = nums2.size();
        if (n1 > n2) return findMedianSortedArrays(nums2, nums1);
        // l 是 nums1 中划分点的右边界 取值范围 [0, n1]
        // 对应：l 左侧的值为 [空, n1-1]
        // 也即：l 左侧的值 <= 中点值
        int l = 0, r = n1;
        // 找到第一个大于等于 lv2 的位置 l 
        while (l < r) {
            // 左侧有 i 个  总共应有(n1+n2)/2个
            int i = l + (r - l) / 2;
            // nums2 右边界 因为n1和n2大小关系 j永远不会取0(除非n1=n2)
            int j = (n1 + n2) / 2 - i;
            if (nums1[i] < nums2[j-1]) l = i + 1;  // rv1 和 lv2 对比   nums1 选的太少
            else r = i;
        }
        int i = l, j = (n1 + n2) / 2 - i;
        int lv1 = i ? nums1[i - 1] : INT_MIN;
        int rv1 = i < n1 ? nums1[i] : INT_MAX;
        int lv2 = j ? nums2[j - 1] : INT_MIN;
        int rv2 = j < n2 ? nums2[j] : INT_MAX;
        if((n1 + n2) & 1) return min(rv1, rv2);
        return (max(lv1, lv2) + min(rv1, rv2)) / 2.0;
    }
};
```



```python
"""
1. 假设 len(nums1) < len(nums2), 如果不是的话，那就反过来用一遍算法即可【保证 j 不越界】；
2. 用二分来枚举求解 中位数 在 nums1数列中的位置
3. i 为 nums1递增数列中，【中位数】划分的右边界：也就是包括 nums1[i]在内，nums1 中后面的数值都是在【中位数】的右边
   i 的取值范围： [空, n1-1]， 因为可能 nums1 中所有的数都是在 中位数 的右边，也就是 i 左边的值 都是 <= 中位数
4. 根据 i 的位置, 可以得到 在nums2 中有多少个数被划分到 中位数 的 左侧 j = (n1+n2) // 2 - i, j 表示第几个数，对应的下标是 j-1
5. 比较 中位数 的右边 的第一个数 nums1[i] 和 中位数左边的第一数的大小 nums2[j-1] ，如果nums1[i]小一些，说明 i 当前还需要再往 r的方向走， 则 l = i + 1
6. 中位数 一定是在右半部分（向下取整的原因导致的）
"""

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        n1, n2 = len(nums1), len(nums2)
        if n1 > n2:return self.findMedianSortedArrays(nums2, nums1)

        l, r = 0, n1
        while l < r:
            i = l + (r - l) // 2
            j = (n1 + n2) // 2 - i 
            if nums1[i] < nums2[j-1]:
                l = i + 1
            else:
                r = i 
        
        """
        i + j 总长度是向下取整，中位数左边的总长度 是 <= 2 // (n1+n2)
        这里是做一个，边界值的判断
        """
        i = l
        j = (n1 + n2) // 2 - i 
        
        lv1 = nums1[i-1] if i > 0 else float('-inf')
        rv1 = nums1[i] if i < n1 else float('inf')
        lv2 = nums2[j-1] if j > 0 else float('-inf')
        rv2 = nums2[j] if j < n2 else float('inf')
        if (n1 + n2) & 1:
            return min(rv1, rv2)
        return (max(lv1, lv2) + min(rv1, rv2)) / 2
```

