#  [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

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
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* dummy = new ListNode(-1);
        dummy->next = head;
        ListNode *pre = dummy, *cur = head, *next;
        while(cur) {
            ListNode *tail = pre;
            for(int i = 0; i < k; ++i) {
                tail = tail->next;
                if(!tail) return dummy->next;
            }
            // tail 是这k个的最后一个
            next = tail->next;
            // 翻转
            ListNode *fpre = tail->next, *fcur = pre->next, *fnext;
            while(fcur != next) {
                fnext = fcur->next;
                fcur->next = fpre;
                fpre = fcur;
                fcur = fnext;
            }
            pre->next = fpre;
            pre = cur;
            cur = next;
        }
	    return dummy->next;
    }
};
```



```python3

```

