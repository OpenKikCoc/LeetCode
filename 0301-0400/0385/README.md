#  [385. 迷你语法分析器](https://leetcode.cn/problems/mini-parser/)

## 题意



## 题解



```c++
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *   public:
 *     // Constructor initializes an empty nested list.
 *     NestedInteger();
 *
 *     // Constructor initializes a single integer.
 *     NestedInteger(int value);
 *
 *     // Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     bool isInteger() const;
 *
 *     // Return the single integer that this NestedInteger holds, if it holds a single integer
 *     // The result is undefined if this NestedInteger holds a nested list
 *     int getInteger() const;
 *
 *     // Set this NestedInteger to hold a single integer.
 *     void setInteger(int value);
 *
 *     // Set this NestedInteger to hold a nested list and adds a nested integer to it.
 *     void add(const NestedInteger &ni);
 *
 *     // Return the nested list that this NestedInteger holds, if it holds a nested list
 *     // The result is undefined if this NestedInteger holds a single integer
 *     const vector<NestedInteger> &getList() const;
 * };
 */
class Solution {
public:
    NestedInteger deserialize(string s) {
        int u = 0;
        return dfs(s, u);
    }

    NestedInteger dfs(string& s, int& u) {
        NestedInteger res;
        if (s[u] == '[') {
            u ++ ;  // 跳过左括号
            while (s[u] != ']') res.add(dfs(s, u));
            u ++ ;  // 跳过右括号
            if (u < s.size() && s[u] == ',') u ++ ;  // 跳过逗号
        } else {
            int k = u;
            while (k < s.size() && s[k] != ',' && s[k] != ']') k ++ ;
            res.setInteger(stoi(s.substr(u, k - u)));
            if (k < s.size() && s[k] == ',') k ++ ;  // 跳过逗号
            u = k;
        }
        return res;
    }
};
```



```python3

```

