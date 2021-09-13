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

    struct Cmp {
        bool operator() (ListNode* a, ListNode* b) {
            return a->val > b->val;
        }
    };

    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, Cmp> heap;
        auto dummy = new ListNode(-1), tail = dummy;
        for (auto l : lists) if (l) heap.push(l);

        while (heap.size()) {
            auto t = heap.top();
            heap.pop();

            tail = tail->next = t;
            if (t->next) heap.push(t->next);
        }

        return dummy->next;
    }
};
```



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
        for (auto p : lists) if (p) pq.push(p);   // if(p)很重要
        ListNode* dummy = new ListNode(-1);
        ListNode* pre = dummy;
        while (!pq.empty()) {
            ListNode* t = pq.top(); pq.pop();
            pre->next = t;
            pre = t;
            if (t->next) pq.push(t->next);
        }
        return dummy->next;
    }
};
```



```python
# 1. 用小根堆存储k个排序链表的头指针，并且把每个链表的头指针往后移一位
# 2. 当小根堆不为空的时候，弹出最小的元素，p的next指针指向那个节点，并且把最小的那条链表的下一个头节点加入到堆中

import heaqp
class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        q = []
        n = len(lists)
        for i in range(n):
            # 注意输入为 [[]] 的case
            if lists[i]:
                heapq.heappush(q, (lists[i].val, i))
                lists[i] = lists[i].next

        dummy = ListNode(None)
        pre = dummy
        while q:
            val, idx = heapq.heappop(q)
            pre.next = ListNode(val)
            pre = pre.next 
            if lists[idx]:
                heapq.heappush(q, (lists[idx].val, idx))
                lists[idx] = lists[idx].next
        return dummy.next
```

