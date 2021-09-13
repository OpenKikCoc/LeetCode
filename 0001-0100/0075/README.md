#  [75. 颜色分类](https://leetcode-cn.com/problems/sort-colors/)

## 题意



## 题解

```c++
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int n = nums.size();
        // p <= c2 , cause [2,0,1]
        for (int c0 = 0, p = 0, c2 = n - 1; p <= c2; ) {
            if (nums[p] == 0)
                swap(nums[p ++ ], nums[c0 ++ ]);
            else if (nums[p] == 2)
                swap(nums[p], nums[c2 -- ]);
            else
                p ++ ;
        }
    }
};
```





```python
# 荷兰国旗问题；快排partition部分的思想

# 左神的partition部分思想
class Solution:
    def sortColors(self, arr: List[int]) -> None:
        l, r = 0, len(arr) - 1
        less, more = l - 1 , r + 1
        while l < more:
            if arr[l] < 1:
                less += 1
                arr[less], arr[l] = arr[l], arr[less]
                l += 1
            elif arr[l] > 1:
                more -= 1
                arr[more], arr[l] = arr[l], arr[more]
            else:
                l += 1 



# 3个指针：保证[0, j-1]都是0； [j, i-1]都是1；[k+1,n-1]都是2；然后i 和 k两个指针逼近
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        i, j, k = 0, 0, len(nums) - 1
        while i <= k:
            if nums[i] == 0:
                nums[i], nums[j] = nums[j], nums[i]
                j += 1
                i += 1
            elif nums[i] == 2:
                nums[i], nums[k] = nums[k], nums[i]
                k -= 1
            else:i += 1
              
              

```

