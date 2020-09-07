## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-205/)


### [1576. 替换所有的问号](https://leetcode-cn.com/problems/replace-all-s-to-avoid-consecutive-repeating-characters/)

模拟即可 注意 `s[i+1] != '?'`

```c++
    string modifyString(string s) {
        int n = s.size();
        for(int i = 0; i < n; ++i) if(s[i] == '?') {
            vector<bool> vis(26);
            if(i-1 >= 0) vis[s[i-1]-'a'] = true;
            if(i+1 < n && s[i+1] != '?') vis[s[i+1]-'a'] = true;
            for(int j = 0; j < 26; ++j) if(!vis[j]) {s[i] = 'a'+j; break;}
        }
        return s;
    }
```

一种简单写法

```c++
    string modifyString(string s) {
        int n = s.size();
        for (int i = 0; i < n; ++i) {
            if (s[i] == '?') {
                char l = (i == 0 ? 'z' : s[i - 1]);
                char r = ((i == n - 1 || s[i + 1] == '?') ? 'z' : s[i + 1]);
                if (l != 'a' && r != 'a') {
                    s[i] = 'a';
                }
                else if (l != 'b' && r != 'b') {
                    s[i] = 'b';
                }
                else {
                    s[i] = 'c';
                }
            }
        }
        return s;
    }
```

### [1577. 数的平方等于两数乘积的方法数](https://leetcode-cn.com/problems/number-of-ways-where-square-of-number-is-equal-to-product-of-two-numbers/)

hash 表存储结果即可

```c++
    int numTriplets(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size(), n2 = nums2.size();
        m1.clear(), m2.clear();
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());
        for(int i = 0; i < n1; ++i)
            for(int j = i+1; j < n1; ++j) ++m1[(long long)nums1[i] * (long long)nums1[j]];
        for(int i = 0; i < n2; ++i)
            for(int j = i+1; j < n2; ++j) ++m2[(long long)nums2[i] * (long long)nums2[j]];
        int res = 0;
        for(int i = 0; i < n1; ++i) res += m2[(long long)nums1[i] * (long long)nums1[i]];
        for(int i = 0; i < n2; ++i) res += m1[(long long)nums2[i] * (long long)nums2[i]];
        return res;
    }
```

### [1578. 避免重复字母的最小删除成本](https://leetcode-cn.com/problems/minimum-deletion-cost-to-avoid-repeating-letters/)

dp

```c++
    int minCost(string s, vector<int>& cost) {
        int n = s.size();
        vector<vector<int>> f(n+1, vector<int>(26));
        for(int i = 1; i <= n; ++i) {
            for(int j = 0; j < 26; ++j) f[i][j] = f[i-1][j] + cost[i-1];
            int t = s[i-1]-'a';
            for(int j = 0; j < 26; ++j) if(j != t) f[i][t] = min(f[i][t], f[i-1][j]);
        }
        return *min_element(f[n].begin(), f[n].end());
    }
```

Heltion版本代码

```c++
    int minCost(string s, vector<int>& cost) {
        int n = s.size();
        for(int i = 0; i <= n; i += 1)
            for(int j = 0; j <= 26; j += 1) dp[i][j] = 1'000'000'000;
        dp[0][26] = 0;
        for(int i = 0; i < n; i += 1)
            for(int j = 0; j < 27; j += 1){
                if(j != s[i] - 'a') dp[i + 1][s[i] - 'a'] = min(dp[i + 1][s[i] - 'a'], dp[i][j]);
                dp[i + 1][j] = min(dp[i + 1][j], dp[i][j] + cost[i]);
            }
        return *min_element(dp[n], dp[n] + 26);
    }
```

也可以一次遍历 在所有连续相同的字符中留下话费最大的即可

### [1579. 保证图可完全遍历](https://leetcode-cn.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/) [TAG]

并查集

```c++
struct DSU {
    int f[100005];
    int N;
    void init(int n) {
        N = n;
        for(int i = 1; i <= n; ++i) f[i] = i;
    }
    int find(int x) {
        if(x == f[x]) return x;
        return f[x] = find(f[x]);
    }
    bool merge(int x, int y) {
        int fx = find(x), fy = find(y);
        if(fx == fy) return false;
        f[fx] = fy; --N;
        return true;
    }
} a, b;

class Solution {
public:
    // 先尽可能的保留公共边，并删除冗余的公共边，然后再删除单独的冗余边
    int maxNumEdgesToRemove(int n, vector<vector<int>>& edges) {
        a.init(n); b.init(n);
        int res = 0;
        for(auto& e : edges) if(e[0] == 3) {
            bool f1 = a.merge(e[1], e[2]);
            bool f2 = b.merge(e[1], e[2]);
            if(!f1 && !f2) ++res;   // 对于AB来说都是冗余边
        }
        for(auto& e : edges) {
            if(e[0] == 1 && !a.merge(e[1], e[2])) ++res;
            if(e[0] == 2 && !b.merge(e[1], e[2])) ++res;
        }
        if(a.N > 1 || b.N > 1) return -1;   // 不连通
        return res;
    }
};
```
