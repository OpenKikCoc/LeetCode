## [比赛链接](https://leetcode.cn/contest/weekly-contest-153/)


### [1184. 公交站间的距离](https://leetcode.cn/problems/distance-between-bus-stops/)

略

```c++
class Solution {
public:
    int distanceBetweenBusStops(vector<int>& distance, int start, int destination) {
        int n = distance.size(), sum = 0, ret = 0;
        for (int i = 0; i < n; ++ i ) sum += distance[i];
        for (int i = start; i != destination; i = (i + 1) % n) ret += distance[i];
        return min(ret, sum - ret);
    }
};
```


### [1185. 一周中的第几天](https://leetcode.cn/problems/day-of-the-week/)

闰年判断

```c++
class Solution {
public:
    bool leap(int x) {
        return x % 4 == 0 && x % 100 != 0 && x || x % 400 == 0;
    }
    vector<int> days = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    vector<string> res = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
    string dayOfTheWeek(int day, int month, int year) {
        int ret = 4;
        for (int i = 1971; i < year; ++ i )
            if (leap(i)) ret += 366;
            else ret += 365;
        for (int i = 1; i < month; ++ i )
            if (leap(year) && i == 2) ret += 29;
            else ret += days[i];
        ret += day;
        ret %= 7;
        return res[ret];
    }
};
```

### [1186. 删除一次得到子数组最大和](https://leetcode.cn/problems/maximum-subarray-sum-with-one-deletion/)

枚举每个位置

1. 单独使用 不删除

2. 和左右合并 删 or 不删

3. 和左 or 右合并 删 or 不删

```c++
class Solution {
public:
    const int inf = 0x3f3f3f3f;
    int maximumSum(vector<int>& arr) {
        int n = arr.size();
        vector<int> l(n + 2), r(n + 2);
        for (int i = 1; i <= n; ++ i )
            l[i] = max(l[i - 1], 0) + arr[i - 1];
        for (int i = n; i >= 1; -- i )
            r[i] = max(r[i + 1], 0) + arr[i - 1];
        int res = -inf;
        for (int i = 1; i <= n; ++ i ) {
            res = max(res, arr[i - 1]);
            int oth = l[i - 1] + r[i + 1];
            if(i > 1 && i < n) res = max(res, max(oth, oth + arr[i - 1]));
            if (i > 1) res = max(res, max(l[i - 1], l[i - 1] + arr[i - 1]));
            if (i < n) res = max(res, max(r[i + 1], r[i + 1] + arr[i - 1]));
        }
        return res;
    }
};
```

题解区有dp解法 略

### [1187. 使数组严格递增](https://leetcode.cn/problems/make-array-strictly-increasing/) [TAG]

dp

```c++
class Solution {
public:
    const int inf = 0x3f3f3f3f;
    int makeArrayIncreasing(vector<int>& arr1, vector<int>& arr2) {
        // 数值离散化 并使用离散化结果更新原数组
        vector<int> p;
        for (auto x : arr1) p.push_back(x);
        for (auto x : arr2) p.push_back(x);
        sort(p.begin(), p.end());
        p.erase(unique(p.begin(), p.end()), p.end());
        for (auto & x : arr1) x = lower_bound(p.begin(), p.end(), x) - p.begin() + 1;
        for (auto & x : arr2) x = lower_bound(p.begin(), p.end(), x) - p.begin() + 1;
        
        int k = p.size();
        vector<int> u(k + 1);
        for (auto x : arr2) u[x] = 1;
        
        // f[i][j] 前i个数 末尾值最大为j 的替换次数
        int n = arr1.size();
        vector<vector<int>> f(n + 1, vector<int>(k + 1, inf));
        for (int j = 0; j <= k; ++ j ) f[0][j] = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= k; ++ j ) {
                f[i][j] = f[i][j - 1];
                if (arr1[i - 1] == j)
                    f[i][j] = min(f[i][j], f[i - 1][j - 1]);
                if (u[j])
                    f[i][j] = min(f[i][j], f[i - 1][j - 1] + 1);
            }
        int ret = inf;
        for (int j = 1; j <= k; ++ j )
            ret = min(ret, f[n][j]);
        return ret == inf ? -1 : ret;
    }
};
```
