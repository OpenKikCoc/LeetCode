# [1320. 二指输入的的最小距离](https://leetcode.cn/problems/minimum-distance-to-type-a-word-using-two-fingers/) 

## 题意



## 题解



```c++
    int minimumDistance(string word) {
        vector<vector<int>> cost(30, vector<int>(30));
        for(int i = 0; i < 26; ++i) {
            for(int j = 0; j < 26; ++j) {
                int x1 = i/6, y1 = i%6, x2 = j/6, y2 = j%6;
                cost[i][j] = cost[j][i] = abs(x1-x2) + abs(y1-y2);
            }
        }
        int n = word.size();
        vector<vector<vector<int>>> f(n+1, vector<vector<int>>(26, vector<int>(26, INT_MAX/2)));
        for(int i = 0; i < 26; ++i) for(int j = 0; j < 26; ++j) f[0][i][j] = 0;
        for(int i = 1; i <= n; ++i) {
            int c = word[i-1] - 'A';
            for(int j = 0; j < 26; ++j) {
                for(int k = 0; k < 26; ++k) {
                    // j k 为上一阶段 左右指的键位 这里可以不存在直接continue 小优化
                    f[i][j][c] = min(f[i][j][c], f[i-1][j][k]+cost[k][c]);  // 移动右指
                    f[i][c][k] = min(f[i][c][k], f[i-1][j][k]+cost[j][c]);
                }
            }
        }
        int res = INT_MAX;
        for(int j = 0; j < 26; ++j)
            for(int k = 0; k < 26; ++k)
                res = min(res, f[n][j][k]);
        return res;
    }
```



```python3

```

