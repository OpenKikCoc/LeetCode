#  [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

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
    bool hasCycle(ListNode *head) {
        ListNode *fast = head, *slow = head;
        while (fast && fast->next) {
            fast = fast->next->next;
            slow = slow->next;
            if (slow == fast) return true;
        }
        return false;
    }
};
```



```python
class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        if not head or not head.next:return False
        slow, fast = head, head 
        while fast and fast.next: # 注意 这里是fast.next! 而不是fast.next.next 当只有一个节点时。
            pF = pF.next.next
            slow = slow.next 
            fast = fast.next.next 
            if slow == fast:return True 
        return False      
```

