#  [410. 分割数组的最大值](https://leetcode-cn.com/problems/split-array-largest-sum/)

## 题意



## 题解



```c++
class Solution {
public:
    const int inf = 0x3f3f3f3f;
    int splitArray(vector<int>& nums, int m) {
        int n = nums.size();
        vector<int> psum(n + 1);
        for (int i = 1; i <= n; ++ i ) psum[i] = psum[i - 1] + nums[i - 1];
        vector<vector<int>> f(n + 1, vector<int>(m + 1, inf));
        f[0][0] = 0;
        for (int i = 1; i <= n; ++ i ) {
            for (int j = 1; j <= i && j <= m; ++ j )
                for (int k = 0; k < i; ++ k )
                    f[i][j] = min(f[i][j], max(f[k][j-1], psum[i] - psum[k]));
                
        }
        return f[n][m];
    }
};

// 二分
class Solution {
public:
    bool check(vector<int>& nums, int m, int top) {
        long long cnt = 0, sum = 0;
        for(auto v : nums) {
            //if(v > top) return false;   // 重要！ 
            // 或者把这里注释掉 l直接使用所有数值的最大值 l = max(v, l)
            if(sum + v <= top) sum += v;
            else {
                ++cnt;
                sum = v;
            }
        }
        if(sum) ++cnt;
        return cnt <= m;
    }
    int splitArray(vector<int>& nums, int m) {
        long long l = 0, r = 0;
        for(auto v : nums) {
            if(v > l) l = v;
            r += v;
        }
        while(l < r) {
            long long mid = l + (r-l)/2;
            if(check(nums, m, mid)) r = mid;
            else l = mid+1;
        }
        return l;
    }
};
```



```python3

```

