## [比赛链接](https://leetcode.cn/contest/weekly-contest-372/)


### [2937. 使三个字符串相等](https://leetcode.cn/problems/make-three-strings-equal/)

一开始题意理解错了...

```c++
class Solution {
public:
    // 题意理解错了，意思应该是只能删 3 个字符串之一的最右侧字符
    // 则从前匹配即可
    
    int findMinimumOperations(string s1, string s2, string s3) {
        int n1 = s1.size(), n2 = s2.size(), n3 = s3.size();
        int p = -1;
        for (int i = 0; i < n1 && i < n2 && i < n3; ++ i ) {
            if (s1[i] != s2[i] || s1[i] != s3[i] || s2[i] != s2[i])
                break;
            p = i;
        }
        if (p == -1)
            return p;
        return n1 + n2 + n3 - 3 * (p + 1);
    }
};
```


### [2938. 区分黑球与白球](https://leetcode.cn/problems/separate-black-and-white-balls/)

冒泡排序计数转化为逆序对

```c++
class Solution {
public:
    using LL = long long;
    
    string s, t;
    int n;
    
    LL merge_sort(int l, int r) {
        if (l == r)
            return 0;
        int mid = l + r >> 1;
        LL res = merge_sort(l, mid) + merge_sort(mid + 1, r);
        int i = l, j = mid + 1, k = 0;
        while (i <= mid && j <= r)
            if (s[i] <= s[j])           // 白色0在左侧
                t[k ++ ] = s[i ++ ];
            else {
                res += mid + 1 - i;
                t[k ++ ] = s[j ++ ];
            }
        while (i <= mid)
            t[k ++ ] = s[i ++ ];
        while (j <= r)
            t[k ++ ] = s[j ++ ];
        for (int i = l, j = 0; i <= r; ++ i , ++ j )
            s[i] = t[j];
        return res;
    }
    
    long long minimumSteps(string s) {
        this->s = s, this->n = s.size();
        this->t = s;
        return merge_sort(0, n - 1);
    }
};
```

### [2939. 最大异或乘积](https://leetcode.cn/problems/maximum-xor-product/)

思维题

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 52, MOD = 1e9 + 7;
    
    // 思考 n 限制了可以自由 0/1 的总位数 => 因为 a/b 位数可能大于 n
    //   如何使得结果最大? 显然需要让 a^x, b^x 各自最大
    // 考虑: 如果 a/b 的某个位都是 0/0 则有必要使得x取 1 让 a/b + 1<<y
    //      如果 a/b 的某个位分别是 1/0, 0/1 则只能有两种选择 => 二者分别 +/- 1<<y
    // 最坏情况下 50个位都需要 +/- 
    // ======> 贪心: 第一个位给其中一个数，剩下的位都给另一个数即可 => 需要求出 x
    
    int maximumXorProduct(long long a, long long b, int n) {
        vector<int> t;
        // ATTENTION 可以等于
        for (int i = 0; i < n; ++ i ) {
            int x = (a >> i) & 1, y = (b >> i) & 1;
            if (x == 0 && y == 0) {
                a += 1ll << i, b += 1ll << i;
            } else if (x == 1 && y == 1) {
                // do nothing
                continue;
            } else {
                t.push_back(i);     // ATTENTION 简化，不需要关心是谁转移到谁
                // ATTENTION 但是需要把 a, b 在此位消 0
                if (x)
                    a -= 1ll << i;  // ATTENTION use 1ll
                else
                    b -= 1ll << i;
            }
        }
        
        // 【核心在于分配策略】
        if (a == b) {
            // 对于所有不同的位 需要把最高位给 a 其余都给 b
            for (int i = t.size() - 1; i >= 0; -- i ) {
                if (i == t.size() - 1)
                    a += 1ll << t[i];
                else
                    b += 1ll << t[i];
            }
        } else {
            // 全给 a 或全给 b
            LL tot = 0;
            for (auto x : t)
                tot += 1ll << x;
            if (a < b)
                a += tot;
            else
                b += tot;
        }
        a %= MOD, b %= MOD; // ATTENTION
        // cout << " a = " << a << " b = " << b << endl;
        return a * b % MOD;
    }
};
```

### [2940. 找到 Alice 和 Bob 可以相遇的建筑](https://leetcode.cn/problems/find-building-where-alice-and-bob-can-meet/) [TAG]

BIT 处理二维偏序问题

重点在于想到 并理清维护思路

```c++
class Solution {
public:
    // 题目进行抽象: 本质是对于一个 DAG，求 LCA
    // 问题在于数据范围很大 边的数量可能非常多 没有办法提前建图
    //   但是 本题并不关心要走多少步 所以建完全图应该也是没有必要的 考虑如何简化
    // INSTEAD: LCA路子行不通 考虑如何结合queries进行离线操作
    //
    // 假定按坐标 左右两侧分别 a,b
    // - 考虑特殊情况: a == b 或 a < b 且 h[a] < h[b] 则 靠右侧的 b 就是答案
    // - 考虑一般情况: a < b, h[a] >= h[b] 则 b 右侧第一个大于 h[a] 的就是答案
    //     => 【二维偏序问题】
    //     => 考虑从右向左扫描: 以 heights 作为 BIT-idx, 以 index 作为 BIT-value 维护 [维护min-value]
    //          边查询边更新即可
    
    using TIII = tuple<int, int, int>;
    const static int N = 5e4 + 10, M = N << 2, INF = 0x3f3f3f3f;
    
    int tr[M], w[N];
    int lowbit(int x) {
        return x & -x;
    }
    void modify(int x, int y) {
        w[x] = y;   // ATTENTION 考虑到遍历顺序 这里会自然取最小值
        for (int i = x; i < N; i += lowbit(i))
            tr[i] = min(tr[i], y);
    }
    int query(int l, int r) {
        int ori_r = r;
        int res = INF;
        for (; l <= r; ) {
            res = min(res, w[r]);
            for ( -- r ; r >= l + lowbit(r); r -= lowbit(r))
                res = min(res, tr[r]);
        }
        return res;
    }
    
    vector<int> vs;
    int find(int x) {
        return lower_bound(vs.begin(), vs.end(), x) - vs.begin();
    }
    
    vector<int> leftmostBuildingQueries(vector<int>& heights, vector<vector<int>>& queries) {
        {
            // 离散化 所有值
            vs.clear();
            for (auto x : heights)
                vs.push_back(x);
            sort(vs.begin(), vs.end());
            vs.erase(unique(vs.begin(), vs.end()), vs.end());
            
            for (int i = 0; i < heights.size(); ++ i )
                heights[i] = find(heights[i]) + 1;   // ATTENTION 需要+1 保证下标
        }
        
        vector<TIII> qs;
        for (int i = 0; i < queries.size(); ++ i ) {
            int l = queries[i][0], r = queries[i][1];
            if (l > r)
                swap(l, r);
            qs.push_back({r, l, i});
        }
        sort(qs.begin(), qs.end());
        
        // 初始化
        memset(w, 0x3f, sizeof w), memset(tr, 0x3f, sizeof tr);
        
        vector<int> res(queries.size(), -1);
        // ATTENTION: i 需要到 0，因为查询的下标可能到 0
        for (int i = N - 1, p = qs.size() - 1; i >= 0; -- i ) {
            while (p >= 0 && get<0>(qs[p]) == i) {
                auto [r, l, idx] = qs[p];
                // cout << " i = " << i << " p = " << p << " query-idx = " << idx << " l = " << l << " r = " << r << endl;
                
                // 需要特判
                if (l == r) {
                    res[idx] = r;
                } else if (heights[l] < heights[r]) {
                    res[idx] = r;
                } else {
                    int got = query(heights[l] + 1, N - 1);
                    res[idx] = got > INF / 2 ? -1 : got;
                }
                p -- ;
            }
            
            if (i < heights.size())
                modify(heights[i], i);
        }
        // cout << endl;
        return res;
    }
};
```
