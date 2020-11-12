#  [203. 移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

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
    ListNode* removeElements(ListNode* head, int val) {
        ListNode *dummy = new ListNode(-1);
        dummy->next = head;
        ListNode *pre = dummy;
        while(pre) {
            // 1.
            // if(pre->next && pre->next->val == val) pre->next = pre->next->next;
            // else pre = pre->next;
            // 2.
            auto p = pre->next;
            while(p && p->val == val) p = p->next;
            pre->next = p;
            pre = p;
        }
        return dummy->next;
    }
};
```



```python3

```

