## [比赛链接](https://leetcode.cn/contest/biweekly-contest-7/)


### [1165. 单行键盘](https://leetcode.cn/problems/single-row-keyboard/)

模拟 略

```c++
class Solution {
public:
    int calculateTime(string keyboard, string word) {
        vector<int> p(26);
        int n = keyboard.size();
        for (int i = 0; i < n; ++ i )
            p[keyboard[i] - 'a'] = i;
        int res = 0, x = 0;
        for (auto c : word)
            res += abs(p[c - 'a'] - x), x = p[c - 'a'];
        return res;
    }
};
```


### [1166. 设计文件系统](https://leetcode.cn/problems/design-file-system/)

模拟 略

```c++
class FileSystem {
public:
    unordered_map<string, int> hash;
    
    FileSystem() { }
    
    bool createPath(string path, int value) {
        string fa = path;
        while (fa.back() != '/') fa.pop_back();
        fa.pop_back();
        
        if (fa != "" && !hash.count(fa) || hash.count(path))
            return false;
        hash[path] = value;
        return true;
    }
    
    int get(string path) {
        return hash.count(path) ? hash[path] : -1;
    }
};

/**
 * Your FileSystem object will be instantiated and called as such:
 * FileSystem* obj = new FileSystem();
 * bool param_1 = obj->createPath(path,value);
 * int param_2 = obj->get(path);
 */
```

### [1167. 连接棒材的最低费用](https://leetcode.cn/problems/minimum-cost-to-connect-sticks/)

贪心 略

```c++
class Solution {
public:
    int connectSticks(vector<int>& sticks) {
        priority_queue<int, vector<int>, greater<int>> heap;
        for (auto v : sticks) heap.push(v);
        int res = 0;
        while (heap.size() > 1) {
            int a = heap.top(); heap.pop();
            int b = heap.top(); heap.pop();
            res += a + b;
            heap.push(a + b);
        }
        return res;
    }
};
```

### [1168. 水资源分配优化](https://leetcode.cn/problems/optimize-water-distribution-in-a-village/)

MST 略

```c++
class Solution {
public:
    struct Edge {
        int a, b, w;
        bool operator< (const Edge & t) const {
            return w < t.w;
        }
    }edges[30010];
    int idx;
    void add(int a, int b, int c) {
        edges[idx ++ ] = {a, b, c};
    }
    
    int p[10010];
    int find(int x) {
        if (p[x] != x) p[x] = find(p[x]);
        return p[x];
    }
    
    int n;
    
    void init() {
        for (int i = 0; i <= n; ++ i )
            p[i] = i;
        idx = 0;
    }
    
    int kruskal() {
        sort(edges, edges + idx);
        
        int res = 0, cnt = 0;
        for (int i = 0; i < idx; ++ i ) {
            auto [a, b, w] = edges[i];
            a = find(a), b = find(b);
            if (a != b) {
                p[a] = b;
                res += w;
                cnt ++ ;
            }
        }
        // if (cnt < n - 1) return -1;
        return res;
    }
    
    int minCostToSupplyWater(int n, vector<int>& wells, vector<vector<int>>& pipes) {
        this->n = n;
        init();
        
        for (int i = 1; i <= n; ++ i )
            add(0, i, wells[i - 1]);
        for (auto & pi : pipes)
            add(pi[0], pi[1], pi[2]), add(pi[1], pi[0], pi[2]);
        
        return kruskal();
    }
};
```
