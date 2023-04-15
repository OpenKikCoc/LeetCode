## [比赛链接](https://leetcode.cn/contest/weekly-contest-339/)

>   virtual rank: 181/5180


### [2609. 最长平衡子字符串](https://leetcode.cn/problems/find-the-longest-balanced-substring-of-a-binary-string/)



```c++
class Solution {
public:
    int findTheLongestBalancedSubstring(string s) {
        int n = s.size(), res = 0;
        for (int i = 0; i < n; ++ i ) 
            for (int j = i; j < n; ++ j ) {
                int w = j - i + 1;
                if (w & 1)
                    continue;
                
                bool flag = true;
                for (int k = i; k < i + w / 2; ++ k )
                    if (s[k] != '0' || s[k + w / 2] != '1') {
                        flag = false;
                        break;
                    }
                        
                if (flag)
                    res = max(res, w);
            }
        return res;
    }
};
```


### [2610. 转换二维数组](https://leetcode.cn/problems/convert-an-array-into-a-2d-array-with-conditions/)



```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    vector<vector<int>> findMatrix(vector<int>& nums) {
        unordered_map<int, int> h;
        for (auto x : nums)
            h[x] ++ ;
        vector<PII> xs;
        for (auto [k, v] : h)
            xs.push_back({k, v});
        sort(xs.begin(), xs.end(), [](const PII & a, const PII & b) {
            return a.second > b.second;
        });
        
        int m = xs.size();
        vector<vector<int>> res;
        for (;;) {
            bool changed = false;
            vector<int> t;
            for (int i = 0; i < m; ++ i ) {
                if (xs[i].second == 0)
                    break;
                t.push_back(xs[i].first);
                xs[i].second -- ;
                changed = true;
            }
            if (!changed)
                break;
            res.push_back(t);
        }
        return res;
    }
};
```

### [2611. 老鼠和奶酪](https://leetcode.cn/problems/mice-and-cheese/)



```c++
class Solution {
public:
    // n 个里面挑【恰好】 k 个，求最大价值
    // 显然不能二维 dp，直接爆掉了
    // => 考虑假设都给第二个，奖励是多少；基于此转移 k 个给第一个，求奖励多少 => heap
    
    int miceAndCheese(vector<int>& reward1, vector<int>& reward2, int k) {
        int n = reward1.size();
        int s = 0;
        for (auto x : reward2)
            s += x;
        
        priority_queue<int> h;
        for (int i = 0; i < n; ++ i )
            h.push(reward1[i] - reward2[i]);
        
        while (k -- ) {
            s += h.top();
            h.pop();
        }
        return s;
    }
};
```

### [2612. 最少翻转操作数](https://leetcode.cn/problems/minimum-reverse-operations/) [TAG]

较显然的是 BFS 思路；关键的就是左右边界的公式推导

显然有会 TLE 的暴力做法

```c++
class Solution {
public:
    // 长度为 n 只有 p 处为 1
    //  每次只能翻转长度为 k 的连续子序列 => 从原坐标 u -> v 的 v 有限制 (在某个范围内【不能超过 xx】且不能被 banned)
    // => 这题最关键的就是左右边界的公式推导
    
    const static int N = 1e5 + 10, INF = 0x3f3f3f3f;
    
    int d[N];
    bool b[N];
    
    vector<int> minReverseOperations(int n, int p, vector<int>& banned, int k) {
        memset(d, 0x3f, sizeof d);
        memset(b, 0, sizeof b);
        for (auto x : banned)
            b[x] = true;
        
        queue<int> q;
        q.push(p); d[p] = 0;
        while (q.size()) {      // 约束它一直往右走 -> wrong, 会有 p 在最左侧的情况
            int u = q.front(); q.pop();
            
            if (k & 1) {
                // 枚举中心位置
                //  =< x
                // for (int i = max(u + 1, k / 2); i + k / 2 < n && (i - k / 2 <= u); ++ i ) {
                for (int i = max(u - k / 2, k / 2); i + k / 2 < n && (i - k / 2 <= u); ++ i ) {
                    int v = i + (i - u);
                    if (b[v])
                        continue;
                    if (d[v] > d[u] + 1) {
                        d[v] = d[u] + 1;
                        q.push(v);
                    }
                }
            } else {
                // 枚举中心靠左位置
                for (int i = max(u - k / 2, k / 2 - 1); i + k / 2 < n && (i - k / 2 + 1 <= u); ++ i ) {
                    int v = i + (i - u + 1);
                    if (b[v])
                        continue;
                    if (d[v] > d[u] + 1) {
                        d[v] = d[u] + 1;
                        q.push(v);
                    }
                }
            }
        }
        
        vector<int> res(n, -1);
        for (int i = 0; i < n; ++ i )
            if (d[i] < INF / 2)
                res[i] = d[i];
        return res;
    }
};
```

在此基础上，注意到需要关注的位置都是没有走过的位置，且这些位置位于一个连续区间内，显然可以 set 维护 “未走过的位置” 的列表避免重复遍历从而降低复杂度

```c++
class Solution {
public:
    // 长度为 n 只有 p 处为 1
    //  每次只能翻转长度为 k 的连续子序列 => 从原坐标 u -> v 的 v 有限制 (在某个范围内【不能超过 xx】且不能被 banned)
    // => 这题最关键的就是左右边界的公式推导
    
    // => 伴随着区间的滑动 翻转后所有的位置组成了一个公差为 2 的等差数列
    // 考虑:
    //  1. 区间最多影响到的元素为 [i - k + 1, i + k - 1]
    //  2. 考虑左边界 0: L=0,R=k-1       对应的翻转位置是 0+(k-1)-i=k-i-1        小于这个的位置都没法到
    //  3. 考虑右边界 n-1: L=n-k,R=n-1   对应的翻转位置是 (n-k)+(n-1)-i=2n-k-i-1 大于这个的位置都没法到
    // => [max(i-k+1,k-i-1), min(i+k-1, 2n-k-i-1)]
    
    const static int N = 1e5 + 10, INF = 0x3f3f3f3f;
    
    int d[N];
    
    vector<int> minReverseOperations(int n, int p, vector<int>& banned, int k) {
        set<int> S[2];
        {
            for (int i = 0; i < n; ++ i )
                S[i % 2].insert(i);
            for (auto x : banned)
                S[x % 2].erase(x);
        }
        
        memset(d, 0x3f, sizeof d);
        queue<int> q;
        {
            q.push(p);
            d[p] = 0; S[p % 2].erase(p);
        }
        while (!q.empty()) {
            int i = q.front(); q.pop();
            int L = i < k ? (k - 1) - i : i - (k - 1);
            int R = i + k - 1 < n ? i + (k - 1) : n + n - k - 1 - i;

            auto & s = S[L % 2];

            //  ATTENTION for-loop 写法
            for (auto it = s.lower_bound(L); it != s.end() && *it <= R; it = s.erase(it)) {
                d[*it] = d[i] + 1;
                q.push(*it);
            }
        }
        
        vector<int> res(n, -1);
        for (int i = 0; i < n; ++ i )
            if (d[i] < INF / 2)
                res[i] = d[i];
        return res;
    }
};
```

更进一步的：涉及到一段连续区间内找到 “下一个未走过的位置” 可以直接并查集维护

```c++
class Solution {
public:
    // 长度为 n 只有 p 处为 1
    //  每次只能翻转长度为 k 的连续子序列 => 从原坐标 u -> v 的 v 有限制 (在某个范围内【不能超过 xx】且不能被 banned)
    // => 这题最关键的就是左右边界的公式推导
    
    // => 伴随着区间的滑动 翻转后所有的位置组成了一个公差为 2 的等差数列
    // 考虑:
    //  1. 区间最多影响到的元素为 [i - k + 1, i + k - 1]
    //  2. 考虑左边界 0: L=0,R=k-1       对应的翻转位置是 0+(k-1)-i=k-i-1        小于这个的位置都没法到
    //  3. 考虑右边界 n-1: L=n-k,R=n-1   对应的翻转位置是 (n-k)+(n-1)-i=2n-k-i-1 大于这个的位置都没法到
    // => [max(i-k+1,k-i-1), min(i+k-1, 2n-k-i-1)]
    //
    // => 进阶: 直接使用并查集跳过区间
    
    const static int N = 1e5 + 10, INF = 0x3f3f3f3f;
    
    int pa[N];
    void init() {
        for (int i = 0; i < N; ++ i )
            pa[i] = i;
    }
    int find(int x) {
        if (pa[x] != x)
            pa[x] = find(pa[x]);
        return pa[x];
    }
    
    int d[N];
    
    vector<int> minReverseOperations(int n, int p, vector<int>& banned, int k) {
        init();
        for (auto x : banned)   // ATTENTION 同奇偶 所以是2 => 跳过被 ban 的节点
            pa[x] = x + 2;
        pa[p] = p + 2;          // ATTENTION 同奇偶 所以是2
        
        memset(d, 0x3f, sizeof d);
        queue<int> q;
        {
            q.push(p);
            d[p] = 0;
        }
        while (!q.empty()) {
            int i = q.front(); q.pop();
            int L = i < k ? (k - 1) - i : i - (k - 1);
            int R = i + k - 1 < n ? i + (k - 1) : n + n - k - 1 - i;

            for (int t = find(L); t <= R; t = find(t)) {    // ATTENTION 细节
                d[t] = d[i] + 1;
                pa[t] = t + 2;     // ATTENTION 同奇偶 所以是2
                q.push(t);
            }
        }
        
        vector<int> res(n, -1);
        for (int i = 0; i < n; ++ i )
            if (d[i] < INF / 2)
                res[i] = d[i];
        return res;
    }
};
```

