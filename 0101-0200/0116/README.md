#  [116. 填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

## 题意



## 题解



```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node() : val(0), left(NULL), right(NULL), next(NULL) {}

    Node(int _val) : val(_val), left(NULL), right(NULL), next(NULL) {}

    Node(int _val, Node* _left, Node* _right, Node* _next)
        : val(_val), left(_left), right(_right), next(_next) {}
};
*/

class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return root;
        auto source = root; // 存一下根，返回用
        // 当有左儿子时说明有下一层
        while (root->left) {
            // 使用next遍历这一层每个结点p，以处理下一层的连接关系
            for (auto p = root; p; p = p->next) {
                // p的左儿子的next就是p的右儿子
                p->left -> next = p->right;
                // p的右儿子的next就是p的next的左儿子，要保证p->next存在
                if (p->next)
                    p->right -> next = p->next->left;
            }
            root = root->left; // 每次向左儿子走就走到了下一层的第一个结点
        }
        return source;
    }
    Node* connect2(Node* root) {
        if(!root) return root;
        Node *left = root->left, *right = root->right;
        while(left) {
            left->next = right;
            left = left->right;
            right = right->left;
        }
        connect(root->left);
        connect(root->right);
        return root;
    }
};
```



```python3

```

