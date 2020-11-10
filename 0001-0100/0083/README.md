#  [83. 删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

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
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode *dummy = new ListNode(-1);
        dummy->next = head;
        ListNode *slow = dummy, *fast = dummy->next;
        while(fast != nullptr) {
            if(fast->next != nullptr && fast->val == fast->next->val) {
                int tmpv = fast->val;
                while(fast->next != nullptr && fast->next->val == tmpv) fast = fast->next;
            } else {
                slow->next = fast;
                slow = fast;
                fast = fast->next;
            }
        }
        slow->next = fast;
        return dummy->next;
    }
};

// yxc
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        if (!head) return head;
        ListNode* p = head;
        while (p->next) {
            if (p->val == p->next->val) p->next = p->next->next;
            else p = p->next;
        }
        return head;
    }
};
```



```python3

```

