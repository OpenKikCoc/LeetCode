#  [287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/)

## 题意



## 题解



```c++
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        for (int i = 0; i < nums.size(); ++ i ) {
            while (nums[i] != i + 1) {
                if (nums[nums[i] - 1] == nums[i])
                    return nums[i];
                swap(nums[i], nums[nums[i] - 1]);
            }
        }

        return -1;
    }

    int findDuplicate(vector<int>& nums) {
        int n = nums.size();
        int p = 0;
        while (p < n) {
            while (nums[p] != p && nums[nums[p]] != nums[p])
                swap(nums[p], nums[nums[p]]);
            if (nums[p] == nums[nums[p]])
                return nums[p];
            ++p;
        }
        return 0;
    }
};
```

要求不修改原数组（快慢指针）：

```c++
// yxc
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int a = 0, b = 0;
        while (true) {
            a = nums[a];
            b = nums[nums[b]];
            if (a == b) {
                a = 0;
                while (a != b) {
                    a = nums[a];
                    b = nums[b];
                }
                return a;
            }
        }

        return -1;
    }
};
```



```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        l,r = 1, len(nums)-1
        while l <r :
            m = l + (r - l) // 2
            cnt = 0
            for num in nums:
                if num <= m:
                    cnt += 1
            if cnt <= m:
                l = m + 1
            else:r = m
        return l
```

