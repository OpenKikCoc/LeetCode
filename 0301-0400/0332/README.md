#  [332. 重新安排行程](https://leetcode-cn.com/problems/reconstruct-itinerary/)

## 题意



## 题解



```c++
class Solution {
public:
    unordered_map<string, multiset<string>> g;
    vector<string> ans;

    vector<string> findItinerary(vector<vector<string>>& tickets) {
        for (auto& e: tickets) g[e[0]].insert(e[1]);
        dfs("JFK");
        reverse(ans.begin(), ans.end());
        return ans;
    }

    void dfs(string u) {
        while (g[u].size()) {
            auto ver = *g[u].begin();
            g[u].erase(g[u].begin());
            dfs(ver);
        }
        ans.push_back(u);
    }
};
```



```python3

```

