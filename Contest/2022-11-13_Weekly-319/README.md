## [比赛链接](https://leetcode.cn/contest/weekly-contest-319/)


### [2469. 温度转换](https://leetcode.cn/problems/convert-the-temperature/)



```c++
class Solution {
public:
    const double a = 273.15, b = 1.80, c = 32.0;
    
    vector<double> convertTemperature(double celsius) {
        return {celsius + a, celsius * b + c};
    }
};
```


### [2470. 最小公倍数为 K 的子数组数目](https://leetcode.cn/problems/number-of-subarrays-with-lcm-equal-to-k/)



```c++
class Solution {
public:
    using LL = long long;
    
    int subarrayLCM(vector<int>& nums, int k) {
        int res = 0, n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            LL p = nums[i];
            for (int j = i; j < n; ++ j ) {
                LL t = __gcd(p, (LL)nums[j]);
                p = p * nums[j] / t;
                // cout << " i = " << i << " j = " << j << " p = " << p << endl;
                if (p == k) {
                    // cout << " i = " << i << " j = " << j  << endl;
                    res ++ ;
                }
                if (p > k)
                    break;
            }
        }
        return res;
    }
};
```

### [2471. 逐层排序二叉树所需的最少操作数目](https://leetcode.cn/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level/) [TAG]

环图 标准做法

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
    vector<int> pa;
    int find(int x) {
        if (pa[x] != x)
            pa[x] = find(pa[x]);
        return pa[x];
    }
    
    int get(vector<int> & t) {
        int n = t.size();
        unordered_map<int, int> hash;   // 离散化
        pa.clear();
        for (int i = 0; i < n; ++ i ) {
            pa.push_back(i);
            hash[t[i]] = i;
        }
        sort(t.begin(), t.end());   // ATTENTION
        // 并查集求环大小
        int cnt = 0;
        for (int i = 0; i < n; ++ i ) {
            int a = find(i), b = find(hash[t[i]]);
            if (a != b) {
                pa[a] = b;
                cnt ++ ;
            }
        }
        return cnt;
    }
    
    int minimumOperations(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        int res = 0;
        while (q.size()) {
            int sz = q.size();
            vector<int> t;
            while (sz -- ) {
                auto u = q.front(); q.pop();
                t.push_back(u->val);
                if (u->left)
                    q.push(u->left);
                if (u->right)
                    q.push(u->right);
            }
            res += get(t);
        }
        return res;
    }
};
```

### [2472. 不重叠回文子字符串的最大数目](https://leetcode.cn/problems/maximum-number-of-non-overlapping-palindrome-substrings/)



```c++
class Solution {
public:
    const static int N = 2010;
    
    int g[N][N];
    int f[N];
    
    int maxPalindromes(string s, int k) {
        memset(g, 0, sizeof g);
        int n = s.size();
        for (int len = 1; len <= n; ++ len )
            for (int i = 1; i + len - 1 <= n; ++ i ) {
                int j = i + len - 1;
                if (s[i - 1] == s[j - 1] && (len <= 2 || g[i + 1][j - 1]))
                    g[i][j] = true;
            }
        
        memset(f, 0, sizeof f);
        for (int i = 1; i <= n; ++ i ) {
            f[i] = f[i - 1];
            for (int j = 1; j <= i - k + 1; ++ j )
                if (g[j][i])
                    f[i] = max(f[i], f[j - 1] + 1);
        }
        
        return f[n];
    }
};
```
