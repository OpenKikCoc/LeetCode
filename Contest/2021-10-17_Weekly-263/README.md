## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-263/)


### [2042. 检查句子中的数字是否递增](https://leetcode-cn.com/problems/check-if-numbers-are-ascending-in-a-sentence/)

略

```c++
class Solution {
public:
    bool areNumbersAscending(string s) {
        int n = s.size();
        for (int i = 0, last = -1; i < n; ++ i ) {
            if (!isdigit(s[i]))
                continue;
            int j = i, x = 0;
            while (j < n && isdigit(s[j]))
                x = x * 10 + s[j] - '0', j ++ ;
            if (x <= last)
                return false;
            last = x;
            i = j - 1;
        }
        return true;
    }
};
```


### [2043. 简易银行系统](https://leetcode-cn.com/problems/simple-bank-system/)

模拟即可 略

```c++
class Bank {
public:
    using LL = long long;
    
    int n;
    vector<LL> nums;
    
    Bank(vector<long long>& balance) {
        this->nums = balance;
        this->n = nums.size();
    }
    
    bool check(int a) {
        return a >= 0 && a < n;
    }
    
    bool transfer(int a1, int a2, long long money) {
        a1 -- , a2 -- ;
        if (!check(a1) || !check(a2))
            return false;
        if (nums[a1] < money)
            return false;
        nums[a1] -= money, nums[a2] += money;
        return true;
    }
    
    bool deposit(int a, long long money) {
        a -- ;
        if (!check(a))
            return false;
        nums[a] += money;
        return true;
    }
    
    bool withdraw(int a, long long money) {
        a -- ;
        if (!check(a))
            return false;
        if (nums[a] < money)
            return false;
        nums[a] -= money;
        return true;
    }
};

/**
 * Your Bank object will be instantiated and called as such:
 * Bank* obj = new Bank(balance);
 * bool param_1 = obj->transfer(account1,account2,money);
 * bool param_2 = obj->deposit(account,money);
 * bool param_3 = obj->withdraw(account,money);
 */
```

### [2044. 统计按位或能得到最大值的子集数目](https://leetcode-cn.com/problems/count-number-of-maximum-bitwise-or-subsets/)

复杂度显然可以直接枚举所有子集

```c++
class Solution {
public:
    // 2^16 = 64000
    int countMaxOrSubsets(vector<int>& nums) {
        int n = nums.size();
        map<int, int> hash;
        for (int i = 0; i < 1 << n; ++ i ) {
            int x = 0;
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1)
                    x |= nums[j];
            hash[x] ++ ;
        }
        auto [k, v] = *( -- hash.end());
        return v;
    }
};
```

### [2045. 到达目的地的第二短时间](https://leetcode-cn.com/problems/second-minimum-time-to-reach-destination/) [TAG]

经典求次短路

-   `2 <= n <= 10^4`
-   `n - 1 <= edges.length <= min(2 * 104, n * (n - 1) / 2)`

```c++
class Solution {
public:
    // using LL = long long;
    using PII = pair<int, int>;
    using PIII = tuple<int, int, int>;
    const static int N = 1e4 + 10, M = 4e4 + 10; // M = 2e4 * 2
    
    int fix_time(int x, int l) {
        int d = x / ch;
        // red
        if (d & 1)
            return (d + 1) * ch + l;
        return x + l;
    }
    
    int n, ch;
    int h[N], e[M], w[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int dist[N], t_dist[N];
    // bool st[N];
    int dijkstra() {
        memset(dist, 0x3f, sizeof dist);
        memset(t_dist, 0x3f, sizeof t_dist);
        // memset(st, 0, sizeof st);
        priority_queue<PII, vector<PII>, greater<PII>> heap;
        heap.push({0, 1});  // ATTENTION from 1 to n
        dist[1] = 0;    // from 1 to n
        
        while (heap.size()) {
            auto [dis, ver] = heap.top();
            heap.pop();
            // if (st[ver])
            //     continue;
            // st[ver] = true;
            
            // 剪枝
            // ATTENTION 必须是 <   因为等于也可能会更新
            //
            // 在这里只需要求次短 所以我们直接使用 t_dist[ver]
            // 如果所求为倒数第k短 我们可以使用dist[][]
            // 随后记录当前是第x短 通过dist[ver][x]<dis来进行剪枝判断
            if (t_dist[ver] < dis)
                continue;
            
            for (int i = h[ver]; ~i; i = ne[i]) {
                int j = e[i];
                int new_dis = fix_time(dis, w[i]);
                if (dist[j] > new_dis) {
                    t_dist[j] = dist[j];
                    dist[j] = new_dis;
                    heap.push({dist[j], j});
                    heap.push({t_dist[j], j});
                } else if (dist[j] != new_dis && t_dist[j] > new_dis) {
                    // dist[j] != new_dis 严格小于
                    t_dist[j] = new_dis;
                    heap.push({t_dist[j], j});
                }
            }
        }
        return t_dist[n];
    }
    
    int secondMinimum(int n, vector<vector<int>>& edges, int time, int change) {
        this->n = n, this->ch = change;
        init();
        
        for (auto & e : edges)
            add(e[0], e[1], time), add(e[1], e[0], time);
        
        return dijkstra();;
    }
};
```

另有 TLE 的 K 短路启发式搜索：

```c++
// TLE 52 / 76
class Solution {
public:
    // using LL = long long;
    using PII = pair<int, int>;
    using PIII = tuple<int, int, int>;
    const static int N = 1e4 + 10, M = 4e4 + 10; // M = 2e4 * 2
    
    int fix_time(int x, int l) {
        int d = x / ch;
        // red
        if (d & 1)
            return (d + 1) * ch + l;
        return x + l;
    }
    
    int n, ch;
    int h[N], e[M], w[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int dist[N];
    bool st[N];
    void dijkstra() {
        priority_queue<PII, vector<PII>, greater<PII>> heap;
        heap.push({0, 1});  // ATTENTION from 1 to n
        memset(dist, 0x3f, sizeof dist);
        memset(st, 0, sizeof st);
        dist[1] = 0;    // from 1 to n
        
        while (heap.size()) {
            auto [dis, ver] = heap.top();
            heap.pop();
            if (st[ver])
                continue;
            st[ver] = true;
            
            for (int i = h[ver]; ~i; i = ne[i]) {
                int j = e[i];
                int new_dis = fix_time(dis, w[i]);
                if (dist[j] > new_dis) {
                    dist[j] = new_dis;
                    heap.push({dist[j], j});
                }
            }
        }
    }
    
    int cnt[N];
    int astar(int k) {
        // 估价-真实值-点
        priority_queue<PIII, vector<PIII>, greater<PIII>> heap;
        heap.push({dist[1], 0, 1});
        memset(cnt, 0, sizeof cnt);
        
        while (heap.size()) {
            auto [_, dis, ver] = heap.top();
            heap.pop();
            
            cnt[ver] ++ ;
            // ATTENTION: 重要 dis 还必须是大于最短值 否则会wa 23/76
            // 因为题目要求 【严格大于】
            // dis > dist[n]
            if (cnt[n] >= k && dis > dist[n])
                return dis;
            
            for (int i = h[ver]; ~i; i = ne[i]) {
                int j = e[i];
                int new_dis = fix_time(dis, w[i]);
                if (cnt[j] < k) // ATTENTION TLE 35/76
                    heap.push({new_dis + dist[j], new_dis, j}); // ATTENTION
            }
        }
        return -1;
    }
    
    int secondMinimum(int n, vector<vector<int>>& edges, int time, int change) {
        this->n = n, this->ch = change;
        init();
        
        for (auto & e : edges)
            add(e[0], e[1], time), add(e[1], e[0], time);
        
        dijkstra();
        
        // 次短路
        return astar(2);
    }
};
```

