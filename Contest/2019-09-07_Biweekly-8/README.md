## [比赛链接](https://leetcode.cn/contest/biweekly-contest-8/)


### [1180. 统计只含单一字母的子串](https://leetcode.cn/problems/count-substrings-with-only-one-distinct-letter/)

略

```c++
class Solution {
public:
    int countLetters(string S) {
        int n = S.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n && S[j] == S[i]) ++ j ;
            int l = j - i;
            res += (l + 1) * l / 2;
            i = j - 1;
        }
        return res;
    }
};
```


### [1181. 前后拼接](https://leetcode.cn/problems/before-and-after-puzzle/)

hash 略

```c++
class Solution {
public:
    vector<string> beforeAndAfterPuzzles(vector<string>& phrases) {
        vector<string> res;
        vector<vector<string>> ps;
        unordered_map<string, vector<int>> hash;
        int n = phrases.size();
        for (int i = 0; i < n; ++ i ) {
            stringstream ss(phrases[i]);
            string s;
            vector<string> ve;
            while (ss >> s) ve.push_back(s);
            ps.push_back(ve);
            hash[ve[0]].push_back(i);
        }
        for (int i = 0; i < n; ++ i )
            for (auto nxt : hash[ps[i].back()])
                if (nxt != i) {
                    string ns = phrases[i];
                    int sz = ps[nxt].size();
                    for (int j = 1; j < sz; ++ j )
                        ns += ' ' + ps[nxt][j];
                    res.push_back(ns);
                }
        sort(res.begin(), res.end());
        res.erase(unique(res.begin(), res.end()), res.end());
        return res;
    }
};
```



### [1182. 与目标颜色间的最短距离](https://leetcode.cn/problems/shortest-distance-to-target-color/) [TAG]

自己做的时候想得是记忆化搜索

显然有线性关系，可以从左 从右递推 ==> 线性dp 略

考虑二分

```c++
class Solution {
public:
    const int inf = 0x3f3f3f3f;
    vector<int> c[4];
    vector<int> shortestDistanceColor(vector<int>& colors, vector<vector<int>>& queries) {
        int n = colors.size();
        for (int i = 1; i <= 3; ++ i )
            c[i].push_back(-inf);
        for (int i = 0; i < n; ++ i )
            c[colors[i]].push_back(i);
        for (int i = 1; i <= 3; ++ i )
            c[i].push_back(inf);
        
        vector<int> res;
        for (auto & q : queries) {
            int id = q[0], cc = q[1];
            if (c[cc].size() == 2) res.push_back(-1);
            else if (colors[id] == cc) res.push_back(0);
            else {
                auto it1 = lower_bound(c[cc].begin(), c[cc].end(), id);
                auto it2 = it1 - 1;
                int v1 = *it1, v2 = *it2;
                res.push_back(min(id - v2, v1 - id));
            }
        }
        return res;
    }
};
```

**错误写法**

**错误在于：从左侧计算值，某个位置起只能向右走时，右侧可能不可达，造成右侧记忆值为 inf 从而不为 -1 最终造成结果有误**

```c++
// 错误代码
const int N = 50010;
const int inf = 0x3f3f3f3f;

int f[N][3];

class Solution {
public:
    vector<int> cs;
    int n;
    
    // dir = 3 同时向左向右 1向左 2向右
    int dfs(int x, int c, int dir) {
        string d;
        if (f[x][c] != -1) return f[x][c];
        if (cs[x] - 1 == c) return f[x][c] = 0;
        int ret = inf;
        if ((dir >> 1 & 1) && x + 1 < n) ret = min(ret, dfs(x + 1, c, 2) + 1);
        if ((dir & 1) && x - 1 >= 0) ret = min(ret, dfs(x - 1, c, 1) + 1);
        return f[x][c] = ret;
    }
    
    void init() {
        memset(f, -1, sizeof f);
        for (int i = 0; i < N; ++ i )
            for (int j = 0; j < 3; ++ j ) f[i][j] = -1;
        for (int i = 0; i < n; ++ i ) {
            dfs(i, 0, 3, i);
            dfs(i, 1, 3, i);
            dfs(i, 2, 3, i);
        }
    }
    
    vector<int> shortestDistanceColor(vector<int>& colors, vector<vector<int>>& queries) {
        this->cs = colors;
        n = cs.size();
        init();
        
        vector<int> res;
        for (auto & q : queries) {
            int v = f[q[0]][q[1] - 1];
            if (v > inf / 2) res.push_back(-1);
            else res.push_back(v);
        }
        return res;
    }
};
```

### [1183. 矩阵中 1 的最大数量](https://leetcode.cn/problems/maximum-number-of-ones/) [TAG]

计算左上角正方形的每个格子在整个矩形中有多少个等效位置，取等效位置最多的前maxOnes个即可。

> 先放好左上角，然后剩下的正方形都复制粘贴左上角的

```c++
class Solution {
public:
    int maximumNumberOfOnes(int w, int h, int l, int maxOnes) {
        vector<int> ve;
        for (int i = 0; i < l; ++ i )
            for (int j = 0; j < l; ++ j ) {
                int v = 1;
                v *= (w - i - 1) / l + 1;
                v *= (h - j - 1) / l + 1;
                ve.push_back(v);
            }
        sort(ve.begin(), ve.end(), greater<int>());
        int res = 0;
        for (int i = 0; i < maxOnes; ++ i )
            res += ve[i];
        return res;
    }
};
```
