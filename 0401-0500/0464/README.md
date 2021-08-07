#  [464. 我能赢吗](https://leetcode-cn.com/problems/can-i-win/)

## 题意



## 题解



```c++
class Solution {
public:
// 优化 according
    // f[x] 表示某个状态是必胜还是必败
    vector<int> f;
    int n, m;
    int dp(int x) {
        if (f[x] != -1) return f[x];
        int sum = 0;
        for (int i = 0; i < n; ++ i )
            if (x >> i & 1)
                sum += i + 1;
        for (int i = 0; i < n; ++ i ) {
            if (x >> i & 1) continue;
            if (sum + i + 1 >= m) return f[x] = 1;  // 可以拿 i 必胜
            if (!dp(x + (1 << i))) return f[x] = 1; // 可以导致对方必败 必胜
        }
        return f[x] = 0;
    }
    bool canIWin(int _n, int _m) {
        n = _n, m = _m;
        if (n * (n + 1) / 2 < m) return false;
        f.resize(1 << n, -1);
        return dp(0);
    }


// 原始代码
    // 不能使用重复整数 状态压缩20个位
    // dp[i][j] 表示剩下整数状态为i时 累积和为j的先手结果
    // dp[i][j] = 穷举接下来选择每一个数的下一个状态是否可能为true
    // 如果有任意一个值为true 则当前状态必败 否则必胜
    int mxInt, tot;
    //unordered_map<pair<int,int>, int> m;  // hash不可用
    map<pair<int, int>, int> m;
    bool dfs(int state, int sum) {
        if (sum >= tot) return true;
        if (m.find({state, sum}) != m.end()) return m[{state, sum}];
        bool f = true;
        for (int i = 1; i <= mxInt; ++ i )
            if ((state & (1 << i)) == 0)
                if (dfs(state | (1 << i), sum + i)) {
                    f = false;
                    break;
                }
        return m[{state,sum}] = f;
    }
    bool canIWin(int maxChoosableInteger, int desiredTotal) {
        mxInt = maxChoosableInteger, tot = desiredTotal;
        // 所有数相加仍小于tot false
        if ((mxInt + 1) * mxInt / 2 < tot) return false;
        for (int i = 1; i <= mxInt; ++ i )
            // 选择 i 当前sum为i
            if (dfs(1 << i, i))
                return true;
        return false;
    }
};
```



```python3

```

