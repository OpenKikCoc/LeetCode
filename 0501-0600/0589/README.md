#  [589. N叉树的前序遍历](https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/)

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
    vector<int> res;
    void dfs(Node * root) {
        if (!root) return;
        res.emplace_back(root->val);
        for (auto c : root->children) dfs(c);
    }
    vector<int> preorder(Node* root) {
        dfs(root);
        return res;
    }
};
```

```c++
class Solution {
public:
    vector<int> preorder(Node* root) {
        vector<int> ans;
        if (!root)
            return ans;

        stack<pair<Node*, int>> st;
        st.push(make_pair(root, 0));

        while (!st.empty()) {
            auto cur = st.top();
            st.pop();

            if (cur.second == 0)
                ans.push_back(cur.first -> val);

            if (cur.second < cur.first -> children.size()) {
                st.push(make_pair(cur.first, cur.second + 1));
                st.push(make_pair(cur.first -> children[cur.second], 0));
            }
        }

        return ans;
    }
};
```





```python3

```

