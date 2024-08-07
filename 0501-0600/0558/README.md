#  [558. 四叉树交集](https://leetcode.cn/problems/logical-or-of-two-binary-grids-represented-as-quad-trees/)

## 题意



## 题解



```c++
/*
// Definition for a QuadTree node.
class Node {
public:
    bool val;
    bool isLeaf;
    Node* topLeft;
    Node* topRight;
    Node* bottomLeft;
    Node* bottomRight;
    
    Node() {
        val = false;
        isLeaf = false;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }
    
    Node(bool _val, bool _isLeaf) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }
    
    Node(bool _val, bool _isLeaf, Node* _topLeft, Node* _topRight, Node* _bottomLeft, Node* _bottomRight) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = _topLeft;
        topRight = _topRight;
        bottomLeft = _bottomLeft;
        bottomRight = _bottomRight;
    }
};
*/

class Solution {
public:
    Node* intersect(Node* t1, Node* t2) {
        if (t1->isLeaf) return t1->val ? t1 : t2;
        if (t2->isLeaf) return t2->val ? t2 : t1;
        t1->topLeft = intersect(t1->topLeft, t2->topLeft);
        t1->topRight = intersect(t1->topRight, t2->topRight);
        t1->bottomLeft = intersect(t1->bottomLeft, t2->bottomLeft);
        t1->bottomRight = intersect(t1->bottomRight, t2->bottomRight);

        if (t1->topLeft->isLeaf && t1->topRight->isLeaf && t1->bottomLeft->isLeaf && t1->bottomRight->isLeaf)
            if (t1->topRight->val == t1->topLeft->val
                && t1->bottomLeft->val == t1->topLeft->val
                && t1->bottomRight->val == t1->topLeft->val) {
                    t1->isLeaf = true;
                    t1->val = t1->topLeft->val;
                    t1->topLeft = t1->topRight = t1->bottomLeft = t1->bottomRight = NULL;
                }

        return t1;
    }
};
```



```python
class Solution:
    def intersect(self, t1: 'Node', t2: 'Node') -> 'Node':
        if t1.isLeaf:
            return Node(True, True, None, None, None, None) if t1.val else t2
        if t2.isLeaf:
            return Node(True, True, None, None, None, None) if t2.val else t1
        tl, tr, bl, br = self.intersect(t1.topLeft, t2.topLeft), self.intersect(t1.topRight, t2.topRight), self.intersect(t1.bottomLeft, t2.bottomLeft), self.intersect(t1.bottomRight, t2.bottomRight)
        return Node(tl.val, True, None, None, None, None) if tl.isLeaf and tr.isLeaf and bl.isLeaf and br.isLeaf and tl.val == tr.val == bl.val == br.val else Node(False, False, tl, tr, bl, br)
```

