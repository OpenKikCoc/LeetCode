## [比赛链接](https://leetcode.cn/contest/weekly-contest-171/)


### [1317. 将整数转换为两个无零整数的和](https://leetcode.cn/problems/convert-integer-to-the-sum-of-two-no-zero-integers/)

暴力即可

```c++
    // 检查是否不含0
    bool check(int x) {
        string sx = to_string(x);
        for(auto c : sx) if(c == '0') return false;
        return true;
    }
    vector<int> getNoZeroIntegers(int n) {
        for(int i = 1; i <= n/2; ++i) {
            int j = n-i;
            if(check(i) && check(j)) return vector<int>{i, j};
        }
        return vector<int>{};
    }
```


### [1318. 或运算的最小翻转次数](https://leetcode.cn/problems/minimum-flips-to-make-a-or-b-equal-to-c/)

题意遍历即可

```c++
    int minFlips(int a, int b, int c) {
        int res = 0;
        for(int p = 1; p < 32; ++p) {
            int d = 1<<(p-1);
            if((c & d) && ((a&d) == 0 && (b&d) == 0)) ++res;
            else if(!(c & d)) {
                if(a&d) ++res;
                if(b&d) ++res;
            }
        }
        return res;
    }
```

### [1319. 连通网络的操作次数](https://leetcode.cn/problems/number-of-operations-to-make-network-connected/)

n 个节点已有连接 connections , 检查至少还需要拆多少个绳子

一开始做法是检查有多少个节点完全没有绳子连接 返回个数 但这样没有考虑到**已经用绳子连接的部分可能不联通 有绳子不联通的统一需要加绳子**

并查集 检查联通量个数即可

```c++
    int find(int x, vector<int>& fa) {
        return x == fa[x] ? x : fa[x] = find(fa[x], fa);
    }
    int makeConnected(int n, vector<vector<int>>& connections) {
        int cn = connections.size();
        if(n > cn+1) return -1;
        
        vector<int> fa(n);
        for(int i = 0; i < n; ++i) fa[i] = i;
        int part = n;
        for(auto v : connections) {
            int f0 = find(v[0], fa), f1 = find(v[1], fa);
            if(f0 != f1) {
                --part;
                fa[f0] = f1;
            }
        }
        return part-1;
    }
```

### [1320. 二指输入的的最小距离](https://leetcode.cn/problems/minimum-distance-to-type-a-word-using-two-fingers/) [TAG]

三个状态就可以过 做的时候在想减少一维

300ms

```c++
    int minimumDistance(string word) {
        vector<vector<int>> cost(30, vector<int>(30));
        for(int i = 0; i < 26; ++i) {
            for(int j = 0; j < 26; ++j) {
                int x1 = i/6, y1 = i%6, x2 = j/6, y2 = j%6;
                cost[i][j] = cost[j][i] = abs(x1-x2) + abs(y1-y2);
            }
        }
        int n = word.size();
        vector<vector<vector<int>>> f(n+1, vector<vector<int>>(26, vector<int>(26, INT_MAX/2)));
        for(int i = 0; i < 26; ++i) for(int j = 0; j < 26; ++j) f[0][i][j] = 0;
        for(int i = 1; i <= n; ++i) {
            int c = word[i-1] - 'A';
            for(int j = 0; j < 26; ++j) {
                for(int k = 0; k < 26; ++k) {
                    // j k 为上一阶段 左右指的键位 这里可以不存在直接continue 小优化
                    f[i][j][c] = min(f[i][j][c], f[i-1][j][k]+cost[k][c]);  // 移动右指
                    f[i][c][k] = min(f[i][c][k], f[i-1][j][k]+cost[j][c]);
                }
            }
        }
        int res = INT_MAX;
        for(int j = 0; j < 26; ++j)
            for(int k = 0; k < 26; ++k)
                res = min(res, f[n][j][k]);
        return res;
    }
```

减少一维：

> 重新设计一种新的状态：**字母下标**（可以代表**第一个**指头键位），**另外一个指头的键位**。
>
> 每次按下一个字母时，要么是字母下标所在的指头（**第一个指头**）移动，要么是**另外一个指头**移动。



>因此我们可以直接使用 dp[i][rest] 进行状态转移，其表示一只手在 word[i] 的位置，另一只手在 rest 的位置的最小移动距离。
>
>我们并不需要关心具体哪只手在 word[i] 的位置，因为两只手是完全对称的。
>
>这样一来，我们将三维的动态规划优化至了二维，大大减少了空间的使用。

4ms

```c++
    int getDistance(int p, int q) {
        int x1 = p / 6, y1 = p % 6;
        int x2 = q / 6, y2 = q % 6;
        return abs(x1 - x2) + abs(y1 - y2);
    }

    int minimumDistance(string word) {
        int n = word.size();
        int dp[n][26];
        fill(&dp[0][0], &dp[0][0] + n * 26, INT_MAX >> 1);
        fill(&dp[0][0], &dp[0][0] + 26, 0);
        
        for (int i = 1; i < n; ++i) {
            int cur = word[i] - 'A';
            int prev = word[i - 1] - 'A';
            int d = getDistance(prev, cur);
            for (int j = 0; j < 26; ++j) {
                dp[i][j] = min(dp[i][j], dp[i - 1][j] + d);
                if (prev == j) {
                    for (int k = 0; k < 26; ++k) {
                        int d0 = getDistance(k, cur);
                        dp[i][j] = min(dp[i][j], dp[i - 1][k] + d0);
                    }
                }
            }
        }

        int ans = *min_element(dp[n - 1], dp[n - 1] + 26);
        return ans;
    }
```

