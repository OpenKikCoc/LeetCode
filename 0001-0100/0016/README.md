#  [16. 最接近的三数之和](https://leetcode.cn/problems/3sum-closest/)

## 题意



## 题解

更标准的写法

```c++
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        pair<int, int> res(INT_MAX, INT_MAX);
        for (int i = 0; i < nums.size(); i ++ )
            for (int j = i + 1, k = nums.size() - 1; j < k; j ++ ) {
                while (k - 1 > j && nums[i] + nums[j] + nums[k - 1] >= target) k -- ;
                int s = nums[i] + nums[j] + nums[k];
                res = min(res, make_pair(abs(s - target), s));
                if (k - 1 > j) {
                    s = nums[i] + nums[j] + nums[k - 1];
                    res = min(res, make_pair(target - s, s));
                }
            }
        return res.second;
    }
};
```



```c++
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        int res = INT_MAX/2; // 其实20000就可以啦
        for (int i = 0; i < n - 2; ++ i ) {
            int l = i + 1, r = n - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                int v = target - sum;
                if (abs(v) < abs(target-res)) {
                    res = sum;
                }
                if (v < 0) -- r ;
                else if (v > 0) ++ l ;
                else return target;
            }
        }
        return res;
    }
};
```



```python
# 考虑在target右边/左边；本题只有一个答案，就不需要判重

class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        # res 初始化一个很大的值
        res = float('inf')
        n = len(nums)
        nums.sort()
        sumn = 0
        for i in range(n - 2):
            l = i + 1; r = n - 1
            while l < r:
                sumn = nums[i] + nums[r] + nums[l] 
                v = target - sumn
                if abs(v) < abs(target - res):res = sumn
                if v < 0:r -= 1
                elif v > 0:l += 1
                else:return target
        return res
```

