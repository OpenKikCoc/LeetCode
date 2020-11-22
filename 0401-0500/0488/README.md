#  [488. 祖玛游戏](https://leetcode-cn.com/problems/zuma-game/)

## 题意



## 题解

剪枝优化

```c++
class Solution {
public:
    unordered_map<string, int> f;
    unordered_map<char, int> cnt;
    int res = 6;

    string get() {
        string ret;
        for (auto [x, c] : cnt) ret += to_string(c);
        return ret;
    }

    // 至少还需要多少次操作 剪枝 常数优化
    int h(string board) {
        sort(board.begin(), board.end());
        int ret = 0;
        // not ++ i 
        // or use ++ i and i = j - 1
        for (int i = 0; i < board.size();) {
            int j = i + 1;
            while (j < board.size() && board[j] == board[i]) ++ j ;
            if (j - i + cnt[board[i]] < 3) return 6;
            if (j - i <= 2) ret += 3 - (j - i);
            i = j; 
        }
        return ret;
    }

    void dfs(string board, string hand) {
        if (f[board + ' ' + hand] + h(board) >= res) return ;
        for (auto [x, c] : cnt) if (c) {
            -- cnt[x];
            for (int i = 0; i <= board.size(); ++ i ) {
                auto r = clear_up(board.substr(0, i) + x + board.substr(i));
                auto s = r + ' ' + get();
                if (f.count(s) == 0 || f[s] > f[board + ' ' + hand] + 1) {
                    f[s] = f[board + ' ' + hand] + 1;
                    if (r.empty()) res = min(res, f[s]);
                    dfs(r, get());
                }
            }
            ++ cnt[x];
        }
    }

    int findMinStep(string board, string hand) {
        for (auto c : hand) ++ cnt[c] ;
        f[board] = 0;
        dfs(board, get());
        if (res == 6) res = -1;
        return res;
    }

    string clear_up(string s) {
        bool is_changed = true;
        while (is_changed) {
            is_changed = false;
            for (int i = 0; i < s.size(); ++ i ) {
                int j = i + 1;
                while (j < s.size() && s[j] == s[i]) ++ j ;
                if (j - i >= 3) {
                    s = s.substr(0, i) + s.substr(j);
                    is_changed = true;
                    break;
                }
            }
        }
        return s;
    }
};
```



```python3

```

