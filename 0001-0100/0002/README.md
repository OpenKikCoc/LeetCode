#  [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

## 题意

链表加法

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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode *dummy = new ListNode(-1);
        ListNode *pre = dummy;
        int v = 0;
        while (l1 || l2) {
            v = (l1 ? l1->val : 0) + (l2 ? l2->val : 0) + v;
            if(l1) l1 = l1->next;
            if(l2) l2 = l2->next;
            pre->next = new ListNode(v % 10);
            pre = pre->next;
            v /= 10;
        }
        if (v) pre->next = new ListNode(v);
        return dummy->next;
    }
};
```



```python
# 用两个指针 + 一个虚拟头节点
# 遍历两个指针，存在的话就是节点的值，不存在的话，值就为0

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = ListNode(None)
        p = dummy
        t = 0
        # 踩坑:记得把t加上，因为最后可能两条链表都遍历完了，但正好还有一个进位
        while l1 or l2 or t:  
            a = l1.val if l1 else 0
            b = l2.val if l2 else 0 
            p.next = ListNode((a + b + t) % 10
            p = p.next
            t = (a + b + t) //10
             # 踩坑，这里需要判断一下l1.next是否存在，不然会报错 : l1可能没有next元素。
            l1 = l1.next if l1 else None 
            l2 = l2.next if l2 else None 
        return dummy.next
```

