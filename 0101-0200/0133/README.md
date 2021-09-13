#  [133. 克隆图](https://leetcode-cn.com/problems/clone-graph/)

## 题意



## 题解



```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/

class Solution {
public:
    Node* vis[101];
    Node* cloneGraph(Node* node) {
        if (!node)
            return nullptr;
        if (vis[node->val])
            return vis[node->val];

        Node * p = new Node(node->val);
        vis[node->val] = p;
        
        vector<Node*> nb = node->neighbors;
        for (int i = 0; i < nb.size(); ++ i )
            p->neighbors.push_back(cloneGraph(nb[i]));
        return p;
    }
};
```

```c++
class Solution {
public:
    unordered_map<Node*, Node*> hash;

    Node* cloneGraph(Node* node) {
        if (!node) return NULL;
        dfs(node);  // 复制所有点

        for (auto [s, d]: hash) {
            for (auto ver: s->neighbors)
                d->neighbors.push_back(hash[ver]);
        }

        return hash[node];
    }

    void dfs(Node* node) {
        hash[node] = new Node(node->val);

        for (auto ver: node->neighbors)
            if (hash.count(ver) == 0)
                dfs(ver);
    }
};
```


```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

# 递归地访问(复制)邻居节点，用一个map来存储节点访问情况
class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        my_dict = dict()
        if not node:return None

        def dfs(node):
            my_dict[node]=Node(node.val)
            for ver in node.neighbors:
                if ver not in my_dict:
                    dfs(ver)

        dfs(node)
        for k,v in my_dict.items():
            for ver in k.neighbors:
                v.neighbors.append(my_dict[ver])
        return my_dict[node]
```

