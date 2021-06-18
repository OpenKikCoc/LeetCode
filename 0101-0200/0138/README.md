#  [138. 复制带随机指针的链表](https://leetcode-cn.com/problems/copy-list-with-random-pointer/)

## 题意



## 题解



```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;
    
    Node(int _val) {
        val = _val;
        next = NULL;
        random = NULL;
    }
};
*/

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if(!head) return nullptr;
        Node *p = head;
        while(p) {
            Node *np = new Node(p->val);
            np->next = p->next;
            np->random = p->random;
            p->next = np;
            p = np->next;
        }
        p = head;
        while(p) {
            if(p->next->random) p->next->random = p->next->random->next;
            p = p->next->next;
        }
        Node *oldp = head, *newp = head->next;
        Node *newl = newp;
        while(oldp) {
            oldp->next = oldp->next->next;
            if(newp->next) newp->next = newp->next->next;
            oldp = oldp->next;
            newp = newp->next;
        }
        return newl;
    }
};
```



```python
class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        if not head:return head

        p = head    # 第一步：复制一个小弟
        while p:
            q = Node(p.val)
            q.next = p.next 
            p.next = q 
            p = p.next.next 

        p = head  # 第二步：赋值random指针
        while p:
            if p.random:
                p.next.random = p.random.next 
            p = p.next.next

        dummy = ListNode(None)  # 第三步：拆分
        cur = dummy
        p = head 
        while p:
            cur.next = p.next
            cur = cur.next 
            p = p.next.next
        return dummy.next
```

