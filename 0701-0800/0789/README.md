#  [789. 逃脱阻碍者](https://leetcode.cn/problems/escape-the-ghosts/)

## 题意



## 题解



```c++
class Solution {
public:
    int get_dist(int x1, int y1, int x2, int y2) {
        return abs(x1 - x2) + abs(y1 - y2);
    }

    bool escapeGhosts(vector<vector<int>>& ghosts, vector<int>& target) {
        for (auto & g : ghosts)
            if (get_dist(g[0], g[1], target[0], target[1]) <= abs(target[0]) + abs(target[1]))
                return false;
        return true;
    }
};
```



```python3

```

