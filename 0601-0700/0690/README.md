#  [690. 员工的重要性](https://leetcode.cn/problems/employee-importance/)

## 题意



## 题解



```c++
/*
// Definition for Employee.
class Employee {
public:
    int id;
    int importance;
    vector<int> subordinates;
};
*/

class Solution {
public:
    unordered_map<int, Employee*> hash;
    
    int dfs(int id) {
        auto p = hash[id];
        int res = p->importance;
        for (auto x: p->subordinates)
            res += dfs(x);
        return res;
    }

    int getImportance(vector<Employee*> employees, int id) {
        for (auto e: employees) hash[e->id] = e;
        return dfs(id);
    }
};
```



```python3

```

