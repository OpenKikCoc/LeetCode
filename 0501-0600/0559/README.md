#  [559. N叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-n-ary-tree/)

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
    int maxDepth(Node* root) {
        if (!root) return 0;
        int ret = 0;
        for (auto c : root->children)
            ret = max(ret, maxDepth(c));
        return ret + 1;
    }
};
```



```python
class Solution:
    def maxDepth(self, root: 'Node') -> int:
        if not root:return 0
        maxn = 0
        for ch in root.children:
            maxn = max(self.maxDepth(ch), maxn)
        return maxn + 1
```

