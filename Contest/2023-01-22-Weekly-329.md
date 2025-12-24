## [比赛链接](https://leetcode.cn/contest/weekly-contest-329/)

>   virtual rank: 181 / 2591


### [2544. 交替数字和](https://leetcode.cn/problems/alternating-digit-sum/)



```c++
class Solution {
public:
    int alternateDigitSum(int n) {
        string s = to_string(n);
        int res = 0;
        for (int i = 0; i < s.size(); ++ i )
            if (i & 1)
                res -= s[i] - '0';
            else
                res += s[i] - '0';
        return res;
    }
};
```


### [2545. 根据第 K 场考试的分数排序](https://leetcode.cn/problems/sort-the-students-by-their-kth-score/)



```c++
class Solution {
public:
    vector<vector<int>> sortTheStudents(vector<vector<int>>& score, int k) {
        sort(score.begin(), score.end(), [&](vector<int> & a, vector<int> & b) {
            return a[k] > b[k];
        });
        return score;
    }
};
```

### [2546. 执行逐位运算使字符串相等](https://leetcode.cn/problems/apply-bitwise-operations-to-make-strings-equal/)



```c++
class Solution {
public:
    // 0, 0 => 0, 0
    // 0, 1 => 1, 1
    // 1, 0 => 1, 1
    // 1, 1 => 1, 0 | 0, 1
    
    // 结论：1 可以把另一个 0 变成 1，或把另一个 1 变成 0
    //      但是无法彻底消除 1
    
    bool hasC(string & s, char c) {
        for (auto t : s)
            if (t == c)
                return true;
        return false;
    }
    
    bool makeStringsEqual(string s, string target) {
        bool f = hasC(s, '1');
        for (int i = 0; i < s.size(); ++ i )
            if (s[i] != target[i]) {
                // 如果有 1 则可以转换，不管是哪一个 1
                if (!f)
                    return false;
            }
        // 无法彻底消除 1
        if (f && !hasC(target, '1'))
            return false;
        return true;
    }
};
```

简化

```c++
class Solution {
public:
    bool hasC(string & s, char c) {
        for (auto t : s)
            if (t == c)
                return true;
        return false;
    }

    bool makeStringsEqual(string s, string target) {
        return hasC(s, '1') == hasC(target, '1');
    }
};
```



### [2547. 拆分数组的最小代价](https://leetcode.cn/problems/minimum-cost-to-split-an-array/)

dp 优化 略

```c++
class Solution {
public:
    // 仅出现一次的数字将会被移除
    // 1000 数据范围接受预处理
    using LL = long long;
    const static int N = 1010;
    
    int t[N][N];
    int f[N];    // 以 i 为结尾的最小代价  ATTENTION[不关心之前分了多少段 显然一维即可]
    
    int minCost(vector<int>& nums, int k) {
        int n = nums.size();
        // i, j 区间内的 trimmed 值, 需要优化
        for (int i = 1; i <= n; ++ i ) {
            static int c[N];
            memset(c, 0, sizeof c);
            int x = 0;
            for (int j = i, one = 0; j <= n; ++ j ) {
                int v = nums[j - 1];
                
                c[v] ++ ;
                if (c[v] == 1)
                    one ++ ;
                else if (c[v] == 2)
                    one -- , x += 2;
                
                if (c[v] > 2)
                    x ++ ;
                
                t[i][j] = x;
            }
        }
        
        
        memset(f, 0x3f, sizeof f);
        f[0] = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 0; j < i; ++ j )
                f[i] = min(f[i], f[j] + t[j + 1][i] + k);
        return f[n];
    }
};
```
