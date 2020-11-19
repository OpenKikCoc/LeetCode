#  [416. 分割等和子集](https://leetcode-cn.com/problems/partition-equal-subset-sum/)

## 题意



## 题解



```c++
class Solution {
public:
    // bitset
    bool canPartition(vector<int>& nums) {
        bitset<10001> f;
        f[0] = 1;
        int sum = 0;
        for (auto x: nums) {
            f |= f << x;
            sum += x;
        }
        if (sum % 2) return false;
        return f[sum / 2];
    }

    // 数组写法
    bool canPartition_2(vector<int>& nums) {
        int n = nums.size(), sum = 0;
        for(auto& v : nums) sum += v;
        if(sum & 1) return false;
        sum /= 2;
        vector<bool> f(sum+1);
        f[0] = true;
        for(int i = 1; i <= n; ++i)
            for(int j = sum; j >= nums[i-1]; --j)
                f[j] = f[j] || f[j-nums[i-1]];
        return f[sum];
    }
};
```



```python3

```

