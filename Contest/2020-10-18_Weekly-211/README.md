## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-211)

raking: 202 / 4033


### [5543. 两个相同字符之间的最长子字符串](https://leetcode-cn.com/problems/largest-substring-between-two-equal-characters/)

记录第一次出现位置即可，想当然的写不重复区间WA1

```c++
    int maxLengthBetweenEqualCharacters(string s) {
        int res = -1, n = s.size();
        vector<int> l(27, -1);
        for(int i = 0; i < n; ++i) {
            if(l[s[i]-'a'] != -1) res = max(res, i-l[s[i]-'a']-1);
            else l[s[i]-'a'] = i;
        }
        return res;
    }
```

实际更简单：

```c++
    int maxLengthBetweenEqualCharacters(string s) {
        int n = s.size();
        int ans = -1;
        for(int i = 0; i < n; i++) {
            for(int j = i + 1; j < n; j++) {
                if(s[i] == s[j]) ans = max(ans, j - i - 1);
            }
        }
        return ans;
    }
```



### [5544. 执行操作后字典序最小的字符串](https://leetcode-cn.com/problems/lexicographically-smallest-string-after-applying-operations/)

搜索 题解区和赛榜有暴力的做法

```c++
    map<string, bool> mp;
    int n, a, b, v;
    void dfs(string s) {
        if(mp[s]) return;
        mp[s] = true;
        string sa = s, sb = s;
        for(int i = 1; i < n; i += 2) {
            v = sa[i]-'0'+a;
            if(v >= 10) v %= 10;
            sa[i] = '0'+v;
        }
        dfs(sa);
        for(int i = 0; i < b; ++i) sb[i] = s[n-b+i];
        for(int i = b; i < n; ++i) sb[i] = s[i-b];
        //cout << " s="<<s <<" sb="<<sb << endl;
        dfs(sb);
    }
    string findLexSmallestString(string s, int a, int b) {
        this->n = s.size(); this->a = a; this->b = b;
        //mp[s] = true;
        dfs(s);
        auto [k, v] = *mp.begin();
        //cout << k << " " << v << endl;
        return k;
    }
```

### [5545. 无矛盾的最佳球队](https://leetcode-cn.com/problems/best-team-with-no-conflicts/)

简单dp

```c++
    // 最长上升子序列模型
    int bestTeamScore(vector<int>& scores, vector<int>& ages) {
        vector<pair<int, int>> c;
        int n = scores.size();
        for(int i = 0; i < n; ++i) c.push_back({ages[i], scores[i]});
        sort(c.begin(), c.end());
        int res = 0;
        vector<int> f(n+1);
        for(int i = 1; i <= n; ++i) {
            auto [aa, as] = c[i-1];
            f[i] = as;    // 必须
            for(int j = 1; j < i; ++j) {
                // j年龄一定比i小，只要j分数也小于等于i就合法
                auto [ba, bs] = c[j-1];
                if(ba <= aa && bs <= as) f[i] = max(f[i], f[j]+as);
            }
            res = max(res, f[i]);
        }
        return res;
    }
```

### [5128. 带阈值的图连通性](https://leetcode-cn.com/problems/graph-connectivity-with-threshold/) [TAG]

枚举因子，然后将其所有的倍数与这一因子之间连边。

**一开始在想怎么找某个数的因子，重要的是先找因子再向后连接**

```c++
class Solution {
    int fa[100005], sz[100005];
    int Find(int x) {
        if(fa[x] == x) return x;
        return fa[x] = Find(fa[x]);
    }
    void Merge(int x, int y) {
        int fx = Find(x), fy = Find(y);
        if(fx == fy) return;
        if(sz[fx] > sz[fy]) fa[fy] = fx, sz[fx] += sz[fy];
        else fa[fx] = fy, sz[fy] += sz[fx];
    }
public:
    vector<bool> areConnected(int n, int threshold, vector<vector<int>>& queries) {
        for(int i = 1; i <= n; ++i) fa[i] = i, sz[i] = 1;
        for(int i = threshold+1; i <= n; ++i)
            for(int j = i; j <= n; j += i) Merge(i, j);
        vector<bool> res;
        for(auto & q : queries) res.push_back(Find(q[0]) == Find(q[1]));
        return res;
    }
};
```
