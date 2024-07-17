#  [354. 俄罗斯套娃信封问题](https://leetcode.cn/problems/russian-doll-envelopes/)

## 题意



## 题解



```c++
class Solution {
public:
    int maxEnvelopes(vector<vector<int>>& envelopes) {
        int n = envelopes.size(), res = 0;
        sort(envelopes.begin(), envelopes.end(), [](const auto& a, const auto& b){
            return a[0] == b[0] ? a[1] > b[1] : a[0] < b[0];
        });
        vector<int> f;
        for (auto & e : envelopes)
            if (f.empty() || f.back() < e[1])
                f.push_back(e[1]);
            else
                *lower_bound(f.begin(), f.end(), e[1]) = e[1];
        return f.size();
    }
};
```

```c++
class Solution {
public:
    int maxEnvelopes(vector<vector<int>>& w) {
        int n = w.size();
        sort(w.begin(), w.end());
        vector<int> f(n);

        int res = 0;
        for (int i = 0; i < n; i ++ ) {
            f[i] = 1;
            for (int j = 0; j < i; j ++ )
                if (w[j][0] < w[i][0] && w[j][1] < w[i][1])
                    f[i] = max(f[i], f[j] + 1);
            res = max(res, f[i]);
        }

        return res;
    }
};
```


```python3

```

