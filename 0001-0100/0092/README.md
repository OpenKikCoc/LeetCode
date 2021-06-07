#  [92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

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
    ListNode* reverseBetween(ListNode* head, int m, int n) {
        int tot = n - m + 1;
        if(tot <= 1) return head;
        ListNode *dummy = new ListNode(-1);
        dummy->next = head;
        ListNode *before = dummy, *start, *cur, *pre = nullptr;
        while(--m) before = before->next;
        
        start = before->next;
        cur = start;
        //cout <<"pre value="<<before->val<<endl;
        for(int i = 0; i < tot; ++i) {
            ListNode *next = cur->next;
            cur->next = pre;
            pre = cur;
            cur = next;
        }
        start->next = cur;
        before->next = pre;
        return dummy->next;
    }
};
```



```python
class Solution:
    def reverseBetween(self, head: ListNode, m: int, n: int) -> ListNode:
        dum = ListNode(None)
        dum.next = head
        p1, p2 = dum, dum
        while m > 0:
            pre1 = p1
            p1 = p1.next
            m -= 1
        while n > 0:
            pre2 = p2
            p2 = p2.next
            n -= 1
        p2N = p2.next
        pre, cur = p2N, p1
        while cur != p2N:
            tmp = cur.next
            cur.next = pre
            pre = cur
            cur = tmp
        pre1.next = pre
        return dum.next
```

