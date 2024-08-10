## [比赛链接](https://leetcode.cn/contest/weekly-contest-395/)

>   virtual rank: 101 / 2969
>
>   19  1:26:27  0:03:06  0:07:34  0:16:51  0:56:27 6


### [3131. 找出与数组相加的整数 I](https://leetcode.cn/problems/find-the-integer-added-to-array-i/)



```c++
class Solution {
public:
    int addedInteger(vector<int>& nums1, vector<int>& nums2) {
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());
        
        int n = nums1.size();
        for (int i = 1; i < n; ++ i ) {
            int d1 = nums1[i] - nums1[i - 1], d2 = nums2[i] - nums2[i - 1];
            if (d1 != d2)
                return -1;
        }
        return nums2[0] - nums1[0];
    }
};
```


### [3132. 找出与数组相加的整数 II](https://leetcode.cn/problems/find-the-integer-added-to-array-ii/)



```c++
class Solution {
public:
    bool check(vector<int> & a, vector<int> & b) {
        int n = a.size();
        for (int i = 1; i < n; ++ i ) {
            int d1 = a[i] - a[i - 1], d2 = b[i] - b[i - 1];
            if (d1 != d2)
                return false;
        }
        return true;
    }
    
    int minimumAddedInteger(vector<int>& nums1, vector<int>& nums2) {
        int n = nums2.size(), m = nums1.size();
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());
        
        int res = 1e9;
        for (int i = 0; i < m; ++ i )
            for (int j = i + 1; j < m; ++ j ) {
                vector<int> t;
                for (int k = 0; k < m; ++ k ) {
                    if (k == i || k == j) 
                        continue;
                    t.push_back(nums1[k]);
                }
                
                if (check(t, nums2))
                    res = min(res, nums2[0] - t[0]);
            }
        return res;
    }
};
```

### [3133. 数组最后一个元素的最小值](https://leetcode.cn/problems/minimum-array-end/)



```c++
class Solution {
public:
    // 第一个数一定是x 否则&得到的结果会比x小
    // 考虑 后面的数一定是基于已有的x 不断填充其为0的位
    
    using LL = long long;
    const static int N = 64;
    
    long long minEnd(int n, int x) {
        LL base = x, tot = n - 1;
        
        vector<int> xs;
        for (int i = 0; i < N / 2 - 1; ++ i )
            xs.push_back(tot >> i & 1);
        
        LL res = base;
        for (int i = 0, j = 0; i < N && j < xs.size(); ++ i )
            if (!(base >> i & 1))
                res += (LL)xs[j ++ ] << i;
        return res;
    }
};
```

### [3134. 找出唯一性数组的中位数](https://leetcode.cn/problems/find-the-median-of-the-uniqueness-array/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL tot;     // ATTENTION (1e5+1)/2*1e5 > INT_MAX
    unordered_map<int, int> cnt;
    
    // ATTENTION return value LL 否则出错
    LL check(vector<int> & nums, LL mid) {
        int n = nums.size();
        LL ret = 0;
        // unordered_map<int, int> cnt; // 局部初始化会导致超时
        cnt.clear();
        for (int i = 0, j = 0, tot = 0; j < n; ++ j ) {
            cnt[nums[j]] ++ ;
            if (cnt[nums[j]] == 1)
                tot ++ ;
            
            while (i <= j && tot > mid) {
                cnt[nums[i]] -- ;
                if (cnt[nums[i]] == 0)      // 注意 可能有重复数 需要去重
                    tot -- ;
                i ++ ;
            }
            LL w = j - i + 1;
            ret += w;
        }
        return ret;
    }
    
    int medianOfUniquenessArray(vector<int>& nums) {
        tot = 0;
        int n = nums.size();
        for (int i = 1; i <= n; ++ i )
            tot += n - i + 1;
        
        LL l = 0, r = 1e8;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (check(nums, mid) < (tot + 1) / 2)
                l = mid + 1;
            else
                r = mid;
        }
        
        // cout << "  tot = " << tot << " l = " << l << " check = " << check(nums, l) << endl;
        
        return l;
    }
};
```
