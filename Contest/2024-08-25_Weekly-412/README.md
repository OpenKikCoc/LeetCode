## [比赛链接](https://leetcode.cn/contest/weekly-contest-412/)


### [3264. K 次乘运算后的最终数组 I](https://leetcode.cn/problems/final-array-state-after-k-multiplication-operations-i/)

取模在这个数据范围下实际上没有发挥作用 略

```c++
class Solution {
public:
    using PII = pair<int, int>;
    using LL = long long;
    const static int MOD = 1e9 + 7;
    
    vector<int> getFinalState(vector<int>& nums, int k, int multiplier) {
        int n = nums.size();
        priority_queue<PII, vector<PII>, greater<PII>> heap;
        for (int i = 0; i < n; ++ i )
            heap.push({nums[i], i});
        
        auto res = nums;
        while (k -- ) {
            auto [v, idx] = heap.top(); heap.pop();
            int nv = (LL)v * multiplier % MOD;
            res[idx] = nv;
            heap.push({nv, idx});
        }
        return res;
    }
};
```


### [3265. 统计近似相等数对 I](https://leetcode.cn/problems/count-almost-equal-pairs-i/)

见 4: 通过长度排序间接解决 3 无法生成 30 的问题 无需 O(n^2) 枚举

```c++
class Solution {
public:
    bool get(int a, int b) {
        if (a == b)
            return true;
        string s = to_string(a);
        int m = s.size();
        for (int i = 0; i < m; ++ i )
            for (int j = i + 1; j < m; ++ j ) {
                swap(s[i], s[j]);
                int t = stoi(s);
                if (t == b)
                    return true;
                swap(s[i], s[j]);
            }
        return false;
    }
    
    int countPairs(vector<int>& nums) {
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j ) {
                int a = nums[i], b = nums[j];
                if (get(a, b) || get(b, a))
                    res ++ ;
            }
        return res;
    }
};
```

### [3266. K 次乘运算后的最终数组 II](https://leetcode.cn/problems/final-array-state-after-k-multiplication-operations-ii/) [TAG]

有别于第 1 题，这里 K 的值可能达到 1e9

```c++
class Solution {
public:
    // After the k operations, apply modulo 109 + 7 to every value in nums.
    // => 在此之前 堆内元素都是 LL
    //
    // 【套路题】
    // 首先用最小堆手动模拟操作，直到原数组的最大值 mx 成为这 n 个数的最小值
    // 随后不需要手动模拟 假设此时还剩下k次操作 则
    //  - 对于前 k mod n 小的数字 还可以操作 k/n + 1 次
    //  - 其余元素 操作 k/n 次
    
    using LL = long long;
    using PLI = pair<LL, int>;
    const static int MOD = 1e9 + 7;
    
    LL qpow(LL a, LL b) {
        LL ret = 1;
        while (b) {
            if (b & 1)
                ret = ret * a % MOD;
            a = a * a % MOD;
            b >>= 1;    // ATTENTION
        }
        return ret;
    }
    
    vector<int> getFinalState(vector<int>& nums, int k, int multiplier) {
        if (multiplier == 1)
            return nums;
        
        int n = nums.size();
        
        // greater<>()
        priority_queue<PLI, vector<PLI>, greater<>> heap;
        for (int i = 0; i < n; ++ i )
            heap.push({nums[i], i});
        
        LL maxv = ranges::max(nums);    // ATTENTION trick
        // ATTENTION: k 消耗完 || 堆顶是 maxv
        for ( ; k && heap.top().first < maxv; -- k ) {
            auto [v, idx] = heap.top(); heap.pop(); // 不能 &
            heap.push({v * multiplier, idx});
        }
        
        // 剩余的直接用公式算
        vector<PLI> xs;
        while (heap.size())
            xs.push_back(heap.top()), heap.pop();
        sort(xs.begin(), xs.end());
        
        vector<int> res(n);
        for (int i = 0; i < n; ++ i ) {
            auto & [v, idx] = xs[i];
            res[idx] = v % MOD * qpow(multiplier, k / n + (i < k % n)) % MOD;
        }
        return res;
    }
};
```

### [3267. 统计近似相等数对 II](https://leetcode.cn/problems/count-almost-equal-pairs-ii/)

1.   为了解决无法针对 3 生成 30 的情况，枚举所有 N 个数位
     -   静态数组 digits 加速 (N 8->7 否则 TLE)
     -   vector 比 set 快

```c++
class Solution {
public:
    const static int N = 7; // 8超时
    
    int digits[N];
    
    void parse(int value) {
        for (int i = 0, x = value; i < N; ++ i , x /= 10)
            digits[i] = x % 10;
    }

    int get() {
        int ret = 0;
        for (int i = N - 1; i >= 0; -- i )
            ret = ret * 10 + digits[i];
        return ret;
    }
    
    int countPairs(vector<int>& nums) {
        int n = nums.size(), res = 0;
        unordered_map<int, int> hash;
        // 枚举被交换的数字
        for (int i = 0; i < n; ++ i ) {
            // unordered_set<int> S;
            // S.insert(nums[i]);  // 不产生修改
            
            vector<int> t;
            t.push_back(nums[i]);
            
            // 为了能够让 3 产生 30，枚举最大数位
            parse(nums[i]);
            
            // (7*4)^2 => 900
            for (int x = 0; x < N; ++ x )
                for (int y = x + 1; y < N; ++ y ) {
                    swap(digits[x], digits[y]);
                    // ATTENTION 也可以只交换一次 这里也要 insert
                    // S.insert(get());
                    t.push_back(get());
                    for (int a = 0; a < N; ++ a )
                        for (int b = a + 1; b < N; ++ b ) {
                            swap(digits[a], digits[b]);
                            // S.insert(get());
                            t.push_back(get());
                            swap(digits[a], digits[b]);
                        }
                    swap(digits[x], digits[y]);
                }
            
            // for (auto x : S)
            //     res += hash[x];
            
            sort(t.begin(), t.end());
            t.resize(unique(t.begin(), t.end()) - t.begin());
            
            for (auto x : t)
                res += hash[x];
            
            hash[nums[i]] ++ ;
        }
        return res;
    }
};
```

2.   【标准】通过长度排序间接解决 3 无法生成 30 的问题

     => 本质上只需要对数字本身排序即可，不需要特殊考虑长度 (大小本身意味着长度)

```c++
class Solution {
public:
    bool get(int a, int b) {
        if (a == b)
            return true;
        string s = to_string(a);
        int m = s.size();
        for (int i = 0; i < m; ++ i )
            for (int j = i + 1; j < m; ++ j ) {
                swap(s[i], s[j]);
                int t = stoi(s);
                if (t == b)
                    return true;
                swap(s[i], s[j]);
            }
        return false;
    }
    
    int countPairs(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        
        int n = nums.size(), res = 0;
        unordered_map<int, int> hash;
        for (int i = 0; i < n; ++ i ) {
            unordered_set<int> S;
            S.insert(nums[i]);
            
            string s = to_string(nums[i]);
            int m = s.size();
            for (int x = 0; x < m; ++ x )
                for (int y = x + 1; y < m; ++ y ) {
                    swap(s[x], s[y]);
                    S.insert(stoi(s));
                    for (int a = 0; a < m; ++ a )
                        for (int b = a + 1; b < m; ++ b ) {
                            swap(s[a], s[b]);
                            S.insert(stoi(s));
                            swap(s[a], s[b]);
                        }
                    swap(s[x], s[y]);
                }
            
            for (auto x : S)
                res += hash[x];
            
            hash[nums[i]] ++ ;
        }
        return res;
    }
};
```

