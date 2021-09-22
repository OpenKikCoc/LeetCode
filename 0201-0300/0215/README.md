#  [215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

## 题意



## 题解



```c++
class Solution {
public:
    int partition(vector<int>& nums, int l, int r) {
        int pivot = nums[l];
        while (l < r) {
            while (r > l && nums[r] >= pivot) -- r ;
            nums[l] = nums[r];
            while (r > l && nums[l] <= pivot) ++ l ;
            nums[r] = nums[l];
        }
        nums[l] = pivot;
        return l;
    }
    int findKthLargest(vector<int>& nums, int k) {
        int l = 0, r = nums.size() - 1;
        int tar = r - k + 1;
        while (l < r) {
            int idx = partition(nums, l, r);
            if (idx < tar) l = idx + 1;
            else r = idx;
        }
        return l < nums.size() ? nums[l] : -1;
    }
};

// yxc version 1
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

// yxc version 2
class Solution {
public:
    int quick_sort(vector<int> & nums, int l, int r, int k) {
        if (l >= r)
            return nums[l];
        int i = l - 1, j = r + 1, x = nums[l + r >> 1];
        while (i < j) {
            do i ++ ; while (nums[i] > x);
            do j -- ; while (nums[j] < x);
            if (i < j) swap(nums[i], nums[j]);
        }
        if (j - l + 1 >= k)
            return quick_sort(nums, l, j, k);
        else
            return quick_sort(nums, j + 1, r, k - (j - l + 1));
    }

    int findKthLargest(vector<int>& nums, int k) {
        return quick_sort(nums, 0, nums.size() - 1, k);
    }
};
```



```python
class Solution:
    def findKthLargest(self, arr: List[int], k: int) -> int:
        def partition(l, r):
            x = random.randint(l, r)
            arr[x], arr[r] = arr[r], arr[x]
            less, more = l - 1, r 
            while l < more:
                if arr[l] < arr[r]:
                    less += 1
                    arr[l], arr[less] = arr[less], arr[l]
                    l += 1
                elif arr[l] > arr[r]:
                    more -= 1
                    arr[l], arr[more] = arr[more], arr[l]
                else:l += 1
            arr[more], arr[r] = arr[r], arr[more]
            return less+1 # 返回的这个位置，是这个数的位置一定是确定好的，比这个数小的都在左边，大于或者等于的都在右边

        n = len(arr)
        l, r = 0, n - 1
        while l < r:
            q = partition(l, r)
            if q < n - k:
                l = q + 1
            else:r = q 
        return arr[l]  # 跳出循环 推出的时候 一定是 l == r == n -k
```

