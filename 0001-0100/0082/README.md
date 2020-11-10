#  [82. 删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

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
    // 注意 1 1这种特殊情况
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode *dummy = new ListNode(-1);
        dummy->next = head;
        ListNode *slow = dummy, *fast = dummy->next;
        while(fast != nullptr) {
            if(fast->next != nullptr && (fast->val == fast->next->val)) {
                int tmpv = fast->val;
                while(fast != nullptr && fast->val == tmpv) {
                    fast = fast->next;
                }
            } else {
                slow->next = fast;    // attention
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
        ListNode* dummy = new ListNode(-1);
        dummy->next = head;
        ListNode* p = dummy;
        while (p->next) {
            ListNode* q = p->next;
            while (q && q->val == p->next->val)
                q = q->next;
            if (p->next->next == q) p = p->next;
            else p->next = q;
        }
        return dummy->next;
    }
};
```



```python3

```

