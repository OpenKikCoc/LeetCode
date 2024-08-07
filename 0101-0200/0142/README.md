#  [142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)

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
    ListNode *detectCycle(ListNode *head) {
        ListNode *fast = head, *slow = head, *ret = nullptr;
        while (fast && fast->next) {
            fast = fast->next->next;
            slow = slow->next;
            if (fast == slow) {
                // fast 比 slow 多走了一个环的长度
                ret = head;
                while (ret != slow) {
                    ret = ret->next;
                    slow = slow->next;
                }
                break;
            }
        }
        return ret;
    }
};
```



```python
class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        if not head or not head.next:return None 
        fast, slow = head, head 
        while fast and fast.next:
            slow = slow.next 
            fast = fast.next.next 
            if slow == fast:
                fast = head 
                while slow != fast:
                    fast = fast.next 
                    slow = slow.next 
                return slow
        return None   # 记得最后如果没有环 返回None
```

