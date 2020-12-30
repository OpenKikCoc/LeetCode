## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-155/)

好题

### [1200. 最小绝对差](https://leetcode-cn.com/problems/minimum-absolute-difference/)

模拟即可

```c++
class Solution {
public:
    vector<vector<int>> minimumAbsDifference(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int mind = INT_MAX, n = arr.size();
        for (int i = 1; i < n; ++ i )
            if (arr[i] - arr[i - 1] < mind)
                mind = arr[i] - arr[i - 1];
        vector<vector<int>> res;
        for (int i = 1; i < n; ++ i )
            if (arr[i] - arr[i - 1] == mind) {
                vector<int> t = {arr[i - 1], arr[i]};
                res.push_back(t);
            }
        return res;
    }
};
```


### [1201. 丑数 III](https://leetcode-cn.com/problems/ugly-number-iii/) [TAG]

模拟显然 TLE

考虑【二分 + 容斥原理】

```c++
class Solution {
public:
    using LL = unsigned long long;
    int nthUglyNumber(int n, int a, int b, int c) {
        auto lcm = [](LL a, LL b) {
            return a * b / __gcd(a, b);
        };
        LL ab = lcm(a, b);
        LL bc = lcm(b, c);
        LL ca = lcm(c, a);
        LL abc = lcm(ab, c);
        auto calc = [&](LL m) -> LL {
            return m / a + m / b + m / c - m / ab - m / bc - m / ca + m / abc;
        };
        
        LL L = 0, R = 2e9 + 10;
        while (L < R) {
            LL m = L + (R - L) / 2;
            //cout << m << endl;
            if (calc(m) < n) L = m + 1;
            else R = m;
        }
        //cout << endl;
        return L;
    }
};
```

### [1202. 交换字符串中的元素](https://leetcode-cn.com/problems/smallest-string-with-swaps/) [TAG]

并查集

```c++
class Solution {
public:
    vector<int> p;
    int find(int x) {
        if (p[x] != x) return p[x] = find(p[x]);
        return p[x];
    }
    string smallestStringWithSwaps(string s, vector<vector<int>>& pairs) {
        int n = s.size();
        p.resize(n);
        for (int i = 0; i < n; ++ i ) p[i] = i;
        for (auto e : pairs) p[find(e[0])] = find(e[1]);
        
        vector<vector<char>> v(n);
        for (int i = 0; i < n; ++ i )
            v[find(i)].push_back(s[i]);
        for (int i = 0; i < n; ++ i ) {
            sort(v[i].begin(), v[i].end());
            reverse(v[i].begin(), v[i].end());
        }
        
        string res;
        for (int i = 0; i < n; ++ i ) {
            res.push_back(v[find(i)].back());
            v[find(i)].pop_back();
        }
        return res;
    }
};
```

### [1203. 项目管理](https://leetcode-cn.com/problems/sort-items-by-groups-respecting-dependencies/) [TAG]

双层拓扑排序

```c++
class Solution {
public:
    //const static int N = 30010;
    const static int N = 34010; // 33010 wa 35010 ac
    int e[N], ne[N], h[N], idx;
    int din[N], q[N];
    void init() {
        idx = 0;
        memset(h, -1, sizeof h);
        memset(din, 0, sizeof din);
    }
    void addedge(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    bool topo(int n) {
        int hh = 0, tt = -1;
        for (int i = 0; i < n; ++ i )
            if (!din[i])
                q[ ++ tt] = i;
        while (hh <= tt) {
            int t = q[hh ++ ];
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                if (! --din[j])
                    q[ ++ tt] = j;
            }
        }
        // 注意判断
        return tt == n - 1;
    }
    
    vector<int> sortItems(int n, int m, vector<int>& group, vector<vector<int>>& beforeItems) {
        // 1. 项目之间 拓扑排序
        init();
        for (int i = 0; i < n; ++ i )
            for (auto x : beforeItems[i])
                addedge(x, i), din[i] ++ ;
        if (!topo(n)) return {};
        
        // 2. 为不属于某个小组的项目新建虚拟小组
        int tmp_m = m;
        for (int i = 0; i < n; ++ i )
            if (group[i] == -1)
                group[i] = m ++ ;
        // 3. 所有本小组的项目加入小组内 保存在v数组
        vector<vector<int>> v(m);
        for (int i = 0; i < n; ++ i )
            v[group[q[i]]].push_back(q[i]);
        
        // 4. 小组之间建边
        init();
        for (int i = 0; i < n; ++ i )
            for (auto x : beforeItems[i]) {
                if (group[x] == group[i]) continue;
                addedge(group[x], group[i]), din[group[i]] ++ ;
            }
        if (!topo(m)) return {};
        
        // 5. 结果
        vector<int> res;
        for (int i = 0; i < m; ++ i )
            for (auto x : v[q[i]])
                res.push_back(x);
        return res;
    }
};
```
