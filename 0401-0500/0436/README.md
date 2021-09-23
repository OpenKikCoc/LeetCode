# [436. 寻找右区间](https://leetcode-cn.com/problems/find-right-interval/) 

## 题意



## 题解

二分或堆都可以

```c++
class Solution {
public:
    vector<int> findRightInterval(vector<vector<int>>& intervals) {
        int n = intervals.size();
        // 加入下标
        for (int i = 0; i < n; ++ i ) intervals[i].push_back(i);
        sort(intervals.begin(), intervals.end());
        vector<int> res(n, -1);
        for (auto & intev : intervals) {
            int li = intev[0], ri = intev[1], id = intev[2];
            int l = 0, r = n - 1;
            while (l < r) {
                int m = l + (r - l) / 2;
                if (intervals[m][0] >= ri) r = m;
                else l = m + 1;
            }
            if (intervals[l][0] >= ri) res[id] = intervals[l][2];
        }
        return res;
    }


    typedef tuple<int, int, int> tpi3;
    vector<int> findRightInterval_2(vector<vector<int>>& intervals) {
        vector<tpi3> ve;
        for (int i = 0; i < intervals.size(); ++ i ) ve.push_back({intervals[i][0], intervals[i][1], i});
        sort(ve.begin(), ve.end());

        vector<int> res(intervals.size());
        // 堆 原本想用优先队列 不支持lower_bound 且贪心思路有不足 改set即可
        set<tpi3> q;
        for (int i = ve.size() - 1; i >= 0; -- i ) {
            auto [l, r, id] = ve[i];
            //cout << "l = " << l << " r = " << r << " id = " << id << endl;
            //while (!q.empty() && get<0>(q.top()) < r) q.pop();
            auto it = q.lower_bound({r, INT_MIN, INT_MIN});
            if (it == q.end()) res[id] = -1;
            else res[id] = get<2>(*it);
            q.insert(ve[i]);
        }
        return res;
    }
};
```



```python
class Solution:
    def findRightInterval(self, nums: List[List[int]]) -> List[int]:
        n=len(nums)
        #排序前给每一项的末尾添加索引
        for i in range(n):
            nums[i].append(i)

        nums.sort(key=lambda x:x[0])
        res=[-1]*n 

        for i in range(n):
            l,r=0,n-1 
            while l<r:
                m=l+(r-l)//2 
                if nums[m][0]<nums[i][1]:
                    l=m+1
                else:r=m 
            if nums[l][0]>=nums[i][1]:
                res[nums[i][2]]=nums[l][2]
        return res
```

