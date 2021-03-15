#  [721. 账户合并](https://leetcode-cn.com/problems/accounts-merge/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> p;
    int find(int x) {
        if (p[x] != x) return p[x] = find(p[x]);
        return p[x];
    }

    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size();
        p.resize(n);
        for (int i = 0; i < n; ++ i ) p[i] = i;

        unordered_map<string, int> rt;
        for (int i = 0; i < n; ++ i ) {
            int sz = accounts[i].size();
            for (int j = 1; j < sz; ++ j )
                if (rt.count(accounts[i][j])) p[find(i)] = p[find(rt[accounts[i][j]])];
                else rt[accounts[i][j]] = i;
        }

        vector<vector<string>> res;
        unordered_map<int, vector<string>> ve;
        for (auto & [e, root] : rt) ve[find(root)].push_back(e);
        for (auto & [root, es] : ve) {
            sort(es.begin(), es.end());
            vector<string> t;
            t.push_back(accounts[root][0]);
            for (auto & e : es) t.push_back(e);
            res.push_back(t);
        }
        return res;
    }
};
```



```python3

```

