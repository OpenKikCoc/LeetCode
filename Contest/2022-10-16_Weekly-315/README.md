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

