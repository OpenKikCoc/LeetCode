#  [282. 给表达式添加运算符](https://leetcode-cn.com/problems/expression-add-operators/)

## 题意



## 题解



```c++
class Solution {
public:
    // 代数结构：维护一个 【a + b * c _】 的结构
    typedef long long LL;
    vector<string> res;
    string path;
    void dfs(string & num, int u, int len, LL a, LL b, LL target) {
        if (u == num.size()) {
            // 0 - len-1 去除最后一个加号
            if (a == target) res.push_back(path.substr(0, len - 1));
            return;
        }
        LL c = 0;
        for (int i = u; i < num.size(); ++ i ) {
            c = c * 10 + num[i] - '0';
            path[len ++ ] = num[i];
            
            // +
            path[len] = '+';
            dfs(num, i + 1, len + 1, a + b * c, 1, target);

            if (i + 1 < num.size()) {
                // -
                path[len] = '-';
                dfs(num, i + 1, len + 1, a + b * c, -1, target);

                // *
                path[len] = '*';
                dfs(num, i + 1, len + 1, a, b * c, target);
            }
            // 去除前导 0 
            if (num[u] == '0') break;
        }
    }
    vector<string> addOperators(string num, int target) {
        path.resize(100);
        dfs(num, 0, 0, 0, 1, target);
        return res;
    }
};
```



```python3

```

