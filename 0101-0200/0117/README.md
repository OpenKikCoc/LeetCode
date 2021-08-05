#  [117. 填充每个节点的下一个右侧节点指针 II](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/)

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
        if (!root) return nullptr;
        queue<Node*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            while (sz--) {
                Node* t = q.front(); q.pop();
                if (sz) t->next = q.front();
                if (t->left) q.push(t->left);
                if (t->right) q.push(t->right);
            }
        }
        return root;
    }
};


// 常数空间
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return root;
        auto cur = root;
        while (cur) {
            auto dummy = new Node(-1);
            auto pre = dummy;
            for (auto p = cur; p; p = p->next) {
                if (p->left) pre = pre->next = p->left;
                if (p->right) pre = pre->next = p->right;
            }
            cur = dummy->next;
        }
        return root;
    }
};
```



```python
# 非完美二叉树
# 算法：1. 从根节点开始BFS，每次遍历一层，从左到右依次遍历每个节点；
# 2. 遍历时维护下一层节点的链表。对于每个节点，依次判断他的左儿子和右儿子是否存在，如果存在，则插入到下一层链表的末尾
# 3. 并且每次链表的tail 都要往后走一位。

# 用root记层该层访问节点
# 用dummy记录下一层合成链表的开头.
# 用tail记录下一层合成链表的结尾.

class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root:return 
        head = root 
        while root:
            dummy = ListNode(None)
            tail = dummy 
            while root:
                if root.left:
                    tail.next = root.left 
                    tail = tail.next 
                if root.right:
                    tail.next = root.right
                    tail = tail.next 
                root = root.next 
            root = dummy.next 
        return head
```

