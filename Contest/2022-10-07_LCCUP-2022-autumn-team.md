## [比赛链接](https://leetcode.cn/contest/season/2022-fall/ranking/team/)

### [LCP 66. 最小展台数量](https://leetcode.cn/problems/600YaG/)



```c++
class Solution {
public:
    const static int N = 26;
    
    int c[N];
    
    int minNumBooths(vector<string>& demand) {
        memset(c, 0, sizeof c);
        for (auto & s : demand) {
            static int t[N];
            memset(t, 0, sizeof t);
            for (auto c : s)
                t[c - 'a'] ++ ;
            for (int i = 0; i < N; ++ i )
                c[i] = max(c[i], t[i]);
        }
        int res = 0;
        for (int i = 0; i < N; ++ i )
            res += c[i];
        return res;
    }
};
```


### [LCP 67. 装饰树](https://leetcode.cn/problems/KnLfVT/)



```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    void dfs(TreeNode * u) {
        if (u->left) {
            auto t = u->left;
            u->left = new TreeNode(-1);
            u->left->left = t;
            dfs(t);
        }
        if (u->right) {
            auto t = u->right;
            u->right = new TreeNode(-1);
            u->right->right = t;
            dfs(t);
        }
    }
    TreeNode* expandBinaryTree(TreeNode* root) {
        dfs(root);
        return root;
    }
};
```

### [LCP 68. 美观的花束](https://leetcode.cn/problems/1GxJYY/)



```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;
    const static int N = 1e5 + 10, MOD = 1e9 + 7;
    
    int c[N];
    
    int beautifulBouquet(vector<int>& flowers, int cnt) {
        int n = flowers.size();
        memset(c, 0, sizeof c);
        LL res = 0;
        for (int i = 0, j = 0; j < n; ++ j ) {
            c[flowers[j]] ++ ;
            while (i <= j && c[flowers[j]] > cnt)
                c[flowers[i ++ ]] -- ;
            if (i <= j) {
                LL t = j - i + 1;
                res = (res + t) % MOD;
            }
        }
        return res;
    }
};
```

### [LCP 69. Hello LeetCode!](https://leetcode.cn/problems/rMeRt2/)

对每一个串状压枚举 + 对不同的串分组背包

```c++
const static int N = 25, M = 1 << 8, INF = 0x3f3f3f3f;
    
// h, e(4), l(3), o(2), t, c, d
    
char chs[7] = {'h', 'e', 'l', 'o', 't', 'c', 'd'};
int need[7] = {1, 4, 3, 2, 1, 1, 1};
unordered_map<char, int> _hash;
void init() {
    for (int i = 0; i < 7; ++ i )
        _hash[chs[i]] = i;
    // hash['h'] = 0, hash['e'] = 1, hash['l'] = 2, hash['o'] = 3;
    // hash['t'] = 4, hash['c'] = 5, hash['d'] = 6;
}
    
int sts[N][M];
bool valid[N][M];

int hass[N][M][7];
int f[2][5][4][3][2][2][2];

class Solution {
public:
    int n;
    void get(string & s, int st[], bool valid[]) {
        int m = s.size();
        st[0] = 0;
        for (int i = 0; i < 1 << m; ++ i )
            for (int j = 0; j < m; ++ j )
                if (i >> j & 1) {
                    if (!_hash.count(s[j])) {
                        valid[i] = false;
                        break;
                    }
                }
        
        for (int i = 0; i < 1 << m; ++ i )
            for (int j = 0; j < m; ++ j )
                if (i >> j & 1) {
                    if (st[i ^ (1 << j)] >= INF / 2 || !valid[i])
                        continue;
                    int l = 0, r = 0;
                    for (int k = 0; k < j; ++ k )
                        if (!(i >> k & 1))
                            l ++ ;
                    for (int k = j + 1; k < m; ++ k )
                        if (!(i >> k & 1))
                            r ++ ;
                    st[i] = min(st[i], st[i ^ (1 << j)] + l * r);
                }
    }
    
    
    int Leetcode(vector<string>& words) {
        init();
        
        for (int i = 0; i < N; ++ i )
            for (int j = 0; j < M; ++ j )
                valid[i][j] = true;
        memset(sts, 0x3f, sizeof sts);
        n = words.size();
        for (int i = 1; i <= n; ++ i )
            get(words[i - 1], sts[i], valid[i]);
    
        memset(hass, 0, sizeof hass);
        for (int i = 1; i <= n; ++ i ) {
            auto & s = words[i - 1];
            int m = s.size();
            auto & has = hass[i];
            for (int x = 0; x < 1 << m; ++ x )
                if (sts[i][x] < INF / 2 && valid[i][x]) {
                    for (int y = 0; y < m; ++ y )
                        if (x >> y & 1)
                            has[x][_hash[s[y]]] ++ ;
                }
        }
        
        memset(f, 0x3f, sizeof f);
        f[0][0][0][0][0][0][0] = 0;
        for (int i = 1; i <= n; ++ i ) {
            int m = words[i - 1].size();
            for (int i0 = need[0]; i0 >= 0; -- i0 )
                for (int i1 = need[1]; i1 >= 0; -- i1 )
                    for (int i2 = need[2]; i2 >= 0; -- i2 )
                        for (int i3 = need[3]; i3 >= 0; -- i3 )
                            for (int i4 = need[4]; i4 >= 0; -- i4 )
                                for (int i5 = need[5]; i5 >= 0; -- i5 )
                                    for (int i6 = need[6]; i6 >= 0; -- i6 )
                                        for (int x = 0; x < 1 << m; ++ x )
                                            if (sts[i][x] < INF / 2 && valid[i][x]) {
                                                // static int has[7];
                                                // memset(has, 0, sizeof has);
                                                // for (int y = 0; y < m; ++ y )
                                                //     if (x >> y & 1)
                                                //         has[_hash[words[i - 1][y]]] ++ ;
                                                auto & has = hass[i][x];
                                                if (i0 < has[0])
                                                    continue;
                                                if (i1 < has[1])
                                                    continue;
                                                if (i2 < has[2])
                                                    continue;
                                                if (i3 < has[3])
                                                    continue;
                                                if (i4 < has[4])
                                                    continue;
                                                if (i5 < has[5])
                                                    continue;
                                                if (i6 < has[6])
                                                    continue;
                                                f[i0][i1][i2][i3][i4][i5][i6] = min(
                                                    f[i0][i1][i2][i3][i4][i5][i6],
                                                    f[i0 - has[0]][i1 - has[1]][i2 - has[2]][i3 - has[3]][i4 - has[4]][i5 - has[5]][i6 - has[6]] + sts[i][x]
                                                );
                                            }
                
        }
        
        auto & t = f[need[0]][need[1]][need[2]][need[3]][need[4]][need[5]][need[6]];
        if (t >= INF / 2)
            return -1;
        return t;
    }
};
```

### [LCP 70. 沙地治理](https://leetcode.cn/problems/XxZZjK/) [TAG]



```c++

```

### [LCP 71. 集水器](https://leetcode.cn/problems/kskhHQ/) [TAG]



```c++

```
