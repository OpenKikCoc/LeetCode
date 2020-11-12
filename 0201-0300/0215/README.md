#  [215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

## 题意



## 题解



```c++
class Solution {
public:
    int partition(vector<int>& nums, int l, int r) {
        int pivot = nums[l];
        while(l < r) {
            while(r > l && nums[r] >= pivot) --r;
            nums[l] = nums[r];
            while(r > l && nums[l] <= pivot) ++l;
            nums[r] = nums[l];
        }
        nums[l] = pivot;
        return l;
    }
    int findKthLargest(vector<int>& nums, int k) {
        int l = 0, r = nums.size() - 1;
        int tar = r - k + 1;
        while(l < r) {
            int idx = partition(nums, l, r);
            if(idx < tar) l = idx + 1;
            else r = idx;
        }
        return l < nums.size() ? nums[l] : -1;
    }
};

// yxc
class Solution {
public:
    int quick_sort(vector<int>& nums, int l, int r, int k) {
        if (l == r) return nums[k];
        int x = nums[l], i = l - 1, j = r + 1;
        while (i < j) {
            do i ++ ; while (nums[i] > x);
            do j -- ; while (nums[j] < x);
            if (i < j) swap(nums[i], nums[j]);
        }
        if (k <= j) return quick_sort(nums, l, j, k);
        else return quick_sort(nums, j + 1, r, k);
    }

    int findKthLargest(vector<int>& nums, int k) {
        return quick_sort(nums, 0, nums.size() - 1, k - 1);
    }
};
```



```python3

```

