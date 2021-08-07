#   [761. 特殊的二进制序列](https://leetcode-cn.com/problems/special-binary-string/)

## 题意



## 题解

转换策略

```c++
class Solution {
public:
    string makeLargestSpecial(string S) {
        if (S.size() <= 2)
            return S;

        vector<string> q;
        string s;
        int cnt = 0;
        for (auto c : S) {
            s.push_back(c);
            if (c == '1')
                cnt ++ ;
            else {
                cnt -- ;
                if (cnt == 0) {
                    q.push_back('1' + makeLargestSpecial(s.substr(1, s.size() - 2)) + '0');
                    s.clear();
                }
            }
        }
        sort(q.begin(), q.end(), [](string & a, string & b) {
            return a + b > b + a;
        });
        string res;
        for (auto s : q)
            res += s;
        return res;
    }
};
```



```python3

```

