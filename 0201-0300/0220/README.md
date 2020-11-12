#  [220. 存在重复元素 III](https://leetcode-cn.com/problems/contains-duplicate-iii/)

## 题意



## 题解



```c++
class Solution {
public:
    typedef long long LL;

    bool containsNearbyAlmostDuplicate(vector<int>& nums, int k, int t) {
        multiset<LL> S;
        S.insert(1e18), S.insert(-1e18);
        for (int i = 0, j = 0; i < nums.size(); i ++ ) {
            if (i - j > k) S.erase(S.find(nums[j ++ ]));
            int x = nums[i];
            auto it = S.lower_bound(x);
            if (*it - x <= t) return true;
            -- it;
            if (x - *it <= t) return true;
            S.insert(x);
        }
        return false;
    }

    
    bool containsNearbyAlmostDuplicate_2(vector<int>& nums, int k, int t) {
        multiset<LL> hash;
        multiset<LL>::iterator it;
        for (int i = 0; i < nums.size(); ++i) {
            it = hash.lower_bound((LL)nums[i] - t);
            if (it != hash.end() && *it <= (LL)nums[i] + t) return true;
            hash.insert(nums[i]);
            if (i >= k) hash.erase(hash.find(nums[i-k]));
        }
        return false;
    }
};
```



```python3

```

