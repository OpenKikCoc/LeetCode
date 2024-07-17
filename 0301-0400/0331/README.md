#  [331. 验证二叉树的前序序列化](https://leetcode.cn/problems/verify-preorder-serialization-of-a-binary-tree/)

## 题意



## 题解



```c++
class Solution {
public:
    bool f = true;
    void dfs(string & preorder, int & u) {
        if (u == preorder.size()) {
            f = false;
            return;
        }
        if (preorder[u] == '#') {
            u += 2;
            return;
        }
        while (preorder[u] != ',') ++ u;
        ++ u;
        dfs(preorder, u);
        dfs(preorder, u);
    }
    bool isValidSerialization(string preorder) {
        preorder += ',';
        int u = 0;
        dfs(preorder, u);
        return f && u == preorder.size();
    }
};
```





```c++
/*
https://www.youtube.com/watch?v=_mbnPPHJmTQ

1.For any tree, number of nodes == number of edges + 1. (so we add 1 to number of edges first)
2.The hashtag(#) should only appear when there's edge available.
Then we have the algorithm or statement:

1.each node consumes 1 edge
2.each non-leaf node creates two edges
3.whenever edges are smaller than 0, return false, which means number of hashtag(#) is too much
4. Finally, edges should be zero to meet the 1st constraint which is number of nodes == number of edges + 1

*/
class Solution {
public:
    bool isValidSerialization(string preorder) {
        int degree = 1;
        string tmp;
        stringstream ss;
        ss << preorder;
        while (getline(ss, tmp, ',')){
            degree -- ;         // consume one edge
            if (degree < 0) {
                return false;
            }
            if (tmp[0]!='#') {
                degree += 2;    // generate 2 edges
            }
        }
        return degree == 0;
    }
};
```





```python3

```

