#  [234. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)

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
    bool isPalindrome(ListNode* head) {
        if(!head || !head->next) return true;
        ListNode *slow = head, *fast = head, *pre = nullptr, *cur = head, *next;
        while(fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;

            next = cur->next;
            cur->next = pre;
            pre = cur;
            cur = next;
        }
        if(fast) slow = slow->next;
        while(pre && slow) {
            if(pre->val != slow->val) return false;
            pre = pre->next;
            slow = slow->next;
        }
        return true;
    }
};
```



```python3

```

