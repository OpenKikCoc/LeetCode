## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-270/)


### [2094. 找出 3 位偶数](https://leetcode-cn.com/problems/finding-3-digit-even-numbers/)

注意需要按次数 dfs 否则 `100^3` TLE

```c++
class Solution {
public:
    const static int N = 11;
    
    int cnt[N];
    
    string t;
    vector<int> res;
    
    void dfs(int d) {
        if (d == 0) {
            int x = stoi(t);
            if (x >= 100 && x % 2 == 0)
                res.push_back(x);
            return;
        }
        for (int i = 0; i < 10; ++ i )
            if (cnt[i]) {
                cnt[i] -- ;
                t.push_back('0' + i);
                dfs(d - 1);
                t.pop_back();
                cnt[i] ++ ;
            }
    }
    
    vector<int> findEvenNumbers(vector<int>& digits) {
        memset(cnt, 0, sizeof cnt);
        for (auto v : digits)
            cnt[v] ++ ;
        
        dfs(3);
        sort(res.begin(), res.end());
        res.erase(unique(res.begin(), res.end()), res.end());
        return res;
    }
};
```


### [2095. 删除链表的中间节点](https://leetcode-cn.com/problems/delete-the-middle-node-of-a-linked-list/)

坑

-   本题是中间靠右且要找中间的前一个 所以 `while (fast->next && fast->next->next)`

-   dummy->next

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
    ListNode* deleteMiddle(ListNode* head) {
        ListNode * dummy = new ListNode(-1);
        dummy->next = head;
        auto slow = dummy, fast = dummy;
        while (fast->next && fast->next->next)
            fast = fast->next->next, slow = slow->next;
        // cout << "slow 1 = " << slow->val << endl;
        if (slow->next)
            slow->next = slow->next->next;
        // cout << "slow 2 = " << slow->val << endl;
        return dummy->next;
    }
};
```

### [2096. 从二叉树一个节点到另一个节点每一步的方向](https://leetcode-cn.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/)

1A

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1e5 + 10, M = 2e5 + 10, INF = 0x3f3f3f3f;
    int h[N], e[M], w[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    PII pre[N];
    int d[N], q[M], hh, tt;
    
    void dfs(TreeNode * r) {
        if (r->left) {
            add(r->val, r->left->val, 1);
            add(r->left->val, r->val, 0);
            dfs(r->left);
        }
        if (r->right) {
            add(r->val, r->right->val, 2);
            add(r->right->val, r->val, 0);
            dfs(r->right);
        }
    }
    
    string getDirections(TreeNode* root, int startValue, int destValue) {
        init();
        dfs(root);
        
        memset(d, 0x3f, sizeof d);
        d[startValue] = 0;
        hh = 0, tt = -1;
        q[ ++ tt] = startValue;
        while (hh <= tt) {
            int u = q[hh ++ ];
            if (u == destValue)
                break;
            for (int i = h[u]; ~i; i = ne[i]) {
                int v = e[i], type = w[i];
                if (d[v] > d[u] + 1)
                    d[v] = d[u] + 1, pre[v] = {u, type}, q[ ++ tt] = v;
            }
        }
        
        string res;
        while (destValue != startValue) {
            auto [last, type] = pre[destValue];
            if (type == 0)
                res.push_back('U');
            else if (type == 1)
                res.push_back('L');
            else
                res.push_back('R');
            destValue = last;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

### [2097. 合法重新排列数对](https://leetcode-cn.com/problems/valid-arrangement-of-pairs/) [TAG]

分析和建图较为简单直接

**主要在于欧拉路算法**

-   简单修改 TLE

```c++
// 33 / 39 个通过测试用例 TLE
class Solution {
public:
    // 1e9 显然需要离散化 长度不超过2e5
    // 
    // 求欧拉路径可以使用 Fleury 算法，从起点开始深度优先遍历整个图，最后记录当前点作为路径，然后反向输出路径。
    // 如果所有点的入度等于出度，则任意点都可以当做起点。否则，需要从出度减入度等于 1 的点开始遍历。
    const static int N = 2e5 + 10;
    
    int n, m;
    int h[N], e[N], w[N], ne[N], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    vector<vector<int>> ps;
    unordered_map<int, int> ids;
    
    int din[N], dout[N];
    bool st[N];
    vector<vector<int>> res;
    
    void dfs(int u, int fa) {
        for (int i = h[u]; ~i; i = ne[i])
            if (!st[i]) {
                st[i] = true;   // ATTENTION 删边
                int v = e[i], idx = w[i];
                dfs(v, u);
                res.push_back(ps[idx]);
            }
    }
    
    vector<vector<int>> validArrangement(vector<vector<int>>& pairs) {
        {
            // 1. 离散化
            ps = pairs;
            vector<int> t;
            for (auto & p : ps)
                t.push_back(p[0]), t.push_back(p[1]);
            sort(t.begin(), t.end());
            t.erase(unique(t.begin(), t.end()), t.end());
            
            m = t.size();
            for (int i = 0; i < m; ++ i )
                ids[t[i]] = i;
            n = ids.size();
        }
        {
            // 2. 建图 ==> ATTENTION 不需要topo
            init();
            memset(din, 0, sizeof din);
            int sz = ps.size();
            for (int i = 0; i < sz; ++ i ) {
                auto & p = ps[i];
                add(ids[p[0]], ids[p[1]], i);
                dout[ids[p[0]]] ++ , din[ids[p[1]]] ++ ;
            }
        }
        
        int start = -1;
        for (int i = 0; i < n; ++ i )
            if (din[i] + 1 == dout[i]) {
                start = i;
                break;
            }
        if (start == -1)    // 有环
            start = 0;
        
        memset(st, 0, sizeof st);
        dfs(start, -1);
        reverse(res.begin(), res.end());
        return res;
    }
};
```

-   unordered_map + vector删边

```c++
class Solution {
public:
    // 1e9 显然需要离散化 长度不超过2e5 ==> 之前写法TLE 考虑直接 unordered_map<int, vector<int>> g;
    // 
    // 求欧拉路径可以使用 Fleury 算法，从起点开始深度优先遍历整个图，最后记录当前点作为路径，然后反向输出路径。
    // 如果所有点的入度等于出度，则任意点都可以当做起点。否则，需要从出度减入度等于 1 的点开始遍历。
    
    unordered_map<int, vector<int>> g;
    unordered_map<int, int> deg;
    vector<vector<int>> res;
    
    void dfs(int u) {
        auto & es = g[u];
        while (!es.empty()) {
            int v = es.back();
            es.pop_back();  // 删边 ==> 比设置 st[i] = true 效果好太多
            dfs(v);
            res.push_back(vector<int>{u, v});
        }
    }
    
    vector<vector<int>> validArrangement(vector<vector<int>>& pairs) {
        for (auto & p : pairs) {
            g[p[0]].push_back(p[1]);
            deg[p[0]] -- , deg[p[1]] ++ ;
        }
        
        int start = -1;
        for (auto & [k, v] : deg)
            if (v == -1) {
                start = k;
                break;
            }
        if (start == -1)    // 有环 任意起点
            start = deg.begin()->first;
        
        dfs(start);
        reverse(res.begin(), res.end());
        return res;
    }
};
```

