#  [328. 奇偶链表](https://leetcode.cn/problems/odd-even-linked-list/)

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
    ListNode* oddEvenList(ListNode* head) {
        ListNode *dummy1 = new ListNode(-1), *dummy2 = new ListNode(-1);
        ListNode *p1 = dummy1, *p2 = dummy2;
        bool giveA = true;
        while (head) {
            if (giveA) p1->next = head, p1 = head;
            else p2->next = head, p2 = head;
            head = head->next;
            giveA = !giveA;
        }
        p2->next = nullptr;
        p1->next = dummy2->next;
        return dummy1->next;
    }
};
```

```c++
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        if (!head || !head->next) return head;
        auto oh = head, ot = oh;
        auto eh = head->next, et = eh;
        for (auto p = head->next->next; p;) {
            ot = ot->next = p;
            p = p->next;
            if (p) {
                et = et->next = p;
                p = p->next;
            }
        }
        ot->next = eh;
        et->next = NULL;
        return oh;
    }
};
```


```python3

```

