#  [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

## 题意

返回下标

## 题解



```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            int v = nums[i], nv = target - v;
            if (mp.count(nv)) return vector<int>{mp[nv], i};
            mp[v] = i;
        }
        return vector<int>{};
    }
};
```



```python
# 返回下标，所以不适合 排序 + 双指针
# 如果不存在重复数字，那可以用排序 + 双指针 + 哈希；但是有重复数字，所以后面的数的下标会覆盖前者
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        my_dict = collections.defaultdict(int)
        n = len(nums)
        for i in range(n):
            if target - nums[i] in my_dict:   # 踩坑1: 不是my_dict[target - nums[i]]
                return [i, my_dict[target - nums[i]]]
            else:
                my_dict[nums[i]] = i
```

