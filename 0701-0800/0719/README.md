#  [719. 找出第 k 小的距离对](https://leetcode-cn.com/problems/find-k-th-smallest-pair-distance/)

## 题意



## 题解



```c++
class Solution {
public:
    int get(vector<int>& nums, int mid) {
        int res = 0;
        for (int l = 0, r = 0; r < nums.size(); ++ r ) {
            while (nums[r] - nums[l] > mid)
                ++ l ;
            res += r - l;
        }
        return res;
    }

    int smallestDistancePair(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int l = 0, r = 1e6;
        while (l < r) {
            int mid = l + r >> 1;
            if (get(nums, mid) >= k) r = mid;
            else l = mid + 1;
        }
        return r;
    }
};
```



```python3

```

