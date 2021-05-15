#  [791. 自定义字符串排序](https://leetcode-cn.com/problems/custom-sort-string/)

## 题意



## 题解



```c++
class Solution {
public:
    string customSortString(string order, string str) {
        unordered_map<char, int> hash;
        int rank = 0;
        for (auto c : order)
            hash[c] = ++ rank;
        sort(str.begin(), str.end(), [&](const char a, const char b) {
            return hash[a] < hash[b];
        });
        return str;
    }
};

class Solution {
public:
    string customSortString(string S, string T) {
        unordered_map<char, int> pos;
        for (int i = 0; i < S.size(); i ++ ) pos[S[i]] = i;
        sort(T.begin(), T.end(), [&](char a, char b) {
            return pos[a] < pos[b];
        });
        return T;
    }
};
```



```python3

```

