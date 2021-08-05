#  [217. 存在重复元素](https://leetcode-cn.com/problems/contains-duplicate/)

## 题意



## 题解



```c++
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_map<int, int> m;
        for (auto num : nums) {
            if (m[num]) return true;
            m[num] ++ ;
        }
        return false;
    }
};
```



```python3

```

