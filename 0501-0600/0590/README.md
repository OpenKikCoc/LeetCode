#  [590. N叉树的后序遍历](https://leetcode.cn/problems/n-ary-tree-postorder-traversal/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> postorder(Node* root) {
        vector<int> ans;
        if (!root)
            return ans;

        stack<pair<Node*, int>> st;
        st.push(make_pair(root, 0));

        while (!st.empty()) {
            auto cur = st.top();
            st.pop();

            if (cur.second < cur.first -> children.size()) {
                st.push(make_pair(cur.first, cur.second + 1));
                st.push(make_pair(cur.first -> children[cur.second], 0));
            } else {
                ans.push_back(cur.first -> val);
            }
        }

        return ans;
    }
};
```



```python3

```

