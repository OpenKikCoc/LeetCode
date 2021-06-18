#  [143. 重排链表](https://leetcode-cn.com/problems/reorder-list/)

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
    void reorderList(ListNode* head) {
        if(!head) return;
        ListNode *slow = head, *fast = head;
        // 这种写法 结束时 slow在中点上或中点隔板左侧
        while(fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        // head后的长度与nhead长度相等 或比其大1
        ListNode *nhead = slow->next;
        slow->next = nullptr;

        ListNode *pre = nullptr, *cur = nhead, *next;
        while(cur) {
            next = cur->next;
            cur->next = pre;
            pre = cur;
            cur = next;
        }

        ListNode *next2;
        cur = pre, pre = head;
        while(cur) {
            next = pre->next;
            next2 = cur->next;
            pre->next = cur;
            cur->next = next;
            pre = next;
            cur = next2;
        }
        return;
    }
};
```



```python
# 1. 找中点前一个节点 2. 翻转后半部分 3. 拆分插入
class Solution:
    def reorderList(self, head: ListNode) -> None:
        if not head or not head.next:return head 
        fast, slow = head, head
        while fast.next and fast.next.next:
            fast = fast.next.next 
            slow = slow.next 
        pre = None 
        cur = slow.next 
        p = head 
        while cur:
            tmp = cur.next
            cur.next = pre 
            pre = cur 
            cur = tmp 
        slow.next = pre
        p1, p2 = head, slow.next
        while p1 != slow:
            p1_tmp, p2_tmp = p1.next, p2.next 
            p1.next = p2
            p2.next = p1_tmp 
            p1, p2 = p1_tmp, p2_tmp 
        if p2:
            p1.next = p2 
            p2.next = None 
        else:
            p1.next = None
        return head
```

