#  [435. 无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)

## 题意



## 题解



```c++
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        int len = intervals.size();
        if (len <= 1) return 0;
        sort(intervals.begin(), intervals.end(), [](vector<int> a, vector<int> b) {
            return a[1] < b[1];
        });
        int ans = 0, last = intervals[0][1];
        for(int i = 1; i < len; ++ i )
            if (intervals[i][0] < last) ans ++ ;
            else last = intervals[i][1];
        return ans;
    }
};
```

更好的归一写法：

```c++
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        int n = intervals.size();
        sort(intervals.begin(), intervals.end(), [](vector<int> a, vector<int> b) {
            return a[1] < b[1];
        });
        int res = 0, mxr = 0xcfcfcfcf;
        for (int i = 0; i < n; ++ i ) {
            if (intervals[i][0] < mxr) continue;
            ++ res;
            mxr = intervals[i][1];
        }
        return n - res;
    }
};
```

```c++
// yxc
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& q) {
        sort(q.begin(), q.end(), [](vector<int> a, vector<int> b) {
            return a[1] < b[1];
        });
        if (q.empty()) return 0;
        int res = 1, r = q[0][1];
        for (int i = 1; i < q.size(); i ++ )
            if (q[i][0] >= r) {
                res ++;
                r = q[i][1];
            }
        return q.size() - res;
    }
};
```

```python
#1. 按照区间右端点从小到大排序（为什么按照区间的右端点排序？ 因为区间的右端点能够覆盖尽可能多的区间） 2. 从左到右选择每个区间；3. 选择方法：能选则选！这样选出来就是最优解
#如果当前区间的左端点大于前一个区间的右端点，说明当前区间可以是一个独立的区间，就保存它；如果当前区间的左端点小于前一个区间的右端点，说明当前区间和前面一个区间重合了，需要删除一个区间，很明显是删除当前区间更好。
#===> 因此我们只需要不断的维护前一个保留区间的右端点即可，只有当前区间的左端点大于前一个保留区间右端点时，我们才会更新保留区间。
#证明贪心解的方法：类似于A=B：1）先证明A>=B ; 2)再证明A<=B ; 3)那就相当于证明了A=B
#那就 证明：贪心解<=最优解(显然) && 贪心解>=最优解 （通过调整法：把最优解调整成贪心解）

class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        #按照右端点排序
        q=sorted(intervals,key=lambda x:x[1])
        if not q:return 0
        res=1;r=q[0][1]
        for i in range(len(q)):
            if q[i][0]>=r:
                res+=1
                r=q[i][1]
        return len(q)-res
```

