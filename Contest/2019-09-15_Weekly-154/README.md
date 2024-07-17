## [比赛链接](https://leetcode.cn/contest/weekly-contest-154/)


### [1189. “气球” 的最大数量](https://leetcode.cn/problems/maximum-number-of-balloons/)

STL min 用法

```c++
class Solution {
public:
    int maxNumberOfBalloons(string text) {
        unordered_map<char, int> cnt;
        for (auto c : text) ++ cnt[c];
        int res = INT_MAX;
        res = min(res, cnt['b']);
        res = min(res, cnt['a']);
        res = min(res, cnt['l'] / 2);
        res = min(res, cnt['o'] / 2);
        res = min(res, cnt['n']);
        return res;
    }
};
```

```c++
class Solution {
public:
    int maxNumberOfBalloons(string text) {
        map<char, int> F;
        for (auto c : text) F[c] ++;
        return min({F['b'], F['a'], F['l']/2, F['o']/2, F['n']});
    }
};
```

### [1190. 反转每对括号间的子串](https://leetcode.cn/problems/reverse-substrings-between-each-pair-of-parentheses/) [TAG]

栈操作

```c++
class Solution {
public:
    string reverseParentheses(string s) {
        vector<string> v(1);
        for (auto c : s) {
            if (c == '(') v.push_back("");
            else if (c == ')') {
                auto t = v.back(); v.pop_back();
                reverse(t.begin(), t.end());
                v.back() += t;
            } else v.back() += c;
        }
        return v[0];
    }
};
```

```c++
class Solution {
public:
    string reverseParentheses(string s) {
        stack<string> st;
        st.push("");
        string res;
        for (auto c : s) {
            if (c == '(') st.push("");
            else if (c == ')') {
                auto t = st.top(); st.pop();
                reverse(t.begin(), t.end());
                st.top() += t;
            } else st.top().push_back(c);
        }
        return st.top();
    }
};
```

### [1191. K 次串联后最大子数组之和](https://leetcode.cn/problems/k-concatenation-maximum-sum/) [TAG]

当 k = 1 时，答案为当前数组的最大子序和（参考股票问题）

当 k >= 2 时，答案为三者的最大值：

1. k = 1 时的答案

2. 最大前缀和 + 全部和 - 最小前缀和 （即：最大后缀和 + 最大前缀和）

3. k = 1 时的答案 + (k - 1)\*当前数组的和

```c++
class Solution {
public:
    const int mod = 1e9 + 7;
    using LL = long long;
    int kConcatenationMaxSum(vector<int>& arr, int k) {
        LL minv = 0, maxv = 0, maxd = 0, sum = 0;
        for (auto v : arr) {
            sum += v;
            if (sum < minv) minv = sum;
            if (sum > maxv) maxv = sum;
            if (sum - minv > maxd) maxd = sum - minv;
        }
        LL k1 = maxd, k2 = maxv + sum - minv, kn = maxd + (k - 1) * sum;
        return k == 1 ? k1 % mod : max({k1, k2, kn}) % mod;
    }
};
```

```c++
// liuzhou_101

class Solution {
public:
    const int mod = 1e9 + 7;
    using LL = long long;
    int kConcatenationMaxSum(vector<int>& arr, int k) {
        int n = arr.size();
        vector<LL> s(2 * n + 1);
        LL minv = 0, ret1 = 0, ret2 = 0;
        for (int i = 1; i <= 2 * n; ++ i ) {
            s[i] = s[i - 1] + arr[(i - 1) % n];
            minv = min(minv, s[i]);
            if (i <= n)
                ret1 = max(ret1, s[i] - minv);
            ret2 = max(ret2, s[i] - minv);
        }
        
        if (k == 1) return ret1 % mod;
        if (k == 2) return ret2 % mod;
        
        LL t1 = ret1, t2 = ret2;
        t1 += LL(k - 1) * s[n];
        t2 += LL(k - 2) * s[n];
        LL res = max({ret1, ret2, t1, t2});
        return res % mod;
    }
};
```

### [1192. 查找集群内的「关键连接」](https://leetcode.cn/problems/critical-connections-in-a-network/)

求桥

```c++
class Solution {
public:
    vector<vector<int>> v;
    vector<int> dfn, low;
    int timestamps;
    vector<vector<int>> ret;
    
    void tarjan(int x, int fa) {
        dfn[x] = low[x] = ++ timestamps;
        for (auto y : v[x]) {
            if (y == fa) continue;
            if (!dfn[y]) {
                tarjan(y, x);
                low[x] = min(low[x], low[y]);
                if (low[y] > dfn[x]) ret.push_back({x, y});
            } else low[x] = min(low[x], dfn[y]);
        }
    }
    
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        v = vector<vector<int>>(n);
        dfn = low = vector<int>(n);
        timestamps = 0;
        ret.clear();
        for (auto e : connections) {
            v[e[0]].push_back(e[1]);
            v[e[1]].push_back(e[0]);
        }
        for (int i = 0; i < n; ++ i )
            if (!dfn[i]) tarjan(i, -1);
        return ret;
    }
};
```
