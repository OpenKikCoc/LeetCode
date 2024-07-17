## [比赛链接](https://leetcode.cn/contest/weekly-contest-283/)


### [2194. Excel 表中某个范围内的单元格](https://leetcode.cn/problems/cells-in-a-range-on-an-excel-sheet/)

略

```c++
class Solution {
public:
    vector<string> cellsInRange(string s) {
        int l = s[0] - 'A', r = s[3] - 'A', u = s[1] - '1', d = s[4] - '1';
        vector<string> res;
        for (int i = l; i <= r; ++ i )
            for (int j = u; j <= d; ++ j ) {
                string t;
                t.push_back('A' + i); t.push_back('1' + j);
                res.push_back(t);
            }
        return res;
    }
};
```


### [2195. 向数组中追加 K 个整数](https://leetcode.cn/problems/append-k-integers-with-minimal-sum/)

可以二分解

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    long long minimalKSum(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        vector<LL> c(n + 1);
        for (int i = 1; i <= n; ++ i )
            c[i] = c[i - 1] + (i > 1 && nums[i - 1] != nums[i - 2] || i == 1 ? 1 : 0);
        
        LL l = 0, r = n + k;
        while (l < r) {
            LL m = l + r >> 1;
            
            LL t = lower_bound(nums.begin(), nums.end(), m + 1) - nums.begin();
            if (m - c[t] >= k)
                r = m;
            else
                l = m + 1;
        }
        
        LL t = lower_bound(nums.begin(), nums.end(), l + 1) - nums.begin();
        LL res = (1 + l) * l / 2;
        unordered_set<int> S;
        for (int i = 0; i < t; ++ i )
            if (!S.count(nums[i]))
                res -= nums[i], S.insert(nums[i]);
        return res;
    }
};
```

**思维** 更好的显然是直接线性扫一遍：

```c++
class Solution {
public:
    using LL = long long;
    
    long long minimalKSum(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        LL res = 0, last = 0;   // 0 by default
        for (auto x : nums) {
            if (x - last > 1) {
                int t = x - last - 1;
                if (k <= t) {
                    res += ((last + 1) + (last + k)) * k / 2;
                    k = 0;
                    break;
                } else {
                    res += ((last + 1) + (x - 1)) * t / 2;
                    k -= t;
                }
            }
            last = x;
        }
        // do this if-condition or push a INF as nums.back()
        if (k)
            res += ((last + 1) + (last + k)) * k / 2;
        
        return res;
    }
};
```

### [2196. 根据描述创建二叉树](https://leetcode.cn/problems/create-binary-tree-from-descriptions/)

略

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
    unordered_map<int, TreeNode*> hash;
    unordered_map<int, int> deg;
    
    TreeNode* createBinaryTree(vector<vector<int>>& descriptions) {
        for (auto & d : descriptions) {
            int u = d[0], v = d[1], isLeft = d[2];
            TreeNode * nu, * nv;
            if (hash.count(u)) {
                nu = hash[u];
            } else {
                nu = new TreeNode(u);
                hash[u] = nu;
                deg[u] = 0;
            }
            if (hash.count(v)) {
                nv = hash[v];
            } else {
                nv = new TreeNode(v);
                hash[v] = nv;
                deg[v] = 0;
            }
            
            if (isLeft)
                nu->left = nv;
            else
                nu->right = nv;
            
            deg[v] ++ ;
        }
        
        int root = -1;
        for (auto [k, v] : deg)
            if (v == 0) {
                root = k;
                break;
            }
        
        return hash[root];
    }
};
```

### [2197. 替换数组中的非互质数](https://leetcode.cn/problems/replace-non-coprime-numbers-in-array/) [TAG]

思维 栈

```c++
class Solution {
public:
    vector<int> replaceNonCoprimes(vector<int>& nums) {
        vector<int> res;
        for (auto x : nums) {
            while (res.size() > 0 && __gcd(res.back(), x) > 1) {
                x = x / __gcd(res.back(), x) * res.back();
                res.pop_back();
            }
            res.push_back(x);
        }
        return res;
    }
};
```
