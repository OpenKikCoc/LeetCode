#  [234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)

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
    bool isPalindrome(ListNode* head) {
        if (!head || !head->next) return true;
        ListNode *slow = head, *fast = head, *pre = nullptr, *cur = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;

            auto next = cur->next;
            cur->next = pre;
            pre = cur;
            cur = next;
        }
        if (fast) slow = slow->next;
        while (pre && slow) {
            if (pre->val != slow->val)
                return false;
            pre = pre->next;
            slow = slow->next;
        }
        return true;
    }
};
```

```c++
// yxc
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        int n = 0;
        for (auto p = head; p; p = p->next) n ++ ;
        if (n <= 1) return true;
        int half = n / 2;
        auto a = head;
        for (int i = 0; i < n - half; i ++ ) a = a->next;
        auto b = a->next;
        for (int i = 0; i < half - 1; i ++ ) {
            auto c = b->next;
            b->next = a;
            a = b, b = c;
        }

        auto p = head, q = a;
        bool success = true;
        for (int i = 0; i < half; i ++ ) {
            if (p->val != q->val) {
                success = false;
                break;
            }
            p = p->next;
            q = q->next;
        }

        auto tail = a;
        b = a->next;
        // 将链表恢复原状
        for (int i = 0; i < half - 1; i ++ ) {
            auto c = b->next;
            b->next = a;
            a = b, b = c;
        }

        tail->next = NULL;
        return success;
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
    def isPalindrome(self, head: ListNode) -> bool:
        if not head or not head.next:return True
        dummy=ListNode(None)
        dummy.next=head
        p1,p2=dummy,dummy
        stack=[]
        while p2 and p2.next:
            p1,p2=p1.next,p2.next.next
        p1=p1.next
        while p1:
            stack.append(p1)
            p1=p1.next
        p=head
        while stack:
            q=stack.pop()
            if p.val!=q.val:
                return False
            p=p.next
        return True
            

        
```

