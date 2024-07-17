#  [410. 分割数组的最大值](https://leetcode.cn/problems/split-array-largest-sum/)

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
                    f[i][j] = min(f[i][j], max(f[k][j - 1], psum[i] - psum[k]));
                
        }
        return f[n][m];
    }
};

// 二分
class Solution {
public:
    vector<int> nums;
    int n, m;
    
    bool check(int mid) {
        int c = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i, s = 0;
            while (j < n && s + nums[j] <= mid)
                s += nums[j], j ++ ;
            if (i == j)
                return true;
            c ++ ;
            i = j - 1;
        }
        return c > m;
    }

    int splitArray(vector<int>& nums, int m) {
        this->nums = nums;
        this->n = nums.size(), this->m = m;
        int l = 0, r = INT_MAX;
        while (l < r) {
            int mid = l + (r - l) / 2;
            // 不合法 要增加
            if (check(mid))
                l = mid + 1;
            else
                r = mid;
        }
        return l;
    }
};

// yxc 二分
class Solution {
public:
    bool check(vector<int>& nums, int m, int mid) {
        int sum = 0, cnt = 0;
        for (auto x: nums) {
            if (x > mid) return false;
            if (sum + x > mid) {
                cnt ++ ;
                sum = x;
            } else {
                sum += x;
            }
        }
        if (sum) cnt ++ ;
        return cnt <= m;
    }

    int splitArray(vector<int>& nums, int m) {
        int l = 0, r = INT_MAX;
        while (l < r) {
            int mid = (long long)l + r >> 1;
            if (check(nums, m, mid)) r = mid;
            else l = mid + 1;
        }
        return r;
    }
};
```



```python3

```

