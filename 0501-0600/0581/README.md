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



```python3

```

