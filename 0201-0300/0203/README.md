#  [203. 移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

## 题意



## 题解

```c++
// yxc
class Solution {
public:
    ListNode* removeElements(ListNode* head, int val) {
        auto dummy = new ListNode(-1);
        dummy->next = head;
        for (auto p = dummy; p; p = p->next) {
            auto q = p->next;
            while (q && q->val == val) q = q->next;
            p->next = q;
        }
        return dummy->next;
    }
};
```

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
    ListNode* removeElements(ListNode* head, int val) {
        ListNode *dummy = new ListNode(-1);
        dummy->next = head;
        ListNode *pre = dummy;
        while (pre) {
            // 1.
            // if (pre->next && pre->next->val == val) pre->next = pre->next->next;
            // else pre = pre->next;
            // 2.
            auto p = pre->next;
            while (p && p->val == val) p = p->next;
            pre->next = p;
            pre = p;
        }
        return dummy->next;
    }
};
```



```python
class Solution:
    def removeElements(self, head: ListNode, val: int) -> ListNode:
        dummy=ListNode(None)
        dummy.next=head
        pre=dummy
        cur=pre.next
        while cur:
            if cur.val==val:
                pre.next=cur.next
                cur=pre.next
            else:
                cur=cur.next
                pre=pre.next
        return dummy.next
```

