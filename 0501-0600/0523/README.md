#  [523. 连续的子数组和](https://leetcode-cn.com/problems/continuous-subarray-sum/)

## 题意



## 题解



```c++
class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        if (!k) {
            for (int i = 1; i < nums.size(); ++ i )
                if (!nums[i] && !nums[i - 1]) return true;
            return false;
        }
        // 存储和显然不可行，so存储和对k取模的值
        unordered_map<int, int> hash;
        hash[0] = -1;
        int sum = 0;
        for (int i = 0; i < nums.size(); ++ i ) {
            sum += nums[i];
            sum %= k;
            if (hash.count(sum) && hash[sum] <= i - 2) return true;
            if (!hash.count(sum)) hash[sum] = i;
        }
        return false;
    }
};


// yxc
class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        if (!k) {
            for (int i = 1; i < nums.size(); ++ i )
                if (!nums[i] && !nums[i - 1]) return true;
            return false;
        }
        // 存储和显然不可行，so存储和对k取模的值
        unordered_set<int> hash;
        int n = nums.size();
        vector<int> s(n + 1);
        for (int i = 1; i <= n; ++ i ) s[i] = s[i - 1] + nums[i - 1];
        for (int i = 2; i <= n; ++ i ) {
            hash.insert(s[i - 2] % k);
            if (hash.count(s[i] % k)) return true;
        }
        return false;
    }
};
```



```python3

```

