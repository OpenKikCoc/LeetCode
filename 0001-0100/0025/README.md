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



```python
# 1. 先暴力判断是否有k个节点；2. 内部交换，最后再换头尾
class Solution:
    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:
        dummy = ListNode(0)
        dummy.next = head 
        pre = dummy
        while pre:
            q = pre 
            i = 0
            while i < k and q: # 注意 不能修改k, 所有用i变量来暴力遍历！ 踩坑！这里需要把 q是否存在加入到判断条件里，不会q.next就会报错！
                q = q.next 
                i += 1
            if not q:break 

            cur = pre.next 
            pNe = cur.next 
            for _ in range(k - 1):
                tmp = pNe.next 
                pNe.next = cur 
                cur, pNe = pNe, tmp
            
            a = pre.next   # 踩坑：这一部分 也记得要更新pre的位置，所以需要借助一个a
            pre.next = cur 
            a.next = pNe 
            pre = a 
        return dummy.next
```

