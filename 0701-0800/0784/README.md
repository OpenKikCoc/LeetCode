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



```python3

```

