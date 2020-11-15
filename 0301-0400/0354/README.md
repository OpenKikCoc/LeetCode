#  [354. 俄罗斯套娃信封问题](https://leetcode-cn.com/problems/russian-doll-envelopes/)

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
        for(auto& e : envelopes)
            if(f.empty() || f.back() < e[1]) f.push_back(e[1]);
            else *lower_bound(f.begin(), f.end(), e[1]) = e[1];
        return f.size();
    }
};


```



```python3

```

