#  [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

## 题意

链表加法

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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode *dummy = new ListNode(-1);
        ListNode *pre = dummy;
        int v = 0;
        while(l1 || l2) {
            v = (l1 ? l1->val : 0) + (l2 ? l2->val : 0) + v;
            if(l1) l1 = l1->next;
            if(l2) l2 = l2->next;
            pre->next = new ListNode(v % 10);
            pre = pre->next;
            v /= 10;
        }
        if(v) pre->next = new ListNode(v);
        return dummy->next;
    }
};
```



```python3

```

