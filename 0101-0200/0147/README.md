#  [147. 对链表进行插入排序](https://leetcode-cn.com/problems/insertion-sort-list/)

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
    ListNode* insertionSortList(ListNode* head) {
        ListNode *dummy = new ListNode(INT_MIN);
        ListNode *p = head, *pre = dummy, *next, *start;
        while(p) {
            // 令 pre = dummy 规避对pre是否为空的判断
            if(pre->val <= p->val) start = pre;
            else start = dummy;
            while(start->next && start->next->val < p->val) start = start->next;

            next = p->next;
            p->next = start->next;
            start->next = p;
            pre = p;
            p = next;
        }
        return dummy->next;
    }
};

class Solution {
public:
    ListNode* insertionSortList(ListNode* head) {
        ListNode *dummy = new ListNode(-1);
        while (head) {
            ListNode *next = head->next;
            ListNode *p = dummy;
            while (p->next && p->next-> val <= head->val) p = p->next;

            head->next = p->next;
            p->next = head;

            head = next;
        }
        return dummy->next;
    }
};
```



```python
class Solution:
    def insertionSortList(self, head: ListNode) -> ListNode:
        dummy = ListNode(None)
        p = head
        while p:   # p指向要插入的节点
            cur = dummy 
            pNe = p.next
            while cur.next and cur.next.val <= p.val:
                cur = cur.next
            p.next = cur.next 
            cur.next = p 
            p = pNe
        return dummy.next
```

