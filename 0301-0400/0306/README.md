#  [306. 累加数](https://leetcode-cn.com/problems/additive-number/)

## 题意



## 题解



用 `long long / long double`  似乎也可以过 但并非正解

```c++
class Solution {
public:
    // int -> string 防止溢出
    vector<string> ve;
    string add(string x, string y) {
        vector<int> A, B, C;
        for (int i = x.size() - 1; i >= 0; -- i ) A.push_back(x[i] - '0');
        for (int i = y.size() - 1; i >= 0; -- i ) B.push_back(y[i] - '0');
        for (int i = 0, t = 0; i < A.size() || i < B.size() || t; ++ i ) {
            if (i < A.size()) t += A[i];
            if (i < B.size()) t += B[i];
            C.push_back(t % 10);
            t /= 10;
        }
        string z;
        for (int i = C.size() - 1; i >= 0; --i) z.push_back('0' + C[i]);
        return z;
    }
    bool dfs(string & num, int p) {
        if (p == num.size() && ve.size() >= 3) return true;
        int sz = ve.size();
        string tar = sz < 2 ? "" : add(ve[sz - 1], ve[sz - 2]); 
        string v = "";

        for (int i = p; i < num.size(); ++ i ) {
            // 可以为 0 但不能是前导 0  
            if (v.size() && v[0] == '0') return false;
            v.push_back(num[i]);
            // 当前已经较大 直街return （属于优化 不加也可以过）
            // if (tar != "" && bigger(v, tar) return false;
            if (tar == "" || v == tar) {
                ve.push_back(v);
                if (dfs(num, i + 1)) return true;
                ve.pop_back();
            }
        }
        return false;
    }
    bool isAdditiveNumber(string num) {
        // 有个数小于 3 的输入
        if (num.size() < 3) return false;
        return dfs(num, 0);
    }
};
```

另一种思路（更好的写法）：

>   只要固定前两个数，后面的序列（若合法）就都是固定的

```c++
    string add() {
        ...
    }

    bool isAdditiveNumber(string num) {
        for (int i = 0; i < num.size(); i ++ )
            for (int j = i + 1; j + 1 < num.size(); j ++ ) {
                int a = -1, b = i, c = j;
                while (true) {
                    if (b - a > 1 && num[a + 1] == '0' || c - b > 1 && num[b + 1] == '0') break;  // 有前导0
                    auto x = num.substr(a + 1, b - a), y = num.substr(b + 1, c - b);
                    auto z = add(x, y);
                    if (num.substr(c + 1, z.size()) != z) break;  // 下一个数不匹配
                    a = b, b = c, c += z.size();
                    if (c + 1 == num.size()) return true;
                }
            }

        return false;
    }
```



```python3

```

