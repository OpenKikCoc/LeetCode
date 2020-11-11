#  [92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

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
    ListNode* reverseBetween(ListNode* head, int m, int n) {
        int tot = n - m + 1;
        if(tot <= 1) return head;
        ListNode *dummy = new ListNode(-1);
        dummy->next = head;
        ListNode *before = dummy, *start, *cur, *pre = nullptr;
        while(--m) before = before->next;
        
        start = before->next;
        cur = start;
        //cout <<"pre value="<<before->val<<endl;
        for(int i = 0; i < tot; ++i) {
            ListNode *next = cur->next;
            cur->next = pre;
            pre = cur;
            cur = next;
        }
        start->next = cur;
        before->next = pre;
        return dummy->next;
    }
};
```



```python3

```

