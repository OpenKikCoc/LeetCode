#  [297. 二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)

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

    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        //if(!root) return "";
        stringstream ss;
        dfs(root, ss);
        return ss.str();
    }
    void dfs(TreeNode* r, stringstream& ss) {
        if(!r) {
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
        if(t[0] == '#') {
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

