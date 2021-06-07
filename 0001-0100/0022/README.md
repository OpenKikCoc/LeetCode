#  [22. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> res;
    void dfs(int n, int l, int r, string now) {
        //cout <<l<<" "<<r<<" "<<now<<endl;
        if(l == n && r == n) {
            res.push_back(now);
            return;
        }
        if(l > r) {
            string next = now;
            next.push_back(')');
            dfs(n, l, r+1, next);
        }
        if(l < n) {
            string next = now;
            next.push_back('(');
            dfs(n, l+1, r, next);
        }
    }
    vector<string> generateParenthesis(int n) {
        dfs(n, 0, 0, "");
        return res;
    }
};
```



```python
# 递归，当左边括号的数量 == 右边括号数量 == n：就可以加入到答案中
# 如何保证加入到的路径是有效的呢？
# 1. 每次可以放置左括号的条件是当前左括号的数目不超过 nn。
# 2. 每次可以放置右括号的条件是当前右括号的数目不超过左括号的数目。

class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []

        def dfs(lc, rc, path):
            if lc == rc == n:
                res.append(path)
                return 
            if lc < n:
                dfs(lc + 1, rc, path + '(')
            if rc < n and lc > rc:
                dfs(lc, rc + 1, path + ')')
                
        dfs(0, 0, "")
        return res
```

