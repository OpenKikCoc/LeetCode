#  [645. 错误的集合](https://leetcode.cn/problems/set-mismatch/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> findErrorNums(vector<int>& nums) {
        vector<int> res(2);
        for (auto x : nums) {
            int k = abs(x);
            if (nums[k - 1] < 0) res[0] = k;
            nums[k - 1] *= -1;
        }

        for (int i = 0; i < nums.size(); ++ i )
            // 大于0 则【当前数未出现过 或 当前数出现了两次】
            // i + 1 != res[0] 保证不是出现了两次的数
            if (nums[i] > 0 && i + 1 != res[0])
                res[1] = i + 1;
        return res;
    }
};
```



```python3

```

