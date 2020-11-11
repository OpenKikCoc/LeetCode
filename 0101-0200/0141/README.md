#  [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

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
    bool hasCycle(ListNode *head) {
        ListNode *fast = head, *slow = head;
        while(fast && fast->next) {
            fast = fast->next->next;
            slow = slow->next;
            //cout << fast->val << " " << slow->val<<endl;
            if(slow == fast) return true;
        }
        return false;
    }
};
```



```python3

```

