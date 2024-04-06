## [比赛链接](https://leetcode.cn/contest/weekly-contest-382/)


### [3019. 按键变更的次数](https://leetcode.cn/problems/number-of-changing-keys/)



```c++
class Solution {
public:
    int trim(char c) {
        if (c >= 'A' && c <= 'Z')
            return c - 'A';
        return c - 'a';
    }
    
    int countKeyChanges(string s) {
        int n = s.size(), res = 0;
        for (int i = 1; i < n; ++ i )
            if (trim(s[i - 1]) != trim(s[i]))
                res ++ ;
        return res;
    }
};
```


### [3020. 子集中元素的最大数量](https://leetcode.cn/problems/find-the-maximum-number-of-elements-in-subset/)

细节略多容易WA

主要在于时间复杂度分析

```c++
class Solution {
public:
    // 如果是 2 的幂次，最多指数到 32
    // 则 按照每一个底数去做幂次统计... 然后枚举即可
    using LL = long long;
    
    int maximumLength(vector<int>& nums) {
        unordered_map<LL, int> h;
        for (auto x : nums)
            h[x] ++ ;
        
        int res = 0;
        sort(nums.begin(), nums.end());
        for (auto v : nums) {
            if (v == 1) {
                res = max(res, (h[1] % 2 ? h[1] : h[1] - 1));   // ATTENTION: k=0
                continue;
            }
            
            int t = 0;
            LL x = v;
            while (h.count(x) && h[x] > 1)
                t += 2, x *= x;
            t += (h.count(x) ? 1 : -1);
            res = max(res, t);
        }
        return res;
    }
};
```

### [3021. Alice 和 Bob 玩鲜花游戏](https://leetcode.cn/problems/alice-and-bob-playing-flower-game/)



```c++
class Solution {
public:
    // 题目分析来看 鲜花总和是奇数就行了...
    // 1. x 奇数，y 偶数
    // 2. x 偶数，y 奇数
    using LL = long long;
    
    long long flowerGame(int n, int m) {
        LL res = 0;
        {
            // case 1
            LL a = (n + 1) / 2, b = m / 2;
            res += a * b;
        }
        {
            // case 2
            LL a = n / 2, b = (m + 1) / 2;
            res += a * b;
        }
        return res;
    }
};
```

### [3022. 给定操作次数内使剩余元素的或值最小](https://leetcode.cn/problems/minimize-or-of-remaining-elements-using-operations/) [TAG]

经典问题

```c++
class Solution {
public:
    // ATTENTION: 位运算以及最大值 => 从高到低逐位枚举
    // 经典问题
    //
    // 简化思路 考虑: 能因为&操作而被剪掉的最大值 则取反留下的就是最小值

    int minOrAfterOperations(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;
        for (int i = 29; i >= 0; -- i ) {
            // 假定要把当前位置剪掉
            int t = res + (1 << i), c = 0;
            for (int j = 0, now = -1/*-1 = 0b111...111*/; j < n; ++ j ) {
                now &= nums[j] & t; // ATTENTION: nums[j] & t 才是真正的值 (只关心特定的bits)
                if (now)
                    c ++ ;          // 仍需要合并 累加操作次数
                else
                    now = -1;       // 可以开始新的一段
            }
            // ATTENTION: 思考 为什么这个判断就足够了? 能保证所有bit位来看都能在k次操作内实现目标?
            // => 因为在一开始使用的就是 res | (1<<i)，【已经】考虑了之前操作过的bits => 即每次校验当前bit的同时也校验了之前的bit位
            if (c <= k)
                res = t;
        }
        return ((1 << 30) - 1) ^ res;
    }
};
```
