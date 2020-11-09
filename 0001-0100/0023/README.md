#  [23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

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
    struct cmp {
        bool operator()(ListNode* a, ListNode* b) {
            return a->val > b->val;
        }
    };
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        int k = lists.size();
        priority_queue<ListNode*, vector<ListNode*>, cmp> pq;
        for(auto p : lists) if(p) pq.push(p);   // if(p)很重要
        ListNode* dummy = new ListNode(-1);
        ListNode* pre = dummy;
        while(!pq.empty()) {
            ListNode* t = pq.top(); pq.pop();
            pre->next = t;
            pre = t;
            if(t->next) pq.push(t->next);
        }
        return dummy->next;
    }
};
```



```python3

```

