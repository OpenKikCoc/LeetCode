#  [560. 和为K的子数组](https://leetcode-cn.com/problems/subarray-sum-equals-k/)

## 题意



## 题解

```c++
// yxc
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> s(n + 1);
        for (int i = 1; i <= n; i ++ ) s[i] = s[i - 1] + nums[i - 1];
        unordered_map<int, int> hash;
        hash[0] = 1;
        int res = 0;
        for (int i = 1; i <= n; i ++ ) {
            res += hash[s[i] - k];
            hash[s[i]] ++ ;
        }
        return res;
    }
};
```


```c++
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int n = nums.size(), psum = 0, res = 0;
        unordered_map<int, int> m;
        m[0] = 1;
        for (int i = 0; i < n; ++ i ) {
            psum += nums[i];
            res += m[psum - k];
            m[psum] ++ ;
        }
        return res;
    }
};
```



```python
# 枚举过程中，当终点i固定之后，我们所关心的是对应的以i为终点的区间和是否为k，如何快速求某个区间的和呢？可以用前缀和
# 也就是求有多少个区间(j+1,i)使得s(i)-s(j)==k，也就是有多少个s(j)==s(i)-k，要查看满足某种性质的元素有多少个可以用哈希表来存
import collections
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        if not n:return 0 
        
        s = [0] * (n + 1)
        for i in range(1, n + 1):
            s[i] = s[i - 1] + nums[i - 1]

        my_hash = collections.defaultdict(int)  # 用哈希表记录每个前缀和出现的次数。特别地，初始时前缀和为 0 需要被额外记录一次。
        my_hash[0] = 1
        res = 0
        for i in range(1, n + 1): # 踩坑：从1开始
            res += my_hash[s[i] - k]
            my_hash[s[i]] += 1
        return res
```

