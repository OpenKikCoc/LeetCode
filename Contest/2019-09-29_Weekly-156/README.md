## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-156/)

57 min AK

virtual rating: 11 / 1432

### [1207. 独一无二的出现次数](https://leetcode-cn.com/problems/unique-number-of-occurrences/)

略

```c++
class Solution {
public:
    bool uniqueOccurrences(vector<int>& arr) {
        unordered_map<int, int> hash;
        unordered_set<int> has;
        for (auto v : arr) ++ hash[v];
        for (auto [k, v] : hash)
            if (has.count(v)) return false;
            else has.insert(v);
        return true;
    }
};
```


### [1208. 尽可能使字符串相等](https://leetcode-cn.com/problems/get-equal-substrings-within-budget/)

双指针

```c++
class Solution {
public:
    int equalSubstring(string s, string t, int maxCost) {
        int n = s.size();
        vector<int> cost(n);
        for (int i = 0; i < n; ++ i ) cost[i] = abs(s[i] - t[i]);
        int c = 0, res = 0;
        for (int l = 0, r = 0; r < n; ++ r ) {
            c += cost[r];
            while (l <= r && c > maxCost) {
                c -= cost[l];
                ++ l ;
            }
            res = max(res, r - l + 1);
        }
        return res;
    }
};
```

liuzhou_101 直接二分枚举也可以

```c++
class Solution {
public:
    int equalSubstring(string s, string t, int maxCost) {
        int n = s.size();
        vector<int> a(n + 1);
        int ret = 0;
        for (int i = 1; i <= n; ++ i ) {
            a[i] = a[i - 1] + abs(s[i - 1] - t[i - 1]);
            int j = lower_bound(a.begin(), a.begin() + i + 1, a[i] - maxCost) - a.begin();
            ret = max(ret, i - j);
        }
        return ret;
    }
};
```


### [1209. 删除字符串中的所有相邻重复项 II](https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string-ii/)

模拟即可

```c++
class Solution {
public:
    using PCI = pair<char, int>;
    vector<PCI> get(string s) {
        int n = s.size();
        char ch = s[0];
        int cnt = 1;
        vector<PCI> ve;
        for (int i = 1; i < n; ++ i ) {
            if (s[i] == ch) ++ cnt;
            else {
                ve.push_back({ch, cnt});
                ch = s[i];
                cnt = 1;
            }
        }
        ve.push_back({ch, cnt});
        return ve;
    }
    string removeDuplicates(string s, int k) {
        for (;;) {
            bool f = false;
            auto ve = get(s);
            int sz = ve.size();
            for (int i = 0; i < sz; ++ i ) {
                auto & [ch, cnt] = ve[i];
                if (cnt < k) continue;
                cnt %= k;
                
                f = true;
            }
            
            s = "";
            for (auto [ch, cnt] : ve)
                if (cnt) {
                    string t = string(cnt, ch);
                    s += t;
                }
            
            if (!f) break;
        }
        return s;
    }
};
```

liuzhou_101 栈的思想 更简洁

```c++
class Solution {
public:
    using pii = pair<int, int>;
    string removeDuplicates(string s, int k) {
        vector<pii> q;
        q.push_back({'A', 0});
        for (auto c : s) {
            if (c == q.back().first) {
                q.back().second ++;
                if (q.back().second == k) q.pop_back();
            }
            else {
                q.push_back({c, 1});
            }
        }
        string ret;
        for (auto [x, y] : q)
            for (int i = 0; i < y; ++ i) ret += x;
        return ret;
    }
};
```

### [1210. 穿过迷宫的最少移动次数](https://leetcode-cn.com/problems/minimum-moves-to-reach-target-with-rotations/)

bfs 略

```c++
class Solution {
public:
    const int INF = 0x3f3f3f3f;
    using TIII = tuple<int, int, int>;
    using PTI = pair<TIII, int>;
    int n;
    vector<vector<int>> g;
    set<TIII> vis;
    
    int minimumMoves(vector<vector<int>>& grid) {
        n = grid.size();
        if (!n) return 0;
        g = grid;
        
        queue<PTI> q;
        // x, y, st, dis
        q.push({{0, 0, 0}, 0});
        while (!q.empty()) {
            auto [t, d] = q.front(); q.pop();
            if (vis.count(t)) continue;
            vis.insert(t);
            
            auto [x, y, st] = t;
            //cout << " x = " << x << "  y = " << y << " st = " << st << "  d = " << d << endl;
            if (x == n - 1 && y == n - 2) return d;
            if (st == 0 && y + 2 < n && g[x][y + 2] == 0) q.push({{x, y + 1, st}, d + 1});
            if (st == 1 && y + 1 < n && g[x][y + 1] == 0 && x + 1 < n && g[x + 1][y + 1] == 0) q.push({{x, y + 1, st}, d + 1});
            if (st == 0 && x + 1 < n && g[x + 1][y] == 0 && g[x + 1][y + 1] == 0) q.push({{x + 1, y, st}, d + 1});
            if (st == 1 && x + 2 < n && g[x + 2][y] == 0) q.push({{x + 1, y, st}, d + 1});
            if (st == 0 && x + 1 < n && g[x + 1][y] == 0 && g[x + 1][y + 1] == 0) q.push({{x, y, !st}, d + 1});
            if (st == 1 && y + 1 < n && g[x][y + 1] == 0 && g[x + 1][y + 1] == 0) q.push({{x, y, !st}, d + 1});
        }
        //cout << endl;
        return -1;
    }
};
```
