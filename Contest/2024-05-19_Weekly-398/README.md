## [比赛链接](https://leetcode.cn/contest/weekly-contest-398/)

>   0:35:16  0:01:02  0:04:42  0:13:09  0:30:16 1


### [3151. 特殊数组 I](https://leetcode.cn/problems/special-array-i/)



```c++
class Solution {
public:
    int get(int x) {
        return x & 1;
    }
    
    bool isArraySpecial(vector<int>& nums) {
        int n = nums.size();
        for (int i = 1; i < n; ++ i )
            if (get(nums[i]) == get(nums[i - 1]))
                return false;
        return true;
    }
};
```


### [3152. 特殊数组 II](https://leetcode.cn/problems/special-array-ii/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int id[N];
    
    int get(int x) {
        return x & 1;
    }
    
    vector<bool> isArraySpecial(vector<int>& nums, vector<vector<int>>& queries) {
        int n = nums.size();
        for (int i = 0, s = 0; i < n; ++ i ) {
            id[i] = s;
            int j = i + 1;
            while (j < n && get(nums[j]) != get(nums[j - 1]))
                id[j] = s, j ++ ;
            i = j - 1;
            s ++ ;
        }
        
        vector<bool> res;
        for (auto & q : queries) {
            int l = q[0], r = q[1];
            res.push_back(id[l] == id[r]);
        }
        return res;
    }
};
```

###[3153. 所有数对中数位不同之和](https://leetcode.cn/problems/sum-of-digit-differences-of-all-pairs/) 



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 10;
    
    LL c[N][N]; // 每一个数位上 每一个数字的个数
    LL s[N];
    
    long long sumDigitDifferences(vector<int>& nums) {
        memset(c, 0, sizeof c);
        for (auto x : nums) {
            int p = 0;
            while (x) {
                c[p][x % 10] ++ , s[p] ++ , p ++ ;
                x /= 10;
            }
        }
        
        LL res = 0;
        for (int i = 0; i < N; ++ i )
            if (s[i]) {
                res += s[i] * (s[i] - 1) / 2;
                for (int j = 0; j < N; ++ j )
                    res -= c[i][j] * (c[i][j] - 1) / 2;
            }
        return res;
    }
};
```

### [3154. 到达第 K 级台阶的方案数](https://leetcode.cn/problems/find-number-of-ways-to-reach-the-k-th-stair/)

结合题意 [约束]，结合数据范围求解

```c++
class Solution {
public:
    // 考虑到第一种操作无法无限使用 假设每次跳都执行一次
    // 则根据k的数据范围结合第二种操作的限制  最多跳 32*2=64 次
    
    int k, res;
    
    unordered_map<int, unordered_map<int, unordered_map<int, int>>> mem;
    
    int dfs(int u, int p, int j) {
        if (u > k + 2)
            return 0;
        
        if (mem[u][p].count(j))
            return mem[u][p][j];
        
        int ret = 0;
        
        if (u == k)
            ret ++ ;
        
        if (p != 0)
            ret += dfs(u - 1, 0, j);
        ret += dfs(u + (1 << j), 1, j + 1);
        return mem[u][p][j] = ret;
    }
    
    int waysToReachStair(int k) {
        this->k = k, this->res = 0;
        return dfs(1, -1, 0);
    }
};
```

实际上，本题相当于在连续的第二种操作中间插入第一种操作。

假设两种操作分别做了 $i$ 次 / $j$ 次，数学分析：

$第二种操作 上升数量\ up1=1+2+...+2^{j-1}=2^j-1$

$第一种操作上升数量\ up2=i\ (0<=i<=j+1)$

$总的上升数量={up1 + up2}$

则 $k-1\ (-1是因为起点为1)$ 必然在此范围内，由此可推导 $j$ 的合法值，随后排列组合计算即可...

```c++
class Solution {
public:
    const static int N = 32;
    
    int c[N][N];
    void init() {
        for (int i = 0; i < N; ++ i )
            for (int j = 0; j <= i; ++ j )
                if (!j)
                    c[i][j] = 1;
                else
                    c[i][j] = c[i - 1][j] + c[i - 1][j - 1];
    }
    
    int comb(int a, int b) {
        return c[a][b];
    }
    
    int waysToReachStair(int k) {
        init();
        k -- ;  // ATTENTION 起点偏移一下
        
        int res = 0;
        for (int j = 0; j < 31; ++ j ) {
            int tot = (1 << j) - 1;
            if (tot >= k && tot - (j + 1) <= k) {
                int i = tot - k;
                // 在 j+1 个缝隙里找到 i 个位置插入
                res += comb(j + 1, i);
            }
        }
        return res;
    }
};
```

