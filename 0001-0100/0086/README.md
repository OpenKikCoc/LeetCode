#  [86. 分隔链表](https://leetcode.cn/problems/partition-list/)

## 题意



## 题解

```c++
class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        auto lh = new ListNode(-1), rh = new ListNode(-1);
        auto lt = lh, rt = rh;

        for (auto p = head; p; p = p->next) {
            if (p->val < x) lt = lt->next = p;
            else rt = rt->next = p;
        }

        lt->next = rh->next;
        rt->next = NULL;

        return lh->next;
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
    ListNode* partition(ListNode* head, int x) {
        ListNode *before = new ListNode(0);
        ListNode *befHead = before;
        ListNode *after = new ListNode(0);
        ListNode *aftHead = after;
        while (head != nullptr) {
            if (head->val < x) {
                before->next = head;
                before = before->next;
            } else {
                after->next = head;
                after = after->next;
            }
            head = head->next;
        }
        after->next = nullptr;
        before->next = aftHead->next;
        return befHead->next;
    }
};
```



```python
# 两条链表：一条链表存储 比 x 小的节点；另外一条存比 x 大的节点；再把两个链表拼接起来

class Solution:
    def partition(self, head: ListNode, x: int) -> ListNode:
        dum1, dum2 = ListNode(None), ListNode(None)
        p1, p2 = dum1, dum2
        p = head 
        while p:
            if p.val < x:
                p1.next = p 
                p1 = p1.next 
            else:
                p2.next = p 
                p2 = p2.next 
            p = p.next 
        p1.next = dum2.next 
        p2.next = None
        return dum1.next
```

