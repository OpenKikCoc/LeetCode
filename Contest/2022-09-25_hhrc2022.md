## [比赛链接](https://leetcode.cn/contest/hhrc2022/)


### [化学反应](https://leetcode.cn/contest/hhrc2022/problems/o0Ma2v/)



```c++
/**
 * Your VendingMachine object will be instantiated and called as such:
 * VendingMachine* obj = new VendingMachine();
 * obj->addItem(time,number,item,price,duration);
 * long long param_2 = obj->sell(time,customer,item,number);
 */

class Solution {
public:
    int lastMaterial(vector<int>& material) {
        priority_queue<int> heap;
        for (auto x : material)
            heap.push(x);
        while (heap.size() > 1) {
            auto a = heap.top(); heap.pop();
            auto b = heap.top(); heap.pop();
            if (a != b) {
                heap.push(abs(a - b));
            }
        }
        if (heap.empty())
            return 0;
        return heap.top();
    }
};
```


### [销售出色区间](https://leetcode.cn/contest/hhrc2022/problems/0Wx4Pc/) [TAG]



```c++
class Solution {
public:
    const static int N = 1e4 + 10;
    
    int n;
    int s[N];
    
    int longestESR(vector<int>& sales) {
        n = sales.size();
        memset(s, 0, sizeof s);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + (sales[i - 1] > 8);
        
        for (int i = n; i >= 1; -- i )
            for (int j = i; j <= n; ++ j ) {
                int t = s[j] - s[j - i];
                if (t > i - t)
                    return i;
            }
        return 0;
    }
};
```

思维

```c++
class Solution {
public:
    int longestESR(vector<int>& sales) {
        int n = sales.size();
        int res = 0;
        unordered_map<int, int> seen;
        for (int i = 0, pre = 0; i < n; ++ i ) {
            pre += (sales[i] > 8 ? 1 : -1);
            // 只记录最左侧的
            if (seen.count(pre) == 0)
                seen[pre] = i;
            
            if (pre > 0)
                res = i + 1;
            else if (seen.count(pre - 1))   // TODO: 非常细节 思想
                res = max(res, i - seen[pre - 1]);
        }
        return res;
    }
};
```



### [重复的彩灯树](https://leetcode.cn/contest/hhrc2022/problems/VAc7h3/)



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
    // 将一颗树唯一【映射】到一个整数
    vector<TreeNode*> res;

    // 唯一id
    int cnt = 0;
    unordered_map<string, int> ids;
    unordered_map<int, int> hash;

    int dfs(TreeNode * root) {
        if (!root) return 0;
        int left = dfs(root->left);
        int right = dfs(root->right);
        string key = to_string(root->val) + ' ' + to_string(left) + ' ' + to_string(right);
        if (ids.count(key) == 0) ids[key] = ++ cnt ;
        int id = ids[key];
        if (++ hash[id] == 2) res.push_back(root);
        return id;
    }
    
    vector<TreeNode*> lightDistribution(TreeNode* root) {
        dfs(root);
        return res;
    }
};
```

### [补给覆盖](https://leetcode.cn/contest/hhrc2022/problems/wFtovi/)



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
    unordered_map<TreeNode*, int> f[3]; // 0 父被选 1子 2本身
    
    void dfs(TreeNode * u) {
        if (!u)
            return;
        f[2][u] = 1;
        int sum = 0;
        
        vector<TreeNode*> son;
        if (u->left)
            son.push_back(u->left);
        if (u->right)
            son.push_back(u->right);
        
        for (auto j : son) {
            dfs(j);
            f[0][u] += min(f[1][j], f[2][j]);
            f[2][u] += min({f[0][j], f[1][j], f[2][j]});
            sum += min(f[1][j], f[2][j]);
        }
        
        f[1][u] = 1e9;
        for (auto j : son) {
            f[1][u] = min(f[1][u], sum - min(f[1][j], f[2][j]) + f[2][j]);
        }
    }
    
    int minSupplyStationNumber(TreeNode* root) {
        dfs(root);
        return min(f[1][root], f[2][root]);
    }
};
```
