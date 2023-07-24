## [比赛链接](https://leetcode.cn/contest/biweekly-contest-108/)


### [2765. 最长交替子序列](https://leetcode.cn/problems/longest-alternating-subarray/)



```c++
class Solution {
public:
    int alternatingSubarray(vector<int>& nums) {
        int n = nums.size();
        for (int w = n; w > 1; -- w ) // > 1
            for (int i = 0; i + w - 1 < n; ++ i ) {
                bool valid = true;
                for (int j = i + 1; j < i + w; ++ j ) {
                    int x = j - i;
                    if (nums[j] != nums[i] + (x & 1 ? 1 : 0)) {
                        valid = false;
                        break;
                    }
                }
                if (valid)
                    return w;
            }
        return -1;
    }
};
```


### [2766. 重新放置石块](https://leetcode.cn/problems/relocate-marbles/)



```c++
class Solution {
public:
    using LL = long long;
    
    vector<int> relocateMarbles(vector<int>& nums, vector<int>& moveFrom, vector<int>& moveTo) {
        unordered_map<int, LL> h;
        for (auto x : nums)
            h[x] ++ ;
        
        for (int i = 0; i < moveFrom.size(); ++ i ) {
            int a = moveFrom[i], b = moveTo[i];
            LL t = h[a];
            h[a] -= t, h[b] += t;
        }
        
        vector<int> xs;
        for (auto [k, v] : h)
            if (v)
                xs.push_back(k);
        sort(xs.begin(), xs.end());
        return xs;
    }
};
```

### [2767. 将字符串分割为最少的美丽子字符串](https://leetcode.cn/problems/partition-string-into-minimum-beautiful-substrings/)



```c++
class Solution {
public:
    const static int N = 16, INF = 0x3f3f3f3f;
    
    int f[N][N];    // 截止到 i 当前起始在 j 的最小分割
    
    bool check(string s) {
        if (s.empty() || s[0] == '0')
            return false;
        reverse(s.begin(), s.end());
        int n = s.size(), t = 0;
        for (int i = 0; i < n; ++ i )
            t += (s[i] - '0') << i;
        
        while (t % 5 == 0)
            t /= 5;
        return t == 1;
    }
    
    int minimumBeautifulSubstrings(string s) {
        int n = s.size();
        
        memset(f, 0x3f, sizeof f);
        f[0][0] = 0;
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= i; ++ j )
                if (check(s.substr(j - 1, i - j + 1))) {
                    for (int k = 0; k <= j; ++ k ) {
                        f[i][j] = min(f[i][j], f[j - 1][k] + 1);
                    }
                }
        int res = INF;
        for (int i = 1; i <= n; ++ i )
            res = min(res, f[n][i]);
        return res < INF / 2 ? res : -1;
    }
};
```

### [2768. 黑格子的数目](https://leetcode.cn/problems/number-of-black-blocks/)



```c++
class Solution {
public:
    // 换个思路 计算当前点对哪些方格产生影响
    using LL = long long;
    using PII = pair<int, int>;
    
    vector<long long> countBlackBlocks(int m, int n, vector<vector<int>>& coordinates) {
        map<PII, int> h;  // 某个右下角的方格 有多少个黑点
        for (auto & cs : coordinates) {
            int x = cs[0], y = cs[1];
            {
                // 当前在左上角
                if (x < m - 1 && y < n - 1)
                    h[{x + 1, y + 1}] ++ ;
            }
            {
                // 当前在左下角
                if (x && y < n - 1)
                    h[{x, y + 1}] ++ ;
            }
            {
                // 右上角
                if (x < m - 1 && y)
                    h[{x + 1, y}] ++ ;
            }
            {
                // 右下角
                if (x && y)
                    h[{x, y}] ++ ;
            }
        }
        
        vector<LL> res(5);
        for (auto & [k, v] : h)
            res[v] ++ ;
        
        LL sum = 1ll * (m - 1) * (n - 1);
        res[0] = sum - res[1] - res[2] - res[3] - res[4];
        return res;
    }
};
```
