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
        while (fast != nullptr) {
            if (fast->next != nullptr && (fast->val == fast->next->val)) {
                int tmpv = fast->val;
                while (fast != nullptr && fast->val == tmpv)
                    fast = fast->next;
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



```python
# 法一：用一个哨兵 来判断pre当前数 能不能被用
class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        dummy = ListNode(None)
        pre = dummy
        dummy.next = head 
        cur = head 
        while cur:
            flag = False
            while cur.next:
                if cur.val == cur.next.val:
                    cur = cur.next
                    flag = True
                else:break
            if flag:
                pre.next = cur.next 
            else:
                pre = cur 
            cur = cur.next 
        return dummy.next
      
# 法二：
"""
为了方便处理边界情况，我们定义一个虚拟元素 dummy 指向链表头节点。
然后从前往后扫描整个链表，每次扫描元素相同的一段，如果这段中的元素个数多于1个，则将整段元素直接删除。

时间复杂度分析：整个链表只扫描一遍，所以时间复杂度是 O(n。
"""
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* p = dummy;
        while (p->next)
        {
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

