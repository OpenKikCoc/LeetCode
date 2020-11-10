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



```python3

```

