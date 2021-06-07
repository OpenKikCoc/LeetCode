#  [61. 旋转链表](https://leetcode-cn.com/problems/rotate-list/)

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
    ListNode* rotateRight(ListNode* head, int k) {
        ListNode* t = head;
        int tot = 0;
        while(t) t = t->next, ++tot;
        //if(!tot || tot == 1 || tot%k == 0) return head;
        if(tot <= 1 || k%tot == 0) return head;
        k %= tot;
        ListNode *slow = head, *fast = head;
        while(k--) fast = fast->next;
        while(fast->next) {
            slow = slow->next;
            fast = fast->next;
        }
        fast->next = head;
        t = slow->next;
        slow->next = nullptr;
        return t;
    }
};
```



```python
class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head:return 
        dummy = ListNode(None)
        pre = dummy
        dummy.next = head 
        length = 0
        while pre.next:
            pre = pre.next 
            length += 1
        p1, p2, k = head, head, k % length
        if k == 0:return head
        for _ in range(k):
            p2 = p2.next 
        while p2.next:
            p1 = p1.next
            p2 = p2.next 
        dummy.next = p1.next
        p1.next = None
        p2.next = head
        return dummy.next
```

