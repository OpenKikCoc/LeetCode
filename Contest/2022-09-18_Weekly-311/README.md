## [比赛链接](https://leetcode.cn/contest/weekly-contest-311/)


### [2413. 最小偶倍数](https://leetcode.cn/problems/smallest-even-multiple/)



```c++
class Solution {
public:
    int smallestEvenMultiple(int n) {
        return n * 2 / __gcd(n, 2);
    }
};
```


### [2414. 最长的字母序连续子字符串的长度](https://leetcode.cn/problems/length-of-the-longest-alphabetical-continuous-substring/)



```c++
class Solution {
public:
    int longestContinuousSubstring(string s) {
        int res = 0, n = s.size();
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n && s[j] - s[j - 1] == 1)
                j ++ ;
            res = max(res, j - i);
            i = j - 1;
        }
        return res;
    }
};
```

### [2415. 反转二叉树的奇数层](https://leetcode.cn/problems/reverse-odd-levels-of-binary-tree/)

直接用 queue 铁铁 heap MLE

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
    const static int N = 1e5 + 10;
    
    TreeNode * q[N], * g[N];
    
    TreeNode* reverseOddLevels(TreeNode* root) {
        int hh = 0, tt = -1;
        q[ ++ tt] = root;
        int dep = 0;
        while (hh <= tt) {
            int cnt = tt - hh + 1;
            int tot = 0;
            for (int i = 0; i < cnt; ++ i ) {
                auto & u = q[hh ++ ];
                if (u->left)
                    g[tot ++ ] = u->left;
                if (u->right)
                    g[tot ++ ] = u->right;
            }
            dep ++ ;
            if (dep & 1) {
                for (int i = 0, j = tot - 1; i < j; ++ i , -- j )
                    swap(g[i]->val, g[j]->val);
            }
            hh = 0, tt = tot - 1;
            memcpy(q, g, sizeof g);
        }
        return root;
    }
};
```

标准 dfs

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
    // 要想到  101. 对称二叉树
    void dfs(TreeNode * l, TreeNode * r, int dep) {
        if (!l || !r)
            return;
        if (dep & 1)
            swap(l->val, r->val);
        dfs(l->left, r->right, dep + 1), dfs(l->right, r->left, dep + 1);
    }

    TreeNode* reverseOddLevels(TreeNode* root) {
        dfs(root->left, root->right, 1);
        return root;
    }
};
```



### [2416. 字符串的前缀分数和](https://leetcode.cn/problems/sum-of-prefix-scores-of-strings/)

简单 trie

开静态数组需要放在 class 外面，否则 mle

```c++
const static int N = 1e6 + 10;

// 放在 class 里面就会出问题 放外面即可
int son[N][26], idx;
int cnt[N];
void init() {
    memset(son, 0, sizeof son), memset(cnt, 0, sizeof cnt);
    idx = 0;
}

class Solution {
public:
    void insert(string & s) {
        int p = 0;
        for (auto c : s) {
            int u = c - 'a';
            if (!son[p][u])
                son[p][u] = ++ idx ;
            p = son[p][u];
            cnt[p] ++ ;
        }
    }
    int query(string & s) {
        int p = 0, ret = 0;
        for (auto c : s) {
            int u = c - 'a';
            p = son[p][u];
            ret += cnt[p];
        }
        return ret;
    }

    vector<int> sumPrefixScores(vector<string>& words) {
        init();
        for (auto & w : words)
            insert(w);
        
        vector<int> res;
        for (auto & w : words)
            res.push_back(query(w));
        return res;
    }
};
```



```c++
class Solution {
public:
    struct Node {
        int id, cnt;
        Node * son[26];
        Node() {
            id = -1, cnt = 0;
            for (int i = 0; i < 26; ++ i )
                son[i] = nullptr;
        }
    } * root;
    
    void init() {
        root = new Node();
    }
    void insert(string & s) {
        auto p = root;
        for (auto c : s) {
            int u = c - 'a';
            if (!p->son[u])
                p->son[u] = new Node();
            p = p->son[u];
            p->cnt ++ ;
        }
    }
    int query(string & s) {
        auto p = root;
        int ret = 0;
        for (auto c : s) {
            int u = c - 'a';
            p = p->son[u];
            ret += p->cnt;
        }
        return ret;
    }
    
    vector<int> sumPrefixScores(vector<string>& words) {
        init();
        for (auto & w : words)
            insert(w);
        // return {};
        
        vector<int> res;
        for (auto & w : words) {
            res.push_back(query(w));
        }
        return res;
    }
};
```
