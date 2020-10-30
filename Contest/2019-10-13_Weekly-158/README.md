## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-158/)


### [1221. 分割平衡字符串](https://leetcode-cn.com/problems/split-a-string-in-balanced-strings/)

从前至后扫描统计即可

```c++
    int balancedStringSplit(string s) {
        int cnt = 0, res = 0;
        for(auto & c : s) {
            if(c == 'L') ++cnt;
            else --cnt;
            if(cnt == 0) ++res;
        }
        return res;
    }
```


### [1222. 可以攻击国王的皇后](https://leetcode-cn.com/problems/queens-that-can-attack-the-king/)

略

```c++
    vector<vector<int>> queensAttacktheKing(vector<vector<int>>& queens, vector<int>& king) {
        vector<vector<int>> g(8, vector<int>(8)), res;
        for(auto & q : queens) g[q[0]][q[1]] = 1;
        for(int x = king[0], y = king[1]; x >= 0; --x)
            if(g[x][y]) {res.push_back({x, y}); break;}
        for(int x = king[0], y = king[1]; x < 8; ++x)
            if(g[x][y]) {res.push_back({x, y}); break;}
        for(int x = king[0], y = king[1]; y >= 0; --y)
            if(g[x][y]) {res.push_back({x, y}); break;}
        for(int x = king[0], y = king[1]; y < 8; ++y)
            if(g[x][y]) {res.push_back({x, y}); break;}
        
        for(int x = king[0], y = king[1]; x >= 0 && y >= 0; --x, --y)
            if(g[x][y]) {res.push_back({x, y}); break;}
        for(int x = king[0], y = king[1]; x < 8 && y >= 0; ++x, --y)
            if(g[x][y]) {res.push_back({x, y}); break;}
        for(int x = king[0], y = king[1]; x >= 0 && y < 8; --x, ++y)
            if(g[x][y]) {res.push_back({x, y}); break;}
        for(int x = king[0], y = king[1]; x < 8 && y < 8; ++x, ++y)
            if(g[x][y]) {res.push_back({x, y}); break;}
        return res;
    }
```

### [1223. 掷骰子模拟](https://leetcode-cn.com/problems/dice-roll-simulation/)

线性 dp

```c++
    const int mod = 1e9+7;
    int dieSimulator(int n, vector<int>& rollMax) {
        // f[i][j][k] 到i位置 筛子j出现k次的方案数
        // for f[i][j][k] = f[i-1][j][k-1]
        vector<vector<vector<int>>> f(n+1, vector<vector<int>>(6, vector<int>(16)));
        for(int i = 0; i < 6; ++i) f[1][i][1] = 1;

        for(int i = 2; i <= n; ++i)
            for(int j = 0; j < 6; ++j)
                for(int k = 0; k < 6; ++k) {    // 上个筛子为k
                    if(j == k) for(int t = 1; t < rollMax[j]; ++t)
                        f[i][j][t+1] = (f[i][j][t+1] + f[i-1][k][t]) % mod;
                    else for(int t = 1; t <= rollMax[k]; ++t)
                        f[i][j][1] = (f[i][j][1] + f[i-1][k][t]) % mod;
                }
        int res = 0;
        for(int i = 0; i < 6; ++i)
            for(int j = 0; j <= rollMax[i]; ++j)
                res = (res + f[n][i][j]) % mod;
        return res;
    }
```

### [1224. 最大相等频率](https://leetcode-cn.com/problems/maximum-equal-frequency/) [TAG]

`unordered_map + map` 计数动态统计题

类似的还有 Weekly 12 ：[1244. 力扣排行榜](https://leetcode-cn.com/problems/design-a-leaderboard/)

```c++
class Solution {
public:
    map<int, int> s;
    map<int, int>::iterator it;
    void del(int x) {
        if(s[x] > 1) --s[x];
        else s.erase(x);
    }
    void ins(int x) {
        ++s[x];
    }
    bool check() {
        if(s.size() > 2) return false;
        // 只有一个字符 或一个字符出现连续多次
        int c0 = s.begin()->first, n0 = s.begin()->second;
        if(s.size() == 1) return c0 == 1 || n0 == 1;

        // 此时 size = 2   
        it = s.begin();
        ++it;
        int c1 = it->first, n1 = it->second;
        // 有两个不同的出现次数 则第一个次数为0且只出现一次
        //  或 第一个出现次数比第二个小1且只出现1次
        return c0 == 1 && n0 == 1 || c1 == c0+1 && n1 == 1;
    }
    int maxEqualFreq(vector<int>& nums) {
        // unordered_map key->cnt
        // map cnt->num
        int n = nums.size(), v, res = 0;
        unordered_map<int, int> kc;
        for(int i = 0; i < n; ++i) {
            v = nums[i];
            if(kc[v]) del(kc[v]);
            ins(++kc[v]);
            if(check()) res = i;
        }
        return res+1;
    }
};
```
