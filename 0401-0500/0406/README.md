#  [406. 根据身高重建队列](https://leetcode-cn.com/problems/queue-reconstruction-by-height/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        int n = people.size();
        vector<vector<int>> res;
        sort(people.begin(), people.end(), [](vector<int> a, vector<int> b) {
            return a[0] == b[0] ? a[1] < b[1] : a[0] > b[0];
        });
        for (int i = 0; i < n; ++ i )
            res.insert(res.begin() + people[i][1], people[i]);
        return res;
    }
};
```



```python3

```

