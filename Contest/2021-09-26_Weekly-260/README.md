## [比赛链接](https://leetcode.cn/contest/weekly-contest-260/)


### [2016. 增量元素之间的最大差值](https://leetcode.cn/problems/maximum-difference-between-increasing-elements/)

暴力 略

```c++
class Solution {
public:
    int maximumDifference(vector<int>& nums) {
        int res = -1, minv = 2e9;
        for (auto v : nums) {
            if (v > minv)
                res = max(res, v - minv);
            minv = min(minv, v);
        }
        return res;
    }
};
```


### [2017. 网格游戏](https://leetcode.cn/problems/grid-game/)

思考易知无需博弈

显然第一个机器人走之后留下的分数可以被分为【**左下 / 右上**】两类

前缀和 + 统计即可

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 5e4 + 10;
    
    int n;
    
    long long gridGame(vector<vector<int>>& grid) {
        this->n = grid[0].size();
        
        vector<LL> sl(n), sr(n);
        LL tot = 0;
        for (int i = 0; i < n; ++ i ) {
            tot += grid[0][i];
            if (i == 0)
                sl[i] = grid[0][i];
            else
                sl[i] = sl[i - 1] + grid[0][i];
        }
            
        for (int i = n - 1; i >= 0; -- i ) {
            tot += grid[1][i];
            if (i == n - 1)
                sr[i] = grid[1][i];
            else
                sr[i] = sr[i + 1] + grid[1][i];
        }
        
        LL res = tot;
        for (int i = 0; i < n; ++ i ) {
            LL s1 = sr[0] - sr[i], s2 = sl[n - 1] - sl[i];
            res = min(res, max(s1, s2));
        }
        return res;
    }
};
```

### [2018. 判断单词是否能放入填字游戏内](https://leetcode.cn/problems/check-if-word-can-be-placed-in-crossword/)

模拟即可 注意筛选条件

可逆序细节WA1

```c++
class Solution {
public:
    int n, m;
    vector<vector<char>> g;
    
    bool placeWordInCrossword(vector<vector<char>>& board, string word) {
        this->g = board;
        this->n = g.size(), this->m = g[0].size();
        vector<vector<int>> l(n, vector<int>(m)), u(n, vector<int>(m));
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j] != '#') {
                    l[i][j] = (j - 1 >= 0 ? l[i][j - 1] : 0) + 1;
                    u[i][j] = (i - 1 >= 0 ? u[i - 1][j] : 0) + 1;
                }
        
        int len = word.size();
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                if (l[i][j] == len && (j == m - 1 || g[i][j + 1] == '#')) {
                    int st = j - len + 1, ed = j;
                    {
                        bool flag = true;
                        for (int k = st; k <= ed; ++ k )
                            if (g[i][k] != ' ' && g[i][k] != word[k - st]) {
                                flag = false;
                                break;
                            }
                        if (flag)
                            return true;
                    }
                    {
                        bool flag = true;
                        for (int k = ed; k >= st; -- k )
                            if (g[i][k] != ' ' && g[i][k] != word[len - (k - st) - 1]) {
                                flag = false;
                                break;
                            }
                        if (flag)
                            return true;
                    }
                }
                if (u[i][j] == len && (i == n - 1 || g[i + 1][j] == '#')) {
                    int st = i - len + 1, ed = i;
                    {
                        bool flag = true;
                        for (int k = st; k <= ed; ++ k )
                            if (g[k][j] != ' ' && g[k][j] != word[k - st]) {
                                flag = false;
                                break;
                            }
                        if (flag)
                            return true;
                    }
                    {
                        bool flag = true;
                        for (int k = ed; k >= st; -- k )
                            if (g[k][j] != ' ' && g[k][j] != word[len - (k - st) - 1]) {
                                flag = false;
                                break;
                            }
                        if (flag)
                            return true;
                    }
                }
            }
        return false;
    }
};
```

### [2019. 解出数学表达式的学生分数](https://leetcode.cn/problems/the-score-of-students-solving-math-expression/) [TAG]

**带优先级的表达式求值 + 区间DP**

重点在于区间DP细节及剪枝

```c++
class Solution {
public:
    stack<int> num;
    stack<char> op;
    void eval() {
        auto a = num.top(); num.pop();
        auto b = num.top(); num.pop();
        auto c = op.top(); op.pop();
        int r;
        if (c == '+')
            r = a + b;
        else
            r = a * b;
        num.push(r);
    }
    int calc(string s) {
        unordered_map<char, int> pr;
        pr['+'] = pr['-'] = 1, pr['*'] = pr['/'] = 2;
        for (int i = 0; i < s.size(); ++ i ) {
            char c = s[i];
            if (c == ' ')
                continue;
            if (isdigit(c)) {
                int x = 0, j = i;
                while (j < s.size() && isdigit(s[j]))
                    x = x * 10 + s[j] - '0', j ++ ;
                num.push(x);
                i = j - 1;
            } else {
                while (op.size() && pr[op.top()] >= pr[c])
                    eval();
                op.push(c);
            }
        }
        while (op.size())
            eval();
        return num.top();
    }

    int scoreOfStudents(string s, vector<int>& answers) {
        int tar = calc(s), n = s.size();

        unordered_set<int> f[32][32];
        for (int len = 1; len <= n; ++ len )
            for (int l = 0; l + len - 1 < n; l += 2 ) {
                int r = l + len - 1;
                if (l == r)
                    f[l][r].insert(s[l] - '0');
                else {
                    for (int k = l; k < r; k += 2)
                        for (auto v1 : f[l][k])
                            for (auto v2 : f[k + 2][r]) {
                                int t = 0;
                                if (s[k + 1] == '+')
                                    t = v1 + v2;
                                else
                                    t = v1 * v2;
                                if (t > 1000)
                                    continue;
                                f[l][r].insert(t);
                            }
                }
            }
        
        int res = 0;
        for (auto v : answers)
            if (v == tar)
                res += 5;
            else if (f[0][n - 1].count(v))
                res += 2;
        return res;
    }
};
```

一开始写的超时代码：

```c++
// TLE
class Solution {
public:
    using PON = pair<vector<char>, vector<int>>;
    using PONI = pair<PON, int>;
        
    int n, tar;
    unordered_set<int> S;
    set<PONI> hash;
    
    PON parse(string s) {
        vector<char> ops;
        vector<int> nums;
        int n = s.size();
        for (int i = 0; i < n; ++ i ) {
            int j = i, v = 0;
            while (j < n && isdigit(s[j]))
                v = v * 10 + s[j] - '0', j ++ ;
            nums.push_back(v);
            if (j < n)
                ops.push_back(s[j]);
            i = j;
        }
        return {ops, nums};
    }
    
    int op(char c, int a, int b) {
        if (c == '+')
            return a + b;
        return a * b;
    }
    
    void dfs(vector<char> ops, vector<int> nums, int cnt) {
        // MEM
        PONI t = {{ops, nums}, cnt};
        if (hash.count(t))
            return;
        hash.insert(t);
        
        if (ops.empty()) {
            // cout << "cnt = " << cnt << " nums[0] = " << nums[0] << endl;
            if (cnt == 0)
                this->tar = nums[0];
            else
                S.insert(nums[0]);
            return;
        }
        
        int n = ops.size(), p = 0;
        for (int i = 0; i < n; ++ i )
            if (ops[i] == '*') {
                p = i;
                break;
            }
        
        for (int i = 0; i < n; ++ i ) {
            int v = op(ops[i], nums[i], nums[i + 1]);
            // ATTENTION 增加一个剪枝
            if (v >= 1000)
                continue;
            
            vector<char> t_ops;
            vector<int> t_nums;
            for (int j = 0; j < i; ++ j )
                t_ops.push_back(ops[j]), t_nums.push_back(nums[j]);
            t_nums.push_back(v);
            for (int j = i + 1; j < n; ++ j )
                t_ops.push_back(ops[j]), t_nums.push_back(nums[j + 1]);
            dfs(t_ops, t_nums, cnt + (i != p));
        }
    }
    
    int scoreOfStudents(string s, vector<int>& answers) {
        this->n = s.size();
        auto [ops, nums] = parse(s);
        
        dfs(ops, nums, 0);
        
        // cout << "tar = " << tar << endl;
        
        int res = 0;
        for (auto v : answers)
            if (v == tar)
                res += 5;
            else if (S.count(v))
                res += 2;
        return res;
    }
};
```

