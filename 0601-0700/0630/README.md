#  [630. 课程表 III](https://leetcode.cn/problems/course-schedule-iii/)

## 题意



## 题解



```c++
class Solution {
public:
    int scheduleCourse(vector<vector<int>>& courses) {
        // 按结束时间排序
        sort(courses.begin(), courses.end(), [](vector<int> & a, vector<int> & b) {
            return a[1] < b[1];
        });
        priority_queue<int> heap;
        int tot = 0;
        for (auto & c : courses) {
            tot += c[0];
            heap.push(c[0]);
            if (tot > c[1]) {
                // 去除最大值
                tot -= heap.top();
                heap.pop();
            }
        }
        return heap.size();
    }
};
```



```python3

```

