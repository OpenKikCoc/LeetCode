## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-269/)

>   virtual rank: 211 / 4293


### [2089. 找出数组排序后的目标下标](https://leetcode-cn.com/problems/find-target-indices-after-sorting-array/)

略

```c++
class Solution {
public:
    vector<int> targetIndices(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        vector<int> ve;
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            if (nums[i] == target)
                ve.push_back(i);
        return ve;
    }
};
```


### [2090. 半径为 k 的子数组平均值](https://leetcode-cn.com/problems/k-radius-subarray-averages/)

简单前缀和 略

注意 long long

```c++
class Solution {
public:
    using LL = long long;
    
    vector<int> getAverages(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> res(n, -1);
        vector<LL> s(n + 1, 0);
        for (int i = 1; i <= n; ++ i )
            s[i] = nums[i - 1] + s[i - 1];
        for (int i = 0; i < n; ++ i )
            if (i - k >= 0 && i + k < n)
                res[i] = (s[i + k + 1] - s[i - k]) / (k + k + 1);
        return res;
    }
};
```

滑动窗口也可 略

### [2091. 从数组中移除最大值和最小值](https://leetcode-cn.com/problems/removing-minimum-and-maximum-from-array/)

简单推理 略

```c++
class Solution {
public:
    int minimumDeletions(vector<int>& nums) {
        int p1 = 0, p2 = 0;
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            if (nums[i] < nums[p1])
                p1 = i;
            if (nums[i] > nums[p2])
                p2 = i;
        }
        if (p1 > p2)
            swap(p1, p2);
        return min({p1 + 1 + n - p2, p2 + 1, n - p1});
    }
};
```

### [2092. 找出知晓秘密的所有专家](https://leetcode-cn.com/problems/find-all-people-with-secret/)

分析 显然需要根据会议时间 每次建图并跑连通图

**踩坑：set 不能边迭代边修改**

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
        
        memset(vis, 0, sizeof vis);
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    bool vis[N];
    void dfs(int u) {
        if (vis[u])
            return;
        vis[u] = true;
        S.insert(u);
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            dfs(j);
        }
    }
    
    unordered_set<int> S;
    
    vector<int> findAllPeople(int n, vector<vector<int>>& meetings, int firstPerson) {
        sort(meetings.begin(), meetings.end(), [](const vector<int> & m1, const vector<int> & m2) {
            return m1[2] < m2[2];
        });
        vector<int> ts;
        for (auto & m : meetings)
            ts.push_back(m[2]);
        ts.erase(unique(ts.begin(), ts.end()), ts.end());
        
        S.clear();
        S.insert(0), S.insert(firstPerson);
        
        int m = meetings.size();
        for (int i = 0, p = 0; i < ts.size(); ++ i ) {
            init();
            vector<int> t;
            while (p < meetings.size() && meetings[p][2] <= ts[i]) {
                auto & m = meetings[p];
                int a = m[0], b = m[1];
                // 优化: 只关心变动的部分，而非遍历 S 中所有的点
                // 不优化则 TLE
                if ((S.count(a) == 0) ^ (S.count(b) == 0))
                    t.push_back(a);
                add(a, b), add(b, a);
                p ++ ;
            }
            // dfs 中会修改 S, 如果直接迭代 S 会 WA 37 / 60
            // for (auto v : S)
            //    dfs(v);
            for (auto v : t)
                dfs(v);
        }
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            if (S.count(i))
                res.push_back(i);
        return res;
    }
};
```

有更简单的 bfs 思维

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1e5 + 10, M = 2e5 + 10;
    
    bool st[N];
    int d[N];

    int h[N], e[M], w[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
        memset(st, 0, sizeof st);
        memset(d, 0x3f, sizeof d);
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }

    // [ trick 非常简单且复杂度更低的写法 ]
    // 1. 维护一个优先队列，内部为即将了解信息的人以及时间，按照后者升序排序。
    // 2. 随后我们一个个取出优先队列的元素，并且记录元素的时间为当前时间。
    //    如果这个人是首次知道这个秘密，那么枚举所有连接的边，如果时间不比当前时间早，那么加入到优先队列当中。
    // 3. 这样子写可以摆脱每次都建一次图的问题，而且似乎会让代码更好写。
    vector<int> findAllPeople(int n, vector<vector<int>>& meetings, int firstPerson) {
        init();
        for (auto & m : meetings)
            add(m[0], m[1], m[2]), add(m[1], m[0], m[2]);
        
        // 时间从小到大排  [time_he_know, person]
        priority_queue<PII, vector<PII>, greater<PII>> heap;
        heap.push({d[0] = 0, 0}), heap.push({d[firstPerson] = 0, firstPerson});

        vector<int> res;
        while (heap.size()) {
            auto [_, u] = heap.top(); heap.pop();
            if (st[u])
                continue;
            st[u] = true;
            res.push_back(u);
            for (int i = h[u]; ~i; i = ne[i]) {
                int v = e[i], t = w[i];
                // 如果开会比当前u知道的晚 ==> 说明可以对v发挥作用
                // 且当前开会会使得v更早知道 ==> 可以优化v知道的时间
                if (t >= d[u] && t < d[v])
                    heap.push({d[v] = t, v});
            }
        }
        
        return res;
    }
};
```

