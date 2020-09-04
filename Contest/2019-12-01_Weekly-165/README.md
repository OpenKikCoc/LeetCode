## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-165/)


### [1275. 找出井字棋的获胜者](https://leetcode-cn.com/problems/find-winner-on-a-tic-tac-toe-game/)

模拟判断即可

```c++
    bool check(vector<vector<char>>& m, char c) {
        if(m[0][0] == c && m[1][1] == c && m[2][2] == c) return true;
        if(m[0][2] == c && m[1][1] == c && m[2][0] == c) return true;
        for(int i = 0; i < 3; ++i)
            if(m[i][0] == c && m[i][1] == c && m[i][2] == c) return true;
        for(int i = 0; i < 3; ++i)
            if(m[0][i] == c && m[1][i] == c && m[2][i] == c) return true;
        return false;
    }
    string tictactoe(vector<vector<int>>& moves) {
        int n = moves.size();
        vector<vector<char>> m(3, vector<char>(3, ' '));
        for(int i = 0; i < n; ++i) {
            int x = moves[i][0], y = moves[i][1];
            if(i&1) m[x][y] = 'O';
            else m[x][y] = 'X';
        }
        if(check(m, 'X')) return "A";
        else if(check(m, 'O')) return "B";
        else if(n == 9) return "Draw";
        else return "Pending";
    }
```


### [1276. 不浪费原料的汉堡制作方案](https://leetcode-cn.com/problems/number-of-burgers-with-no-waste-of-ingredients/)

显然是二元一次方程，可以直接解

> 4x + 2y = tomato
> x  + y  = cheese	
> ==> 
> x = (tomato − 2 X cheese)/2
> y = cheese-x
> 出现非整数或负数则无解

或者二分过

```c++
    vector<int> numOfBurgers(int ts, int cs) {
        int l = 0, r = cs+1;
        while(l < r) {
            int m = l + (r-l)/2;
            int cts = m*4+(cs-m)*2;
            if(cts < ts) l = m+1;
            else r = m;
        }
        if(l*4+(cs-l)*2 == ts) return vector<int>{l, cs-l};
        return vector<int>{};
    }
```

### [1277. 统计全为 1 的正方形子矩阵](https://leetcode-cn.com/problems/count-square-submatrices-with-all-ones/)

dp 统计以每个点为右下角的正方形矩阵个数，该个数即为以该点为右下角的最大正方形边长

```c++
    int countSquares(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> f(m+1, vector<int>(n+1));
        int res = 0;
        for(int i = 1; i <= m; ++i)
            for(int j = 1; j <= n; ++j) if(matrix[i-1][j-1] == 1) {
                f[i][j] = min(min(f[i-1][j], f[i][j-1]), f[i-1][j-1])+1;
                res += f[i][j];
            }
        return res;
    }
```

### [1278. 分割回文串 III](https://leetcode-cn.com/problems/palindrome-partitioning-iii/)

区间dp预处理得到转变某个区间到回文串的 `cost` 

随后线性dp即可

```c++
    const int inf = 0x3f3f3f3f;
    int palindromePartition(string s, int k) {
        int n = s.size();
        vector<vector<int>> cost(n+1, vector<int>(n+1));
        for(int len = 2; len <= n; ++len)
            for(int l = 1; l+len-1 <= n; ++l) {
                int r = l+len-1;
                cost[l][r] = cost[l+1][r-1] + (s[l-1]==s[r-1]?0:1);
            }
        // 前i个字符拆成j个子串所需要的最小修改次数
        vector<vector<int>> f(n+1, vector<int>(n+1, inf));
        f[0][0] = 0;
        for(int i = 1; i <= n; ++i)
            for(int j = 1; j <= min(k, j); ++j) {
                if(j == 1) f[i][j] = cost[1][i];
                else {
                    // j-1 前面j-1段则长度最少j-1
                    for(int x = j-1; x < i; ++x) f[i][j] = min(f[i][j], f[x][j-1]+cost[x+1][i]);
                }
            }
        return f[n][k];
    }
```
