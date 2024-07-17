#  [752. 打开转盘锁](https://leetcode.cn/problems/open-the-lock/)

## 题意



## 题解



```c++
class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        string start = "0000";
        if (start == target) return 0;
        unordered_set<string> S;
        for (auto& s: deadends) S.insert(s);
        if (S.count(start)) return -1;
        queue<string> q;
        q.push(start);
        unordered_map<string, int> dist;
        dist[start] = 0;
        while (q.size()) {
            auto t = q.front();
            q.pop();
            for (int i = 0; i < 4; ++ i )
                for (int j = -1; j <= 1; j += 2) {
                    auto state = t;
                    state[i] = (state[i] - '0' + j + 10) % 10 + '0';
                    if (!dist.count(state) && !S.count(state)) {
                        dist[state] = dist[t] + 1;
                        if (state == target) return dist[state];
                        q.push(state);
                    }
                }
        }
        return -1;
    }
};
```



```python3

```

