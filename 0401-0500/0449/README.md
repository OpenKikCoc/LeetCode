#  [449. 序列化和反序列化二叉搜索树](https://leetcode.cn/problems/serialize-and-deserialize-bst/)

## 题意



## 题解



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
class Codec {
public:
// yxc 极致紧凑
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        string res;
        dfs_s(root, res);
        return res;
    }

    void dfs_s(TreeNode* root, string& res) {
        if (!root) return;
        res += to_string(root->val) + ' ';
        dfs_s(root->left, res), dfs_s(root->right, res);
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string str) {
        vector<int> data;
        stringstream ssin(str);
        int x, u = 0;
        while (ssin >> x) data.push_back(x);
        return dfs_d(data, u, INT_MIN, INT_MAX);
    }

    TreeNode* dfs_d(vector<int>& data, int& u, int minv, int maxv) {
        if (u == data.size() || data[u] < minv || data[u] > maxv) return NULL;
        auto root = new TreeNode(data[u ++ ]);
        root->left = dfs_d(data, u, minv, root->val);
        root->right = dfs_d(data, u, root->val + 1, maxv);
        return root;
    }


    // 原本自己写法 不算最紧凑
    string serialize(TreeNode* root) {
        if(!root) return string();
        stringstream ss;
        dfs(root,ss);
        return ss.str();
    }
    void dfs(TreeNode* rt,stringstream& ss){
        if(!rt){
            ss << "# ";
            return ;
        }
        ss << to_string(rt->val) <<" ";
        dfs(rt->left,ss);
        dfs(rt->right,ss);
    }
    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        if(data.empty()) return NULL;
        TreeNode* rt = NULL;
        stringstream ss(data);
        rebuild(rt,ss);
        return rt;
    }
    void rebuild(TreeNode* & rt,stringstream& ss){
        string t;
        ss >> t;
        if(t[0] == '#'){
            rt = NULL;
            return;
        }
        int v = stoi(t);
        rt = new TreeNode(v);
        rebuild(rt->left, ss);
        rebuild(rt->right, ss);
    }
};
```



```python3

```

