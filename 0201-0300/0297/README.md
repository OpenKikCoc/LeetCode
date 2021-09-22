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



```python
# python3
# 【二叉树被序列化为一个【字符串】！ 并且讲这个【字符串】反序列化为原始的树结构】
# 题目要求的 序列化 和 反序列化 是 可逆操作。因此，序列化的字符串应携带 完整的二叉树信息。【通常使用的前序、中序、后序、层序遍历记录的二叉树的信息不完整，即唯一的输出序列可能对应着多种二叉树可能性。】
# 序列化：通过 层序遍历 实现
# 反序列化：根据序列化拿到的层序遍历的结果，按照 层 重构二叉树。借助一个指针 i 指向当前节点 root 的左、右结点，每构建一个 node 的左右节点，指针就向右移动 1 位（i += 1)

# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Codec:
    def serialize(self, root):
        if not root:return 
        q = collections.deque()
        q.append(root)
        res = []
        while q:
            node = q.popleft()
            if node:
                res.append(str(node.val))
                # 不管 node.left 是否存在 都要放到队列中，这样如果不存在，该位置就可以被置为'null'
                q.append(node.left)  
                q.append(node.right)
            else:  
                # 当前位置没有结点时，需要进行标识为'null'
                res.append("null")  
        return '[' + ','.join(res) + ']'

    def deserialize(self, data):
        if not data:return
        
        # 前后的 [ ] 这两个字符串 不需要进入重构二叉树
        nums = data[1:-1].split(',')  
        
        # 层序遍历的第一个点 就是 root 的值
        root = TreeNode(int(nums[0]))        
        q = collections.deque()
        q.append(root)
        i = 1
        while q:
            node = q.popleft()
            if nums[i] != "null":
                node.left = TreeNode(int(nums[i]))
                q.append(node.left)
            i += 1
            if nums[i] != "null":
                node.right = TreeNode(int(nums[i]))
                q.append(node.right)
            i += 1
        return root
```

