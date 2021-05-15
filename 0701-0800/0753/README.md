#  [753. 破解保险箱](https://leetcode-cn.com/problems/cracking-the-safe/)

## 题意



## 题解



```c++
class Solution {
public:
    // 如何在一个最短的串内枚举所有的n位k进制数排列
    // de Bruijn 序列
    // 转化为欧拉回路问题
    unordered_set<string> S;
    string res;
    int k;
    void dfs(string u) {
        for (int i = 0; i < k; ++ i ) {
            auto v = u + to_string(i);
            if (!S.count(v)) {
                S.insert(v);
                dfs(v.substr(1));
                res += to_string(i);
            }
        }
    }

    string crackSafe(int n, int k) {
        this->k = k;
        string start(n - 1, '0');
        dfs(start);
        return res + start;
    }
};
```



```python3

```

