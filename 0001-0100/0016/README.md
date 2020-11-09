#  [16. 最接近的三数之和](https://leetcode-cn.com/problems/3sum-closest/)

## 题意



## 题解



```c++
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        int res = INT_MAX/2; // 其实20000就可以啦
        for(int i = 0; i < n-2; ++i) {
            int l = i+1, r = n-1;
            while(l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                int v = target-sum;
                if(abs(v) < abs(target-res)) {
                    res = sum;
                }
                if(v < 0) --r;
                else if(v > 0) ++l;
                else return target;
            }
        }
        return res;
    }
};
```



```python3

```

