#  [143. 重排链表](https://leetcode-cn.com/problems/reorder-list/)

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
    void reorderList(ListNode* head) {
        if(!head) return;
        ListNode *slow = head, *fast = head;
        // 这种写法 结束时 slow在中点上或中点隔板左侧
        while(fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        // head后的长度与nhead长度相等 或比其大1
        ListNode *nhead = slow->next;
        slow->next = nullptr;

        ListNode *pre = nullptr, *cur = nhead, *next;
        while(cur) {
            next = cur->next;
            cur->next = pre;
            pre = cur;
            cur = next;
        }

        ListNode *next2;
        cur = pre, pre = head;
        while(cur) {
            next = pre->next;
            next2 = cur->next;
            pre->next = cur;
            cur->next = next;
            pre = next;
            cur = next2;
        }
        return;
    }
};
```



```python3

```

