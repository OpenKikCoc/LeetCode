#  [19. 删除链表的倒数第N个节点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

## 题意



## 题解



```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode *dummy = new ListNode(-1);
        dummy->next = head;
        ListNode *fast = dummy, *slow = dummy;
        while (n -- ) fast = fast->next;
        while (fast->next) {
            fast = fast->next;
            slow = slow->next;
        }
        slow->next = slow->next->next;
        return dummy->next;
    }
};
```



```python
# 删除的点可能是head节点，所以一定要用dummy方便处理头节点被删的情况

class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        dummy = ListNode(None)
        dummy.next = head 
        p1, p2 = dummy, dummy
        for _ in range(n):
            p2 = p2.next 
        while p2 and p2.next:
            p1 = p1.next 
            p2 = p2.next
        p1.next = p1.next.next   # 如果这里写p1.next = p2 会有[1] 1这个case过不了
        # 在这个case下， p1还是在dummy处没动，p2也在第一个点，所以不能直接p1.next = p2
        return dummy.next
```

