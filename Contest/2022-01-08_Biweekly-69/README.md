## [比赛链接](https://leetcode.cn/contest/biweekly-contest-69/)


### [2129. 将标题首字母大写](https://leetcode.cn/problems/capitalize-the-title/)

略

```c++
class Solution {
public:
    string capitalizeTitle(string title) {
        stringstream ss(title);
        string res, s;
        while (ss >> s) {
            int n = s.size();
            if (n < 3) {
                for (int i = 0; i < n; ++ i )
                    s[i] = tolower(s[i]);
            } else {
                s[0] = toupper(s[0]);
                for (int i = 1; i < n; ++ i )
                    s[i] = tolower(s[i]);
            }
            if (res.size())
                res.push_back(' ');
            res += s;
        }
        return res;
    }
};
```


### [2130. 链表最大孪生和](https://leetcode.cn/problems/maximum-twin-sum-of-a-linked-list/)

略

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    int pairSum(ListNode* head) {
        vector<int> ve;
        while (head)
            ve.push_back(head->val), head = head->next;
        int n = ve.size(), res = 0;
        for (int i = 0; i <= (n / 2) - 1; ++ i )
            res = max(res, ve[i] + ve[n - 1 - i]);
        return res;
    }
};
```

### [2131. 连接两字母单词得到的最长回文串](https://leetcode.cn/problems/longest-palindrome-by-concatenating-two-letter-words/)

简单分析即可 略

```c++
class Solution {
public:
    const static int N = 30;
    
    int g[N][N];
    
    int longestPalindrome(vector<string>& words) {
        memset(g, 0, sizeof g);
        for (auto & w : words) {
            int a = w[0] - 'a', b = w[1] - 'a';
            g[a][b] ++ ;
        }
        
        int res = 0;
        for (int i = 0; i < 26; ++ i )
            for (int j = i + 1; j < 26; ++ j )
                res += min(g[i][j], g[j][i]) * 4;
        int t = 0;
        for (int i = 0; i < 26; ++ i ) {
            res += g[i][i] / 2 * 4;
            g[i][i] %= 2;
            if (g[i][i])
                t = 1;
        }
        return res + t * 2;
    }
};
```

### [2132. 用邮票贴满网格图](https://leetcode.cn/problems/stamping-the-grid/) [TAG]

前缀和处理易想到 主要是还要想到二维差分

非常好的二维前缀和与差分问题

```c++
class Solution {
public:
    vector<vector<int>> g, s, d;
    
    bool possibleToStamp(vector<vector<int>>& grid, int h, int w) {
        this->g = grid;
        int n = g.size(), m = g[0].size();
        // 前缀和统计 1 的数量
        s = vector<vector<int>>(n + 1, vector<int>(m + 1));
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + grid[i - 1][j - 1];
        
        // 差分
        d = vector<vector<int>>(n + 2, vector<int>(m + 2));
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                // trick 位移
                // 考虑以该点为左上角 ==> 为什么不是四个角每个都可能? 因为显然每个邮票都会有确定的左上角
                int x = i + h - 1, y = j + w - 1;
                if (x <= n && y <= m && s[x][y] - s[x][j - 1] - s[i - 1][y] + s[i - 1][j - 1] == 0)
                    d[i][j] ++ , d[i][y + 1] -- , d[x + 1][j] -- , d[x + 1][y + 1] ++ ;
            }
        // 差分数组至最终数组
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j ) {
                d[i][j] += d[i - 1][j] + d[i][j - 1] - d[i - 1][j - 1];
                if (g[i - 1][j - 1] == 0 && d[i][j] == 0)
                    return false;
            }
        return true;
    }
};
```
