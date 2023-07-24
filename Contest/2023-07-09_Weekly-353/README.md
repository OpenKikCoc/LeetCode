## [比赛链接](https://leetcode.cn/contest/weekly-contest-353/)

>   virtual rank
>
>   193 / 4112
>   0:01:31
>   0:07:15
>   0:18:13
>   0:33:45  2


### [2769. 找出最大的可达成数字](https://leetcode.cn/problems/find-the-maximum-achievable-number/)



```c++
class Solution {
public:
    int theMaximumAchievableX(int num, int t) {
        return num + t * 2;
    }
};
```


### [2770. 达到末尾下标所需的最大跳跃次数](https://leetcode.cn/problems/maximum-number-of-jumps-to-reach-the-last-index/)



```c++
class Solution {
public:
    const static int N = 1010;
    
    int f[N];
    
    int maximumJumps(vector<int>& nums, int target) {
        int n = nums.size();
        
        memset(f, 0xcf, sizeof f);
        f[1] = 0;
        for (int i = 2; i <= n; ++ i )
            for (int j = 1; j < i; ++ j )
                if (abs(nums[i - 1] - nums[j - 1]) <= target)
                    f[i] = max(f[i], f[j] + 1);
        
        return f[n] > 0 ? f[n] : -1;
    }
};
```

### [2771. 构造最长非递减子数组](https://leetcode.cn/problems/longest-non-decreasing-subarray-from-two-arrays/)

状态定义 略

加快速度

```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int n;
    int f[N][2];
    
    int maxNonDecreasingLength(vector<int>& nums1, vector<int>& nums2) {
        this->n = nums1.size();
        
        memset(f, 0xcf, sizeof f);
        f[1][0] = f[1][1] = 1;
        int res = 1;
        for (int i = 2; i <= n; ++ i ) {
            int x = nums1[i - 1], y = nums2[i - 1];
            // 用 x
            f[i][0] = max(nums1[i - 2] <= x ? f[i - 1][0] : 0, nums2[i - 2] <= x ? f[i - 1][1] : 0) + 1;
            // 用 y
            f[i][1] = max(nums1[i - 2] <= y ? f[i - 1][0] : 0, nums2[i - 2] <= y ? f[i - 1][1] : 0) + 1;
            
            res = max(res, max(f[i][0], f[i][1]));
        }
        return res;
    }
};
```

### [2772. 使数组中的所有元素都等于零](https://leetcode.cn/problems/apply-operations-to-make-all-array-elements-equal-to-zero/)



```c++
class Solution {
public:
    // 差分应用
    const static int N = 1e5 + 10;
    
    int d[N];
    
    bool checkArray(vector<int>& nums, int k) {
        memset(d, 0, sizeof d);
        int n = nums.size();
        d[1] = nums[0];
        for (int i = 2; i <= n; ++ i )
            d[i] = nums[i - 1] - nums[i - 2];
        
        for (int i = 1; i + k - 1 <= n; ++ i ) {
            int x = d[i];
            if (x < 0)
                return false;
            if (x == 0)
                continue;
            d[i] -= x, d[i + k] += x;
        }
        // 后面的必须完全一样
        unordered_set<int> S;
        for (int i = n - k + 1; i <= n; ++ i ) {
            // cout << " i = " << i << " d[i] = " << d[i] << endl;
            S.insert(d[i]);
        }
        
        return S.size() == 1;
    }
};
```
