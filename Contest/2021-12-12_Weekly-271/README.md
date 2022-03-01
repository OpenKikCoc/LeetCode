## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-271/)


### [2103. 环和杆](https://leetcode-cn.com/problems/rings-and-rods/)

略

```c++
class Solution {
public:
    int countPoints(string rings) {
        unordered_map<char, unordered_set<char>> hash;
        int n = rings.size();
        for (int i = 0; i < n; i += 2 ) {
            char c = rings[i], d = rings[i + 1];
            hash[d].insert(c);
        }
        int res = 0;
        for (auto & [_, s] : hash)
            if (s.size() == 3)
                res ++ ;
        return res;
    }
};
```


### [2104. 子数组范围和](https://leetcode-cn.com/problems/sum-of-subarray-ranges/)

双指针维护即可... 显然没有 rmq 的必要

```c++
class Solution {
public:
    using LL = long long;
    using PLL = pair<LL, LL>;
    const static int N = 1010, M = 11;
    
    int n;
    vector<int> w;
    /*
    LL f[N][M], g[N][M];
    
    void init() {
        for (int j = 0; j < M; ++ j )
            for (int i = 0; i + (1 << j) - 1 < n; ++ i) {
                f[i][j] = -1e18, g[i][j] = 1e18;
                if (!j) f[i][j] = w[i];
                else f[i][j] = max(f[i][j - 1], f[i + (1 << j - 1)][j - 1]);
                if (!j) g[i][j] = w[i];
                else g[i][j] = min(g[i][j - 1], g[i + (1 << j - 1)][j - 1]);
            }
    }
    
    PLL query(int l, int r) {
        int len = r - l + 1;
        int k = log(len) / log(2);
        return {max(f[l][k], f[r - (1 << k) + 1][k]), min(g[l][k], g[r - (1 << k) + 1][k])};
    }
    */
    
    long long subArrayRanges(vector<int>& nums) {
        w = nums;
        n = w.size();
        // init();
        
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            int a = w[i], b = w[i];
            for (int j = i; j < n; ++ j ) {
                a = max(a, w[j]), b = min(b, w[j]);
                // auto [a, b] = query(i, j);
                res += (LL)abs(a - b);
            }
        }
        return res;
    }
};
```

### [2105. 给植物浇水 II](https://leetcode-cn.com/problems/watering-plants-ii/)

模拟即可

```c++
class Solution {
public:
    int minimumRefill(vector<int>& plants, int ca, int cb) {
        int n = plants.size(), res = 0;
        for (int i = 0, j = n - 1, a = ca, b = cb; i <= j; ++ i , -- j ) {
            if (i == j) {
                int t = max(a, b);
                if (t < plants[i])
                    res ++ ;
                break;
            }
            if (a >= plants[i])
                a -= plants[i];
            else
                res ++ , a = ca - plants[i];
            if (b >= plants[j])
                b -= plants[j];
            else
                res ++ , b = cb - plants[j];
        }
        return res;
    }
};
```

### [2106. 摘水果](https://leetcode-cn.com/problems/maximum-fruits-harvested-after-at-most-k-steps/) [TAG]

一开始想的是 trick ，考虑到最终合法范围一定是在 startPos 的左右侧：可能其中一侧重叠。

随后根据重叠部分计算得到一个合法值，维护过程取 max 。

但显然无需关注【在某个区间取某个值】，只需关注【取某个值时可能有哪些区间】即可 ==> 滑动窗口双指针

```c++
class Solution {
public:
    // trick 双指针
    const static int N = 2e5 + 10;
    
    int w[N];
    
    int maxTotalFruits(vector<vector<int>>& fruits, int startPos, int k) {
        memset(w, 0, sizeof w);
        for (auto & f : fruits)
            w[f[0]] += f[1];
        
        int res = 0;
        for (int l = 0, r = 0, s = 0; l <= startPos && r < N; ++ r ) {
            s += w[r];
            
            // 直接推理取某个区间的 min 消耗，而非枚举区间计算消耗
            while (l <= r && r - l + min(abs(startPos - l), abs(r - startPos)) > k)
                s -= w[l], l ++ ;
            res = max(res, s);
        }
        
        return res;
    }
};
```
