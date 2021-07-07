#  [368. 最大整除子集](https://leetcode-cn.com/problems/largest-divisible-subset/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        int n = nums.size(), maxl = 0, end = -1;
        sort(nums.begin(), nums.end());
        vector<int> f(n, 1), last(n, -1), res;
        for (int i = 0; i < n; ++ i ) {
            for (int j = 0; j < i; ++ j ) {
                if (nums[i] % nums[j] == 0 && f[i] <= f[j]) {
                    f[i] = f[j] + 1;
                    last[i] = j;
                    //cout <<nums[j]<<" "<<nums[i]<<endl;
                }
            }
            if (f[i] > maxl) {
                maxl = f[i];
                end = i;
            }
        }
        for (int i = end; i != -1; i = last[i])
            res.push_back(nums[i]);
        return res;
    }
};
```



```python3

```

