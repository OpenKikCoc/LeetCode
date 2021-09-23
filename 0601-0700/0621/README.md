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



```python
"""
由于相同任务之间需要等待n时间，所以一个比较自然的想法就是找到出现最多的任务，如A
然后将其余任务安排在两个A之间的n个间隔内；
当然有可能出现最多的任务有多个，如A，B均出现了100次；
另外就是最后一组任务不需要在完成后等待；
于是有(maxCount - 1) * (n+1) + count

但是，如果任务的重复较少但每个任务数量又很多，且同任务间的间隔很低，这时候以maxCount - 1作为底数就有很多任务无法纳入其间隔内
这时候就通过len(tasks)//(n+1) * (n+1)来替代最多任务出现的次数；
对于最后一组任务，需要加上len(tasks)%(n+1)
以上其实就是len(tasks)


"""

class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        task_dict = collections.Counter(tasks)

        # 最多任务出现的次数
        maxCount = max(task_dict.values())
        # 最多任务共有多少个
        count = 0
        for val in task_dict.values():
            if val == maxCount:
                count += 1

        return max((maxCount - 1) * (n+1) + count, len(tasks))
```

