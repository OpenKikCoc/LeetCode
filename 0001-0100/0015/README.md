#  [15. 三数之和](https://leetcode.cn/problems/3sum/)

## 题意



## 题解

更标准的写法

```c++
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size(); i ++ ) {
            if (i && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1, k = nums.size() - 1; j < k; j ++ ) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                // 可以适应三数之和为任意值
                while (j < k - 1 && nums[i] + nums[j] + nums[k - 1] >= 0) k -- ; // ATTENTION
                if (nums[i] + nums[j] + nums[k] == 0) {
                    res.push_back({nums[i], nums[j], nums[k]});
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
    vector<vector<int>> threeSum(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> res;
        if (n < 3) return res;
        sort(nums.begin(), nums.end());
        // if(nums[0] > 0 || nums[n-1] < 0) return res;
        for(int i = 0; i < n-2; ++i) {
            if (nums[i] > 0) break;  // 可以很多个 0
            if (i && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l + 1] == nums[l]) ++ l ;
                    while (l < r && nums[r - 1] == nums[r]) -- r ;
                    ++l, --r;
                } else if (sum < 0) ++ l ;
                else -- r ;
            }
        }
        return res;
    }
};
```



```python
# 双指针算法 一定要基于有序才能做。一般都是先想暴力怎么求解，然后用双指针进行优化，可以将时间复杂度降低一个维度
# （本题也可以用哈希表，但是空间复杂度就高一些）
# 1. 先将nums排序，然后 固定指针i， 遍历数组，对于每一个i， 移动指针L和R， 找到nums[i] + nums[L] + nums[R] == 0
# 2. 由于nums是有序的，所以当L++， 那么对应的R就会减小（初始设置 L = i + 1; R = n - 1 ) 
# 3. 至于去重，只需要判断每个指针位置的下一个位置的值 和 该指针当前值是否相等，如果相等 直接跳过即可。

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []; n = len(nums)
        if n < 3:return []
        nums.sort()
        sumn = 0
        for i in range(n - 2):
            if nums[i] > 0:break
            if i > 0 and nums[i] == nums[i - 1]:continue  # 去重
            l = i + 1; r = n - 1
            while l < r:
                sumn = nums[i] + nums[l] + nums[r]
                if sumn == 0:
                    res.append([nums[i], nums[l], nums[r]])
                    while l < r and nums[l + 1] == nums[l]:l += 1
                    while l < r and nums[r - 1] == nums[r]:r -= 1
                    l += 1
                    r -= 1
                elif sumn < 0:
                    l += 1
                else:
                    r -= 1
        return res
      
      
# 偷懒做法，用set保存结果，最后再变成list类型
# 可以省掉两个指针的去重判断
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = set()
        nums.sort()
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            low, high = i + 1, len(nums) - 1
            while low < high:
                s = nums[i] + nums[low] + nums[high]
                if s > 0:
                    high -= 1
                elif s < 0:
                    low += 1
                else:
                    res.add((nums[i], nums[low], nums[high]))
                    low += 1
                    high -= 1
        return list(res)
```

