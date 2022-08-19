## [比赛链接](https://leetcode.cn/contest/biweekly-contest-84/)


### [2363. 合并相似的物品](https://leetcode.cn/problems/merge-similar-items/)



```c++
class Solution {
public:
    vector<vector<int>> mergeSimilarItems(vector<vector<int>>& items1, vector<vector<int>>& items2) {
        unordered_map<int, int> hash;
        for (auto & item : items1)
            hash[item[0]] += item[1];
        for (auto & item : items2)
            hash[item[0]] += item[1];
        
        vector<vector<int>> res;
        for (auto [k, v] : hash)
            res.push_back({k, v});
        sort(res.begin(), res.end());
        return res;
    }
};
```


### [2364. 统计坏数对的数目](https://leetcode.cn/problems/count-number-of-bad-pairs/)



```c++
class Solution {
public:
    // j - nums[j] != i - nums[i]
    using LL = long long;
    
    long long countBadPairs(vector<int>& nums) {
        int n = nums.size();
        unordered_map<int, LL> hash;
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            int t = i - nums[i];
            res += (LL)i - hash[t];
            hash[t] ++ ;
        }
        return res;
    }
};
```

### [2365. 任务调度器 II](https://leetcode.cn/problems/task-scheduler-ii/)

加快速度

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    int n;
    LL d[N];
    
    long long taskSchedulerII(vector<int>& tasks, int space) {
        this->n = tasks.size();
        memset(d, 0, sizeof d);
        
        unordered_map<int, int> last;
        for (int i = 1; i <= n; ++ i ) {
            d[i] = d[i - 1] + 1;
            int t = tasks[i - 1];
            if (last[t])
                d[i] = max(d[i], d[last[t]] + space + 1);
            last[t] = i;
        }
        return d[n];
    }
};
```

### [2366. 将数组排序的最少替换次数](https://leetcode.cn/problems/minimum-replacements-to-sort-the-array/) [TAG]

从后往前考虑，显然希望每个数及拆分后的数越大越好

本题约束下，【拆分后的数越大恰好可以满足拆分次数越少】故直接贪心

考虑把当前数分为 k 个数，则其必须满足 $(x + last - 1) / last$ （因为分割后最后一个数的大小不能超过 last）

进一步有分割后最前面的数为 $x / k$

```c++
class Solution {
public:
    // 贪心思维 结合数学
    using LL = long long;
    
    long long minimumReplacement(vector<int>& nums) {
        int n = nums.size();
        LL res = 0;
        for (int i = n - 2, last = nums[n - 1]; i >= 0; -- i ) {
            if (nums[i] > last) {
                // 此时才需要拆分，且【让拆分后最前面的值尽量的大（但不超过 nums[i]）】
                // 假定至少拆为 k 份
                int k = (nums[i] + last - 1) / last;
                res += (LL)k - 1;
                last = nums[i] / k; // default 下取整
            } else
                last = nums[i];
        }
        return res;
    }
};
```
