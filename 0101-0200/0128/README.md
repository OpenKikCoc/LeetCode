#  [128. 最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

## 题意



## 题解



```c++
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_map<int, int> tr_l, tr_r;
        int res = 0;
        for(auto & x : nums) {
            int l = tr_r[x - 1], r = tr_l[x + 1];
            tr_l[x - l] = max(tr_l[x - l], l + r + 1);
            tr_r[x + r] = max(tr_r[x + r], l + r + 1);
            res = max(res, l + r + 1);
        }
        return res;
    }

    int longestConsecutive2(vector<int>& nums) {
        int n = nums.size();
        unordered_map<int, bool> m;
        for(auto v : nums) m[v] = true;
        int res = 0;
        for(auto v : nums) {
            if(m[v-1]) continue;
            int cnt = 1;
            while(m[++v]) ++cnt;
            res = max(res, cnt);
        }
        return res;
    }
};
```



```python
# 1. 把所有的数都存到哈希中； 遍历哈希表中的元素，因为要找连续的数字序列，因此可以通过向后枚举相邻的数字（即不断加一），判断后面一个数字是否在哈希表中即可。
# 2. 为了避免重复枚举序列，因此只对序列的起始数字向后枚举，（例如[1,2,3,4]，只对1枚举，2，3，4时跳过），因此需要判断一下是否是序列的起始数字（即判断一下n-1是否在哈希表中）。
# 3. 由于用哈希 或者用集合时，已经去过重了，而且遍历的是哈希里的key, 所以每次处理完后不需要另外删除掉当前数

class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        my_cnt = collections.Counter(nums)
        res = 0
        for x in my_cnt:
            if x in my_cnt and x - 1 not in my_cnt:
                y = x
                while y + 1 in my_cnt:
                    y += 1
                res = max(res, y - x + 1)
        return res

# class Solution:
#     def longestConsecutive(self, nums: List[int]) -> int:
#         s = set(nums)
#         res = 0

#         for x in s:
#             if x in s and x - 1 not in s:
#                 y = x
#                 while y + 1 in s:
#                     y += 1
#                 res = max(res, y - x + 1)
#         return res

```

