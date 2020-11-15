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
        for(auto & v : nums1) ++mp[v];
        for(auto & v : nums2) {
            if(mp[v] && !has[v]) --mp[v], res.push_back(v), has[v] = true;
        }
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



```python3

```

