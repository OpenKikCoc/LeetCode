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
        // 从0向【后】跳1初始化合法
        f[{0, 1}] = true;
        for (int i = 0; i < n; ++ i )
            // 遍历可能结果集
            if (dp(n - 1, i)) return true;
        return false;
    }
};
```

```c++
// yxc
const int N = 2010;

int f[N][N];

class Solution {
public:
    unordered_map<int, int> hash;
    vector<int> stones;

    int dp(int x, int y) {
        if (f[x][y] != -1) return f[x][y];
        f[x][y] = 0;
        for (int k = max(1, y - 1); k <= y + 1; k ++ ) {
            int z = stones[x] - k;
            if (hash.count(z)) {
                int p = hash[z];
                if (dp(p, k)) {
                    f[x][y] = 1;
                    break;
                }
            }
        }
        return f[x][y];
    }

    bool canCross(vector<int>& _stones) {
        stones = _stones;
        int n = stones.size();
        for (int i = 0; i < n; i ++ ) hash[stones[i]] = i;
        memset(f, -1, sizeof f);
        f[0][1] = 1;
        for (int i = 0; i < n; i ++ )
            if (dp(n - 1, i))
                return true;
        return false;
    }
};
```



```python3

```

