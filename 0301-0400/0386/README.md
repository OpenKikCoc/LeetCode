#  [386. 字典序排数](https://leetcode.cn/problems/lexicographical-numbers/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> res;

    vector<int> lexicalOrder(int n) {
        for (int i = 1; i <= 9; i ++ ) dfs(i, n);
        return res;
    }

    void dfs(int cur, int n) {
        if (cur <= n) res.push_back(cur);
        else return;
        for (int i = 0; i <= 9; i ++ ) dfs(cur * 10 + i, n);
    }
};


class Solution {
public:
    void dfs(int k, int n, vector<int>& res) {
        if (k > n) return;
        if (k != 0) res.push_back(k);
        for (int i = 0; i <= 9; ++ i ) {
            if (10 * k + i > 0) {
                dfs(10 * k + i, n, res);
            }
        }
    }
    vector<int> lexicalOrder(int n) {
        vector<int> res;
        dfs(0, n, res);
        return res;
    }
};
```



```python3

```

