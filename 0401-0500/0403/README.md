#  [403. 青蛙过河](https://leetcode-cn.com/problems/frog-jump/)

## 题意



## 题解



```c++
class Solution {
public:
    unordered_map<int, int> hash;
    vector<int> stones;
    map<pair<int, int>, bool> f;

    bool dp(int i, int j) {
        if (f.count({i, j})) return f[{i, j}];
        f[{i, j}] = false;
        for (int k = max(1, j - 1); k <= j + 1; ++ k )
            if (hash.count(stones[i] - k)) {
                int p = hash[stones[i] - k];
                if (dp(p, k)) {
                    f[{i, j}] = true;
                    break;
                }
            }
        return f[{i, j}];
    }

    bool canCross(vector<int>& _stones) {
        stones = _stones;
        int n = stones.size();
        for (int i = 0; i < n; ++ i ) hash[stones[i]] = i;
        f[{0, 1}] = true;
        for (int i = 0; i < n; ++ i )
            if (dp(n - 1, i)) return true;
        return false;
    }
};
```



```python3

```

