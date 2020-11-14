#  [332. 重新安排行程](https://leetcode-cn.com/problems/reconstruct-itinerary/)

## 题意



## 题解



```c++
class Solution {
public:
    unordered_map<string, priority_queue<string, vector<string>, std::greater<string>>> es;
    vector<string> st;
    // 加const才能传入"JFK"
    void dfs(const string& u) {
        while(es.count(u) && es[u].size() > 0) {
            string v = es[u].top();
            es[u].pop();
            dfs(v);
        }
        st.push_back(u);
    }
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        for(auto & it : tickets) es[it[0]].emplace(it[1]);
        dfs("JFK");
        reverse(st.begin(), st.end());
        return st;
    }
};
```



```python3

```

