## [比赛链接](https://leetcode.cn/contest/biweekly-contest-118/)


### [2942. 查找包含给定字符的单词](https://leetcode.cn/problems/find-words-containing-character/)



```c++
class Solution {
public:
    bool check(string & s, char x) {
        for (auto c : s)
            if (c == x)
                return true;
        return false;
    }
    
    vector<int> findWordsContaining(vector<string>& words, char x) {
        vector<int> res;
        for (int i = 0; i < words.size(); ++ i )
            if (check(words[i], x))
                res.push_back(i);
        return res;
    }
};
```


### [2943. 最大化网格图中正方形空洞的面积](https://leetcode.cn/problems/maximize-area-of-square-hole-in-grid/)

横竖相互独立

```c++
class Solution {
public:
    // 【横竖互不影响】 所以可以各自找到横着的最大 & 竖着的最大
    // => 但是题目要的还是正方形，所以只能找到出现过的所有的记录下来
    //                      => 又因为连续性 只记录最大的即可
    
    int get(int n, vector<int> & ns) {
        n += 2;
        sort(ns.begin(), ns.end());
        
        int ret = 0;
        for (int i = 0; i < ns.size(); ++ i ) {
            int j = i + 1;
            while (j < ns.size() && ns[j] == ns[j - 1] + 1)
                j ++ ;
            // 获取连续断开的区间长度
            int w = j - i;
            ret = max(ret, w + 1);
            i = j - 1;
        }
        return ret;
    }
    
    int maximizeSquareHoleArea(int n, int m, vector<int>& hBars, vector<int>& vBars) {
        int x = get(n, hBars), y = get(m, vBars);
        return min(x, y) * min(x, y);
    }
};
```

### [2944. 购买水果需要的最少金币数](https://leetcode.cn/problems/minimum-number-of-coins-for-fruits/)

线性 DP

```c++
class Solution {
public:
    // 分析题意... 购买 idx 位置处的水果，接下来可以免费获得 idx 个(而非 prices[idx] 个)其他水果
    // [且下标 idx 从 1 开始]
    // 
    // 以及... 按照数据示例，【接下来】值得就是一段连续区间... 不能自由选择
    // => 考虑区间 dp => O(n^3) 显然不太可行
    // => 考虑线性 dp
    // 
    // 从前到后 所有水果必然是连续获得 则可以一维线性维护 "截止到前 i 个位置的最小开销"
    
    const static int N = 1010;
    
    int f[N];
    
    int minimumCoins(vector<int>& prices) {
        memset(f, 0x3f, sizeof f);
        int n = prices.size();
        f[0] = 0;
        for (int i = 1; i <= n; ++ i ) {
            int buy_cost = f[i - 1] + prices[i - 1];
            f[i] = min(f[i], buy_cost); // 第 i 个位置买的情况下，更新 f[i]
            // 同时更新 f[i+j]
            for (int j = 1; j <= i && i + j <= n; ++ j )
                f[i + j] = min(f[i + j], buy_cost);
        }
        return f[n];
    }
};
```

### [2945. 找到最大非递减数组的长度](https://leetcode.cn/problems/find-maximum-non-decreasing-array-length/) [TAG]

单调队列优化 DP 重点在于推导证明

>   反向题目: https://leetcode.cn/problems/minimum-replacements-to-sort-the-array/

```c++
class Solution {
public:
    // 定义 f[i] 表示操作前 i 个数得到的 "最长非递减数组" 的长度
    //  同时使用 g[i] 记录在 f[i] 尽可能最大的情况下，该区间操作后的最后一个数的【最小值】
    //  【因为末尾的这个值越小，对后面的计算结果越有利】
    //
    // 则   if-condition: sums[j + 1] + ... + nums[i] >= g[j]
    //             then: f[i] = max_j{f[j]} + 1
    // 将该 if-condition 做转化: s[i] - s[j] >= g[j]
    //                      => s[i] >= s[j] + g[j]
    // 最终得到 f[i] = max{f[j]} + 1   (j 满足 s[j] + g[j] <= s[i])
    //
    // 考虑单调队列动态维护，问题在于明确【维护什么】
    // 【思想: 假定两个转移来源，做对比】
    //      - 对于两个转移点 j 和 k，假设 j<k，如果发现 calc(j)>=calc(k)【注定g[j]>g[k]】，则对于被转移点 i 来说
    //        永远都不会再使用 j 来转移，因为 k 是更优的选择。根据这个思路，可以维护一个 calc() 【单调递增】的队列
    //      => 对应: 维护队尾的弹出匹配规则
    // 
    // 考虑对于一个具体的 i 与 s[i]
    //      推理可知【要让g[i] 最小 则f[j1,j2,j3]相同的情况下j要尽可能大】
    //      => 考虑到【f 具有单调性】，条件满足 (s[j]+g[j] <= s[i]) 的情况下 越靠右越好
    //      => 考虑如果 j1<j2 且都满足转移条件，则必然选j2【思考】
    //      => 对应: 队首 弹出匹配规则
    //         对于队首，可以发现当 calc(q[hh+1]) <= sum(i) 时，hh 无用了，因为下一个位置也是符合要求且转移值会更优，队首出队
    
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL s[N], f[N], g[N];
    int q[N], hh, tt;
    
    LL calc(int x) {
        return s[x] + g[x];
    }
    
    int findMaximumLength(vector<int>& nums) {
        int n = nums.size();
        {
            s[0] = 0;
            for (int i = 1; i <= n; ++ i )
                s[i] = s[i - 1] + nums[i - 1];
        }
        
        // 显然可以从 idx-0 转移过来
        f[0] = 0, g[0] = 0;
        hh = 0, tt = -1;
        q[ ++ tt] = 0;
        
        for (int i = 1; i <= n; ++ i ) {
            // 弹出非最优的队首
            // - 注意是hh+1
            // - 注意比较规则
            while (hh + 1 <= tt && calc(q[hh + 1]) <= s[i]) {
                // ATTENTION 如果队首后面有比队首更优的，弹出当前队首
                //【本质就是满足条件的就可以，而且下标越大越优】
                hh ++ ;
            }
            
            f[i] = f[q[hh]] + 1;
            g[i] = s[i] - s[q[hh]];
            
            // 弹出非最优的队尾 [ATTENTION 理清思路 >=]
            while (hh <= tt && calc(q[tt]) >= calc(i))
                tt -- ;
            q[ ++ tt] = i;
        }
        return f[n];
    }
};
```
