## [比赛链接]()


### [1287. 有序数组中出现次数超过25%的元素](https://leetcode.cn/problems/element-appearing-more-than-25-in-sorted-array/)

超过25%的数唯一 说明这个数就是出现次数最多的数

```c++
    int findSpecialInteger(vector<int>& arr) {
        int n = arr.size();
        int res = arr[0], cnt = 1;
        vector<pair<int,int>> ve;
        for(int i = 1; i < n; ++i) {
            if(arr[i] == res) ++cnt;
            else {
                ve.push_back({cnt, res});
                res = arr[i]; cnt = 1;
            }
        }
        ve.push_back({cnt, res});
        sort(ve.begin(), ve.end());
        return ve.back().second;
    }
```


### [1288. 删除被覆盖区间](https://leetcode.cn/problems/remove-covered-intervals/)

暴力即可，**如果不用vis数组，在if成功后直接break即可**

```c++
    int removeCoveredIntervals(vector<vector<int>>& intervals) {
        int n = intervals.size(), res = n;
        vector<bool> vis(n);
        for(int i = 0; i < n; ++i)
            for(int j = 0; j < n; ++j) if(i != j && !vis[i]) {
                if(intervals[i][0] >= intervals[j][0] && intervals[i][1] <= intervals[j][1]) --res, vis[i] = true;
            }
        return res;
    }
```

### [1286. 字母组合迭代器](https://leetcode.cn/problems/iterator-for-combination/) [TAG]

这题复杂度接受直接一次性生成所有可能字符串

```c++
    int cur;
    vector<string> v;
    string t;
    int n;
    void dfs(int p, string cur) {
        if(cur.size() == n) {
            v.push_back(cur);
            return;
        }
        if(p == t.size()) return;
        dfs(p+1, cur);
        dfs(p+1, cur+t[p]);
    }
    CombinationIterator(string characters, int combinationLength) {
        t = characters;
        n = combinationLength;
        dfs(0, "");
        sort(v.begin(), v.end());
        cur = 0;
    }
    
    string next() {
        return v[cur++];
    }
    
    bool hasNext() {
        return cur < v.size();
    }
```

### [1289. 下降路径最小和  II](https://leetcode.cn/problems/minimum-falling-path-sum-ii/)

相邻不选 dp即可

```c++
    int minFallingPathSum(vector<vector<int>>& arr) {
        int n = arr.size(), res = INT_MAX;
        vector<vector<int>> f(n, vector<int>(n));
        for(int j = 0; j < n; ++j) f[0][j] = arr[0][j];
        for(int i = 1; i < n; ++i)
            for(int j = 0; j < n; ++j) {
                f[i][j] = INT_MAX;
                for(int k = 0; k < n; ++k)
                    if(k != j) f[i][j] = min(f[i][j], f[i-1][k]);
                f[i][j] += arr[i][j];
            }
        for(int j = 0; j < n; ++j) res = min(res, f[n-1][j]);
        return res;
    }
```
