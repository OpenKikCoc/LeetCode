## [比赛链接](https://leetcode.cn/contest/biweekly-contest-55/)


### [1909. 删除一个元素使数组严格递增](https://leetcode.cn/problems/remove-one-element-to-make-the-array-strictly-increasing/)

暴力即可 也可LIS

```c++
class Solution {
public:
    bool canBeIncreasing(vector<int>& nums) {
        int n = nums.size();
        vector<int> f;
        for (auto v : nums)
            if (f.empty() || f.back() < v)
                f.push_back(v);
            else
                *lower_bound(f.begin(), f.end(), v) = v;
        return f.size() >= n - 1;
    }
};
```


### [1910. 删除一个字符串中所有出现的给定子字符串](https://leetcode.cn/problems/remove-all-occurrences-of-a-substring/)

STL `string.find` 和 `s.npos` 

```c++
class Solution {
public:
    string removeOccurrences(string s, string part) {
        int m = part.size();
        while (s.find(part) != s.npos) {
            int n = s.size();
            int x = s.find(part);
            string ns;
            for (int i = 0; i < n; ++ i )
                if (i < x || i >= x + m)
                    ns.push_back(s[i]);
            s = ns;
        }
        return s;
    }
};
```

更优雅的写法

```c++
class Solution {
public:
    string removeOccurrences(string s, string p) {
        while (true) {
            int k = s.find(p);
            if (k == -1) break;
            s = s.substr(0, k) + s.substr(k + p.size());
        }
        return s;
    }
};
```



### [1911. 最大子序列交替和](https://leetcode.cn/problems/maximum-alternating-subsequence-sum/)

线性dp即可 略

```c++
class Solution {
public:
    // 推理可知 选奇数个数字一定是最优的(都是正数)
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL f[N], g[N]; // 有奇数个 有偶数个
    
    long long maxAlternatingSum(vector<int>& nums) {
        memset(f, 0xcf, sizeof f);
        memset(g, 0, sizeof g);
        
        LL res = 0;
        int n = nums.size();
        for (int i = 1; i <= n; ++ i ) {
            int v = nums[i - 1];
            f[i] = max(f[i - 1], g[i - 1] + v);
            g[i] = max(f[i - 1] - v, g[i - 1]);
            
            res = max(res, f[i]);
        }
        return res;
    }
};
```

另一写法

```c++
class Solution {
public:
    long long maxAlternatingSum(vector<int>& nums) {
        typedef long long LL;
        int n = nums.size();
        const LL INF = 1e15;
        vector<vector<LL>> f(n + 1, vector<LL>(2, -INF));
        f[0][0] = 0;
        for (int i = 1; i <= n; i ++ ) {
            f[i][0] = max(f[i - 1][0], f[i - 1][1] - nums[i - 1]);
            f[i][1] = max(f[i - 1][1], f[i - 1][0] + nums[i - 1]);
        }
        return max(f[n][0], f[n][1]);
    }
};
```



### [1912. 设计电影租借系统](https://leetcode.cn/problems/design-movie-rental-system/)

模拟 略

注意使用引用

```c++
class MovieRentingSystem {
public:
    using PII = pair<int, int>;
    using TIII = tuple<int, int, int>;
    
    int n;
    vector<vector<int>> es;
    
    unordered_map<int, set<PII>> movies;
    map<PII, int> mprice;
    set<TIII> outs;
    
    MovieRentingSystem(int n, vector<vector<int>>& entries) {
        this->n = n;
        this->es = entries;
        for (auto & e : es) {
            int s = e[0], m = e[1], p = e[2];
            movies[m].insert({p, s});
            mprice[{s, m}] = p;
        }
    }
    
    vector<int> search(int movie) {
        auto s = movies[movie];
        auto it = s.begin();
        vector<int> res;
        for (int i = 0; i < 5 && i < s.size(); ++ i ) {
            res.push_back((*it).second);
            it ++ ;
        }
        return res;
    }
    
    void rent(int shop, int movie) {
        int price = mprice[{shop, movie}];
        auto & s = movies[movie];       // ATTENTION 这里注意加引用... WA1并排错很久
        s.erase({price, shop});
        outs.insert({price, shop, movie});
    }
    
    void drop(int shop, int movie) {
        int price = mprice[{shop, movie}];
        auto & s = movies[movie];
        s.insert({price, shop});
        outs.erase({price, shop, movie});
    }
    
    vector<vector<int>> report() {
        vector<vector<int>> res;
        auto it = outs.begin();
        for (int i = 0; i < 5 && i < outs.size(); ++ i ) {
            auto [p, s, m] = *it;
            res.push_back({s, m});
            it ++ ;
        }
        return res;
    }
};

/**
 * Your MovieRentingSystem object will be instantiated and called as such:
 * MovieRentingSystem* obj = new MovieRentingSystem(n, entries);
 * vector<int> param_1 = obj->search(movie);
 * obj->rent(shop,movie);
 * obj->drop(shop,movie);
 * vector<vector<int>> param_4 = obj->report();
 */
```
