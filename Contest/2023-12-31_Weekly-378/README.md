## [比赛链接](https://leetcode.cn/contest/weekly-contest-378/)


### [2980. 检查按位或是否存在尾随零](https://leetcode.cn/problems/check-if-bitwise-or-has-trailing-zeros/)



```c++
class Solution {
public:
    bool hasTrailingZeros(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j ) {
                if ((nums[i] | nums[j]) % 2 == 0)
                    return true;
            }
        return false;
    }
};
```


### [2981. 找出出现至少三次的最长特殊子字符串 I](https://leetcode.cn/problems/find-longest-special-substring-that-occurs-thrice-i/)



```c++
// 同 T3
```

### [2982. 找出出现至少三次的最长特殊子字符串 II](https://leetcode.cn/problems/find-longest-special-substring-that-occurs-thrice-ii/)

分情况讨论

```c++
class Solution {
public:
    const static int N = 30;
    
    vector<int> c[N];
    
    int maximumLength(string s) {
        int n = s.size();
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            while (j < n && s[j] == s[i])
                j ++ ;
            c[s[i] - 'a'].push_back(j - i);
            i = j - 1;
        }
        
        int res = -1;
        for (int i = 0; i < N; ++ i ) {
            int m = c[i].size(), t = -1;
            if (m == 0)
                continue;
            
            sort(c[i].begin(), c[i].end());
            if (m >= 1)
                t = max(t, c[i][m - 1] - 2);
            if (m >= 2)
                t = max(t, min(c[i][m - 1] - 1, c[i][m - 2]));
            if (m >= 3)
                t = max(t, min({c[i][m - 3], c[i][m - 2], c[i][m - 1]}));
            
            // cout << " i = " << i << " ch = " << char('a' + i) << " t = " << t << " first " << c[i][0] << endl;
            // ATTENTION
            if (t)
                res = max(res, t);
        }
        return res;
    }
};
```

### [2983. 回文串重新排列查询](https://leetcode.cn/problems/palindrome-rearrangement-queries/) [TAG]

思维 暴力优化

```c++
using PII = pair<int, int>;
const static int N = 1e5 + 10, M = 30;

// TLE 提到外面初始化
int sum1[N][M], sum2[N][M], diff[N];

int count_diff(vector<PII> & ps) {
    int ret = 0;
    for (auto & p : ps)
        ret += diff[p.second] - diff[p.first - 1];
    return ret;
}

class Solution {
public:
    int n;
    string s1, s2;

    void init() {
        for (int j = 0; j < 26; ++ j )
            sum1[0][j] = sum2[0][j] = 0;
        // memset(sum1, 0, sizeof sum1), memset(sum2, 0, sizeof sum2);
        for (int i = 1; i <= n; ++ i )
            for (int j = 0; j < 26; ++ j ) {
                sum1[i][j] = sum1[i - 1][j] + (j == s1[i - 1] - 'a');
                sum2[i][j] = sum2[i - 1][j] + (j == s2[i - 1] - 'a');
            }
        diff[0] = 0;
        for (int i = 1; i <= n; ++ i )
            diff[i] = diff[i - 1] + (s1[i - 1] != s2[i - 1]);
    }
    
    bool get(int l1, int r1, int l2, int r2) {
        vector<PII> cross, ind1, ind2;  // ind1: 区间 [l1,r1] 不相交的部分, ind2: 区间 [l2,r2] 不相交的部分
        if (max(l1, l2) <= min(r1, r2))
            cross.push_back({max(l1, l2), min(r1, r2)});
        if (cross.size() > 0) {
            {
                if (l1 < l2)
                    ind1.push_back({l1, l2 - 1});
                if (l1 > l2)
                    ind2.push_back({l2, l1 - 1});
            }
            {
                if (r1 > r2)
                    ind1.push_back({r2 + 1, r1});
                if (r1 < r2)
                    ind2.push_back({r1 + 1, r2});
            }
        } else {
            ind1.push_back({l1, r1});
            ind2.push_back({l2, r2});
        }
        
        // 1. 区间并集是否覆盖所有 `不同下标`
        if (count_diff(cross) + count_diff(ind1) + count_diff(ind2) < diff[n])
            return false;
        
        // 2. 计算每个子串有哪些可调配的字母
        static int c1[M], c2[M];
        for (int i = 0; i < 26; ++ i ) {
            c1[i] = sum1[r1][i] - sum1[l1 - 1][i];
            c2[i] = sum2[r2][i] - sum2[l2 - 1][i];
        }
        
        // 把第一/二个子串不得不调配的字母消耗掉
        for (auto & p : ind1)
            for (int i = 0; i < 26; ++ i )
                c1[i] -= sum2[p.second][i] - sum2[p.first - 1][i];
        for (auto & p : ind2)
            for (int i = 0; i < 26; ++ i )
                c2[i] -= sum1[p.second][i] - sum1[p.first - 1][i];
        
        // 如果出现字母不够 或剩余可调配字母不一样 则 false
        for (int i = 0; i < 26; ++ i )
            if (c1[i] < 0 || c2[i] < 0 || c1[i] != c2[i])
                return false;
        return true;
    }
    
    vector<bool> canMakePalindromeQueries(string s, vector<vector<int>>& queries) {
        this->n = s.size() / 2;
        {
            for (int i = 0; i < n; ++ i )
                s1.push_back(s[i]);
            for (int i = 0; i < n; ++ i )   // reverse
                s2.push_back(s[n * 2 - 1 - i]);
            init();
        }
        
        vector<bool> res;
        for (auto & q : queries)
            res.push_back(get(q[0] + 1, q[1] + 1, n * 2 - q[3], n * 2 - q[2]));
        return res;
    }
};
```
