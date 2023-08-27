## [比赛链接](https://leetcode.cn/contest/weekly-contest-360/)


### [8015. 距离原点最远的点](https://leetcode.cn/problems/furthest-point-from-origin/)



```c++
class Solution {
public:
    int furthestDistanceFromOrigin(string moves) {
        int l = 0, r = 0, mx = 0;
        for (auto c : moves) {
            if (c == 'L')
                l -- , r -- ;
            else if (c == 'R')
                l ++ , r ++ ;
            else {
                l -- , r ++ ;
            }
        }
        return max(abs(l), abs(r));
    }
};
```


### [8022. 找出美丽数组的最小和](https://leetcode.cn/problems/find-the-minimum-possible-sum-of-a-beautiful-array/)



```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10, M = N << 1;
    
    int st[M];
    
    long long minimumPossibleSum(int n, int target) {
        memset(st, 0, sizeof st);
        
        for (int i = 1; i < target - i; ++ i )
            st[target - i] = true;
        
        LL s = 0;
        for (int i = 1, t = 0; i < M; ++ i ) {
            if (st[i])
                continue;
            s += i;
            t ++ ;
            if (t == n)
                break;
        }
        return s;
    }
};
```

### [2835. 使子序列的和等于目标的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-form-subsequence-with-target-sum/) [TAG]

思维

```c++
class Solution {
public:
    // 思考: 从输入入手
    // - 它包含 非负 整数，且全部为 2 的幂 => 二进制不会有多个1
    // - 个数不超过 1k
    //
    // 可以尽着原数组选择 剩下不够的就尝试拆分其他数
    // => 拆分 意味着只能用原数的一部分值 其他情况下都要尽量求和
    // 【ATTENTION】 
    // 重要思想: 前面的某个部分一定可以和后面的拆分后组合 
    // - 如果一系列 2 的幂次的和大于等于另一个 2 的幂次，且前面系列的每个数都小于这个幂次，那么前面部分的子序列一定能表示这个幂次
    
    using LL = long long;
    const static int N = 40;
    
    int c[N];
    
    int minOperations(vector<int>& nums, int target) {
        {
            LL s = 0;
            for (auto x : nums)
                s += x;
            if (s < target)
                return -1;
        }
        
        memset(c, 0, sizeof c);
        for (auto x : nums)
            for (int i = 0; i < 31; ++ i )
                if (x >> i & 1) {
                    c[i] ++ ;
                    break;
                }
        // 所有输入都已经分类统计在 c 数组内
        
        LL res = 0, sum = 0;
        for (int i = 0; i < 31; ++ i ) {
            sum += (LL)c[i] * (1 << i);
            if (!(target >> i & 1))
                continue;
            
            sum -= 1 << i;
            
            if (sum < 0)
                for (int j = i + 1; j < 31; ++ j )
                    if (c[j]) {     // 一定可以找到
                        res += j - i;
                        c[j] -- , sum += 1 << j;
                        break;
                    }
        }
        return res;
    }
};
```

### [2836. 在传球游戏中最大化函数值](https://leetcode.cn/problems/maximize-value-of-function-in-a-ball-passing-game/)

标准倍增

数据范围敏感度 要能想到使用倍增

```c++
using LL = long long;
const static int N = 1e5 + 10, M = 35;

// 倍增预处理
// 每个节点的 i 的第 2^j 个祖先节点，以及从 i 到第 2^j 祖先的节点编号之和 (不包含第 2^j 的祖先)
// [放在 class 外防止 TLE]
int f[N][M];
LL g[N][M];    

class Solution {
public:
    vector<int> r;
    int n;

    long long getMaxFunctionValue(vector<int>& receiver, long long k) {
        this->r = receiver;
        this->n = r.size();
        
        k ++ ;  // ATTENTION: 恰好传 k 次
        
        {
            // 标准倍增
            for (int j = 0; j < M; ++ j )
                for (int i = 0; i < n; ++ i )
                    if (j == 0) {
                        f[i][0] = r[i], g[i][0] = i;
                    } else {
                        f[i][j] = f[f[i][j - 1]][j - 1];
                        g[i][j] = g[i][j - 1] + g[f[i][j - 1]][j - 1];
                    }
        }
            
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            LL t = 0;
            for (int j = M - 1, p = i; j >= 0; -- j )
                if (k >> j & 1) {
                    t += g[p][j];
                    p = f[p][j];
                }
            res = max(res, t);
        }
        return res;
    }
};
```
