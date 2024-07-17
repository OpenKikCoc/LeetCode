#  [406. 根据身高重建队列](https://leetcode.cn/problems/queue-reconstruction-by-height/)

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

```c++
// yxc
class Solution {
public:
    int n;
    vector<int> tr;

    int lowbit(int x) {
        return x & -x;
    }

    void add(int x, int v) {
        for (int i = x; i <= n; i += lowbit(i)) tr[i] += v;
    }

    int query(int x) {
        int res = 0;
        for (int i = x; i; i -= lowbit(i)) res += tr[i];
        return res;
    }

    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        n = people.size();
        tr.resize(n + 1);

        sort(people.begin(), people.end(), [](vector<int>a, vector<int>b) {
            if (a[0] != b[0]) return a[0] < b[0];
            return a[1] > b[1];
        });

        vector<vector<int>> res(n);
        for (auto p: people) {
            int h = p[0], k = p[1];
            int l = 1, r = n;
            while (l < r) {
                int mid = l + r >> 1;
                // mid - query(mid)
                // 位置总长减去此前较低的，即是将来会放较高的数量
                if (mid - query(mid) >= k + 1) r = mid;
                else l = mid + 1;
            }
            res[r - 1] = p;
            add(r, 1);
        }
        return res;
    }
};
```


```python
"""
思路：身高高的人只会看到比他高的人，所以当身高高的人固定好了位置，前面插入多少个矮的人都不会破坏高的人的条件限制。所以应该先决定高的人的位置，再决定矮的人的位置；高的人限制条件少，矮的人限制条件多。

先按身高从大到小排序，身高一样则按照k排序：身高大或k小意味着限制条件少，应该被优先考虑。

依次插入元素：由上一点，先进入res的元素不会被后进入的元素影响，因此每一次插入只需要考虑自己不需要考虑别人。当遍历到元素[a,b]的时候，比它大的元素已经进组，比它小的元素还没进组，那么它应该插到res的第b位，从而实现0到b-1的数字都比它大。

举例，输入是[[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
排序后是[[7,0],[7,1],[6,1],[5,0],[5,2],[4,4]]

插入[7,0], res=[[7,0]]
插入[7,1], res=[[7,0],[7,1]]
插入[6,1], res=[[7,0],[6,1],[7,1]]
插入[5,0], res=[[5,0],[7,0],[6,1],[7,1]]
插入[5,2], res=[[5,0],[7,0],[5,2],[6,1],[7,1]]
插入[4,4], res=[[5,0],[7,0],[5,2],[4,4],[6,1],[7,1]]

最终答案是[[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]

"""

#当有两个维度时，很重要的是想如何确定一个维度，然后在按照另外一个维度重新排列
#【如果两个维度一起考虑，一定会顾此失彼】
#按照身高来排列，身高一定是从大到小拍，让高个子在前面；然后按照k维度重新插入队列。

class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        people.sort(key=lambda x:(-x[0],x[1]))
        res=[]
        for p in people:
            res.insert(p[1],p)
        #等同于如下代码：
        # for i in range(len(people)):
        #     res.insert(people[i][1],people[i])
        return res    

# class Solution:
#     def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
#         res = []
#         people = sorted(people, key = lambda x: (-x[0], x[1]))
#         for p in people:
#             if len(res) <= p[1]:
#                 res.append(p)
#             elif len(res) > p[1]:
#                 res.insert(p[1], p)
#         return res
```

