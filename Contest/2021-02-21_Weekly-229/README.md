## [比赛链接](https://leetcode.cn/contest/weekly-contest-229/)


### [1768. 交替合并字符串](https://leetcode.cn/problems/merge-strings-alternately/)

模拟 略

```c++
class Solution {
public:
    string mergeAlternately(string word1, string word2) {
        int n1 = word1.size(), n2 = word2.size(), p = 0;
        string res;
        while (p < n1 && p < n2) {
            res.push_back(word1[p]);
            res.push_back(word2[p]);
            ++ p ;
        }
        while (p < n1) res.push_back(word1[p ++ ]);
        while (p < n2) res.push_back(word2[p ++ ]);
        return res;
    }
};
```

```c++
class Solution {
public:
    string mergeAlternately(string a, string b) {
        string res;
        int i = 0, j = 0;
        while (i < a.size() || j < b.size()) {
            if (i < a.size()) res += a[i ++ ];
            if (j < b.size()) res += b[j ++ ];
        }
        return res;
    }
};
```


### [1769. 移动所有球到每个盒子所需的最小操作数](https://leetcode.cn/problems/minimum-number-of-operations-to-move-all-balls-to-each-box/)

线性复杂度 略 暴力也能过

```c++
class Solution {
public:
    vector<int> minOperations(string boxes) {
        int n = boxes.size();
        vector<int> res(n);
        int s = 0, cnt = 0;
        for (int i = 0; i < n; ++ i ) {
            s += cnt;
            res[i] += s;
            if (boxes[i] == '1') ++ cnt;
        }
        
        s = 0, cnt = 0;
        for (int i = n - 1; i >= 0; -- i ) {
            s += cnt;
            res[i] += s;
            if (boxes[i] == '1') ++ cnt;
        }
        return res;
    }
};
```

### [1770. 执行乘法运算的最大分数](https://leetcode.cn/problems/maximum-score-from-performing-multiplication-operations/)

区间 dp 

`f[l][r]` 表示左侧使用 l 个右侧使用 r 个的分数 与传统区间 dp 定义略有不同

```c++
class Solution {
public:
    const static int N = 1010;
    int f[N][N];
    
    int maximumScore(vector<int>& nums, vector<int>& mp) {
        int n = nums.size(), m = mp.size();
        memset(f, 0xcf, sizeof f);
        
        f[0][0] = 0;
        for (int i = 1; i <= m; ++ i )
            f[0][i] = f[0][i - 1] + nums[n - i] * mp[i - 1];
        for (int i = 1; i <= m; ++ i )
            f[i][0] = f[i - 1][0] + nums[i - 1] * mp[i - 1];
        
        for (int len = 1; len <= m; ++ len )
            for (int l = 1; l < len; ++ l ) {
                int r = len - l;
                f[l][r] = max(f[l - 1][r] + nums[l - 1] * mp[len - 1], f[l][r - 1] + nums[n - r] * mp[len - 1]);
            }
        int res = INT_MIN;
        for (int i = 0; i <= m; ++ i )
            res = max(res, f[i][m - i]);
        return res;
    }
};
```

上面比赛时的代码似乎有点计算冗余 尝试简化... 发现并不冗余：

```c++
class Solution {
public:
    int maximumScore(vector<int>& nums, vector<int>& mp) {
        int n = nums.size(), m = mp.size();
        vector<vector<int>> f(m + 1, vector<int>(m + 1, -1e9));
        f[0][0] = 0;
        for (int i = 1; i <= m; ++ i )
            f[0][i] = f[0][i - 1] + nums[n - i] * mp[i - 1];
        for (int i = 1; i <= m; ++ i )
            f[i][0] = f[i - 1][0] + nums[i - 1] * mp[i - 1];

        for (int l = 1; l <= m; ++ l )
            for (int r = 1; l + r <= m; ++ r ) {
                f[l][r] = max(f[l - 1][r] + mp[l + r - 1] * nums[l - 1],
                    f[l][r - 1] + mp[l + r - 1] * nums[n - r]);
            }

        int res = -1e9;
        for (int i = 0; i <= m; ++i)
            res = max(res, f[i][m - i]);
        return res;
    }
};
```

另一代码：

```c++
class Solution {
public:
    int maximumScore(vector<int>& nums, vector<int>& mp) {
        int n = nums.size(), m = mp.size();
        vector<vector<int>> f(m + 1, vector<int>(m + 1, -1e9));
        f[0][0] = 0;
        for (int l = 0; l < m; ++l)
            for (int r = 0; l + r < m; ++r) {
                // ATTENTION 取 max 必不可少
                f[l + 1][r] = max(f[l + 1][r], f[l][r] + mp[l + r] * nums[l]);
                f[l][r + 1] = max(f[l][r + 1], f[l][r] + mp[l + r] * nums[n - 1 - r]);
            }
        
        int res = -1e9;
        for (int i = 0; i <= m; ++i)
            res = max(res, f[i][m - i]);
        return res;
    }
};
```


### [1771. 由子序列构造的最长回文串的长度](https://leetcode.cn/problems/maximize-palindrome-length-from-subsequences/) [TAG]

将两个字符串进行拼接 求拼接后字符串的最长回文子序列 但要保证答案对应原字符串中的子序列都非空

**注意添加条件的判断处理 ( l 和 r 的范围判断 )**

```c++
class Solution {
public:
    const static int N = 2010;
    int f[N][N];
     
    int longestPalindrome(string word1, string word2) {
        string s = word1 + word2;
        int n1 = word1.size(), n2 = word2.size(), n = s.size();
        memset(f, 0, sizeof f);
        
        int res = 0;
        for (int i = 1; i <= n; ++ i ) f[i][i] = 1;
        for (int len = 2; len <= n; ++ len )
            for (int l = 1; l + len - 1 <= n; ++ l ) {
                int r = l + len - 1;
                if (s[l - 1] == s[r - 1]) {
                    f[l][r] = f[l + 1][r - 1] + 2;
                    // 只要加一个判断即可
                    if (l <= n1 && r > n1) res = max(res, f[l][r]);
                } else
                    f[l][r] = max(f[l + 1][r], f[l][r - 1]);
            }
        return res;
    }
};
```
