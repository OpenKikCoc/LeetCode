#  [429. N叉树的层序遍历](https://leetcode.cn/problems/n-ary-tree-level-order-traversal/)

## 题意



## 题解



```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;

    Node() {}

    Node(int _val) {
        val = _val;
    }

    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
*/

class Solution {
public:
    vector<vector<int>> levelOrder(Node* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<Node*> q;
        q.push(root);
        while (!q.empty()) {
            vector<int> t;
            int sz = q.size();
            while (sz -- ) {
                auto r = q.front(); q.pop();
                t.push_back(r->val);
                for (auto son : r->children)
                    if (son) q.push(son);
            }
            res.push_back(t);
        }
        return res;
    }
};
```



```python
class Solution:
    def levelOrder(self, root: 'Node') -> List[List[int]]:
        if not root:return []
        res, q = [], collections.deque()
        q.append(root)
        while q:
            tmp = []
            for _ in range(len(q)):
                node = q.popleft()
                tmp.append(node.val)
                for ch in node.children:  # 踩坑：这里不能用while node.children: 怎么让node指向下一个ch呢
                    q.append(ch)
            res.append(tmp)
        return res
```

