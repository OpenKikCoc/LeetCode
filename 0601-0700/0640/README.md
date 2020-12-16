#  [640. 求解方程](https://leetcode-cn.com/problems/solve-the-equation/)

## 题意



## 题解



```c++
class Solution {
public:
    pair<int, int> work(string s) {
        int a = 0, b = 0;
        if (s[0] != '+' && s[0] != '-') s = '+' + s;
        for (int i = 0; i < s.size(); ++ i ) {
            int j = i + 1;
            while (j < s.size() && isdigit(s[j])) ++ j ;
            int c = 1;
            if (i + 1 <= j - 1) c = stoi(s.substr(i + 1, j - 1 - i));
            if (s[i] == '-') c = -c;
            if (j < s.size() && s[j] == 'x') {
                // 系数项
                a += c;
                i = j;
            } else {
                // 常数项
                b += c;
                i = j - 1;
            }
        }
        return {a, b};
    }

    // ax + b == cx + d pair返回ab cd
    string solveEquation(string equation) {
        int k = equation.find('=');
        auto left = work(equation.substr(0, k)), right = work(equation.substr(k + 1));
        int a = left.first - right.first, b = right.second - left.second;
        if (!a) {
            if (!b) return "Infinite solutions";
            else return "No solution";
        }
        return "x=" + to_string(b / a);
    }
};
```



```python3

```

