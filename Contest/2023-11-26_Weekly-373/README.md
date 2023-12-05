## [比赛链接](https://leetcode.cn/contest/weekly-contest-373/)


### [2946. 循环移位后的矩阵相似检查](https://leetcode.cn/problems/matrix-similarity-after-cyclic-shifts/)



```c++
class Solution {
public:
    bool areSimilar(vector<vector<int>>& mat, int k) {
        int n = mat.size(), m = mat[0].size();
        for (int i = 0; i < n; ++ i ) {
            vector<int> t(m);
            if (i & 1) {
                for (int j = 0; j < m; ++ j )
                    t[(j + k) % m] = mat[i][j];
            } else {
                for (int j = 0; j < m; ++ j )
                    t[((j - k) % m + m) % m] = mat[i][j];
            }
            for (int j = 0; j < m; ++ j )
                if (t[j] != mat[i][j])
                    return false;
        }
        return true;
    }
};
```


### [2947. 统计美丽子字符串 I](https://leetcode.cn/problems/count-beautiful-substrings-i/)

分析转换 直接边维护边遍历即可过

但直接用在 T4 会 TLE

```c++
class Solution {
public:
    // 考虑记录元音字母的数量及对应的位置 则辅音可求
    //
    // 考虑: 以每一个位置为结尾 往前数能找到的合法区间
    //   => 问题在于 合法区间怎么确定
    //  假定 [i, j] 合法, 则
    //  - 长度为偶数 j-i+1 % 2 == 0                      => 下标奇偶分类可解 => 在后面2.的条件下不需要分类
    //  - 元音个数与偶数相同
    //       -> 1. 按个数是一半 则需要遍历校验
    //       -> 2. 按个数相同【记录diff 取模】 可以快速找到所有符合要求的 再判断下能否整除就好做了
    
    using LL = long long;
    const static int N = 1010;
    unordered_set<char> S = {'a', 'e', 'i', 'o', 'u'};
    
    vector<LL> f[N + N];    // 某个diff下，下标是多少
    int sum[N];
    
    int beautifulSubstrings(string s, int k) {
        for (int i = 0; i < N + N; ++ i )
            f[i].clear();
        f[0 + N].push_back(0);
        memset(sum, 0, sizeof sum);
        
        LL res = 0;
        int n = s.size();
        for (int i = 1, d = 0; i <= n; ++ i ) {
            bool flag = S.count(s[i - 1]);
            d += flag ? 1 : -1;
            sum[i] = sum[i - 1] + flag;
            
            // xs 中都是 diff 相同的，满足个数与长度要求
            auto & xs = f[d + N];
            for (auto x : xs) {
                // l: x+1, r: i
                int w = (i - x) / 2;
                // cout << " l = " << x+1 << " r = " << i << " c = " << sum[i] - sum[x] << " w = " << w << endl;
                if (w * w % k == 0)
                    res ++ ;
            }
            xs.push_back(i);
        }
        
        // cout << endl;
        return res;
    }
};
```

### [2948. 交换得到字典序最小的数组](https://leetcode.cn/problems/make-lexicographically-smallest-array-by-swapping-elements/)

联通分量思想 一个分量内部排序 汇总即可

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    vector<int> lexicographicallySmallestArray(vector<int>& nums, int limit) {
        int n = nums.size();
        vector<PII> vs;
        for (int i = 0; i < n; ++ i )
            vs.push_back({nums[i], i});
        sort(vs.begin(), vs.end());
        
        vector<int> res(n);
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            vector<int> t;
            t.push_back(vs[i].second);
            while (j < n && vs[j].first <= vs[j - 1].first + limit) {
                t.push_back(vs[j].second);
                j ++ ;
            }
            
            sort(t.begin(), t.end());
            for (int k = 0; k < t.size(); ++ k )
                res[t[k]] = vs[i + k].first;
            i = j - 1;
        }
        return res;
    }
};
```

### [2949. 统计美丽子字符串 II](https://leetcode.cn/problems/count-beautiful-substrings-ii/) [TAG]

考虑基于 T2 的实现继续优化

```c++
class Solution {
public:
    // 考虑记录元音字母的数量及对应的位置 则辅音可求
    //
    // 考虑: 以每一个位置为结尾 往前数能找到的合法区间
    //   => 问题在于 合法区间怎么确定
    //  假定 [i, j] 合法, 则
    //  - 长度为偶数 j-i+1 % 2 == 0                      => 下标奇偶分类可解 => 在后面2.的条件下不需要分类
    //  - 元音个数与偶数相同
    //       -> 1. 按个数是一半 则需要遍历校验
    //       -> 2. 按个数相同【记录diff 取模】 可以快速找到所有符合要求的 再判断下能否整除就好做了
    
    using LL = long long;
    const static int N = 5e4 + 10;
    
    // unordered_set<char> S = {'a', 'e', 'i', 'o', 'u'};
    bool check(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
    
    // vector<LL> f[N + N];                         // 某个diff下，下标是多少
    unordered_map<int, unordered_map<int, int>> f;  // 某个diff下，记录元音个数对k取模的次数【后面推导】
                                                    // unordered_map<int, int> f[N + N] => 会超时 改成两层嵌套
    int sum[N];
    
    long long beautifulSubstrings(string s, int k) {
        // for (int i = 0; i < N + N; ++ i )
        //     f[i].clear();
        // f[0 + N].push_back(0);
        f[0][0 % k] = 1;
        memset(sum, 0, sizeof sum);
        
        vector<int> wd2; // w divide 2
        for (int i = 0; i < k; ++ i ) {    // ATTENTION: 考虑只枚举到 k, 但是需要从 0 开始枚举
            if (i * i % k == 0)
                wd2.push_back(i);
        }
        
        LL res = 0;
        int n = s.size();
        for (int i = 1, d = 0; i <= n; ++ i ) {
            // bool flag = S.count(s[i - 1]);
            bool flag = check(s[i - 1]);
            d += flag ? 1 : -1;
            sum[i] = sum[i - 1] + flag;
            
            // xs 中都是 diff 相同的，满足个数与长度要求
            auto & xs = f[d];
            
            // 【ATTENTION 循环对于该数据范围太过重型 考虑是否有更快速索引办法】
            // for (auto x : xs) {
            //     // l: x+1, r: i
            //     int w = (i - x) / 2;
            //     if (w * w % k == 0)
            //         res ++ ;
            // }
            //
            // 考虑 w*w%k == 0    <=> (w/2%k * w/2%k) % k == 0
            //                    ==> 思考【w/2必然是k的倍数?】不 => 因为 /2 的影响
            //                    ==> 又因为k不定 求逆元比较困难 考虑直接枚举可行的 w/2 记为wd2
            // 此时: 如果使用 i-2*x 去枚举左端点，复杂度仍然很高
            //
            // 考虑如何避免枚举:    重新定义 w = s[r]-s[l] 其也是长度的一半 同时 w*w%k == 0 (w%k==0)
            //                    则 所有可行的l 都能使得 (s[l]-s[r])%k == 0
            //                    => s[l]%k == s[r]%k
            //                    => 同余 则 f 的第二维按照模数维护即可
            for (auto x : wd2) {
                int t = (sum[i] - x + k) % k;
                if (xs.count(t))
                    res += xs[t];
            }
            
            xs[sum[i] % k] ++ ;
        }
        
        return res;
    }
};
```

换一种思路 数学思维

从 w/2 下手解决倍数问题，进而分组批量统计

```c++
class Solution {
public:
    // 前面已经推导知: 假定长度为 w, 有 (w/2)*(w/2)%k == 0
    //
    // 0x3f 的思路:  不是转换逆元, 而是把 /2 提取出来 => w*w % (4*k) == 0
    //  TRICK  => 数学思维: 假定 K=4*k, 而 K 由 p1^e1 * p2^e2 ... 组成
    //                 则: w = p1^((e1+1)/2) * ...  【幂次除二上取整即可】
    //
    // 接下来 w 必须是新的 k 的倍数
    //        (r - l) % k == 0 => r % k == l % k
    // 按照下标进行分组计数   且需要保证 diff 相同(使用状态压缩实现)
    //
    // 代码实现: 把 {下标分组, 状态表示} 合并成一维表示了
    
    using LL = long long;
    const static int N = 5e4 + 10;
    
    int p_sqrt(int x) { // x 不会超过 4000
        int res = 1;
        for (int i = 2; i * i <= x; ++ i ) {
            // 计算 x 包含多少个 i 的幂次
            int t = 0;
            while (x % i == 0)
                x /= i, t ++ ;
            
            for (int j = 0; j < (t + 1) / 2; ++ j )
                res *= i;
        }
        if (x > 1)
            res *= x;   // 细节
        return res;
    }

    //                              a + e + i + o + u
    constexpr static int AEIOU_MASK = (1 << 0) + (1 << 4) + (1 << 8) + (1 << 14) + (1 << 20);
    
    long long beautifulSubstrings(string s, int k) {
        int n = s.size();
        k = p_sqrt(k * 4);
        
        unordered_map<int, int> f;
        LL res = 0, sum = N;        // sum=N而非sum=0 是因为其值可能为负数 为了能用int表示而做的偏移
        f[0 << 17 | sum] ++ ;       // 插入 f[{0, N}] N是偏移量
        for (int i = 1; i <= n; ++ i ) {
            int bit = (AEIOU_MASK >> (s[i - 1] - 'a')) & 1;
            sum += bit ? 1 : -1;
            res += f[(i % k) << 17 | sum] ++ ;
        }
        return res;
    }
};
```

