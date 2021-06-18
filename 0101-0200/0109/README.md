#  [109. 有序链表转换二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/)

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
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* build(ListNode* head, ListNode* tail) {
        if(head == tail) return nullptr;
        ListNode *slow = head, *fast = head;
        while(fast != tail && fast->next != tail) {
            slow = slow->next;
            fast = fast->next->next;
        }
        TreeNode * n = new TreeNode(slow->val);
        n->left = build(head, slow);
        n->right = build(slow->next, tail);
        return n;
    }
    TreeNode* sortedListToBST(ListNode* head) {
        return build(head, nullptr);
    }
};
```



```python
# 写法1
class Solution:
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        if not head or not head.next:return head 

        def dfs(head):
            if not head:return None
            p, n = head, 0 
            while p:
                p = p.next 
                n += 1
            if n == 1:return TreeNode(head.val)   # 踩坑： 这里要判断当前链表长度只有一个的时候 就直接返回
            cur = head
            for i in range(n//2 - 1):
                cur = cur.next
            root = TreeNode(cur.next.val)
            root.right = dfs(cur.next.next)  # 踩坑！ 先递归root.right, 然后再把cur.next 置为None
            cur.next = None
            root.left = dfs(head)
            return root
        
        return dfs(head)
      
# 写法2       
class Solution:
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        def dfs(head, tail):
            if head == tail:return None
            slow, fast = head, head 
            while fast!= tail and fast.next != tail:  # 踩坑！注意 这里要fast != tail 
                slow = slow.next 
                fast = fast.next.next
            root = TreeNode(slow.val)
            root.left = dfs(head, slow)
            root.right = dfs(slow.next, tail)
            return root
            
        return dfs(head, None)
```

