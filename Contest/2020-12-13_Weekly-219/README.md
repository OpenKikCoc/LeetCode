## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-219/)


### [5625. 比赛中的配对次数](https://leetcode-cn.com/problems/count-of-matches-in-tournament/)



```c++
class Solution {
public:
    int numberOfMatches(int n) {
        int res = 0;
        while (n > 1) {
            if (n & 1) {
                res += (n - 1) / 2;
                n -= (n - 1) / 2;
            } else {
                res += n / 2;
                n -= n / 2;
            }
        }
        return res;
    }
};
```


### [5626. 十-二进制数的最少数目](https://leetcode-cn.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers/)



```c++
class Solution {
public:
    int minPartitions(string n) {
        int v = 0;
        for (auto c : n) v = max(c - '0', v);
        return v;
    }
};
```

### [5627. 石子游戏 VII](https://leetcode-cn.com/problems/stone-game-vii/)



```c++
class Solution {
public:
    int stoneGameVII(vector<int>& stones) {
        int n = stones.size();
        vector<int> s(n + 1);
        for (int i = 1; i <= n; ++ i ) s[i] = s[i - 1] + stones[i - 1];
        vector<vector<int>> f(n + 1, vector<int>(n + 1));
        // len = 1 时剩余和为0 也即f[i][i]为0 故直接从2开始
        for (int len = 2; len <= n; ++ len )
            for (int l = 1; l + len - 1 <= n; ++ l ) {
                int r = l + len - 1;
                f[l][r] = max(s[r] - s[l] - f[l + 1][r], s[r - 1] - s[l - 1] - f[l][r - 1]);
            }
        return f[1][n];
    }
};
```

### [5245. 堆叠长方体的最大高度](https://leetcode-cn.com/problems/maximum-height-by-stacking-cuboids/) 

对每一个方块贪心排列

```c++
class Solution {
public:
    int maxHeight(vector<vector<int>>& cuboids) {
        for (auto & c : cuboids) sort(c.begin(), c.end());
        sort(cuboids.begin(), cuboids.end(), greater<vector<int>>());
        int n = cuboids.size();
        int res = 0;
        vector<int> f(n);
        for (int i = 0; i < n; ++ i ) {
            f[i] = cuboids[i][2];
            for (int j = 0; j < i; ++ j )
                if (cuboids[j][0] >= cuboids[i][0] && cuboids[j][1] >= cuboids[i][1] && cuboids[j][2] >= cuboids[i][2])
                    f[i] = max(f[i], f[j] + cuboids[i][2]);
            res = max(res, f[i]);
        }
        return res;
    }
};
```
