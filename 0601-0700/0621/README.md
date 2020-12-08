#  [621. 任务调度器](https://leetcode-cn.com/problems/task-scheduler/)

## 题意



## 题解



```c++
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> cnt(26);
        int mf = 0;
        for (auto c : tasks) ++ cnt[c - 'A'], mf = max(mf, cnt[c - 'A']);
        int res = (mf - 1) * (n + 1);
        for (auto v : cnt) if (v == mf) ++ res;
        return max(res, (int)tasks.size());
    }
};
```



```python3

```

