#  [301. 删除无效的括号](https://leetcode.cn/problems/remove-invalid-parentheses/)

## 题意



## 题解

### 括号匹配问题两个原则

-   左右括号数量相同
-   对于任意前缀，左括号数量都大于等于右括号数量

风格一致的写法

```c++
class Solution {
public:
    vector<string> ans;

    vector<string> removeInvalidParentheses(string s) {
        // l 代表左括号比右括号多的个数(不计要删的右括号)
        // r 代表需要删除的右括号个数
        int l = 0, r = 0;
        for (auto x: s)
            if (x == '(') l ++ ;
            else if (x == ')') {
                if (l == 0) r ++ ;
                else l -- ;
            }

        dfs(s, 0, "", 0, l, r);
        return ans;
    }

    void dfs(string& s, int u, string path, int cnt, int l, int r) {
        if (u == s.size()) {
            if (!cnt) ans.push_back(path);
            return;
        }

        if (s[u] != '(' && s[u] != ')') dfs(s, u + 1, path + s[u], cnt, l, r);
        else if (s[u] == '(') {
            int k = u;
            while (k < s.size() && s[k] == '(') k ++ ;
            l -= k - u;
            // 剪枝: 枚举删除多少个括号字符 而非在哪个位置删除
            for (int i = k - u; i >= 0; i -- ) {
                if (l >= 0) dfs(s, k, path, cnt, l, r);
                path += '(';
                cnt ++, l ++ ;
            }
        } else if (s[u] == ')') {
            int k = u;
            while (k < s.size() && s[k] == ')') k ++ ;
            r -= k - u;
            for (int i = k - u; i >= 0; i -- ) {
                // cnt >= 0 : 必须时刻满足当前已有的左括号数量大于等于右括号数量
                if (cnt >= 0 && r >= 0) dfs(s, k, path, cnt, l, r);
                path += ')';
                cnt --, r ++ ;
            }
        }
    }
};
```





```c++
class Solution {
public:
    bool isvalid(string s) {
        int cnt = 0;
        for (auto c : s) {
            if (c == '(') cnt ++ ;
            else if (c == ')') {
                cnt -- ;
                if (cnt < 0) return false;
            }
        }
        return cnt == 0;
    }

    void dfs(string s, int st, int l, int r, vector<string>& ans) {
        if (l == 0 && r == 0) {
            if (isvalid(s)) ans.push_back(s);
            return;
        }
        for (int i = st; i < s.size(); ++ i ) {
            if (i != st && s[i] == s[i - 1]) continue;
            if (s[i] == '(' && l > 0)
                dfs(s.substr(0, i) + s.substr(i + 1, s.size() - 1 - i), i, l - 1, r, ans);
            if (s[i] == ')' && r > 0)
                dfs(s.substr(0, i) + s.substr(i + 1, s.size() - 1 - i), i, l, r - 1, ans);
        }
    }

    vector<string> removeInvalidParentheses(string s) {
        int left = 0, right = 0;
        vector<string> ans;

        for (auto c : s) {
            if (c == '(')
                left ++ ;
            else if (c == ')') {
                if (left > 0)
                    left -- ;
                else
                    right++;
            }
        }
        // left和right表示左右括号要删除的个数
        dfs(s, 0, left, right, ans);
        return ans;
    }
};
```



```python
"""
(DFS+括号序列) O( pow(2,n) * n)
这是一道有关括号序列的问题。那么如何判断一个括号序列是否合法呢？
判断方法：从前往后扫描字符串，维护一个计数器，遇到(就加一，遇到)就减一，如果过程中计数器的值都是非负数，且最终计数器的值是零，则括号序列是合法的。

左括号和右括号可以分开考虑，我们先来考虑删除哪些多余的右括号。
扫描字符串时，如果计数器的值小于0，说明前面的)太多，我们可以dfs暴力枚举删除前面哪些)，使得计数器的值大于等于0。
当处理完)后，我们只需将整个字符串逆序，同时把左右括号互换，就可以用相同的处理流程处理(了。

暴力dfs搜索空间比较高，我们要想办法进行剪枝。
剪枝方法：对于连续的)，不论删除哪一个，得到的方案都是相同的，所以我们对于所有连续的)，只枚举删除多少个。

剪枝后的算法在LeetCode上击败了 100% 的代码。

时间复杂度分析：我们先来考虑搜索空间有多大，最坏情况下，对于每个括号都有删或不删两种选择，所以共有 pow(2,n) 种不同方案。对于每种方案，最后还需要 O(n) 的计算量来记录答案，所以总时间复杂度是O( pow(2,n) )

"""
class Solution:
    def removeInvalidParentheses(self, s: str) -> List[str]:
        l, r = 0, 0
        for c in s:
            if c == '(':
                l += 1
            elif c == ')':
                if l == 0:
                    r += 1
                else:
                    l -= 1

        ans = []

        def dfs(u, path, cnt, l, r):
            # cnt 表示当前左括号-右括号数量
            if u == len(s):
                if cnt == 0:
                    ans.append(path)
                return 

            if s[u] != '(' and s[u] != ')':
                dfs(u+1, path+s[u], cnt, l, r)
            elif s[u] == '(':
                k = u
                while k < len(s) and s[k] == '(':
                    k += 1
                l -= k - u
                for i in range(k-u, -1, -1):
                    if cnt >= 0 and l >= 0:
                        dfs(k, path, cnt, l, r)
                    path += '('
                    cnt += 1
                    l += 1
            else:
                k = u 
                while k < len(s) and s[k] == ')':
                    k += 1
                r -= k - u
                for i in range(k-u, -1, -1):
                    if cnt >= 0 and r >= 0:
                        dfs(k, path, cnt, l, r)
                    path += ')'
                    cnt -= 1
                    r += 1

        dfs(0, "", 0, l, r)

        return ans
```

