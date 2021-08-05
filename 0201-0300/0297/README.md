#  [297. 二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)

## 题意



## 题解

```c++
// yxc
class Codec {
public:
    string path;
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        dfs_s(root);
        return path;
    }

    void dfs_s(TreeNode* root) {
        if (!root) path += "#,";
        else {
            path += to_string(root->val) + ',';
            dfs_s(root->left);
            dfs_s(root->right);
        }
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        int u = 0;
        return dfs_d(data, u);
    }

    TreeNode* dfs_d(string& data, int& u) {
        if (data[u] == '#') {
            u += 2;
            return NULL;
        } else {
            int k = u;
            while (data[u] != ',') u ++ ;
            auto root = new TreeNode(stoi(data.substr(k, u - k)));
            u ++ ;
            root->left = dfs_d(data, u);
            root->right = dfs_d(data, u);
            return root;
        }
    }
};
```


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

    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        //if(!root) return "";
        stringstream ss;
        dfs(root, ss);
        return ss.str();
    }
    void dfs(TreeNode* r, stringstream& ss) {
        if (!r) {
            ss << "# ";
            return;
        }
        ss << to_string(r->val) << " ";
        dfs(r->left, ss);
        dfs(r->right, ss);
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        //if(data.empty()) return nullptr;
        stringstream ss(data);
        TreeNode* r = nullptr;
        rebuild(r, ss);
        return r;
    }
    void rebuild(TreeNode* & r, stringstream& ss) {
        string t;
        ss >> t;
        if (t[0] == '#') {
            r = nullptr;
            return;
        }
        r = new TreeNode(stoi(t));
        rebuild(r->left, ss);
        rebuild(r->right, ss);
    }
};

// Your Codec object will be instantiated and called as such:
// Codec codec;
// codec.deserialize(codec.serialize(root));
```



```python3

```

