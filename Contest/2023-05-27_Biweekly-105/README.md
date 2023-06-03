## [比赛链接](https://leetcode.cn/contest/biweekly-contest-105/)

>   virtual rank:
>
>   150 / 2604	18	1:15:33	0:01:58	0:11:38	0:18:02  1	0:55:33  3


### [2706. 购买两块巧克力](https://leetcode.cn/problems/buy-two-chocolates/)



```c++
class Solution {
public:
    int buyChoco(vector<int>& prices, int money) {
        sort(prices.begin(), prices.end());
        int s = prices[0] + prices[1];
        if (s <= money)
            return money - s;
        return money;
    }
};
```


### [2707. 字符串中的额外字符](https://leetcode.cn/problems/extra-characters-in-a-string/)



```c++
class Solution {
public:
    const static int N = 55, INF = 0x3f3f3f3f;
    
    int f[N];    // 前 i 个字符的最小数量
    
    int minExtraChar(string s, vector<string>& dictionary) {
        unordered_set<string> S;
        for (auto s : dictionary)
            S.insert(s);
        
        memset(f, 0, sizeof f);
        f[0] = 0;
        int n = s.size();
        for (int i = 1; i <= n; ++ i ) {
            for (int j = 1; j <= i; ++ j ) {
                // cout << " i = " << i << " j = " << j << " str = " << s.substr(i - j, j) << endl;
                string t = s.substr(i - j, j);
                if (S.count(t)) {
                    f[i] = max(f[i], f[i - j] + int(t.size()));
                }
            }
            for (int j = i + 1; j <= n; ++ j )
                f[j] = max(f[j], f[i]);
        }
            
        // for (int i = 0; i <= n; ++ i )
        //     cout << " i = " << i << ' ' << f[i] << endl;
        return n - f[n];
    }
};
```

### [2708. 一个小组的最大实力值](https://leetcode.cn/problems/maximum-strength-of-a-group/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long maxStrength(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> a, b;
        bool has_zero = false;
        for (auto x : nums)
            if (x < 0)
                a.push_back(x);
            else if (x > 0)
                b.push_back(x);
            else
                has_zero = true;
        
        if (a.size() & 1)
            a.pop_back();
        if (a.empty() && b.empty()) {
            if (has_zero)
                return 0;
            return nums[0];
        }
        
        LL s = 1;
        for (auto x : a)
            s *= x;
        for (auto x : b)
            s *= x; 
        
        return s;
    }
};
```

### [2709. 最大公约数遍历](https://leetcode.cn/problems/greatest-common-divisor-traversal/)

习惯的写法

```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int primes[N], cnt;
    bool st[N];
    void init() {
        memset(st, 0, sizeof st);
        cnt = 0;
        for (int i = 2; i < N; ++ i ) {
            if (!st[i])
                primes[cnt ++ ] = i;
            for (int j = 0; primes[j] <= (N - 1) / i; ++ j ) {
                st[primes[j] * i] = true;
                if (i % primes[j] == 0)
                    break;
            }
        }
    }
    
    int pa[N], sz[N];
    int find(int x) {
        if (pa[x] != x)
            pa[x] = find(pa[x]);
        return pa[x];
    }
    
    bool canTraverseAllPairs(vector<int>& nums) {
        {
            // [1] => true
            if (nums.size() == 1)
                return true;
            // 只有大于 1 个数的情况 才会 false
            for (auto x : nums)
                if (x == 1)
                    return false;
        }
        
        init();
        
        for (int i = 0; i < cnt; ++ i )
            pa[i] = i, sz[i] = 1;
        
        unordered_set<int> S;
        
        for (auto x : nums) {
            vector<int> xs;
            for (int i = 0; i < cnt && primes[i] <= x / primes[i]; ++ i ) {
                int p = primes[i];
                if (x % p == 0) {
                    xs.push_back(p), S.insert(p);
                    while (x % p == 0)
                        x /= p;
                }
            }
            if (x > 1)
                xs.push_back(x), S.insert(x);
            
            for (int i = 1; i < xs.size(); ++ i ) {
                int a = find(xs[i - 1]), b = find(xs[i]);
                if (a != b) {
                    pa[a] = b;
                    sz[b] += sz[a];
                }
            }
            sz[find(xs[0])] ++ ;
        }
        
        for (int i = 0; i < cnt; ++ i ) {
            int p = primes[i];
            if (sz[find(p)] - S.size() == nums.size()) {
                // cout << " p = " << p << " sz = " << sz[find(p)] << endl;
                return true;
            }
        }
        return false;
    }
};
```

标准写法

```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    vector<int> d[N];
    void init() {
        for (int i = 2; i < N; ++ i )
            for (int j = i; j < N; j += i)
                d[j].push_back(i);
    }
    
    int pa[N + N];
    int find(int x) {
        if (pa[x] != x)
            pa[x] = find(pa[x]);
        return pa[x];
    }
    
    bool canTraverseAllPairs(vector<int>& nums) {
        init();
        
        for (int i = 0; i < N + N; ++ i )   // 素数映射到偏移后的坐标
            pa[i] = i;
        
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            for (auto j : d[nums[i]]) {
                // ATTENTION 合并坐标与素数
                int a = find(i), b = find(N + j);
                if (a != b)
                    pa[a] = b;
            }
        
        // 最终 所有的元素都应当在一个集合里
        for (int i = 1; i < n; ++ i )
            if (find(i) != find(i - 1))
                return false;
        return true;
    }
};
```

需要避免重复初始化

```c++
const static int N = 1e5 + 10;

static bool inited;
vector<int> d[N];
void init() {
    for (int i = 2; i < N; ++ i)
        for (int j = i; j < N; j += i)
            d[j].push_back(i);
}

class Solution {
public:
    int pa[N + N];
    int find(int x) {
        if (pa[x] != x)
            pa[x] = find(pa[x]);
        return pa[x];
    }

    bool canTraverseAllPairs(vector<int>& nums) {
        if (!inited) {
            inited = true;
            init();
        }

        for (int i = 0; i < N + N; ++ i )
            pa[i] = i;
        
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            for (auto j : d[nums[i]]) {
                int a = find(i), b = find(N + j);
                if (a != b) // 注意方向
                    pa[a] = b;
            }
        
        for (int i = 1; i < n; ++ i )
            if (find(i) != find(i - 1)) // 用下标
                return false;
        return true;
    }
};
```

