#  [350. 两个数组的交集 II](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());
        int n1 = nums1.size(), n2 = nums2.size();
        vector<int> res;
        for(int i = 0, j = 0; i <n1 && j < n2;) {
            if(nums1[i] < nums2[j]) ++i;
            else if(nums1[i] > nums2[j]) ++j;
            else {res.push_back(nums1[i]); ++i,++j;}
        }
        return res;
    }
};

// another
class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        vector<int> res;
        unordered_map<int, int> mp;
        for (auto & v : nums1) ++ mp[v];
        for (auto & v : nums2) if (mp[v]) {
            -- mp[v];
            res.push_back(v);
        }
        return res;
    }
};

// yxc
class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        unordered_multiset<int> S;
        for (auto x: nums1) S.insert(x);
        vector<int> res;
        for (auto x: nums2)
            if (S.count(x)) {
                res.push_back(x);
                S.erase(S.find(x));
            }
        return res;
    }
};
```



```python3

```

