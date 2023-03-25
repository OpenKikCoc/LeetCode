## [比赛链接](https://leetcode.cn/contest/weekly-contest-336/)

>   virtual rank: 56 / 5897


### [2586. 统计范围内的元音字符串数](https://leetcode.cn/problems/count-the-number-of-vowel-strings-in-range/)



```c++
class Solution {
public:
    int vowelStrings(vector<string>& words, int left, int right) {
        unordered_set<char> S = {'a', 'e', 'i', 'o', 'u'};
        
        int n = words.size(), res = 0;
        for (int i = left; i <= right; ++ i ) {
            if (S.count(words[i][0]) && S.count(words[i].back()))
                res ++ ;
        }
        return res;
    }
};
```


### [2587. 重排数组以得到最大前缀分数](https://leetcode.cn/problems/rearrange-array-to-maximize-prefix-score/)

贪心排序即可

```c++
class Solution {
public:
    using LL = long long;
    
    int maxScore(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        reverse(nums.begin(), nums.end());
        
        LL s = 0;
        for (int i = 0; i < nums.size(); ++ i ) {
            s += nums[i];
            if (s <= 0)
                return i;
        }
        return nums.size();
    }
};
```

### [2588. 统计美丽子数组数目](https://leetcode.cn/problems/count-the-number-of-beautiful-subarrays/)

边扫描边统计

```c++
class Solution {
public:
    using LL = long long;

    long long beautifulSubarrays(vector<int>& nums) {
        unordered_map<int, int> hash;
        hash[0] = 1;
        
        int n = nums.size();
        LL res = 0;
        for (int i = 0, st = 0; i < n; ++ i ) {
            int x = nums[i];
            
            // 实际上可以直接使用 x
            st ^= x;
            // for (int j = 0; j < 21; ++ j )
            //     if (x >> j & 1)
            //         st ^= 1 << j;
            
            res += hash[st];
            hash[st] ++ ;
        }
        return res;
    }
};
```

### [2589. 完成所有任务的最少时间](https://leetcode.cn/problems/minimum-time-to-complete-all-tasks/)

经典区间问题：每个区间内需要至少某些个点被覆盖，求满足所有区间的情况下的最小覆盖点数和

进阶：[LCP 32. 批量处理任务](https://leetcode.cn/problems/t3fKg1/)

-   暴力

```c++
class Solution {
public:
    // 区间问题
    //      先按右端点升序排序 相同情况下再按左端点降序排序
    
    const static int N = 2010;
    
    int st[N];
    
    int findMinimumTime(vector<vector<int>>& tasks) {
        sort(tasks.begin(), tasks.end(), [](vector<int> & a, vector<int> & b) {
            if (a[1] == b[1])
                return a[0] > b[0];
            return a[1] < b[1];
        });
        
        memset(st, 0, sizeof st);
        
        for (auto & t : tasks) {
            int l = t[0], r = t[1];
            
            int x = t[2];
            for (int i = l; i <= r; ++ i )
                if (st[i])
                    x -- ;
            
            for (int i = r; i >= l && x > 0; -- i )
                if (!st[i]) {
                    st[i] = 1;
                    x -- ;
                }
        }
        
        int res = 0;
        for (int i = 0; i < N; ++ i )
            if (st[i])
                res ++ ;
        return res;
    }
};
```
