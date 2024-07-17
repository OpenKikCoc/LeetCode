#  [454. 四数相加 II](https://leetcode.cn/problems/4sum-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    int fourSumCount(vector<int>& A, vector<int>& B, vector<int>& C, vector<int>& D) {
        unordered_map<int, int> cnt;
        for (auto c : C)
            for (auto d : D)
                ++ cnt[c + d];
        int res = 0;
        for (auto a : A)
            for (auto b : B)
                res += cnt[- (a + b)];
        return res;
    }
};
```



```python
# 枚举A，再枚举B，然后 找到c和d满足条件的数值；（根据数据范围，这道题只能遍历两次，所以用空间换时间 哈希表来处理）
# 用哈希表存储每种和 有多少种组合；（前两个枚举， 后两个就可以直接在哈希表里查找）

class Solution:
    def fourSumCount(self, nums1: List[int], nums2: List[int], nums3: List[int], nums4: List[int]) -> int:
        import collections
        my_dict = collections.defaultdict(int)
        for c in nums3:
            for d in nums4:
                my_dict[c + d] += 1
        res = 0
        for a in nums1:
            for b in nums2:
                res += my_dict[-(a + b)]
        return res
```

