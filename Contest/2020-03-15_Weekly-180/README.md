## [比赛链接](https://leetcode.cn/contest/weekly-contest-180/)


### [1380. 矩阵中的幸运数](https://leetcode.cn/problems/lucky-numbers-in-a-matrix/)

任意顺序返回矩阵中的幸运数：同行最小、同列最大

```c++
class Solution {
public:
    vector<int> luckyNumbers (vector<vector<int>>& matrix) {
        int m = matrix.size();
        int n = matrix[0].size();
        vector<int> row(m), col(n), res;
        for(int i = 0; i < m; ++i) {
            for(int j = 0; j < n; ++j) {
                if(matrix[i][j] > matrix[col[j]][j]) {
                    col[j] = i;
                }
                if(matrix[i][j] < matrix[i][row[i]]) {
                    row[i] = j;
                }
            }
        }
        for(int i = 0; i < m; ++i) {
            for(int j = 0; j < n; ++j) {
                if(row[i] == j && col[j] == i) res.push_back(matrix[i][j]);
            }
        }
        return res;
    }
};
```


### [1381. 设计一个支持增量操作的栈](https://leetcode.cn/problems/design-a-stack-with-increment-operation/)

底层k个可以inc

```c++
class CustomStack {
public:
    vector<int> st;
    int size, used;
    CustomStack(int maxSize) {
        st = vector<int>(1005);
        size = maxSize;
        used = 0;
    }
    
    void push(int x) {
        if(used < size) st[used++] = x;
    }
    
    int pop() {
        if(used == 0) return -1;
        int v = st[used-1];
        --used;
        return v;
    }
    
    void increment(int k, int val) {
        int p;
        for(int i = 0; i < used && i < k; ++i) {
            st[i] += val;
        }
    }
};
```

### [1382. 将二叉搜索树变平衡](https://leetcode.cn/problems/balance-a-binary-search-tree/)

先中序遍历再建树

```c++
class Solution {
public:
    vector<TreeNode*> ns;
    int tot;
    void dfs(TreeNode* root) {
        if(!root) return;
        dfs(root->left);
        ns.push_back(root);
        dfs(root->right);
    }
    TreeNode* helper(int l, int r) {
        if(l == r) return ns[l];
        else if(l > r) return nullptr;
        int mid = l + (r-l)/2;
        
        TreeNode* left = helper(l, mid-1);
        TreeNode* right = helper(mid+1, r);
        ns[mid]->left = left;
        ns[mid]->right = right;
        return ns[mid];
    }
    
    TreeNode* balanceBST(TreeNode* root) {
        dfs(root);
        tot = ns.size();
        for(int i = 0; i < tot; ++i) ns[i]->left = ns[i]->right = nullptr;
        return helper(0, tot-1);
    }
};
```

### [1383. 最大的团队表现值](https://leetcode.cn/problems/maximum-performance-of-a-team/)

两个数组 speed 和 efficiency ，其中 speed[i] 和 efficiency[i] 分别代表第 i 位工程师的速度和效率。请你返回由最多 k 个工程师组成的 最大团队表现值 。**团队表现值** 的定义为：一个团队中「所有工程师速度的和」乘以他们「效率值中的最小值」。取模

按照效率进行降序排序，每个人作为最低效率时，在其左侧找出至多K - 1个最大速度即可(再加上这个人的速度组成K个)

```c++
class Solution {
public:
    int maxPerformance(int n, vector<int>& speed, vector<int>& efficiency, int k) {
        vector<pair<int,int>> ns;
        for(int i = 0; i < n; ++i) {
            ns.push_back({speed[i], efficiency[i]});
        }
        sort(ns.begin(), ns.end(), [](const pair<int,int>& a,const pair<int,int>& b)->bool{return a.second > b.second;});
        long long res = 0, mod = 1e9+7, sum = 0;
        priority_queue<int, vector<int>, greater<int>> pq;
        for(int i = 0; i < n; ++i) {
            pq.push(ns[i].first);
            sum += ns[i].first;
            if(pq.size()>k) {
                sum -= pq.top();
                pq.pop();
            }
            res = max(res, (long long)sum*ns[i].second);
        }
        return res%mod;
    }
};
```
