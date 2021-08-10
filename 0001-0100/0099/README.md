#  [99. 恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/)

## 题意



## 题解

>   morris遍历利用的是树的叶节点左右孩子为空（树的大量空闲指针）
>
>   实现空间开销的极限缩减。

### morris遍历的实现原则

-   记作当前节点为 `cur` 。
    -   如果 `cur` 无左孩子，`cur` 向右移动（`cur=cur.right`）
    -   如果 `cur` 有左孩子，找到 `cur` 左子树上最右的节点，记为 `mostright` 
        -   如果 `mostright` 的 `right` 指针指向空，让其指向 `cur` ，`cur` 向左移动（`cur=cur.left`）
        -   如果 `mostright` 的 `right` 指针指向 `cur` ，让其指向空，`cur` 向右移动（`cur=cur.right`）

实现以上的原则，即实现了 `morris` 遍历。

### morris遍历的实质

建立一种机制，对于没有左子树的节点只到达一次，对于有左子树的节点会到达两次

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
    void recoverTree(TreeNode* root) {
        TreeNode * p1 = nullptr, * p2 = nullptr, * cur = root, * pre = nullptr;
        while (cur) {
            if (cur->left) {
                auto p = cur->left;
                while (p->right && p->right != cur)
                    p = p->right;
                if (p->right) {
                    // cause p->right = cur;
                    p->right = nullptr;
                } else {
                    p->right = cur;
                    cur = cur->left;
                    continue;
                }
            }
            if (pre && cur->val < pre->val) {
                if (p1 == nullptr)
                    p1 = pre;
                p2 = cur;
            }
            pre = cur;
            cur = cur->right;
        }
        swap(p1->val, p2->val);
    }
};
```



```python3

```



## 拓展 morris各种遍历方式

-   先序

    ```c++
    // [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)
    class Solution {
    public:
        vector<int> preorderTraversal(TreeNode* root) {
            vector<int> res;
            TreeNode * cur = root;
            while (cur) {
                if (cur->left) {
                    auto p = cur->left;
                    while (p->right && p->right != cur)
                        p = p->right;
                    if (p->right) {
                        p->right = nullptr;
                    } else {
                        // -------------------- 先序输出 --------------------
                        res.push_back(cur->val);
                        // -------------------------------------------------
                        p->right = cur;
                        cur = cur->left;
                        continue;
                    }
                } else {
                    // 相对于普通流程新增的 else 
                    // -------------------- 先序输出 --------------------
                    res.push_back(cur->val);
                    // -------------------------------------------------
                }
                cur = cur->right;
            }
            return res;
        }
    };
    ```

-   中序

    ```c++
            while (cur) {
                if (cur->left) {
                    auto p = cur->left;
                    while (p->right && p->right != cur)
                        p = p->right;
                    if (p->right) {
                        p->right = nullptr;
                    } else {
                        p->right = cur;
                        cur = cur->left;
                        continue;
                    }
                }
                // -------------------- 中序输出 --------------------
                cout << cur->val << endl;
                // -------------------------------------------------
                cur = cur->right;
            }
    ```

-   后序

    ```c++
    class Solution {
    public:
        vector<int> res;
        
        void printNode(TreeNode * node) {
            vector<int> t;
            auto cur = node;
            while (cur) {
                t.push_back(cur->val);
                cur = cur->right;
            }
            for (int i = t.size() - 1; i >= 0; -- i )
                res.push_back(t[i]);
        }
    
        vector<int> postorderTraversal(TreeNode* root) {
            TreeNode * cur = root;
            while (cur) {
                if (cur->left) {
                    auto p = cur->left;
                    while (p->right && p->right != cur)
                        p = p->right;
                    if (p->right) {
                        p->right = nullptr;
                        // -------------------- 后序输出 --------------------
                        // 逆序打印左子树的右边界
                        printNode(cur->left);
                        // -------------------------------------------------
                    } else {
                        p->right = cur;
                        cur = cur->left;
                        continue;
                    }
                }
                cur = cur->right;
            }
            // -------------------- 后序输出 --------------------
            printNode(root);
            // -------------------------------------------------
            return res;
        }
    };
    ```

    `printNode` 可以同样规避对数组的使用：

    ```c++
        TreeNode * reverseEdge(TreeNode * node) {
            TreeNode * pre = nullptr, * cur = node;
            while (cur) {
                auto next = cur->right;
                cur->right = pre;
                pre = cur, cur = next;
            }
            return pre;
        }
    
        void printNode(TreeNode * node) {
            auto tail = reverseEdge(node);
            auto cur = tail;
            while (cur) {
                res.push_back(cur->val);
                cur = cur->right;
            }
            reverseEdge(tail);
        }
    ```

    
