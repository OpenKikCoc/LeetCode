#  [433. 最小基因变化](https://leetcode.cn/problems/minimum-genetic-mutation/)

## 题意



## 题解



```c++
class Solution {
public:
    int minMutation(string start, string end, vector<string>& bank) {
        unordered_set<string> S(bank.begin(), bank.end());
        if (!S.count(end)) return -1;
        unordered_map<string, int> dist;
        queue<string> q;
        q.push(start);
        dist[start] = 0;
        char chars[4] = {'A', 'T', 'C', 'G'};
        while (!q.empty()) {
            auto t = q.front();
            q.pop();
            for (int i = 0; i < t.size(); ++ i ) {
                auto s = t;
                for (char c : chars) {
                    s[i] = c;
                    if (S.count(s) && !dist.count(s)) {
                        dist[s] = dist[t] + 1;
                        if (s == end) return dist[s];
                        q.push(s);
                    }
                }
            }
        }
        return -1;
    }
};
```



```python3

```

