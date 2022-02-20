## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-65/)

>   virtual rank: 147 / 2676


### [2068. 检查两个字符串是否几乎相等](https://leetcode-cn.com/problems/check-whether-two-strings-are-almost-equivalent/)

略

```c++
class Solution {
public:
    bool checkAlmostEquivalent(string word1, string word2) {
        unordered_map<char, int> hash;
        for (auto c : word1)
            hash[c] ++ ;
        for (auto c : word2)
            hash[c] -- ;
        for (auto [k, v] : hash)
            if (abs(v) > 3)
                return false;
        return true;
    }
};
```


### [2069. 模拟行走机器人 II](https://leetcode-cn.com/problems/walking-robot-simulation-ii/)

注意坑：同样在 [0, 0] 起始状态为 "East" ，其他时候走到这里是 "South"

```c++
class Robot {
public:
    int w, h, now, mod, changed;
    
    Robot(int width, int height) {
        this->w = width, this->h = height;
        now = 0, mod = (w + h - 2) * 2, changed = 0;
    }
    
    void step(int num) {
        num %= mod;
        now = (now + num) % mod;
        changed = 1;
    }
    
    vector<int> getPos() {
        int t = now;
        if (t >= 0 && t <= w - 1)
            return {t, 0};
        t -= (w - 1);
        if (t >= 0 && t <= h - 1)
            return {w - 1, t};
        t -= (h - 1);
        if (t >= 0 && t <= w - 1)
            return {w - 1 - t, h - 1};
        t -= (w - 1);
        return {0, h - 1 - t};
    }
    
    string getDir() {
        if (now == 0) {
            if (changed)
                return "South";
            else
                return "East";
        }
        int t = now;
        if (t > 0 && t <= w - 1)
            return "East";
        t -= (w - 1);
        if (t > 0 && t <= h - 1)
            return "North";
        t -= (h - 1);
        if (t > 0 && t <= w - 1)
            return "West";
        return "South";
    }
};

/**
 * Your Robot object will be instantiated and called as such:
 * Robot* obj = new Robot(width, height);
 * obj->step(num);
 * vector<int> param_2 = obj->getPos();
 * string param_3 = obj->getDir();
 */
```

### [2070. 每一个查询的最大美丽值](https://leetcode-cn.com/problems/most-beautiful-item-for-each-query/)

简单离线

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    vector<int> maximumBeauty(vector<vector<int>>& items, vector<int>& queries) {
        sort(items.begin(), items.end(), [](const vector<int> & a, const vector<int> & b) {
            return a[0] < b[0];
        });
        int n = queries.size(), m = items.size();
        vector<PII> ve;
        for (int i = 0; i < n; ++ i )
            ve.push_back({queries[i], i});
        sort(ve.begin(), ve.end());
        
        vector<int> res(n);
        for (int i = 0, j = 0, mxv = 0; i < n; ++ i ) {
            while (j < m && items[j][0] <= ve[i].first)
                mxv = max(mxv, items[j][1]), j ++ ;
            res[ve[i].second] = mxv;
        }
        return res;
    }
};
```

### [2071. 你可以安排的最多任务数目](https://leetcode-cn.com/problems/maximum-number-of-tasks-you-can-assign/) [TAG]

细节贪心

```c++
class Solution {
public:
    // [v, has_use_pill, id] , ATTENTION: has_use_pill should be takon account
    using TIII = tuple<int, int, int>;
    
    int n, m, ps, st;
    vector<int> ts, ws;
    
    bool check(int mid) {
        multiset<int> S;
        for (int i = max(m - mid, 0); i < m; ++ i )
            S.insert(ws[i]);
        
        vector<int> ve;
        for (int i = 0; i < mid && i < n; ++ i )
            ve.push_back(ts[i]);
        
        // 从大到小考虑
        int pills = ps;
        for (int i = ve.size() - 1; i >= 0; -- i ) {
            auto it = S.lower_bound(ve[i]);
            if (it != S.end())
                S.erase(it);
            else {
                // ATTENTION: 找到一个吃药后可以解决当前任务的最小的一个
                it = S.lower_bound(ve[i] - st);
                if (it != S.end() && pills) {
                    S.erase(it), pills -- ;
                } else
                    return false;
            }
        }
        return true;
    }
    
    int maxTaskAssign(vector<int>& tasks, vector<int>& workers, int pills, int strength) {
        this->ts = tasks, this->ws = workers;
        sort(ts.begin(), ts.end());
        sort(ws.begin(), ws.end());
        n = ts.size(), m = ws.size();
        this->ps = pills, this->st = strength;
        
        int l = 1, r = min(n, m) + 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (check(mid))
                l = mid + 1;
            else
                r = mid;
        }
        return l - 1;
    }
};
```

单调队列 复杂度更优

```c++
class Solution {
public:
    // [v, has_use_pill, id] , ATTENTION: has_use_pill should be takon account
    using TIII = tuple<int, int, int>;
    const static int N = 5e4 + 10;
    
    int n, m, ps, st;
    vector<int> ts, ws;
    int q[N];
    
    // https://leetcode-cn.com/problems/maximum-number-of-tasks-you-can-assign/solution/c-er-fen-tao-tan-xin-by-blackskygg-kmbu/
    bool check(int mid) {
        // 维护 [..., v + st] 的队列，当前worker的最优解一定是选择第一个or最后一个 或false
        int hh = 0, tt = -1, pills = ps;
        for (int i = max(m - mid, 0), j = 0; i < m; ++ i ) {
            int v = ws[i];
            while (j < mid && ts[j] <= v + st)
                q[ ++ tt] = j ++;
            // 为空 当前worker找不到可以解决的task
            if (hh > tt)
                return false;
            if (ts[q[hh]] <= v)
                hh ++ ;
            else {
                // 吃药 解决一个可解决的最大的
                if (pills)
                    tt -- , pills -- ;
                else
                    return false;
            }
        }
        return true;
    }
    
    int maxTaskAssign(vector<int>& tasks, vector<int>& workers, int pills, int strength) {
        this->ts = tasks, this->ws = workers;
        sort(ts.begin(), ts.end());
        sort(ws.begin(), ws.end());
        n = ts.size(), m = ws.size();
        this->ps = pills, this->st = strength;
        
        int l = 1, r = min(n, m) + 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (check(mid))
                l = mid + 1;
            else
                r = mid;
        }
        return l - 1;
    }
};
```

比赛时错误写法

显然容易想到二分并选择最小的 mid 个任务与最强的 mid 个工人。但二分策略有问题（TODO），比赛时的 WA 代码：

错误原因：**显然并非需要尽着最小的去吃药**

```c++
// 46 / 48 个通过测试用例
class Solution {
public:
    // [v, has_use_pill, id] , ATTENTION: has_use_pill should be takon account
    using TIII = tuple<int, int, int>;
    
    int n, m, ps, st;
    vector<int> ts, ws;
    
    bool check(int mid) {
        priority_queue<TIII, vector<TIII>, greater<TIII>> heap;
        for (int i = max(m - mid, 0); i < m; ++ i )
            heap.push({ws[i], i, 0}), heap.push({ws[i] + st, i, 1});
        
        vector<int> ve;
        for (int i = 0; i < mid && i < n; ++ i )
            ve.push_back(ts[i]);
        
        int p = 0, pills = ps;
        unordered_set<int> hash;
        while (heap.size() && p < mid) {
            auto [v, id, used] = heap.top(); heap.pop();
            if (v < ve[p] || hash.count(id))
                continue;
            
            if (used && pills > 0) {
                hash.insert(id);
                p ++ ;
                pills -- ;
            } else if (!used) {
                hash.insert(id);
                p ++ ;
            }
        }
        return p >= mid;
    }
    
    int maxTaskAssign(vector<int>& tasks, vector<int>& workers, int pills, int strength) {
        this->ts = tasks, this->ws = workers;
        sort(ts.begin(), ts.end());
        sort(ws.begin(), ws.end());
        n = ts.size(), m = ws.size();
        this->ps = pills, this->st = strength;
        
        int l = 1, r = min(n, m) + 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (check(mid))
                l = mid + 1;
            else
                r = mid;
        }
        return l - 1;
    }
};
```

