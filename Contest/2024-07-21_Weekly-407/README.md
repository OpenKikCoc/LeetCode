## [比赛链接](https://leetcode.cn/contest/weekly-contest-407/)

> virtual rank: 132 / 3268
>
> 20  0:34:46  0:01:14  0:09:40  0:14:24  0:34:46


### [3226. 使两个整数相等的位更改次数](https://leetcode.cn/problems/number-of-bit-changes-to-make-two-integers-equal/)



```c++
class Solution {
public:
    int minChanges(int n, int k) {
        if ((n & k) != k)
            return -1;
        
        int res = 0;
        for (int i = 0; i < 32; ++ i )
            if ((n >> i & 1) != (k >> i & 1))
                res ++ ;
        return res;
    }
};
```

```c++
class Solution {
public:
    int minChanges(int n, int k) {
        if ((n & k) != k)
            return -1;
        return __builtin_popcount(n ^ k);
    }
};
```

### [3227. 字符串元音游戏](https://leetcode.cn/problems/vowels-game-in-a-string/)

分情况讨论 只要存在元音 (vowels) 则必胜

```c++
class Solution {
public:
    unordered_set<char> S = {'a', 'e', 'i', 'o', 'u'};
    
    bool doesAliceWin(string s) {
        int cnt = 0;
        for (auto c : s)
            if (S.count(c))
                cnt ++ ;
        return cnt;
    }
};
```

### [3228. 将 1 移动到末尾的最大操作次数](https://leetcode.cn/problems/maximum-number-of-operations-to-move-ones-to-the-end/)



```c++
class Solution {
public:
    // 直觉上 一定是每次移动最左侧 "能够移动" 的位置
    // 问题在于模拟肯定会爆掉
    // 思考 本质上与 "0段" 出现有关，而对于每一个 "0段" 其贡献等于左侧 1 的数量
    // 可以理解为【每一个 0段 都能使得左侧所有 1 多操作一轮】
    
    int maxOperations(string s) {
        int n = s.size(), res = 0;
        for (int i = 0, cnt = 0; i < n; ++ i ) {
            if (s[i] == '1') {
                cnt ++ ;
                continue;
            }
            res += cnt;
            
            // 遇到 0 的段 作为整体
            int j = i;
            while (j < n && s[j] == '0')
                j ++ ;
            i = j - 1;
        }
        return res;
    }
};
```

### [3229. 使数组等于目标数组所需的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-make-array-equal-to-target/)

题意分析 + 枚举复用 + 分情况讨论

```c++
class Solution {
public:
    // 区间操作类问题显然考虑 差分 (差分用英语怎么说?)
    //
    // 从前向后扫描
    // 当: 当前位置的差分值不同时 显然需要以当前位置为起点产生修改
    //      问题在于 结束点在哪里?
    //      => 考虑【从前向后枚举 看能否复用此前的操作】 => 注意维护逻辑分情况讨论
    
    using LL = long long;
    
    long long minimumOperations(vector<int>& nums, vector<int>& target) {
        int n = nums.size();
        
        LL res = 0, last = 0;
        for (int i = 0; i < n; ++ i ) {
            int diff = target[i] - nums[i];
            
            if (diff >= 0) {
                if (last >= diff)
                    last = diff;
                else
                    res += diff - max(last, 0ll), last = diff;
            } else {
                if (last <= diff)
                    last = diff;
                else
                    res += min(last, 0ll) - diff, last = diff;
            }
        }
        return res;
    }
};
```

另一种类似思路，考虑 diff 的同向连续区间

```c++
class Solution {
public:
    using LL = long long;
    
    int get_d(int x) {
        if (x == 0)
            return 0;
        return x > 0 ? 1 : -1;
    }
    
    long long minimumOperations(vector<int>& nums, vector<int>& target) {
        int n = nums.size();
        
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            // 找到相同向的连续区间, 该区间内操作的最大次数即为偏离的最大值
            int d = get_d(target[i] - nums[i]);
            int j = i;
            while (j < n && get_d(target[j] - nums[j]) == d)  // ATTENTION 需要识别 -1/0/+1 三种情况
                j ++ ;
            
            // 1526 子问题
            for (int k = i, last = 0; k < j; ++ k ) {
                int diff = abs(target[k] - nums[k]);
                if (diff > last)
                    res += diff - last;
                last = diff;
            }
            
            i = j - 1;
        }
        return res;
    }
};
```

