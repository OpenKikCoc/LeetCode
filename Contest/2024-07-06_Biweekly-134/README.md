## [比赛链接](https://leetcode.cn/contest/biweekly-contest-134/)


### [3206. 交替组 I](https://leetcode.cn/problems/alternating-groups-i/)



```c++
class Solution {
public:
    int numberOfAlternatingGroups(vector<int>& colors) {
        int n = colors.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            if (colors[(i - 1 + n) % n] != colors[i] && colors[(i + 1) % n] != colors[i])
                res ++ ;
        return res;
    }
};
```


### [3207. 与敌人战斗后的最大分数](https://leetcode.cn/problems/maximum-points-after-enemy-battles/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long maximumPoints(vector<int>& enemyEnergies, int currentEnergy) {
        sort(enemyEnergies.begin(), enemyEnergies.end());
        
        if (enemyEnergies[0] > currentEnergy)
            return 0;
        
        int n = enemyEnergies.size();
        LL s = currentEnergy;
        for (int i = 1; i < n; ++ i )
            s = s + enemyEnergies[i];
        return s / enemyEnergies[0];
    }
};
```

### [3208. 交替组 II](https://leetcode.cn/problems/alternating-groups-ii/)

细节。。。理清楚。。。

```c++
class Solution {
public:
    int numberOfAlternatingGroups(vector<int>& colors, int k) {
        int n = colors.size();
        for (int i = 0; i < k - 1; ++ i )	// ATTENTION 前k-1个
            colors.push_back(colors[i]);
        
        int res = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n + k - 1 && colors[j] != colors[j - 1])
                j ++ ;
            int w = j - i;
            if (w < k) {
                i = j - 1;
                continue;
            }
            
            res += w - (k - 1);
            i = j - 1;
        }
        return res;
    }
};
```

### [3209. 子数组按位与值为 K 的数目](https://leetcode.cn/problems/number-of-subarrays-with-and-value-of-k/)

LogTrick 综合应用 (不只是求值域集合 还有求数量)

```c++
class Solution {
public:
    using LL = long long;
    
    long long countSubarrays(vector<int>& nums, int k) {
        int n = nums.size();
        LL res = 0;
        for (int i = 0, l = 0, r = 0; i < n; ++ i ) {
            int x = nums[i];
            for (int j = i - 1; j >= 0; -- j ) {
                if ((nums[j] & x)/*ATTENTION 括号*/ == nums[j])
                    break;
                nums[j] &= x;
            }
            res += lower_bound(nums.begin(), nums.begin() + i + 1, k + 1) -
                   lower_bound(nums.begin(), nums.begin() + i + 1, k);
            // while (l <= i && nums[l] < k)
            //     l ++ ;
            // while (r <= i && nums[r] <= k)
            //     r ++ ;
            // res += r - l;
        }
        return res;
    }
};
```
