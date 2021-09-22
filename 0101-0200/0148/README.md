#  [148. 排序链表](https://leetcode-cn.com/problems/sort-list/)

## 题意



## 题解



较优的写法 yxc

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
    ListNode* sortList(ListNode* head) {
        int n = 0;
        for (auto p = head; p; p = p->next) n ++ ;

        auto dummy = new ListNode(-1);
        dummy->next = head;
        for (int i = 1; i < n; i *= 2) {
            auto cur = dummy;
            for (int j = 1; j + i <= n; j += i * 2) {
                auto p = cur->next, q = p;
                for (int k = 0; k < i; k ++ ) q = q->next;
                int x = 0, y = 0;
                while (x < i && y < i && p && q) {
                    if (p->val <= q->val) cur = cur->next = p, p = p->next, x ++ ;
                    else cur = cur->next = q, q = q->next, y ++ ;
                }
                while (x < i && p) cur = cur->next = p, p = p->next, x ++ ;
                while (y < i && q) cur = cur->next = q, q = q->next, y ++ ;
                cur->next = q;
            }
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
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* sortList(ListNode* head) {
        ListNode *dummy = new ListNode(INT_MIN);
        dummy->next = head;
        ListNode *p = head;
        int len = 0;
        while (p) {
            ++ len ;
            p = p->next;
        }
        for (int d = 1; d < len; d <<= 1) {
            ListNode *pre = dummy, *cur = dummy->next;
            while (cur) {
                ListNode *l = cur;
                ListNode *r = cut(l, d);
                cur = cut(r, d);
                pre->next = merge(l, r);
                while (pre->next) pre = pre->next;
            }
        }
        return dummy->next;
    }
    // 切掉前d个返回新头节点
    ListNode* cut(ListNode* n, int d) {
        ListNode *p = n, *next;
        while ( -- d && p) {
            p = p->next;
        }
        if (!p) return nullptr;
        next = p->next;
        p->next = nullptr;
        return next;
    }
    ListNode* merge(ListNode* l1, ListNode* l2) {
        ListNode* dummy = new ListNode(-1);
        ListNode* p = dummy;
        while (l1 && l2) {
            if (l1->val < l2->val) {
                p->next = l1;
                l1 = l1->next;
            } else {
                p->next = l2;
                l2 = l2->next;
            }
            p = p->next;
        }
        p->next = l1 ? l1 : l2;
        return dummy->next;
    }
};
```



```python
# 只需要掌握 递归版的归并排序

#  迭代的归并排序空间复杂度是S(1); 递归的归并排序:S(logN)
# 快排的空间复杂度S(logN)

# 选择 迭代的归并排序：自底向上做！（正常递归的归并排序是 自顶向下）
class Solution:
    def sortList(self, head: ListNode) -> ListNode:
        if not head or not head.next: 
            return head
        slow, fast = head, head
        while fast.next and fast.next.next:  # 踩坑：这里不能写fast and fast.next， 当链表只有两个节点的时候，就会陷入死循环，一直递归
            slow = slow.next
            fast = fast.next.next
        # 找到左右部分, 把左部分最后置空
        mid = slow.next
        slow.next = None
        # 递归下去
        left = self.sortList(head)
        right = self.sortList(mid)
        # 合并
        return self.merge(left, right)

    def merge(self, left, right):
        dummy = ListNode(0)
        p = dummy
        l, r = left, right

        while l and r:
            if l.val < r.val:
                p.next = l
                l = l.next
                p = p.next
            else:
                p.next = r
                r = r.next
                p = p.next
        if l:
            p.next = l
        if r:
            p.next = r
        return dummy.next
```

