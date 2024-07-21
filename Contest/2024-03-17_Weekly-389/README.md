## [比赛链接](https://leetcode.cn/contest/weekly-contest-389/)


### [3083. 字符串及其反转中是否存在同一子字符串](https://leetcode.cn/problems/existence-of-a-substring-in-a-string-and-its-reverse/)



```c++
class Solution {
public:
    // 26 * 26 = 676
    const static int N = 700;
    
    int c1[N], c2[N];
    
    bool isSubstringPresent(string s) {
        memset(c1, 0, sizeof c1);
        memset(c2, 0, sizeof c2);
        
        int n = s.size();
        for (int i = 0; i < n; ++ i ) {
            if (i > 0) {
                int j = i - 1;
                int a = s[i] - 'a', b = s[j] - 'a';
                c1[a * 26 + b] ++ ;
            }
            if (i < n - 1) {
                int j = i + 1;
                int a = s[i] - 'a', b = s[j] - 'a';
                c2[b * 26 + a] ++ ;
            }
        }
        
        for (int i = 0; i < 26; ++ i )
            for (int j = 0; j < 26; ++ j ) {
                if (c1[i * 26 + j] && c2[j * 26 + i])
                    return true;
            }
        return false;
    }
};
```


### [3084. 统计以给定字符开头和结尾的子字符串总数](https://leetcode.cn/problems/count-substrings-starting-and-ending-with-given-character/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long countSubstrings(string s, char c) {
        LL cnt = 0;
        for (auto x : s)
            if (x == c)
                cnt ++ ;
        return cnt + cnt * (cnt - 1) / 2;
    }
};
```

### [3085. 成为 K 特殊字符串需要删除的最少字符数](https://leetcode.cn/problems/minimum-deletions-to-make-string-k-special/)

一个非常显然的思路是直接枚举最终收敛的数值区间

```c++
class Solution {
public:
    int minimumDeletions(string word, int k) {
        int n = word.size();
        vector<int> xs;
        {
            int c[26];
            memset(c, 0, sizeof c);
            for (auto x : word)
                c[x - 'a'] ++ ;
            
            for (int i = 0; i < 26; ++ i )
                if (c[i])
                    xs.push_back(c[i]);
            sort(xs.begin(), xs.end());
        }
        
        int m = xs.size();
        
        int res = n;
        for (int i = 1; i <= 1e5 + 1; ++ i ) {
            int r = i, l = max(0, r - k);
            
            int t = 0;
            for (auto x : xs)
                if (x < l)
                    t += x;
                else if (x > r)
                    t += x - r;
            res = min(res, t);
        }
        return res;
    }
};
```

重要的在于贪心推理：下界  (而非上界) 必然出现在所有 cnt 中

思考推理 (因为如果下界处在中间位置，对于更大的区间来说向下收缩是没有意义的)

进而，在数据范围更大时可以双指针进一步优化 (略)

```c++
class Solution {
public:
    int minimumDeletions(string word, int k) {
        int n = word.size();
        vector<int> xs;
        {
            int c[26];
            memset(c, 0, sizeof c);
            for (auto x : word)
                c[x - 'a'] ++ ;
            
            for (int i = 0; i < 26; ++ i )
                if (c[i])
                    xs.push_back(c[i]);
            sort(xs.begin(), xs.end());
        }
        
        int m = xs.size();
        
        int res = n;
        for (auto x : xs) {
            int l = x, r = x + k;
            int t = 0;
            for (auto v : xs)
                if (v < l)
                    t += v;
                else if (v > r)
                    t += v - r;
            res = min(res, t);
        }

        return res;
    }
};
```

### [3086. 拾起 K 个 1 需要的最少行动次数](https://leetcode.cn/problems/minimum-moves-to-pick-k-ones/)

思路完全正确 需要增强对复杂度的敏感度 理清楚写就好了

```c++
class Solution {
public:
    // 题目数据范围提示指明必然有解
    //
    // 考虑在某个具体的下标:
    // 1. 无成本获取当前下标的 1
    // 2. 1成本获取隔壁的 1
    // 3. 2成本在旁边造1并交换取得
    // 4. 剩下只能从左右两侧慢慢挪过来 成本与距离有关
    //   => 如何处理第四种情况?
    //      能够想到 二分左右两侧距离 在特定距离内找到满足特定数量的1 => 【理清楚 复杂度是可以接受的】
    
    using LL = long long;
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    int n;
    int cnt[N];
    LL sum[N];
    
    // ATTENTION 注意边界计算细节
    PII get_l(int i, int mid) {
        // [l, r]
        // l: (i - mid) - 1
        return {max(0, i - mid - 1), max(0, i - 2)};
    }
    PII get_r(int i, int mid) {
        // [l, r]
        // l: (i + 2) - 1
        return {min(n, i + 2 - 1), min(n, i + mid)};
    }
    
    int calc(int i, int mid) {
        auto [l1, r1] = get_l(i, mid);
        auto [l2, r2] = get_r(i, mid);

        int c1 = cnt[r1] - cnt[l1];
        int c2 = cnt[r2] - cnt[l2];
        
        return c1 + c2;
    }
    
    long long minimumMoves(vector<int>& nums, int k, int maxChanges) {
        this->n = nums.size();
        
        // 预处理
        {
            memset(cnt, 0, sizeof cnt);
            memset(sum, 0, sizeof sum);
            for (int i = 1; i <= n; ++ i ) {
                cnt[i] = cnt[i - 1] + nums[i - 1];
                sum[i] = sum[i - 1] + 1ll * i * nums[i - 1];    // ATTENTION
            }
        }
        
        LL res = 1e16;
        for (int i = 1; i <= n; ++ i ) {    // 枚举每一个位置
            LL t = 0;
            int need = k - nums[i - 1];     // 0 成本消耗当前位置
            
            for (auto x : {i - 1, i + 1})   // 1 成本消耗左右位置
                if (need > 0 && x >= 1 && x <= n && nums[x - 1] == 1) {
                    need -- ;
                    t ++ ;
                }
            
            // 2 成本在旁边位置制造1并消耗
            {
                int cost = min(need, maxChanges);
                need -= cost, t += cost * 2;
            }
            
            if (need > 0) {                 // 仍然不够 则需要从左右两侧找1挨个挪过来 消耗与距离有关
                int l = 2, r = max(i - 1, n - i);   // 左右扩展的距离, 其中 mid 的距离【可以】取到
                
                while (l < r) {
                    int mid = l + (r - l) / 2;
                    
                    if (calc(i, mid) < need)
                        l = mid + 1;
                    else
                        r = mid;
                }
                
                if (!calc(i, l))
                    continue;
                
                auto [l1, r1] = get_l(i, l);
                auto [l2, r2] = get_r(i, l);
                
                int c1 = cnt[r1] - cnt[l1];
                int c2 = cnt[r2] - cnt[l2];
                
                LL t1 = 1ll * c1 * i - (sum[r1] - sum[l1]); // 左侧全部拿下的开销 依赖前缀和预处理 =>  ATTENTION 预处理【可行】的敏感度 想到了但没实施
                LL t2 = (sum[r2] - sum[l2]) - 1ll * c2 * i;
                
                t += t1 + t2;
                
                // TODO: revisit
                // 有没有可能 这时候 c1+c2 > need ? 多了一个
                if (c1 + c2 > need) {   // ATTENTION 理论上此时 c1+c2 = need + 1 (思考)
                    // cout << " i = " << i << " l = " << l << " c1 = " << c1 << " c2 = " << c2 << " need = " << need << " t = " << t << endl;
                    t -= l;
                    // 虽然不写能过 但是是有逻辑问题的 这里必须要追加判断
                }
            }
            
            res = min(res, t);
        }
        return res;
    }
};
```
