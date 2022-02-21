## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-267/)

>   virtual rank: 233 / 4365


### [2073. 买票需要的时间](https://leetcode-cn.com/problems/time-needed-to-buy-tickets/)

模拟即可

```c++
class Solution {
public:
    int timeRequiredToBuy(vector<int>& tickets, int k) {
        int n = tickets.size(), t = 0, res = 0;
        while (true) {
            bool changed = false;
            for (int i = 0; i < n; ++ i )
                if (tickets[i]) {
                    changed = true;
                    t ++ ;
                    tickets[i] -- ;
                    if (i == k)
                        res = max(res, t);
                }
            if (!changed)
                break;
        }
        return res;
    }
};
```


### [2074. 反转偶数长度组的节点](https://leetcode-cn.com/problems/reverse-nodes-in-even-length-groups/)

注意是反转偶数长度 不是偶数下标的数组 略

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
    ListNode* reverseEvenLengthGroups(ListNode* head) {
        vector<int> ve;
        while (head)
            ve.push_back(head->val), head = head->next;
        int n = ve.size();
        vector<vector<int>> t;
        for (int i = 0, w = 1; i < n; i += w, ++ w ) {
            vector<int> tt;
            // ATTENTION: i + j < n
            for (int j = 0; j < w && i + j < n; ++ j )
                tt.push_back(ve[i + j]);
            if (tt.size() % 2 == 0)
                reverse(tt.begin(), tt.end());
            t.push_back(tt);
        }
        ListNode * dummy = new ListNode(-1), * pre = dummy;
        for (auto & tt : t)
            for (auto v : tt)
                pre->next = new ListNode(v), pre = pre->next;
        return dummy->next;
    }
};
```

### [2075. 解码斜向换位密码](https://leetcode-cn.com/problems/decode-the-slanted-ciphertext/)

略

```c++
class Solution {
public:
    const static int N = 1010;
    
    vector<vector<char>> g;
    
    string decodeCiphertext(string encodedText, int rows) {
        int n = rows, m = encodedText.size() / rows;
        g = vector<vector<char>>(n, vector<char>(m, ' '));
        for (int i = 0, k = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j, ++ k )
                g[i][j] = encodedText[k];
        
        string res;
        for (int j = 0; j < m; ++ j ) {
            int x = 0, y = j;
            while (x < n && y < m)
                res.push_back(g[x][y]), x ++ , y ++ ;
        }
        while (res.size() > 0 && res.back() == ' ')
            res.pop_back();
            
        return res;
    }
};
```

### [2076. 处理含限制条件的好友请求](https://leetcode-cn.com/problems/process-restricted-friend-requests/) [TAG]

一开始想的并查集反集

实际上，并不满足以下两个条件的第二个条件：

-   一个人的朋友的朋友是朋友
-   一个人的敌人的敌人是朋友

显然只能并查集模拟，考虑模拟时启发式选择基准

```c++
// set
class Solution {
public:
    // 并查集与反集
    const static int N = 1010;
    
    int p[N];
    void init() {
        for (int i = 0; i < N; ++ i )
            p[i] = i;
    }
    int find(int x) {
        if (p[x] != x)
            p[x] = find(p[x]);
        return p[x];
    }
    
    vector<bool> friendRequests(int n, vector<vector<int>>& restrictions, vector<vector<int>>& requests) {
        init();
        // 为什么不是使用反集？因为未必合并敌人
        // for (auto & r : restrictions) {   => WA
        //     int a = r[0], b = r[1];
        //     p[find(a + n)] = find(b);
        //     p[find(b + n)] = find(a);
        // }
        vector<unordered_set<int>> friends(n), enemies(n);
        for (int i = 0; i < n; ++ i )
            friends[i].insert(i);
        for (auto & r : restrictions)
            enemies[r[0]].insert(r[1]), enemies[r[1]].insert(r[0]);

        vector<bool> res;
        for (auto & r : requests) {
            int a = r[0], b = r[1];
            int x = find(a), y = find(b);
            if (x == y)
                res.push_back(true);
            else {
                bool flag = true;
                if (friends[x].size() > friends[y].size())
                    swap(x, y);
                for (auto v : friends[x])
                    if (enemies[y].count(v)) {
                        flag = false;
                        break;
                    }
                if (flag) {
                    enemies[y].insert(enemies[x].begin(), enemies[x].end());
                    friends[y].insert(friends[x].begin(), friends[x].end());
                    p[x] = y;
                    res.push_back(true);
                } else
                    res.push_back(false);
            }
        }
        return res;
    }
};
```

```c++
// bitset
class Solution {
public:
    // 并查集与反集
    const static int N = 1010;
    
    int p[N];
    void init() {
        for (int i = 0; i < N; ++ i )
            p[i] = i;
    }
    int find(int x) {
        if (p[x] != x)
            p[x] = find(p[x]);
        return p[x];
    }
    
    vector<bool> friendRequests(int n, vector<vector<int>>& restrictions, vector<vector<int>>& requests) {
        init();
        vector<bitset<N>> friends(n), enemies(n);
        for (int i = 0; i < n; ++ i )
            friends[i][i] = 1;
        for (auto & r : restrictions)
            enemies[r[0]][r[1]] = enemies[r[1]][r[0]] = 1;

        vector<bool> res;
        for (auto & r : requests) {
            int a = r[0], b = r[1];
            int x = find(a), y = find(b);
            if (x == y)
                res.push_back(true);
            else {
                if ((friends[x] & enemies[y]).any())
                    res.push_back(false);
                else {
                    friends[y] |= friends[x];
                    enemies[y] |= enemies[x];
                    p[x] = y;
                    res.push_back(true);
                }
            }
        }
        return res;
    }
};
```

