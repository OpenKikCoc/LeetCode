#  [61. 旋转链表](https://leetcode.cn/problems/rotate-list/)

## 题意



## 题解

```c++
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head) return head;
        int n = 0;
        ListNode* tail;
        for (auto p = head; p; p = p->next) {
            tail = p;
            n ++ ;
        }
        k %= n;
        if (!k) return head;

        auto p = head;
        for (int i = 0; i < n - k - 1; i ++ ) p = p->next;
        tail->next = head;
        head = p->next;
        p->next = nullptr;
        return head;
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
    ListNode* rotateRight(ListNode* head, int k) {
        ListNode* t = head;
        int tot = 0;
        while (t) t = t->next, ++ tot ;
        // if (!tot || tot == 1 || tot%k == 0) return head;
        if (tot <= 1 || k%tot == 0) return head;
        k %= tot;
        ListNode *slow = head, *fast = head;
        while (k -- ) fast = fast->next;
        while (fast->next) {
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
"""
这道题中 k 可能很大，所以我们令 k=k%n，n是链表长度。
1. 创建两个指针first, second，分别指向头结点
2. 先让first向后移动 k 个位置，然后first和second同时向后移动，直到first走到链表最后一个元素。
3. 此时first指向链表末尾，second指向分界点。然后我们把链表从分界点处断开，然后把后半段接在前半段前面即可。

"""
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

