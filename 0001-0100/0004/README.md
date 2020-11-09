#  [4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)

## 题意



## 题解



```c++
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size(), n2 = nums2.size();
        if(n1 > n2) return findMedianSortedArrays(nums2, nums1);
        // l 是 nums1 中划分点的右边界 取值范围 [0, n1]
        // 对应：l 左侧的值为 [空, n1-1]
        // 也即：l 左侧的值 <= 中点值
        int l = 0, r = n1;
        // 找到第一个大于等于 lv2 的位置 l 
        while(l < r) {
            // 左侧有 i 个  总共应有(n1+n2)/2个
            int i = l + (r-l)/2;
            // nums2 右边界 因为n1和n2大小关系 j永远不会取0(除非n1=n2)
            int j = (n1+n2)/2-i;
            if(nums1[i] < nums2[j-1]) l = i+1;  // rv1 和 lv2 对比   nums1 选的太少
            else r = i;
        }
        int i = l, j = (n1+n2)/2-i;
        int lv1 = i ? nums1[i-1] : INT_MIN;
        int rv1 = i < n1 ? nums1[i] : INT_MAX;
        int lv2 = j ? nums2[j-1] : INT_MIN;
        int rv2 = j < n2 ? nums2[j] : INT_MAX;
        if((n1+n2)&1) return min(rv1, rv2);
        return (max(lv1, lv2) + min(rv1, rv2)) / 2.0;
    }
};
```



```python3

```

