#  [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

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
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr;
        while (head) {
            auto next = head->next;
            head->next = prev;
            prev = head;
            head = next;
        }
        return prev;
    }

    ListNode* reverseList(ListNode* head) {
        ListNode* dummy = new ListNode(-1);
        dummy->next = head;
        ListNode* pre = nullptr, * cur = head;
        while (cur != nullptr) {
            auto next = cur->next;
            cur->next = pre;
            pre = cur;
            cur = next;
        }
        dummy->next = pre;
        return dummy->next;
    }
};

// 递归
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode *tail = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return tail;
    }
};
```



```python
# python3
#========= 迭代
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

# 迭代
# 1. 用一个 cur 指针指向 head头节点，pre指针指向None， tmp指针用于保存 cur.next节点
# 2. 循环遍历 cur， 当 cur 指针存在时，首先先把 cur.next节点暂存在 tmp 指针中，然后把 cur.next 指向 pre。 pre 指针 移到 cur 指针的位置；最后 把 cur 指向 之前暂存的 tmp指针。
# 3. 最后当 cur 空时，跳出循环，此时 pre 指向的是 原链表的尾节点。所以返回 pre即可。

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        if not head or not head.next:return 
        cur, pre, p = head, None, None
        while cur:
            p = cur.next
            cur.next = pre
            pre = cur 
            cur = p
        return pre


#========= 递归
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
      	 # 踩坑！
        if not head or not head.next: 
            return head
        # 这里最终递归返回的是尾节点
        cur = self.reverseList(head.next) 
        # 对于任意一个节点，将它的next指向他本身
        head.next.next = head   
        # 最后将head.next置为None 
        head.next = None  
         # 所以将它输出即可
        return cur 
```

