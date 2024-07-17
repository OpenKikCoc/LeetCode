#  [554. 砖墙](https://leetcode.cn/problems/brick-wall/)

## 题意



## 题解



```c++
class Solution {
public:
    int leastBricks(vector<vector<int>>& wall) {
        unordered_map<int, int> hash;
        for (auto & line : wall)
            for (int i = 0, s = 0; i < (int)line.size() - 1; ++ i )
                s += line[i], ++ hash[s];
        int res = 0;
        for (auto [k, v] : hash) res = max(res, v);
        return wall.size() - res;
    }
};
```



```python3

```

