#  [237. 删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/)

## 题意



## 题解



```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    void deleteNode(ListNode* node) {
        *node = *node->next;
    }
    void deleteNode_2(ListNode* node) {
        node->val = node->next->val;
        node->next = node->next->next;
    }
};
```



```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def deleteNode(self, node):
        """
        :type node: ListNode
        :rtype: void Do not return anything, modify node in-place instead.
        """
        node.val, node.next = node.next.val, node.next.next
```

