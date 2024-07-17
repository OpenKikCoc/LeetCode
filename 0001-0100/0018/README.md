#  [18. 四数之和](https://leetcode.cn/problems/4sum/)

## 题意



## 题解

更标准写法

```c++
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        for (int i = 0; i < nums.size(); i ++ ) {
            if (i && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < nums.size(); j ++ ) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                for (int k = j + 1, u = nums.size() - 1; k < u; k ++ ) {
                    if (k > j + 1 && nums[k] == nums[k - 1]) continue;
                    while (u - 1 > k && nums[i] + nums[j] + nums[k] + nums[u - 1] >= target) u -- ;
                    if (nums[i] + nums[j] + nums[k] + nums[u] == target) {
                        res.push_back({nums[i], nums[j], nums[k], nums[u]});
                    }
                }
            }
        }

        return res;
    }
};
```



```c++
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        int n = nums.size();
        vector<vector<int>> res;
        // if (n < 4) return res;
        sort(nums.begin(), nums.end());
        for (int i = 0; i < n-3; ++i) if (!i || nums[i] != nums[i - 1]) {
            for (int j = i+1; j < n-2; ++j) if (j == i + 1 || nums[j] != nums[j - 1]) {
                int l = j + 1, r = n - 1;
                while (l < r) {
                    int sum = nums[i] + nums[j] + nums[l] + nums[r];
                    if (sum == targest) {
                        res.push_back({nums[i], nums[j], nums[l], nums[r]});
                        while (l < r && nums[l] == nums[l + 1]) ++ l ;
                        while (l < r && nums[r] == nums[r - 1]) -- r ;
                        ++ l , -- r ;
                    } else if (sum > target) -- r ;
                    else ++ l ;
                }
            }
        }
        return res;
    }
};
```



```python
# 先枚举前两个遍历，后两个遍历用双指针算法进行优化；
# 去重方法和之前的一样：当前数和下一个数一致，下一个数就直接跳过

class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        n = len(nums); res = []
        if n < 4:return []
        nums.sort()
        sumn = 0
        for i in range(n - 3):
            if i > 0 and nums[i] == nums[i - 1]:continue
            for j in range(i + 1, n - 2):  # 踩坑： j 是从 i+1 开始遍历的
                if j > i + 1 and nums[j] == nums[j - 1]:continue
                l = j + 1; r = n - 1
                while l < r:
                    sumn = nums[i] + nums[j] + nums[l] + nums[r]
                    if sumn == target:
                        res.append([nums[i], nums[j], nums[l], nums[r]])
                        while l < r and nums[l] == nums[l + 1]:l += 1
                        while l < r and nums[r] == nums[r - 1]:r -= 1
                        l += 1; r -= 1
                    elif sumn > target:
                        r -= 1
                    else:l += 1
        return res
```

