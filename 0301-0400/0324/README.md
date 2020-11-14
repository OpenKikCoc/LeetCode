#  [324. 摆动排序 II](https://leetcode-cn.com/problems/wiggle-sort-ii/)

## 题意



## 题解

>   我们先用快速选择算法求出中位数mid，C++中可以调用 nth_element()函数。
>
>   将所有数分成三种：小于mid的数、等于mid的数和大于mid的数。
>   然后对数组排序，使得大于mid的数在最前面，等于mid的数在中间，小于mid的数在最后面。
>   这一步可以直接利用三数排序，三数排序算法可以参考LeetCode 75. Sort Colors。
>
>   然后我们将排好序的数组重排，将前半段依次放到奇数位置上，将后半段依次放到偶数位置上。此时就会有：
>   nums[0] < nums[1] > nums[2] < nums[3] ...
>
>   **这一步重排我们可以在三数排序时做，只需在排序时做一个数组下标映射即可：**
>   **i => (1 + 2 * i) % (n | 1)**
>   该映射可以将数组前一半映射到奇数位置上，数组后一半映射到偶数位置上。

```c++
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        int n = nums.size();
        auto midptr = nums.begin() + n / 2;
        nth_element(nums.begin(), midptr, nums.end());
        int mid = *midptr;

        #define A(i) nums[(1 + 2 * i) % (n | 1)]

        int i = 0, j = 0, k = n - 1;
        while (j <= k)
            if (A(j) > mid) swap(A(i ++ ), A(j ++ ));
            else if (A(j) < mid) swap(A(j), A(k -- ));
            else j ++ ;
    }
};
```



```python3

```

