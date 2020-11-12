#  [207. 课程表](https://leetcode-cn.com/problems/course-schedule/)

## 题意



## 题解



```c++
class Solution {
public:
    bool dfs(int u, vector<vector<int>>& es, vector<int>& c) {
        c[u] = -1;
        for(auto v : es[u]) {
            if(c[v] < 0) return false;
            else if(!c[v] && !dfs(v, es, c)) return false;
        }
        c[u] = 1;
        return true;
    }
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> es(numCourses);
        for(auto e : prerequisites) {
            es[e[1]].push_back(e[0]);
        }
        vector<int> c(numCourses);
        for(int u = 0; u < numCourses; ++u) if(!c[u]) {
            if(!dfs(u, es, c)) return false;
        }
        return true;
    }
};
```



```python3

```

