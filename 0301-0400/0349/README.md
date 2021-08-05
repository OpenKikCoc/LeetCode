#  [349. 两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        vector<int> res;
        unordered_map<int, int> mp;
        unordered_map<int, bool> has;
        for (auto & v : nums1)
            ++ mp[v] ;
        for (auto & v : nums2)
            if (mp[v] && !has[v])
                -- mp[v] , res.push_back(v), has[v] = true;
        return res;
    }
};

// yxc
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> S;
        for (auto x: nums1) S.insert(x);
        vector<int> res;
        for (auto x: nums2)
            if (S.count(x)) {
                res.push_back(x);
                S.erase(x);
            }
        return res;
    }
};
```



```python
# 法一 ：排序 + 双指针
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        nums1.sort()
        nums2.sort()
        n, m = len(nums1), len(nums2)
        i, j = 0, 0
        res = set()
        while i < n and j < m:
            if nums1[i] == nums2[j]:
                res.add(nums1[i])
                i += 1  # 踩坑：记得把这个i += 1; j += 1写上去
                j += 1
            elif nums1[i] > nums2[j]:
                j += 1
            else:
                i += 1
        return list(res)
      
# 法二：用两个set直接做  
class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        my_set1 = set()
        my_set2 = set()
        for a in nums1:
            if a not in my_set1:
                my_set1.add(a)
        for c in nums2:
            if c in my_set1 and c not in my_set2:
                my_set2.add(c)
        return list(my_set2)
```

