## [比赛链接](https://leetcode.cn/contest/weekly-contest-316/)

>   287 / 6348


### [6214. 判断两个事件是否存在冲突](https://leetcode.cn/problems/determine-if-two-events-have-conflict/)



```c++
class Solution {
public:
    using PII = pair<int, int>;
    #define x first
    #define y second
    
    PII get(vector<string> & e) {
        int l, r, h, m;
        {
            sscanf(e[0].c_str(), "%d:%d", &h, &m);
            l = h * 60 + m;
        }
        {
            sscanf(e[1].c_str(), "%d:%d", &h, &m);
            r = h * 60 + m;
        }
        return {l, r};
    }
    
    bool haveConflict(vector<string>& event1, vector<string>& event2) {
        auto a = get(event1);
        auto b = get(event2);
        if (max(a.x, b.x) <= min(a.y, b.y))
            return true;
        return false;
    }
};
```


### [6224. 最大公因数等于 K 的子数组数目](https://leetcode.cn/problems/number-of-subarrays-with-gcd-equal-to-k/)



```c++
class Solution {
public:
    int subarrayGCD(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            int x = nums[i];
            if (x % k)
                continue;
            int j = i, g = x, c = 0;
            while (j >= 0 && nums[j] % k == 0) {
                g = __gcd(g, nums[j]), j -- ;
                if (g == k)
                    c ++ ;
            }
            res += c;
        }
        return res;
    }
};
```

### [6216. 使数组相等的最小开销](https://leetcode.cn/problems/minimum-cost-to-make-array-equal/)



```c++
class Solution {
public:
    // 值域为 1e6, 最终答案一定在出现过的值中
    using PII = pair<int, int>;
    using LL = long long; 
    
    long long minCost(vector<int>& nums, vector<int>& cost) {
        int n = nums.size();
        vector<PII> xs;
        for (int i = 0; i < n; ++ i )
            xs.push_back({nums[i], cost[i]});
        xs.push_back({0, 0});
        sort(xs.begin(), xs.end());
        
        LL res = 1e18;
        
        LL sum = 0, right = 0;
        // 每个都和 0 一样
        {
            int p = xs[0].first;   // p = 0;
            for (int i = 1; i <= n; ++ i ) {
                sum += (LL)(xs[i].first - p) * xs[i].second;
                right += xs[i].second;
            }
            res = min(res, sum);
        }
        // 每个都和 xs[i].first 一样
        LL left = 0 + xs[0].second; // 0
        for (int i = 1; i <= n; ++ i ) {
            LL d = xs[i].first - xs[i - 1].first;
            sum += d * (left - right);
            right -= xs[i].second;
            left += xs[i].second;
            
            res = min(res, sum);
        }
        return res;
    }
};
```

把开销看作数字出现的次数，则把所有数变成中位数是最优的

```c++
class Solution {
public:
    using PII = pair<int, int>;
    using LL = long long; 
    
    long long minCost(vector<int>& nums, vector<int>& cost) {
        int n = nums.size();
        vector<PII> xs;
        for (int i = 0; i < n; ++ i )
            xs.push_back({nums[i], cost[i]});
        // xs.push_back({0, 0}); 本做法显然不需要填充 {0, 0}
        sort(xs.begin(), xs.end());
        
        LL tot = 0; // 把消耗当作次数，先求总个数
        for (int i = 0; i < n; ++ i )
            tot += cost[i];
        
        LL sum = 0;
        for (int i = 0; i < n; ++ i ) {
            sum += xs[i].second;
            if (sum > tot / 2) {
                // 把所有数变成当前值
                LL res = 0, p = xs[i].first;
                for (int j = 0; j < n; ++ j )
                    res += (LL)abs(xs[j].first - p) * xs[j].second;
                return res;
            }
        }
        return -1;
    }
};
```



### [6217. 使数组相似的最少操作次数](https://leetcode.cn/problems/minimum-number-of-operations-to-make-arrays-similar/)

显然可以按奇偶分组 组内贪心

需要注意的是：把两组加起来再除 2，因为可能会出现某次操作的一对数字奇偶性不同

```c++
class Solution {
public:
    // ATTENTION 一定可以变相似
    using LL = long long;
    using PVI = pair<vector<int>, vector<int>>;
    
    PVI get(vector<int> & nums) {
        vector<int> a, b;
        for (auto x : nums)
            if (x & 1)
                a.push_back(x);
            else
                b.push_back(x);
        sort(a.begin(), a.end());
        sort(b.begin(), b.end());
        return {a, b};
    }
    
    LL calc(vector<int> & a, vector<int> & b) {
        int n = a.size();
        LL res = 0;
        for (int i = 0; i < n; ++ i )
            res += abs(a[i] - b[i]) / 2;
        return res;
    }
    
    long long makeSimilar(vector<int>& nums, vector<int>& target) {
        auto [a1, b1] = get(nums);
        auto [a2, b2] = get(target);
        return (calc(a1, a2) + calc(b1, b2)) / 2;
    }
};
```
