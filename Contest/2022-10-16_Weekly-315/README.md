## [比赛链接](https://leetcode.cn/contest/weekly-contest-315/)

>   493 / 6490


### [6204. 与对应负数同时存在的最大正整数](https://leetcode.cn/problems/largest-positive-integer-that-exists-with-its-negative/)



```c++
class Solution {
public:
    int findMaxK(vector<int>& nums) {
        unordered_set<int> S;
        for (auto x : nums)
            S.insert(x);
        
        int res = -1;
        for (auto x : nums)
            if (S.count(x) && S.count(-x)) {
                res = max(res, max(x, -x));
            }
        return res;
    }
};
```

```python
class Solution:
    def findMaxK(self, nums: List[int]) -> int:
        S = set(nums)
        res = -1
        for x in nums:
            if x > 0 and -x in S:
                res = max(res, x)
        return res
```

### [6205. 反转之后不同整数的数目](https://leetcode.cn/problems/count-number-of-distinct-integers-after-reverse-operations/)



```c++
class Solution {
public:
    int get(int x) {
        int y = 0;
        while (x) {
            int t = x % 10;
            y = y * 10 + t;
            x /= 10;
        }
        return y;
    }
    
    int countDistinctIntegers(vector<int>& nums) {
        unordered_set<int> S;
        for (auto x : nums) {
            S.insert(x);
            S.insert(get(x));
        }
        return S.size();
    }
};
```

```python
class Solution:
    def countDistinctIntegers(self, nums: List[int]) -> int:
        def reverse(x):
            res = 0
            while x:
                res = res * 10 + x % 10
                x //= 10
            return res
                
        myset = set(nums)
        for x in nums:
            myset.add(reverse(x))
        return len(myset)
      
# 别人的
class Solution:
    def countDistinctIntegers(self, nums: List[int]) -> int:
        res = set(nums)
        for x in nums:
            res.add(int(str(x)[::-1]))
        return len(res)
```



### [6219. 反转之后的数字和](https://leetcode.cn/problems/sum-of-number-and-its-reverse/)



```c++
class Solution {
public:
    int get(int x) {
        int y = 0;
        while (x) {
            int t = x % 10;
            y = y * 10 + t;
            x /= 10;
        }
        return y;
    }
    
    bool sumOfNumberAndReverse(int num) {
        for (int i = 0; i <= num; ++ i )
            if (i + get(i) == num) {
                return true;
            }
        return false;
    }
};
```

```python
class Solution:
    def sumOfNumberAndReverse(self, num: int) -> bool:
        def reverse(x):
            res = 0
            while x:
                res = res * 10 + x % 10
                x //= 10
            return res
        
        for i in range(num + 1):
            if i + reverse(i) == num:
                return True
        return False


class Solution:
    def sumOfNumberAndReverse(self, num: int) -> bool:
        for x in range(10**5 + 1):
            if x + int(str(x)[::-1]) == num:
                return True
        return False
```



### [6207. 统计定界子数组的数目](https://leetcode.cn/problems/count-subarrays-with-fixed-bounds/) [TAG]

思维 要找准方向

```c++
class Solution {
public:
    using LL = long long;
    
    vector<int> xs, ys, ns;
    
    long long countSubarrays(vector<int>& nums, int minK, int maxK) {
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            if (nums[i] == minK)
                xs.push_back(i);
            if (nums[i] == maxK)
                ys.push_back(i);
            if (nums[i] < minK || nums[i] > maxK)
                ns.push_back(i);
        }
        
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            if (nums[i] < minK || nums[i] > maxK)
                continue;
            auto it = lower_bound(ns.begin(), ns.end(), i);
            int t = 0;
            if (it == ns.begin())
                t = -1;
            else
                t = *prev(it);
            
            int x, y;
            it = upper_bound(xs.begin(), xs.end(), i);
            if (it == xs.begin())
                continue;
            else
                x = *prev(it);
            it = upper_bound(ys.begin(), ys.end(), i);
            if (it == ys.begin())
                continue;
            else
                y = *prev(it);
            if (x <= t || y <= t)
                continue;
            res = res + LL(min(x, y) - t);
        }
        return res;
    }
};
```

显然 思维简化后可以直接双指针

```c++
class Solution {
public:
    using LL = long long;
    
    long long countSubarrays(vector<int>& nums, int minK, int maxK) {
        LL res = 0;
        for (int i = 0, x = -1, y = -1, z = -1; i < nums.size(); ++ i ) {
            if (nums[i] == minK)
                x = i;
            if (nums[i] == maxK)
                y = i;
            if (nums[i] < minK || nums[i] > maxK)
                z = i;
            res += max(min(x, y) - z, 0);
        }
        return res;
    }
};
```

```python
class Solution:
    def countSubarrays(self, nums: List[int], minK: int, maxK: int) -> int:
        n = len(nums)
        res, l = 0, 0
        p1, p2 = -1, -1
        for r in range(n):
            if nums[r] == minK:
                p1 = r
            if nums[r] == maxK:
                p2 = r
            if nums[r] < minK or nums[r] > maxK:
                l = r + 1
            res += max(0, min(p1, p2) - l + 1)

        return res
```

