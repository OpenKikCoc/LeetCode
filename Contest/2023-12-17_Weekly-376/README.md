## [比赛链接](https://leetcode.cn/contest/weekly-contest-376/)


### [2965. 找出缺失和重复的数字](https://leetcode.cn/problems/find-missing-and-repeated-values/)



```c++
class Solution {
public:
    const static int N = 2510;
    
    int c[N];
    
    vector<int> findMissingAndRepeatedValues(vector<vector<int>>& grid) {
        memset(c, 0 , sizeof c);
        int n = grid.size();
        for (auto & xs : grid)
            for (auto x : xs)
                c[x] ++ ;
        
        int a, b;
        for (int i = 1; i <= n * n; ++ i )
            if (c[i] == 0)
                b = i;
            else if (c[i] == 2)
                a = i;
        return {a, b};
    }
};
```


### [2966. 划分数组并满足最大差限制](https://leetcode.cn/problems/divide-array-into-arrays-with-max-difference/)  



```c++
class Solution {
public:
    vector<vector<int>> divideArray(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();
        for (int i = 0; i < n; i += 3 ) {
            int a = nums[i], b = nums[i + 1], c = nums[i + 2];
            if (c - a > k)
                return {};
            res.push_back({a, b, c});
        }
        return res;
    }
};
```

### [2967. 使数组成为等数数组的最小代价](https://leetcode.cn/problems/minimum-cost-to-make-array-equalindromic/)

回文数构造 结合中位数思想 综合应用

```c++
using LL = long long;
using PII = pair<int, int>;
const static int N = 1e6;

bool inited = false;

int rs[N], cnt;

bool check(LL x) {
    string s = to_string(x);
    for (int i = 0, j = s.size() - 1; i < j; ++ i , -- j )
        if (s[i] != s[j])
            return false;
    return true;
}
LL getFrontHalfPart(LL x) {
    string s = to_string(x);
    s = s.substr(0, s.size() / 2);
    return s.empty() ? 0 : stoll(s);
}
void init() {
    if (inited)
        return;
    inited = true;

    int l = 1, r = 1e9;
    cnt = 0;
    
    for (int op = 0; op < 2; ++ op ) {
        for (LL i = getFrontHalfPart(l); i <= r; ++ i ) {
            LL t = (op ? i : i / 10);
            LL conbined = i;
            while (t)
                conbined = conbined * 10 + t % 10, t /= 10;
            if (conbined > r)
                break;
            if (check(conbined))
                rs[cnt ++ ] = conbined;
        }
    }
    sort(rs, rs + cnt);     // ATTENTION 前面是偶数位数 后面是奇数位数 所以要排序
}


class Solution {
public:
    // 考虑两个问题
    // 1. 全部相等: 中位数代价最小
    // 2. 回文: 整体做偏移
    
    // WA 546 / 647: [101,104,107,126,130] -> mid 107, 范围不够找到的是101，实际上应该是111
    // WA 591 / 647: [1321,7284,9346,9460,7099,2796,5887,9351,2278,7590,7627,1552,5864,7409,9356,8480,2765,8036,8473,5573]
    //              ATTENTION 不仅要关注 n/2 的位置，还要【分奇偶】关注后面挨着的位置 + 【左右边界要足够宽泛=>不如提前生成】
    
    vector<int> ns;
    
    bool debug = false;
    
    
    PII get(int x) {
        for (int i = 0; i < cnt; ++ i )
            if (rs[i] >= x)
                return {rs[i - 1], rs[i]};
        return {rs[cnt - 2], rs[cnt - 1]};
    }
    
    LL calc(int t) {
        LL res = 0;
        for (auto x : ns)
            res += abs(t - x);
        return res;
    }
    LL find(int x) {
        auto [a, b] = get(x);
        return min(calc(a), calc(b));
    }
    
    long long minimumCost(vector<int>& nums) {
        init();
        
        sort(nums.begin(), nums.end());
        int n = nums.size();
        this->ns = nums;
        // 找到最近的回文数
        // 不仅要关注 [n/2]，还要关注后面的数
        if (n & 1)
            return find(nums[n / 2]);
        return min(find(nums[n / 2]), find(nums[min(n - 1, n / 2 + 1)]));   // ATTENTION min(n-1, ...)
    }
};
```

### [2968. 执行操作使频率分数最大](https://leetcode.cn/problems/apply-operations-to-maximize-frequency-score/)

暴力优化 显然需要使用排序后的一段连续区间 考虑枚举区间右端点

-   二分

```c++
class Solution {
public:
    // 数的数值范围很大 但数量只有1e5 => 考虑枚举每一个值 如果作为最终的众数 能构造多少个
    //    枚举 O(n) 随后往前往后延伸(动态边界)... 不太好接受
    //    考虑排序后枚举区间右端点(思考:为什么可以这样) 则可以二分众数个数(并快速判断)
    
    using LL = long long;
    const static int N = 1e5 + 10;
    
    vector<int> ns;
    int n;
    
    LL s[N], k;
    
    bool check(int l, int r) {
        int mid = (l + r) / 2;
        // 其他数字都要转化成 mid
        int t = ns[mid - 1];
        int lc = mid - l, rc = r - mid;
        LL tot = ((LL)lc * t - (s[mid - 1] - s[l - 1])) + ((s[r] - s[mid]) - (LL)rc * t);
        return tot <= k;
    }
    
    int maxFrequencyScore(vector<int>& nums, long long k) {
        this->ns = nums;
        this->n = ns.size();
        this->k = k;
        sort(ns.begin(), ns.end());
        {
            s[0] = 0;
            for (int i = 1; i <= n; ++ i )
                s[i] = s[i - 1] + ns[i - 1];
        }
        
        int res = 0;
        for (int i = 1; i <= n; ++ i ) {
            // 找到第一个无法满足的区间长度
            int l = 1, r = i + 1;
            while (l < r) {
                int m = l + (r - l) / 2;
                if (check(i - m + 1, i))
                    l = m + 1;
                else
                    r = m;
            }
            res = max(res, l - 1);
        }
        return res;
    }
};
```

-   双指针

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;

    int n;
    vector<int> ns;

    LL s[N], k;

    bool valid(int l, int r) {
        int mid = (l + r) / 2;
        int tar = ns[mid - 1];
        int lc = mid - l, rc = r - mid;
        return ((LL)lc * tar - (s[mid - 1] - s[l - 1])) + ((s[r] - s[mid]) - (LL)rc * tar) <= k;
    }

    int maxFrequencyScore(vector<int>& nums, long long k) {
        this->ns = nums;
        this->n = ns.size();
        this->k = k;
        sort(ns.begin(), ns.end());
        {
            s[0] = 0;
            for (int i = 1; i <= n; ++ i )
                s[i] = s[i - 1] + ns[i - 1];
        }

        int res = 0;
        for (int i = 1, j = 1; j <= n; ++ j ) {
            while (i <= j && !valid(i, j))
                i ++ ;
            res = max(res, j - i + 1);
        }
        return res;
    }
};
```

