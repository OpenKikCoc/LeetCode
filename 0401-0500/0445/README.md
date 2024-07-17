#  [445. 两数相加 II](https://leetcode.cn/problems/add-two-numbers-ii/)

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
    ListNode* reverse(ListNode* head) {
        auto a = head, b = head->next;
        while (b) {
            auto c = b->next;
            b->next = a;
            a = b, b = c;
        }
        head->next = NULL;
        return a;
    }

    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        l1 = reverse(l1), l2 = reverse(l2);
        auto head = new ListNode(-1);
        int t = 0;
        while (l1 || l2 || t) {
            if (l1) t += l1->val, l1 = l1->next;
            if (l2) t += l2->val, l2 = l2->next;
            auto cur = new ListNode(t % 10);
            t /= 10;
            cur->next = head->next;
            head->next = cur;
        }
        return head->next;
    }


    // stack
    ListNode* addTwoNumbers_2(ListNode* l1, ListNode* l2) {
        stack<int> s1, s2;
        ListNode* p;
        p = l1;
        while (p) {
            s1.push(p->val);
            p = p->next;
        }
        p = l2;
        while (p) {
            s2.push(p->val);
            p = p->next;
        }
        // p = nullptr;
        int carry = 0;
        while (!s1.empty() && !s2.empty()) {
            int v1 = s1.top(), v2 = s2.top();
            s1.pop(); s2.pop();
            int v = v1 + v2 + carry;
            carry = v / 10; v = v % 10;
            ListNode* n = new ListNode(v);
            n->next = p;
            p = n;
        }
        while (!s1.empty()) {
            int v1 = s1.top();
            s1.pop();
            int v = v1 + carry;
            carry = v / 10; v = v % 10;
            ListNode* n = new ListNode(v);
            n->next = p;
            p = n;
        }
        while (!s2.empty()) {
            int v2 = s2.top();
            s2.pop();
            int v = v2 + carry;
            carry = v / 10; v = v % 10;
            ListNode* n = new ListNode(v);
            n->next = p;
            p = n;
        }
        if(carry) {
            int v = carry;
            ListNode* n = new ListNode(v);
            n->next = p;
            p = n;
        }
        return p;
    }
};
```



```python3

```

