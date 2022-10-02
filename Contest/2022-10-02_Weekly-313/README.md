## [比赛链接](https://leetcode.cn/contest/weekly-contest-313/)

>   rank: 99 / 5445


### [6192. 公因子的数目](https://leetcode.cn/problems/number-of-common-factors/)



```c++
class Solution {
public:
    int commonFactors(int a, int b) {
        int res = 0;
        for (int i = 1; i <= a && i <= b; ++ i ) {
            if (a % i == 0 && b % i == 0)
                res ++ ;
        }
        return res;
    }
};
```


### [6193. 沙漏的最大总和](https://leetcode.cn/problems/maximum-sum-of-an-hourglass/)



```c++
class Solution {
public:
    vector<vector<int>> g;
    int n, m;
    
    int dx[7] = {-1, -1, -1, 0, 1, 1, 1}, dy[7] = {-1, 0, 1, 0, -1, 0, 1};
    int get(int x, int y) {
        int ret = 0;
        for (int i = 0; i < 7; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            ret += g[nx][ny];
        }
        return ret;
    }
    
    int maxSum(vector<vector<int>>& grid) {
        this->g = grid;
        n = g.size(), m = g[0].size();
        
        int res = 0;
        for (int i = 1; i < n - 1; ++ i )
            for (int j = 1; j < m - 1; ++ j ) {
                res = max(res, get(i, j));
            }
        return res;
    }
};
```

### [6194. 最小 XOR](https://leetcode.cn/problems/minimize-xor/)



```c++
class Solution {
public:
    int minimizeXor(int num1, int num2) {
        int t = __builtin_popcount(num2);
        int res = 0;
        for (int i = 31; i >= 0 && t; -- i )
            if (num1 >> i & 1)
                res += 1 << i, t -- ;
        for (int i = 0; i < 31 && t; ++ i )
            if ((num1 >> i & 1) == 0)
                res += 1 << i, t -- ;
        return res;
    }
};
```

### [6195. 对字母串可执行的最大删除数](https://leetcode.cn/problems/maximum-deletions-on-a-string/)

lcp 也可，略

```c++
class Solution {
public:
    // 显然每次只能从前面去删，单向转移
    using ULL = unsigned long long;
    const static int N = 4010, P = 131;
    
    int n;
    ULL h[N], p[N];
    
    ULL get(int l, int r) {
        return h[r] - h[l - 1] * p[r - l + 1];
    }
    
    int f[N];
    
    int deleteString(string s) {
        n = s.size();
        p[0] = 1, h[0] = 0;
        for (int i = 1; i <= n; ++ i ) {
            h[i] = h[i - 1] * P + s[i - 1];
            p[i] = p[i - 1] * P;
        }
        
        memset(f, 0, sizeof f);
        for (int i = 1; i <= n; ++ i )
            f[i] = 1;
        for (int i = n; i; -- i )
            for (int l = 1; i + 2 * l - 1 <= n; ++ l )
                if (get(i, i + l - 1) == get(i + l, i + 2 * l - 1))
                    f[i] = max(f[i], f[i + l] + 1);
        // for (int i = 1; i <= n; ++ i )
        //     cout << f[i] << ' ';
        // cout << endl;
        return f[1];
    }
};
```
