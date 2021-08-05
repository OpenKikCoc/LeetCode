#  [241. 为运算表达式设计优先级](https://leetcode-cn.com/problems/different-ways-to-add-parentheses/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> expr;
    vector<int> dfs(int l, int r) {
        if (l == r) return {stoi(expr[l])};
        vector<int> res;
        // 枚举当前区间最后一个算的运算符
        for (int i = l + 1; i < r; i += 2) {
            auto left = dfs(l, i - 1), right = dfs(i + 1, r);
            for (auto x : left) for (auto y : right) {
                int z;
                if (expr[i] == "+") z = x + y;
                else if (expr[i] == "-") z = x - y;
                else z = x * y;
                res.push_back(z);
            }
        }
        return res;
    }
    vector<int> diffWaysToCompute(string s) {
        for (int i = 0; i < s.size(); ++ i )
            if (isdigit(s[i])) {
                int j = i, x = 0;
                while (j < s.size() && isdigit(s[j]))
                    x = x * 10 + (s[j ++ ] - '0');
                i = j - 1;
                expr.push_back(to_string(x));
            } else expr.push_back(s.substr(i, 1));
        return dfs(0, expr.size() - 1);
    }
};
```



```python3

```

