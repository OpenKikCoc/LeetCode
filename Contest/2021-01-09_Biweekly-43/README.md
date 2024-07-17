## [比赛链接](https://leetcode.cn/contest/biweekly-contest-43/)


### [1716. 计算力扣银行的钱](https://leetcode.cn/problems/calculate-money-in-leetcode-bank/)

推公式 花时间就比暴力长点

```c++
class Solution {
public:
    // 28 35 
    // (28 + (w - 1) * 7 + 28) / 2 * w
    // 
    // (w + 1 + d + w) / 2 * d
    int totalMoney(int n) {
        int w = n / 7, d = n % 7;
        int v1 = (49 + 7 * w) * w / 2;
        int v2 = (w + d + 1 + w) * d / 2;
        // cout << v1 << ' ' << v2 << endl;
        return v1 + v2;
    }
};
```

暴力：

```c++
class Solution {
public:
    int totalMoney(int n) {
        int res = 0;
        for (int i = 1; i <= n; i ++ ) {
            int r = (i - 1) / 7, c = (i - 1) % 7;
            res += r + c + 1;
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    int totalMoney(int n) {
        int ans = 0;
        int cur = 0;
        for (int i = 0; i < n; ++i) {
            if (i % 7 == 0) {
                cur = i / 7 + 1;
            }
            else {
                ++cur;
            }
            ans += cur;
        }
        return ans;
    }
};
```

### [1717. 删除子字符串的最大得分](https://leetcode.cn/problems/maximum-score-from-removing-substrings/) [TAG]

贪心 记忆处理技巧

```c++
class Solution {
public:
    int maximumGain(string s, int x, int y) {
        // 确保最终优先选择的都是'ab'
        if (x < y) {
            swap(x, y);
            for (auto & c : s) {
                if (c == 'a') c = 'b';
                else if (c == 'b') c = 'a';
            }
        }

        int res = 0;
        for (int i = 0; i < s.size(); ++ i ) {
            if (s[i] != 'a' && s[i] != 'b') continue;
            int j = i + 1;
            while (j < s.size() && (s[j] == 'a' || s[j] == 'b')) ++ j ;
            // 全是 a 或 b 的一段
            int a = 0, b = 0, c = 0;
            for (int k = j - 1, t = 0; k >= i; -- k )
                if (s[k] == 'a') {
                    ++ a ;
                    // 后方有未使用的b
                    if (t) {
                        ++ c ;
                        -- t ;
                    }
                } else {
                    ++ b ;
                    ++ t ;
                }
            
            res += c * x + (min(a, b) - c) * y;
            i = j - 1;
        }
        return res;
    }
};
```

### [1718. 构建字典序最大的可行序列](https://leetcode.cn/problems/construct-the-lexicographically-largest-valid-sequence/)

回溯

```c++
class Solution {
public:
    int n;
    vector<bool> st;
    vector<int> path;
    
    bool dfs(int u) {
        if (u == n * 2 - 1) return true;
        if (path[u]) return dfs(u + 1);
        
        for (int i = n; i > 1; -- i ) {
            if (!st[i] && u + i < 2 * n - 1 && !path[u + i]) {
                path[u] = path[u + i] = i;
                st[i] = true;
                if (dfs(u + 1)) return true;
                st[i] = false;
                path[u] = path[u + i] = 0;
            }
        }
        if (!st[1]) {
            st[1] = true;
            path[u] = 1;
            if (dfs(u + 1)) return true;
            path[u] = 0;
            st[1] = false;
        }
        return false;
    }
    
    vector<int> constructDistancedSequence(int n) {
        this->n = n;
        st.resize(n + 1, false);
        path.resize(n * 2 - 1);
        dfs(0);
        return path;
    }
};
```

### [1719. 重构一棵树的方案数](https://leetcode.cn/problems/number-of-ways-to-reconstruct-a-tree/) [TAG]

删点 重复做

```c++
class Solution {
public:
    // 如果一个点只有一个儿子 则可以缩点
    
    int checkWays(vector<vector<int>>& pairs) {
        // bitset 方便在比较的时候压位以降低复杂度
        bitset<501> g[501];
        for (auto & p : pairs) {
            int a = p[0], b = p[1];
            g[a][b] = g[b][a] = 1;
        }
        for (int i = 1; i <= 500; ++ i )
            if (g[i].count())
                g[i][i] = 1;
        
        int res = 1;
        set<int> rms;   // 记录删掉的点
        for (int i = 1; i <= 500; ++ i ) {
            // 循环删点
            if (!g[i].count()) continue;
            for (int j = i + 1; j <= 500; ++ j )
                if (g[i] == g[j]) {
                    res = 2;
                    rms.insert(j);
                    g[j][j] = 0;
                }
        }
        
        // 只保留单向关系
        vector<int> vers;
        for (auto & p : pairs) {
            int a = p[0], b = p[1];
            if (rms.count(a) || rms.count(b))
                g[a][b] = g[b][a] = 0;
            else vers.push_back(a), vers.push_back(b);
        }
        if (vers.size()) {
            sort(vers.begin(), vers.end());
            vers.erase(unique(vers.begin(), vers.end()), vers.end());
        }
        sort(vers.begin(), vers.end(), [&](int a, int b) {
            return g[a].count() > g[b].count();
        });
        
        for (auto & p : pairs) {
            int & a = p[0], & b = p[1];
            if (!rms.count(a) && !rms.count(b)) {
                if (g[a].count() == g[b].count()) return 0;
                else if (g[a].count() > g[b].count()) swap(a, b);
            }
        }
        
        for (auto & p : pairs) {
            int & a = p[0], & b = p[1];
            if (!rms.count(a) && !rms.count(b))
                g[a][b] = 0;
        }
        
        // 是否有一个点可以到达所有点
        if (vers.size() && g[vers[0]].count() != vers.size()) return 0;
        
        for (int i = 0; i < vers.size(); ++ i ) {
            int a = vers[i];
            if (!g[a].count()) continue;
            for (int j = i + 1; j < vers.size(); ++ j ) {
                int b = vers[j];
                // 此时ab必然是一条边
                if (g[a][b]) {
                    if ((g[a] & g[b]) != g[b]) return 0;
                    g[a] &= ~g[b];  // 删掉b子集
                }
            }
        }
        return res;
    }
};
```
