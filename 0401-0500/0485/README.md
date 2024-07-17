#  [485. 最大连续1的个数](https://leetcode.cn/problems/max-consecutive-ones/)

## 题意



## 题解



```c++
class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int res = 0, cnt = 0;
        for (auto v : nums)
            if (v) ++ cnt;
            else {
                if (cnt) res = max(res, cnt);
                cnt = 0;
            }
        if (cnt) res = max(res, cnt);
        return res;
    }
};


class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int res = 0;
        for (int i = 0; i < nums.size(); i ++ ) {
            if (nums[i] == 0) continue;
            int j = i + 1;
            while (j < nums.size() && nums[j] == 1) j ++ ;
            res = max(res, j - i);
            i = j;
        }
        return res;
    }
};
```



```python3

```

