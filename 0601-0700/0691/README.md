#  [691. 贴纸拼词](https://leetcode-cn.com/problems/stickers-to-spell-word/)

## 题意



## 题解

1.  状态表示字母有没有满足
2.  剪枝：枚举下一个单词选哪个 加了某个字母之后回到哪个状态【记忆化】
3.  爆搜已满足的所有字母【同样记忆化】

```c++
const int N = 1 << 15;
int f[N], g[N][26];

class Solution {
public:
    const int INF = 20;
    int n;
    string target;
    vector<string> strs;

    int fill(int state, char c) {
        auto& v = g[state][c - 'a'];
        if (v != -1) return v;
        v = state;
        for (int i = 0; i < n; i ++ )
            if (!(state >> i & 1) && target[i] == c) {
                v += 1 << i;
                break;
            }
        return v;
    }

    int dfs(int state) {
        auto& v = f[state];
        if (v != -1) return v;
        if (state == (1 << n) - 1) return v = 0;
        v = INF;
        for (auto& str: strs) {
            int cur = state;
            for (auto c: str)
                cur = fill(cur, c);
            if (cur != state)
                v = min(v, dfs(cur) + 1);
        }
        return v;
    }

    int minStickers(vector<string>& stickers, string _target) {
        memset(f, -1, sizeof f);
        memset(g, -1, sizeof g);
        target = _target;
        strs = stickers;
        n = target.size();
        int res = dfs(0);
        if (res == INF) res = -1;
        return res;
    }
};
```

或者状压DP

```c++
#define N 15
#define M 50

class Solution {
private:
    int f[1 << N], seen[M][26];

public:
    int minStickers(vector<string>& stickers, string target) {
        const int n = target.size();
        vector<vector<int>> pos(26);

        for (int i = 0; i < n; i ++ )
            pos[target[i] - 'a'].push_back(i);

        vector<int> used;
        for (int c = 0; c < 26; c ++ )
            if (!pos[c].empty())
                used.push_back(c);

        const int m = stickers.size();
        const int INF = 1000000000;

        for (int i = 0; i < m; i ++ ) {
            memset(seen[i], 0, sizeof(seen[i]));
            for (char c : stickers[i])
                seen[i][c - 'a'] ++ ;
        }

        for (int s = 1; s < (1 << n); s ++ )
            f[s] = INF;

        f[0] = 0;

        for (int s = 0; s < (1 << n) - 1; s ++ ) {
            if (f[s] == INF) continue;

            for (int i = 0; i < m; i ++ ) {
                int t = s;
                for (char c : used)
                    for (int j = 0, k = 0; j < pos[c].size() && k < seen[i][c]; j ++ , k ++ )
                        if ((s >> pos[c][j]) & 1) k -- ;
                        else t |= 1 << pos[c][j];

                f[t] = min(f[t], f[s] + 1);
            }
        }

        if (f[(1 << n) - 1] == INF)
            return -1;

        return f[(1 << n) - 1];
    }
};
```



```python3

```

