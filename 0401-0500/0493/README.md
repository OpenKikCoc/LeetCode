#  [493. 翻转对](https://leetcode-cn.com/problems/reverse-pairs/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> w;
    int merge_sort(vector<int> & nums, int l, int r) {
        if (l >= r) return 0;
        int m = l + (r - l) / 2;
        int ret = merge_sort(nums, l, m) + merge_sort(nums, m + 1, r);
        // 统计
        for (int i = l, j = m + 1; i <= m; ++ i ) {
            while (j <= r && nums[j] * 2ll < nums[i]) ++ j ;
            ret += j - (m + 1);
        }

        w.clear();
        int i = l, j = m + 1;
        while (i <= m && j <= r) {
            if (nums[i] <= nums[j]) w.push_back(nums[i ++ ]);
            else w.push_back(nums[j ++ ]);
        }
        while (i <= m) w.push_back(nums[i ++ ]);
        while (j <= r) w.push_back(nums[j ++ ]);
        for (int i = l, j = 0; j < w.size(); ++ i , ++ j ) nums[i] = w[j];
        return ret;
    }
    int reversePairs(vector<int>& nums) {
        return merge_sort(nums, 0, nums.size() - 1);
    }
};
```



```python3

```

