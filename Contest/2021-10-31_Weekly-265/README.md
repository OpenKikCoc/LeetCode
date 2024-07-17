## [比赛链接](https://leetcode.cn/contest/weekly-contest-265/)


### [2057. 值相等的最小索引](https://leetcode.cn/problems/smallest-index-with-equal-value/)



```c++
class Solution {
public:
    int smallestEqual(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            if (i % 10 == nums[i])
                return i;
        return -1;
    }
};
```


### [2058. 找出临界点之间的最小和最大距离](https://leetcode.cn/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/)



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
    vector<int> nodesBetweenCriticalPoints(ListNode* head) {
        vector<int> ve;
        while (head)
            ve.push_back(head->val), head = head->next;
        
        vector<int> t;
        for (int i = 1; i < ve.size() - 1; ++ i )
            if (ve[i] > ve[i - 1] && ve[i] > ve[i + 1] || ve[i] < ve[i - 1] && ve[i] < ve[i + 1])
                t.push_back(i);
        
        int mind = INT_MAX;
        for (int i = 1; i < t.size(); ++ i )
            mind = min(mind, t[i] - t[i - 1]);
        if (mind != INT_MAX)
            return {mind, t.back() - *t.begin()};
        return {-1, -1};
    }
};
```

### [2059. 转化数字的最小运算数](https://leetcode.cn/problems/minimum-operations-to-convert-number/)

想清楚时间复杂度 **没必要dp**

```c++
class Solution {
public:
    const static int N = 1010, INF = 0x3f3f3f3f;
    
    int d[N];
    
    int minimumOperations(vector<int>& nums, int start, int goal) {
        memset(d, 0x3f, sizeof d);
        d[start] = 0;
        
        queue<int> q;
        q.push(start);
        while (!q.empty()) {
            auto t = q.front(); q.pop();
            
            for (auto x : nums)
                for (auto y : {t + x, t - x, t ^ x}) {
                    if (y == goal)
                        return d[t] + 1;
                    if (y >= 0 && y <= 1000 && d[y] > d[t] + 1)
                        d[y] = d[t] + 1, q.push(y);
                }
        }
        
        return -1;
    }
};
```

### [2060. 同源字符串检测](https://leetcode.cn/problems/check-if-an-original-string-exists-given-two-encoded-strings/) [TAG]

状态转移

```c++
class Solution {
public:
    const static int N = 41, M = 2010, D = 1000;

    bool f[N][N][M];    // 第二个串比第一个串场多少

    bool possiblyEquals(string s1, string s2) {
        int n = s1.size(), m = s2.size();
        s1 = ' ' + s1, s2 = ' ' + s2;

        memset(f, 0, sizeof f);
        f[0][0][D] = true;
        for (int i = 0; i <= n; ++ i )
            for (int j = 0; j <= m; ++ j )
                for (int k = 1; k <= 2000; ++ k )
                    if (f[i][j][k]) {
                        // k == D 为什么要加 k 和 D 的限制条件 ?
                        // "98u8v8v8v89u888u998v88u98v88u9v99u989v8u"
                        // "9v898u98v888v89v998u98v9v888u9v899v998u9"
                        if (k == D && i + 1 <= n && j + 1 <= m && s1[i + 1] == s2[j + 1])
                            f[i + 1][j + 1][k] = true;
                        if (k < D && j + 1 <= m && isalpha(s2[j + 1]))
                            f[i][j + 1][k + 1] = true;
                        if (k > D && i + 1 <= n && isalpha(s1[i + 1]))
                            f[i + 1][j][k - 1] = true;
                        
                        {
                            int u = i + 1, v = 0;
                            while (u <= n && isdigit(s1[u])) {
                                v = v * 10 + s1[u] - '0';
                                if (k - v >= 1)
                                    f[u][j][k - v] = true;
                                u ++ ;
                            }
                        }
                        {
                            int u = j + 1, v = 0;
                            while (u <= m && isdigit(s2[u])) {
                                v = v * 10 + s2[u] - '0';
                                if (k + v <= 2000)
                                    f[i][u][k + v] = true;
                                u ++ ;
                            }
                        }
                    }
        return f[n][m][D];
    }
};
```
