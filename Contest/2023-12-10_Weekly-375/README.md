## [比赛链接](https://leetcode.cn/contest/weekly-contest-375/)

>   virtual rank:
>
>    236 / 3518 0:40:30 0:04:58 0:09:05 0:18:30 0:40:30


### [2960. 统计已测试设备](https://leetcode.cn/problems/count-tested-devices-after-test-operations/)



```c++
class Solution {
public:
    int countTestedDevices(vector<int>& batteryPercentages) {
        int sub = 0, n = batteryPercentages.size();
        int res = 0;
        for (auto x : batteryPercentages) {
            int y = max(0, x - sub);
            if (y)
                sub ++ , res ++ ;
        }
        return res;
    }
};
```


### [2961. 双模幂运算](https://leetcode.cn/problems/double-modular-exponentiation/)



```c++
class Solution {
public:
    using LL = long long;
    
    LL qpow(LL a, LL b, LL mod) {
        LL ret = 1 % mod;
        while (b) {
            if (b & 1)
                ret = ret * a % mod;
            a = a * a % mod;
            b >>= 1;
        }
        return ret;
    }
    
    vector<int> getGoodIndices(vector<vector<int>>& variables, int target) {
        vector<int> res;
        for (int i = 0; i < variables.size(); ++ i ) {
            auto & vs = variables[i];
            int a = vs[0], b = vs[1], c = vs[2], m = vs[3];
            if (qpow(qpow(a, b, 10) , c, m) == target)
                res.push_back(i);
        }
        return res;
    }
};
```

### [2962. 统计最大元素出现至少 K 次的子数组](https://leetcode.cn/problems/count-subarrays-where-max-element-appears-at-least-k-times/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long countSubarrays(vector<int>& nums, int k) {
        int maxv = 0, n = nums.size();
        for (auto x : nums)
            maxv = max(maxv, x);
        
        // 反过来统计 小于k次的子数组
        LL res = (LL)n * (n + 1) / 2;
        for (int i = 0, j = 0, s = 0; j < n; ++ j ) {
            s += (nums[j] == maxv);
            while (s >= k && i <= j)
                s -= (nums[i ++ ] == maxv);
            int w = j - i + 1;
            res -= w;
        }
        return res;
    }
};
```

### [2963. 统计好分割方案的数目](https://leetcode.cn/problems/count-the-number-of-good-partitions/)

区间合并 + 组合数 (后者也可转化成 $2^{m-1}$ 思考)

```c++
using LL = long long;
const static int N = 1e5 + 10, MOD = 1e9 + 7;

int qmi(int a, int k, int p) {
    int ret = 1;
    while (k) {
        if (k & 1)
            ret = (LL)ret * a % p;
        a = (LL)a * a % p;
        k >>= 1;
    }
    return ret;
}

int fact[N], infact[N];
bool inited = false;

void init() {
    if (inited)
        return;
    inited = true;
    
    fact[0] = infact[0] = 1;
    for (int i = 1; i < N; ++ i ) {
        fact[i] = (LL)fact[i - 1] * i % MOD;
        infact[i] = (LL)infact[i - 1] * qmi(i, MOD - 2, MOD) % MOD;
    }
}

int comb(int a, int b) {
    return (LL)fact[a] * infact[b] % MOD * infact[a - b] % MOD;
}

class Solution {
public:
    using PII = pair<int, int>;
    
    void merge(vector<PII> & segs) {
        vector<PII> res;
        sort(segs.begin(), segs.end());
        int st = -2e9, ed = -2e9;
        for (auto seg : segs)
            if (ed < seg.first) {
                if (st != -2e9)
                    res.push_back({st, ed});
                st = seg.first, ed = seg.second;
            } else
                ed = max(ed, seg.second);
        if (st != -2e9)
            res.push_back({st, ed});
        segs = res;
    }
    
    int numberOfGoodPartitions(vector<int>& nums) {
        init();
        
        int n = nums.size();
        
        unordered_set<int> S;
        unordered_map<int, int> l, r;
        {
            // 先找到 最左侧/最右侧 出现的位置
            for (int i = 0; i < n; ++ i ) {
                int x = nums[i];
                if (S.count(x)) {
                    l[x] = min(l[x], i), r[x] = max(r[x], i);
                } else {
                    l[x] = r[x] = i;
                    S.insert(x);
                }
            }
        }
        vector<PII> xs;
        {
            // 根据出现过的元素划分基本区间
            for (auto [k, v] : l)
                xs.push_back({v, r[k]});
            // 区间合并
            merge(xs);
        }
        
        // 留下的都是可以任意合并的区间
        // 最坏情况下 m=1e5
        int m = xs.size(), res = 0;
        for (int i = 0; i < m; ++ i )
            // C{m-1}{i}
            res = (res + comb(m - 1, i)) % MOD;
        return res;
    }
};
```
