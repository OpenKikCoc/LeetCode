#  [341. 扁平化嵌套列表迭代器](https://leetcode-cn.com/problems/flatten-nested-list-iterator/)

## 题意



## 题解



```c++
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *   public:
 *     // Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     bool isInteger() const;
 *
 *     // Return the single integer that this NestedInteger holds, if it holds a single integer
 *     // The result is undefined if this NestedInteger holds a nested list
 *     int getInteger() const;
 *
 *     // Return the nested list that this NestedInteger holds, if it holds a nested list
 *     // The result is undefined if this NestedInteger holds a single integer
 *     const vector<NestedInteger> &getList() const;
 * };
 */

class NestedIterator {
public:
    vector<int> q;
    int k;

    NestedIterator(vector<NestedInteger> &nestedList) {
        k = 0;
        for (auto& l: nestedList) dfs(l);
    }

    void dfs(NestedInteger& l) {
        if (l.isInteger()) q.push_back(l.getInteger());
        else {
            for (auto& v: l.getList()) dfs(v);
        }
    }

    int next() {
        return q[k ++ ];
    }

    bool hasNext() {
        return k < q.size();
    }
};

/**
 * Your NestedIterator object will be instantiated and called as such:
 * NestedIterator i(nestedList);
 * while (i.hasNext()) cout << i.next();
 */
```



```python3

```

