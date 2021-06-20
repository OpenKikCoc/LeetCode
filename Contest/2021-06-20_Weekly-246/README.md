## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-246)

rank: 64 / 4135


### [5788. 字符串中的最大奇数](https://leetcode-cn.com/problems/largest-odd-number-in-string/)

碰到一个奇数作为末尾数字返回即可

```c++
class Solution {
public:
    string largestOddNumber(string num) {
        int n = num.size();
        string res;
        for (int i = n - 1; i >= 0; -- i )
            if ((num[i] - '0') & 1) {
                res = num.substr(0, i + 1);
                break;
            }
        return res;
    }
};
```


### [5789. 你完成的完整对局数](https://leetcode-cn.com/problems/the-number-of-full-rounds-you-have-played/)

统计其中有多少个 15 整倍数即可，注意加 15 的偏移量保证其为完整的回合

```c++
class Solution {
public:
    int get(string s) {
        int h = (s[0] - '0') * 10 + s[1] - '0';
        int m = (s[3] - '0') * 10 + s[4] - '0';
        return h * 60 + m;
    }
    
    int numberOfRounds(string startTime, string finishTime) {
        int st = get(startTime), ed = get(finishTime);
        
        if (st > ed)
            ed += get("24:00");
        
        int res = 0;
        for (int i = st + 15; i <= ed; ++ i )
            if (i % 15 == 0)
                res ++ ;
        
        return res;
    }
};
```

也可以数学解法，其实就是去掉个 for 循环

```c++
// yxc
class Solution {
public:
    int get(string s) {
        int a, b;
        sscanf(s.c_str(), "%d:%d", &a, &b);
        return a * 60 + b;
    }
    
    int numberOfRounds(string a, string b) {
        int x = get(a), y = get(b);
        if (x > y) y += 1440;
        x = (x + 14) / 15, y /= 15;
        return max(0, y - x);
    }
};
```



### [5791. 统计子岛屿](https://leetcode-cn.com/problems/count-sub-islands/)

简单 dfs 注意判断子岛屿的全局标记方式即可

```c++
class Solution {
public:
    vector<vector<int>> g1, g2, num, st;
    int n, m;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    
    bool f;
    
    void dfs1(int x, int y, int k) {
        num[x][y] = k;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && g1[nx][ny] && !num[nx][ny])
                dfs1(nx, ny, k);
        }
    }
    
    void dfs2(int x, int y, int k) {
        if (num[x][y] != k)
            f = false;
        
        st[x][y] = k;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && g2[nx][ny] && !st[nx][ny])
                dfs2(nx, ny, k);
        }
    }
    
    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        this->g1 = grid1, this->g2 = grid2;
        n = g1.size(), m = g1[0].size();
        num = st = vector<vector<int>>(n, vector<int>(m, 0));
        
        {
            int cnt = 0;
            for (int i = 0; i < n; ++ i )
                for (int j = 0; j < m; ++ j )
                    if (g1[i][j] && !num[i][j])
                        dfs1(i, j, ++ cnt);
        }
        
        int res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g2[i][j] && !st[i][j] && num[i][j]) {
                    f = true;
                    dfs2(i, j, num[i][j]);
                    
                    if (f)
                        res ++ ;
                }
        
        return res;
    }
};
```

可以简化

>   可以直接 dfs g2 的原因：
>
>   **dfs g2过程中不会出现碰到两个g1岛屿的情况（否则g1这两块必然联通或出现了非岛屿的点）**

```c++
class Solution {
public:
    int n, m;
    vector<vector<int>> g1, g2;
    int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
    
    bool dfs(int x, int y) {
        bool f = true;
        if (!g1[x][y]) f = false;
        g2[x][y] = 0;
        for (int i = 0; i < 4; i ++ ) {
            int a = x + dx[i], b = y + dy[i];
            if (a >= 0 && a < n && b >= 0 && b < m && g2[a][b]) {
                if (!dfs(a, b)) f = false;
            }
        }
        return f;
    }
    
    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        g1 = grid1, g2 = grid2;
        n = g1.size(), m = g1[0].size();
        int res = 0;
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ )
                if (g2[i][j]) {
                    if (dfs(i, j)) res ++ ;
                }
        
        return res;
    }
};
```



### [5790. 查询差绝对值的最小值](https://leetcode-cn.com/problems/minimum-absolute-difference-queries/)

根据数据集范围推测直接使用前缀和统计查询区间中出现的所有数字，去重遍历即可

```c++
class Solution {
public:
    // ATTENTION num[i] <= 100
    const static int N = 1e5 + 10, M = 110;
    int cnt[N][M], t[M], n;
    
    vector<int> minDifference(vector<int>& nums, vector<vector<int>>& queries) {
        n = nums.size();
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= 100; ++ j ) {
                cnt[i][j] = cnt[i - 1][j];
                if (nums[i - 1] == j)
                    cnt[i][j] ++ ;
            }
        
        vector<int> res;
        for (auto & q : queries) {
            int l = q[0], r = q[1];
            vector<int> t;
            for (int i = 1; i <= 100; ++ i )
                if (cnt[r + 1][i] > cnt[l][i])
                    t.push_back(i);
            sort(t.begin(), t.end());
            int sz = t.size(), ret = 2e9;
            for (int i = 1; i < sz; ++ i )
                ret = min(ret, t[i] - t[i - 1]);
            if (ret == 2e9)
                ret = -1;
            res.push_back(ret);
        }
        return res;
    }
};
```
