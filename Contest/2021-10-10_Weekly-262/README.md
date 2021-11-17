## [比赛链接]()


### [2032. 至少在两个数组中出现的值](https://leetcode-cn.com/problems/two-out-of-three/)

扫描统计即可

```c++
class Solution {
public:
    const static int N = 110;
    
    unordered_map<int, int> hash;
    bool st[N];
    
    void work(vector<int> & nums) {
        memset(st, 0, sizeof st);
        for (auto v : nums)
            st[v] = true;
        for (int i = 0; i < N; ++ i )
            if (st[i])
                hash[i] ++ ;
    }
    
    vector<int> twoOutOfThree(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3) {
        work(nums1), work(nums2), work(nums3);
        vector<int> res;
        for (auto [k, v] : hash)
            if (v >= 2)
                res.push_back(k);
        return res;
    }
};
```


### [2033. 获取单值网格的最小操作数](https://leetcode-cn.com/problems/minimum-operations-to-make-a-uni-value-grid/)

自己较直观的解法

```c++
class Solution {
public:
    using LL = long long;
    
    int n, m;
    
    int minOperations(vector<vector<int>>& grid, int x) {
        this->n = grid.size(), this->m = grid[0].size();
        vector<int> nums;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                nums.push_back(grid[i][j]);
        sort(nums.begin(), nums.end());
        
        int len = nums.size(), v = nums[0];
        {
            nums[0] = 0;
            for (int i = 1; i < len; ++ i ) {
                nums[i] -= v;
                if (nums[i] % x)
                    return -1;
                nums[i] /= x;
            }
        }
        
        vector<int> l(len), r(len);
        for (int i = 1; i < len; ++ i )
            l[i] = l[i - 1] + nums[i - 1];
        for (int i = len - 2; i >= 0; -- i )
            r[i] = r[i + 1] + nums[i + 1];
        
        int res = 2e9;
        for (int i = 0; i < len; ++ i ) {
            int t = 0;
            if (i - 1 >= 0)
                t += i * nums[i] - l[i];
            if (i + 1 < len)
                t += r[i] - (len - i - 1) * nums[i];
            res = min(res, t);
        }
        return res;
    }
};
```

实际上 这就是一个打水问题 要求【**所有点到某点的距离和最小 该点即为中点**】

**需要增强对该结论的敏感程度**

```c++
class Solution {
public:
    using LL = long long;
    
    int n, m;
    
    int minOperations(vector<vector<int>>& grid, int x) {
        this->n = grid.size(), this->m = grid[0].size();
        vector<int> nums;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                nums.push_back(grid[i][j]);
        
        // 使用 nth_element 无需排序
        // sort(nums.begin(), nums.end());
        
        int len = nums.size(), v = nums[0];
        {
            nums[0] = 0;
            for (int i = 1; i < len; ++ i ) {
                nums[i] -= v;
                if (nums[i] % x)
                    return -1;
                nums[i] /= x;
            }
        }

        // ATTENTION 显然此类问题可以直接找中点
        //   加强思维上的敏感度
        int mid = n * m / 2;
        nth_element(nums.begin(), nums.begin() + mid, nums.end());

        int res = 0;
        for (auto v : nums)
            res += abs(v - nums[mid]);
        return res;
    }
};
```

### [2034. 股票价格波动](https://leetcode-cn.com/problems/stock-price-fluctuation/)

自己两个 map 的直观解法

```c++
class StockPrice {
public:
    map<int, int> hash; // price->count
    map<int, int> data; // ts->price
    
    
    StockPrice() {
        hash.clear();
        data.clear();
    }
    
    void update(int ts, int p) {
        if (data.count(ts)) {
            int ori_p = data[ts];
            hash[ori_p] -- ;
            if (hash[ori_p] == 0)
                hash.erase(ori_p);
        }
        hash[p] ++ ;
        data[ts] = p;
    }
    
    int current() {
        auto it = -- data.end();
        auto [k, v] = *it;
        return v;
    }
    
    int maximum() {
        auto it = -- hash.end();
        auto [k, v] = *it;
        return k;
    }
    
    int minimum() {
        auto it = hash.begin();
        auto [k, v] = *it;
        return k;
    }
};

/**
 * Your StockPrice object will be instantiated and called as such:
 * StockPrice* obj = new StockPrice();
 * obj->update(timestamp,price);
 * int param_2 = obj->current();
 * int param_3 = obj->maximum();
 * int param_4 = obj->minimum();
 */
```

容易看到 对于 `hash` 来说每次只是用到它的 key 也即价格

我们当然可以用一个 multiset 代替 map 来实现统计效果

使用一个 map 和 一个 multiset 的解法：

```c++
class StockPrice {
    multiset<int> prices;
    map<int, int> history;
    
public:
    StockPrice() {}
    
    void update(int timestamp, int price) {
        if (history.count(timestamp))
            prices.erase(prices.find(history[timestamp]));
        history[timestamp] = price;
        prices.insert(price);
    }
    
    int current() {
        return history.rbegin()->second;
    }
    
    int maximum() {
        return *prices.rbegin();
    }
    
    int minimum() {
        return *prices.begin();
    }
};
```

### [2035. 将数组分成两个数组并最小化数组和的差](https://leetcode-cn.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/) [TAG]

题目不难 容易想到二进制状压枚举

对于本题数据范围来说 枚举全部长度的时间复杂度为 2^30

理应想到 **折半枚举（形如折半双向搜索）** 的做法

-   增强对 **meet in the middle** 的敏感度
-   学习优雅的 STL 用法

```c++
class Solution {
public:
    const static int N = 16;
    vector<vector<int>> s1, s2;
    
    void work(vector<int> & t, vector<vector<int>> & r) {
        int n = t.size();
        for (int i = 0; i < 1 << n; ++ i ) {
            int c = 0, s = 0;
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1)
                    c ++ , s += t[j];
                // else
                else
                    s -= t[j];
            r[c].push_back(s);
        }
        for (int i = 0; i < N; ++ i )
            sort(r[i].begin(), r[i].end());
    }
    
    // 折半拆分的思想!
    int minimumDifference(vector<int>& nums) {
        s1.resize(N), s2.resize(N);
        int n = nums.size() / 2;
        {
            vector<int> t;
            for (int i = 0; i < n; ++ i )
                t.push_back(nums[i]);
            work(t, s1);
        }
        {
            vector<int> t;
            for (int i = n; i < n << 1; ++ i )
                t.push_back(nums[i]);
            work(t, s2);
        }
        
        int res = 2e9;
        for (int i = 0; i < n; ++ i ) {
            // ls rs 分别 i n-i 个元素的所有集合
            auto ls = s1[i];
            auto rs = s2[n - i];
            for (auto v : ls) {
                auto it = lower_bound(rs.begin(), rs.end(), -v);
                // ATTENTION 学习这种STL用法
                if (it != rs.end())
                    res = min(res, abs(v + *it));
                if (it != rs.begin())
                    res = min(res, abs(v + *prev(it)));
            }
        }
        
        
        return res;
    }
};
```
