#  [784. 字母大小写全排列](https://leetcode-cn.com/problems/letter-case-permutation/)

## 题意



## 题解



```c++
class Solution {
public:
    int n;
    string s;
    vector<string> res;

    void dfs(int p) {
        if (p == n) {
            res.push_back(s);
            return;
        }
        dfs(p + 1);
        if (!isdigit(s[p])) {
            s[p] ^= 32;
            dfs(p + 1);
            s[p] ^= 32;
        }
    }

    vector<string> letterCasePermutation(string s) {
        n = s.size();
        this->s = s;
        dfs(0);
        return res;
    }
};
```



```python
# 特别简单的暴搜DFS...从左到右枚举遍历
# 直接用字符串这个数据结构

class Solution:
    def letterCasePermutation(self, S: str) -> List[str]:
        res = []
        def dfs(path, s):
            if not s:
                res.append(path)
                return  #一定要有return, 不然会继续执行下一行，导致list out of range
            c = s[0]
            if c.isalpha():
                dfs(path + c.lower(), s[1:])
                dfs(path + c.upper(), s[1:])
            else:
                dfs(path + c, s[1:])
        
        dfs('', S)
        return res
```

