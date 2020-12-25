## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-10/)

35min

virtual rating: 16 / 738

### [1213. 三个有序数组的交集](https://leetcode-cn.com/problems/intersection-of-three-sorted-arrays/)

分解两次操作即可

```c++
class Solution {
public:
    vector<int> get(vector<int> & a1, vector<int> & a2) {
        vector<int> res;
        for (int i = 0, j = 0; i < a1.size() && j < a2.size(); ) {
            if (a1[i] == a2[j]) {
                res.push_back(a1[i]);
                ++ i, ++ j;
            } else if (a1[i] < a2[j]) ++ i;
            else ++ j;
        }
        return res;
    }
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        auto t = get(arr1, arr2);
        return get(t, arr3);
    }
};
```

还有 `hashTable` 的做法：

```c++
class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2, vector<int>& arr3) {
        unordered_map<int, int> cnt;
        vector<int> res;
        for (int v : arr1) ++ cnt[v];
        for (int v : arr2) ++ cnt[v];
        for (int v : arr3) ++ cnt[v];
        for (auto & [k, v] : cnt)
            if (v == 3) res.push_back(k);
        return res;
    }
};
```

以及三指针：

```c++
class Solution {
public:
    vector<int> arraysIntersection(vector<int>& arr1, vector<int>& arr2,
                                   vector<int>& arr3) {
        int n1 = arr1.size(), n2 = arr2.size(), n3 = arr3.size();
        vector<int> res;
        for (int i = 0, j = 0, k = 0; i < n1; i++) {
            for (; j < n2 && arr2[j] < arr1[i]; j++)
                ;
            if (j == n2) break;
            for (; k < n3 && arr3[k] < arr1[i]; k++)
                ;
            if (k == n3) break;
            if (arr2[j] == arr1[i] && arr3[k] == arr1[i])
                res.push_back(arr1[i]);
        }
        return res;
    }
};
```

### [1214. 查找两棵二叉搜索树之和](https://leetcode-cn.com/problems/two-sum-bsts/)

略

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    int t;
    unordered_set<int> S;
    void dfs1(TreeNode* r) {
        if (!r) return;
        S.insert(r->val);
        dfs1(r->left);
        dfs1(r->right);
    }
    bool dfs(TreeNode* r) {
        if (!r) return false;
        if (S.count(t - r->val)) return true;
        return dfs(r->left) || dfs(r->right);
    }
    bool twoSumBSTs(TreeNode* root1, TreeNode* root2, int target) {
        this->t = target;
        dfs1(root1);
        return dfs(root2);
    }
};
```

### [1215. 步进数](https://leetcode-cn.com/problems/stepping-numbers/)

搜索生成所有步进数即可，注意排除 `v + 1 = 10` 这类以及负数

也即: `if (v + 1 <= 9)` 和 `if (v - 1 >= 0)`

```c++
class Solution {
public:
    typedef long long LL;
    vector<LL> t;
    void dfs(int v, LL s, int p) {
        if (p > 9) {
            return;
        }
        t.push_back(s * 10 + v);
        if (v + 1 <= 9) dfs(v + 1, s * 10 + v, p + 1);
        if (v - 1 >= 0) dfs(v - 1, s * 10 + v, p + 1);
    }
    void get() {
        for (int i = 0; i < 10; ++ i )
            dfs(i, 0, 0);
        sort(t.begin(), t.end());
        t.erase(unique(t.begin(), t.end()), t.end());
        //for (auto v : t) cout << v << endl;
    }
    vector<int> countSteppingNumbers(int low, int high) {
        get();
        vector<int> res;
        for (auto v : t)
            if (v >= low && v <= high)
                res.push_back(v);
        return res;
    }
};
```

也有 bfs 构造，略

### [1216. 验证回文字符串 III](https://leetcode-cn.com/problems/valid-palindrome-iii/)

略

```c++
class Solution {
public:
    bool isValidPalindrome(string s, int k) {
        int n = s.size();
        vector<vector<int>> f(n + 1, vector<int>(n + 1));
        for (int i = 1; i <= n; ++ i ) f[i][i] = 1;
        for (int len = 2; len <= n; ++ len )
            for (int l = 1; l + len - 1 <= n; ++ l) {
                int r = l + len - 1;
                if (l + 1 == r) {
                    if (s[l - 1] == s[r - 1]) f[l][r] = 2;
                    else f[l][r] = 1;
                } else if (s[l - 1] == s[r - 1]) f[l][r] = f[l + 1][r - 1] + 2;
                else f[l][r] = max(f[l + 1][r], f[l][r - 1]);
            }
        // cout << f[1][n] << endl;
        return f[1][n] >= n - k;
    }
};
```

可等效变换 简化：

```c++
class Solution {
public:
    bool isValidPalindrome(string s, int k) {
        int n = s.size();
        vector<vector<int>> f(n + 1, vector<int>(n + 1));
        for (int i = 1; i <= n; ++ i ) f[i][i] = 1;
        for (int len = 2; len <= n; ++ len )
            for (int l = 1; l + len - 1 <= n; ++ l) {
                int r = l + len - 1;
                if (s[l - 1] == s[r - 1]) f[l][r] = f[l + 1][r - 1] + 2;
                else f[l][r] = max(f[l + 1][r], f[l][r - 1]);
            }
        return f[1][n] >= n - k;
    }
};
```
