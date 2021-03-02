## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-228/)


### [1758. 生成交替二进制字符串的最少操作数](https://leetcode-cn.com/problems/minimum-changes-to-make-alternating-binary-string/)

生成两个串比较即可

```c++
class Solution {
public:
    int get(string s, string ns) {
        int n = s.size(), ret = 0;
        for (int i = 0; i < n; ++ i )
            if (s[i] != ns[i])
                ++ ret;
        return ret;
    }
    
    int minOperations(string s) {
        int n = s.size();
        string s1, s2;
        for (int i = 0; i < n; ++ i ) {
            if (i & 1)
                s1.push_back('1'), s2.push_back('0');
            else s1.push_back('0'), s2.push_back('1');
        }
        return min(get(s, s1), get(s, s2));
    }
};
```

```c++
class Solution {
public:
    int minOperations(string s) {
        int ans1 = 0, ans2 = 0;
        for (int i = 0; i < (int )s.size(); i ++) {
            int cur = i % 2;
            ans1 += (s[i] - '0' != cur);
            ans2 += (s[i] - '0' != 1 - cur);
            cur ^= 1;
        }
        return min(ans1, ans2);
    }
};
```


### [1759. 统计同构子字符串的数目](https://leetcode-cn.com/problems/count-number-of-homogenous-substrings/)

指针即可 计算的时候可以简化

比赛代码：

```c++
class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;
    
    LL get(int t) {
        LL ret = 0;
        for (int i = 1; i <= t; ++ i ) {
            ret += (t - i) + 1;
            ret %= MOD;
        }
        return ret;
    }
    
    int countHomogenous(string s) {
        int n = s.size();
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n && s[j] == s[j - 1]) ++ j ;
            int t = j - i;
            res += get(t);
            res %= MOD;
            i = j - 1;
        }
        return res;
    }
};
```

简化：

```c++
class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;
    
    int countHomogenous(string s) {
        int n = s.size();
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n && s[j] == s[j - 1]) ++ j ;
            LL t = j - i;
            res = (res + (1 + t) * t / 2 % MOD) % MOD;
            i = j - 1;
        }
        return res;
    }
};
```


### [1760. 袋子里最少数目的球](https://leetcode-cn.com/problems/minimum-limit-of-balls-in-a-bag/)

二分即可 注意证明

```c++
class Solution {
public:
    vector<int> nums;
    int m;
    
    bool check(int mid) {
        int ret = 0;
        for (auto k : nums) {
            ret += (k + mid - 1) / mid - 1;
            if (ret > m) return false;
        }
        return true;
    }
    
    int minimumSize(vector<int>& nums, int maxOperations) {
        this->nums = nums, this->m = maxOperations;
        int l = 1, r = 1e9;
        while (l < r) {
            int mid = l + r >> 1;
            if (check(mid)) r = mid;
            else l = mid + 1;
        }
        return l;
    }
};
```

### [1761. 一个图中连通三元组的最小度数](https://leetcode-cn.com/problems/minimum-degree-of-a-connected-trio-in-a-graph/)

无向图最小环 floyd 模板题

```c++
bool st[1000000];

class Solution {
public:
    int minTrioDegree(int n, vector<vector<int>>& edges) {
        memset(st, 0, sizeof st);
        vector<int> d(n + 1);
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            if (a > b) swap(a, b);
            d[a] ++ , d[b] ++ ;
            st[a * 1000 + b] = true;
        }
        
        int res = INT_MAX;
        for (int i = 1; i <= n; ++ i )
            for (int j = i + 1; j <= n; ++ j )
                if (st[i * 1000 + j])
                    for (int k = j + 1; k <= n; ++ k )
                        if (st[i * 1000 + k] && st[j * 1000 + k])
                            res = min(res, d[i] + d[j] + d[k] - 6);
        if (res == INT_MAX) res = -1;
        return res;
    }
};
```

```c++
class Solution {
public:
    int f[501][501];
    int deg[501];
    
    int minTrioDegree(int n, vector<vector<int>>& edges) {
        int m = edges.size();
        for (int i = 1; i <= n; i ++) deg[i] = 0;
        int ans = 0x3f3f3f3f;
        for (int i = 1; i <= n; i ++)
            for (int j = i + 1; j <= n; j ++)
                f[i][j] = false;
        for (int i = 0; i < m; i ++) {
            int x = edges[i][0], y = edges[i][1];
            if (x > y) swap(x, y);
            ++ deg[x]; ++ deg[y];
            f[x][y] = true;
        }
        for (int i = 1; i <= n; i ++) {
            for (int j = i + 1; j <= n; j ++) {
                if (f[i][j] == false) continue;
                for (int k = j + 1; k <= n; k ++) {
                    if (f[i][k] == false || f[j][k] == false) continue;
                    ans = min(ans, deg[i] + deg[j] + deg[k] - 6);
                }
            }
        }
        if (ans == 0x3f3f3f3f) return -1;
        return ans;
    }
};
```
