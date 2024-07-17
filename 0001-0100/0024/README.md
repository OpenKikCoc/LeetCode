#  [24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)

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
    ListNode* swapPairs(ListNode* head) {
        auto dummy = new ListNode(-1);
        dummy->next = head;
        for (auto p = dummy; p->next && p->next->next;) {
            auto a = p->next, b = a->next;
            p->next = b;
            a->next = b->next;
            b->next = a;
            p = a;
        }

        return dummy->next;
    }
};
```



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
    ListNode* swapPairs(ListNode* head) {
        ListNode *dummy = new ListNode(-1);
        dummy->next = head;
        ListNode *pre = dummy, *cur = head, *next;
        while (cur && cur->next) {
            next = cur->next;
            cur->next = next->next;
            next->next = cur;
            pre->next = next;

            pre = cur;
            cur = cur->next;
        }
        return dummy->next;
    }
};


class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode *second = head->next;
        head->next = swapPairs(second->next);
        second->next = head;
        return second;
    }
};
```



```python
# 添加虚拟头结点 dummy。定义 pre 指针初始指向 dummy。
# 定义 cur 指向 head, 若 cur 或 cur.next 为空，则终止循环。
# 按照一定的次序，修改 pNe 和 cur 的 next 指针，具体参见代码。

class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        dummy = ListNode(None)
        pre = dummy
        # 踩坑！初始化pre.next = head， 可以覆盖到一些特殊case:[], [1]
        pre.next = head
        cur = head 
        # 踩坑！ 这里要加上 判断cur.next 
        while cur and cur.next:  
            # 不然一进来，可能pNe就是None，
            pNe = cur.next    
            # 就会导致pNe没有next, 而报错
            cur.next = pNe.next   
            pNe.next = cur 
            pre.next = pNe
            pre, cur = cur, cur.next
        return dummy.next
```

