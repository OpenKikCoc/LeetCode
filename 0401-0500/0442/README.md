#  [442. 数组中重复的数据](https://leetcode-cn.com/problems/find-all-duplicates-in-an-array/)

## 题意



## 题解

```c++
// 标准写法
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i])
                swap(nums[nums[i] - 1], nums[i]);
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            if (nums[i] != i + 1)
                res.push_back(nums[i]);
        return res;
    }
};
```


```c++
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> res;
        for (auto x: nums) {
            int p = abs(x) - 1;
            nums[p] *= -1;
            if (nums[p] > 0) res.push_back(abs(x));
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> res;
        int t;
        for (int i = 0; i < nums.size(); ++ i ) {
            int v = nums[i];
        // for (auto v : nums) {
            t = abs(v);
            if (nums[t - 1] < 0)
                res.push_back(t);
            else
                nums[t - 1] = -nums[t - 1];
        }
        return res;
    }
};
```



```python3

```

