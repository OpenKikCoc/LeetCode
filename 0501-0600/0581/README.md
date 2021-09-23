#  [581. 最短无序连续子数组](https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/)

## 题意



## 题解



```c++
class Solution {
public:
    // 基于 若有序 当前nums[i]必然是前面第m大 后面同理
    int findUnsortedSubarray(vector<int>& nums) {
        int m = nums[0], n = nums.back(), l = -1, r = -2;
        int len = nums.size();
        for (int i = 1; i < len; ++ i ) {
            m = max(m, nums[i]);
            n = min(n, nums[len - 1 - i]);
            if (m != nums[i]) r = i;
            if (n != nums[len - 1 - i]) l = len - 1 - i;
        }
        return r - l + 1;
    }
    /*
    int findUnsortedSubarray(vector<int>& nums) {
        int n = nums.size();
        vector<int> nn = nums;
        sort(nn.begin(), nn.end());
        int p1 = 0, cnt = 0;
        while(p1 < n && nn[p1] == nums[p1]) ++cnt, ++p1;
        int p2 = n-1;
        while(p2 > p1 && nn[p2] == nums[p2]) ++cnt, --p2;
        return n-cnt;
    }
    */
};
```

```c++
题解2：
整体思路和题解1其实是类似的，找到两段已经排好序的长度。
1. 我们先使用一遍扫描找到左边保持升序的最后一个点的位置left,和从右向左看保持降序的最后一个点的位置right。
2. 如果已经这时候left == right说明已经排好序了，无需调整。
3. 接下来我们从left + 1的位置向右扫描，如果遇到有比nums[left]小的元素，说明最起码left不在正确位置上，那么left --。
4. 同样的，我们从right - 1的位置向左扫描，如果遇到有比nums[right]大的元素，说明最起码nums[right]不在正确的位置上，right ++。
5. 最后，left和right之间的元素就是需要重新排序的元素，长度为right - left - 1。

// yxc 思路

class Solution {
public:
    int findUnsortedSubarray(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        while (l + 1 < nums.size() && nums[l + 1] >= nums[l]) l ++ ;
        if (l == r) return 0;
        while (r - 1 >= 0 && nums[r - 1] <= nums[r]) r -- ;
        for (int i = l + 1; i < nums.size(); i ++ )
            while (l >= 0 && nums[l] > nums[i])
                l -- ;
        for (int i = r - 1; i >= 0; i -- )
            while (r < nums.size() && nums[r] < nums[i])
                r ++ ;
        return r - l - 1;

    }
};
```



```python
"""
题解1:排序，然后分别找到两端已经排好序的长度。中间那部分就是需要重新排列的长度。时间复杂度O(nlogn)，空间复杂度O(n)。
"""

class Solution:
    def findUnsortedSubarray(self, nums: List[int]) -> int:
        a = sorted(nums)
        n = len(nums)
        l, r = 0, n - 1
        while l < n and nums[l] == a[l]:
            l += 1
        while r >= l and nums[r] == a[r]:
            r -= 1
        return r - l + 1



"""
整体思路和题解1其实是类似的，找到两段已经排好序的长度。
1. 我们先使用一遍扫描找到左边保持升序的最后一个点的位置left,和从右向左看保持降序的最后一个点的位置right。
2. 如果已经这时候left == right说明已经排好序了，无需调整。
3. 接下来我们从left + 1的位置向右扫描，如果遇到有比nums[left]小的元素，说明最起码left不在正确位置上，那么left --。
4. 同样的，我们从right - 1的位置向左扫描，如果遇到有比nums[right]大的元素，说明最起码nums[right]不在正确的位置上，right ++。
5. 最后，left和right之间的元素就是需要重新排序的元素，长度为right - left - 1。
"""
class Solution(object):
    def findUnsortedSubarray(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """

        l = 0
        r = len(nums) - 1
        # 定义初始左边界，[0-l]都是递增的
        while l + 1 < len(nums) and nums[l + 1] >= nums[l]:
            l += 1

        # 说明当前数组是纯递增的
        if l == r:
            return 0

        # 定义初始右边界，[r, len(nums)-1]都是递增的 
        while r - 1 >= 0 and nums[r - 1] <= nums[r]:
            r -= 1

        # 重新定义左右有序边界
        # 找到真正的左边界，因为左边界右边的所有数，都应该比左边界右边的所有数要小
        for i in range(l + 1, len(nums)):
            while l >= 0 and nums[l] > nums[i]:
                l -= 1

        # 找到真正的右边界，因为右边界左边的所有数，都应该比右边界右边的所有数要大
        for i in range(r-1, -1, -1):
            while r < len(nums) and nums[r] < nums[i]:
                r += 1

        # 最后得到的[0-l-r-len(nums)]
        # (l,r)这个区间内才是真正需要排序的，[0-l],[r-len(nums)]都是已经从小到大排好的
        return r - l - 1 
```

