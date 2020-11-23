#  [525. 连续数组](https://leetcode-cn.com/problems/contiguous-array/)

## 题意



## 题解



```c++
class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        int zero = 0, one = 0, res = 0;
        unordered_map<int, int> hash;
        hash[0] = -1;
        for (int i = 0; i < nums.size(); ++ i ) {
            if (nums[i]) ++ one;
            else ++ zero;
            int s = one - zero;
            if (hash.count(s)) res = max(res, i - hash[s]);
            else hash[s] = i;
        }
        return res;
    }
};
```



```python3

```

