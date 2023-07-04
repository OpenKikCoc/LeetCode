## [比赛链接](https://leetcode.cn/contest/biweekly-contest-106/)

>   virtual rank:
>
>   42 / 2346
>   18
>   0:37:54
>   0:04:18  1
>   0:08:05
>   0:15:40
>   0:32:54


### [2729. 判断一个数是否迷人](https://leetcode.cn/problems/check-if-the-number-is-fascinating/)



```c++
class Solution {
public:
    bool isFascinating(int n) {
        string s = to_string(n) + to_string(n * 2) + to_string(n * 3);
        multiset<int> S;
        for (auto x : s)
            S.insert(x - '0');
        // cout << s << endl;
        if (S.count(0))
            return false;
        for (int i = 1; i < 10; ++ i )
            if (!S.count(i))
                return false;
        return S.size() == 9;
    }
};
```


### [2730. 找到最长的半重复子字符串](https://leetcode.cn/problems/find-the-longest-semi-repetitive-substring/)



```c++
class Solution {
public:
    bool check(string t) {
        int m = t.size(), c = 0;
        for (int i = 1; i < m; ++ i )
            if (t[i] == t[i - 1])
                c ++ ;
        return c <= 1;
    }
    
    int longestSemiRepetitiveSubstring(string s) {
        int n = s.size();
        for (int w = n; w >= 1; -- w ) {
            bool f = false;
            
            for (int i = 0; i <= n - w; ++ i ) {
                string t = s.substr(i, w);
                if (check(t)) {
                    f = true;
                    break;
                }
            }
            
            if (f)
                return w;
        }
        return 0;
    }
};
```

### [2731. 移动机器人](https://leetcode.cn/problems/movement-of-robots/)

标准的暴力优化 统计计数

```c++
class Solution {
public:
    using LL = long long;
    const static LL MOD = 1e9 + 7;
    
    int sumDistance(vector<int>& nums, string s, int d) {
        int n = nums.size();
        vector<LL> xs;
        for (int i = 0; i < n; ++ i ) {
            LL x = nums[i];
            if (s[i] == 'L')
                x -= d;
            else
                x += d;
            xs.push_back(x);
        }
        sort(xs.begin(), xs.end());
        
        LL res = 0, sum = 0;
        for (int i = 0; i < n; ++ i ) {
            LL x = xs[i];
            
            // 前面有 i 个: x * i - s
            LL t = (x * i % MOD - sum % MOD + MOD) % MOD;
            res = (res + t) % MOD;
            sum = (sum + x) % MOD;
        }
        
        return res;
    }
};
```

### [2732. 找到矩阵中的好子集](https://leetcode.cn/problems/find-a-good-subset-of-the-matrix/)

简单推理：找到两个可行行即可

>   证明较复杂：列数至少是六才会出现 k=4 可行但 k=2 不可行的情况

```c++
class Solution {
public:
    // 行数比较多 列数很少(5)
    //  有一个比较trick的想法是 显然选的越多条件越苛刻 => 如果能找到只选两行能满足要求的即可
    //  => 找两行，这两行的所有列不都为1
    //  => 每一行转变为一个数字
    
    const static int N = 35;
    
    vector<int> xs[N];
    
    vector<int> goodSubsetofBinaryMatrix(vector<vector<int>>& grid) {
        for (int i = 0; i < N; ++ i )
            xs[i].clear();
        
        int n = grid.size(), m = grid[0].size();
        for (int i = 0; i < n; ++ i ) {
            int x = 0;
            for (int j = 0; j < m; ++ j )
                if (grid[i][j])
                    x |= 1 << j;
            xs[x].push_back(i);
        }
        // 如果有全 0 的直接返回
        if (xs[0].size())
            return {xs[0][0]};
        // 否则需要凑两个
        for (int i = 0; i < 1 << m; ++ i ) {
            if (xs[i].empty())
                continue;
            int st = ((1 << m) - 1) ^ i;
            for (int j = st; j; j = (j - 1) & st) {
                if (xs[j].empty())
                    continue;
                int a = xs[i][0], b = xs[j][0];
                if (a > b)
                    swap(a, b);
                return {a, b};
            }
        }
        return {};
    }
};
```
