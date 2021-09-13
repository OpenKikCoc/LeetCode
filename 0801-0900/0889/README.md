#  

## 题意



## 题解



```c++

```



```python
# 1. 前序遍历：第一个元素必然是根节点，且根节点右侧必是左子树
# 2. 后序遍历：最后一个元素必是根节点，且根节点左侧必是右子树
# 3. 寻找的分界点是分左子树根节点的位置，也就是前序遍历的第二个数，在后序中找到这个位置，可以算出左子树长度，然后就很简单了。

class Solution:
    def constructFromPrePost(self, pre: List[int], po: List[int]) -> TreeNode:
        my_dict = {}
        n = len(po)
        for i in range(n):
            my_dict[po[i]] = i

        def dfs(pre_L, pre_R, po_L, po_R):
            if pre_L > pre_R:return
            root = TreeNode(pre[pre_L])
            if pre_L == pre_R:return root    # 因为不是寻找根节点，所以需要判断当前部分树的长度，如果当前数，直接返回node即可
            idx = my_dict[pre[pre_L+1]]
            root.left = dfs(pre_L + 1, pre_L + 1+ idx - po_L, po_L, idx)
            root.right = dfs(pre_L + 1 + idx - po_L + 1, pre_R, idx + 1, po_R - 1)
            return root

        return dfs(0, n-1 ,0, n-1)
```

