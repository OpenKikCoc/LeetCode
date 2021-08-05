#  [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

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
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode *l1 = headA, *l2 = headB;
        while (l1 != l2) {
            l1 = l1 ? l1->next : headB;
            l2 = l2 ? l2->next : headA;
        }
        return l1;
    }
};
```



```python
# 不管是相交还是 不相交，跳出循环的时候 p1 == p2
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        if not headA or not headB:return None
        p1, p2 = headA, headB
        while p1 != p2:
            p1 = p1.next if p1 else headB 
            p2 = p2.next if p2 else headA
        return p1  
```

