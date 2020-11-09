#  [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

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
    ListNode* swapPairs(ListNode* head) {
        ListNode *dummy = new ListNode(-1);
        dummy->next = head;
        ListNode *pre = dummy, *cur = head, *next;
        while(cur && cur->next) {
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
        if(!head || !head->next) return head;
        ListNode *second = head->next;
        head->next = swapPairs(second->next);
        second->next = head;
        return second;
    }
};
```



```python3

```

