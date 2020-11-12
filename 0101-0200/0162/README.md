#  [162. 寻找峰值](https://leetcode-cn.com/problems/find-peak-element/)

## 题意



## 题解



```c++
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int n = nums.size();
        int l = 0, r = n-1;
        while(l < r) {
            int mid = l + (r-l)/2;
            if(nums[mid] < nums[mid+1]) l = mid+1;
            else r = mid;
        }
        return l;
    }
};
```



```python3

```

