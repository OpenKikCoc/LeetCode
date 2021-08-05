#  [92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

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
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        int d = right - left + 1;
        if (d <= 1)
            return head;
        
        ListNode * dummy = new ListNode(-1);
        dummy->next = head;
        
        ListNode * before = dummy;
        while ( -- left)    // ATTENTION
            before = before->next;

        // 设置pre 注意需要d+1个位移
        ListNode * pre = before;
        for (int i = 0; i <= d; ++ i )
            pre = pre->next;
        ListNode * cur = before->next;
        while (d -- ) {
            auto next = cur->next;
            cur->next = pre;

            pre = cur;
            cur = next;
        }
        before->next = pre;
        return dummy->next;
    }
};
```



```c++
// yxc
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int m, int n) {
        auto dummy = new ListNode(-1);
        dummy->next = head;

        auto a = dummy;
        for (int i = 0; i < m - 1; i ++ ) a = a->next;
        auto b = a->next, c = b->next;
        for (int i = 0; i < n - m; i ++ ) {
            auto t = c->next;
            c->next = b;
            b = c, c = t;
        }
        a->next->next = c;
        a->next = b;
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

