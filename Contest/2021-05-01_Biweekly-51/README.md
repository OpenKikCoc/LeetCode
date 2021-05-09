## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-51/)

virtual ranking: 176 / 2675

### [1844. 将所有数字用字符替换](https://leetcode-cn.com/problems/replace-all-digits-with-characters/)

略

```c++
class Solution {
public:
    string replaceDigits(string s) {
        int n = s.size();
        for (int i = 1; i < n; i += 2) {
            s[i] = s[i - 1] + s[i] - '0';
        }
        return s;
    }
};
```


### [1845. 座位预约管理系统](https://leetcode-cn.com/problems/seat-reservation-manager/)

BIT维护即可 略

```c++
class SeatManager {
public:
    const static int N = 1e5 + 10;
    int n;
    int tr[N];
    
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int c) {
        for (int i = x; i <= n; i += lowbit(i))
            tr[i] += c;
    }
    int sum(int x) {
        int res = 0;
        for (int i = x; i; i -= lowbit(i))
            res += tr[i];
        return res;
    }
    
    SeatManager(int n) {
        this->n = n;
        memset(tr, 0, sizeof tr);
    }
    
    int reserve() {
        int l = 1, r = n;
        while (l < r) {
            int m = l + r >> 1;
            if (sum(m) >= m)
                l = m + 1;
            else
                r = m;
        }
        add(l, 1);
        return l;
    }
    
    void unreserve(int seatNumber) {
        add(seatNumber, -1);
    }
};

/**
 * Your SeatManager object will be instantiated and called as such:
 * SeatManager* obj = new SeatManager(n);
 * int param_1 = obj->reserve();
 * obj->unreserve(seatNumber);
 */
```

### [1846. 减小和重新排列数组后的最大元素](https://leetcode-cn.com/problems/maximum-element-after-decreasing-and-rearranging/)

略

```c++
class Solution {
public:
    int maximumElementAfterDecrementingAndRearranging(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int n = arr.size();
        arr[0] = 1;
        for (int i = 1; i < n; ++ i )
            arr[i] = min(arr[i], arr[i - 1] + 1);
        return arr[n - 1];
    }
};
```

### [1847. 最近的房间](https://leetcode-cn.com/problems/closest-room/)

显然堆维护即可

最初写的时候 `lower_bound(S.begin(), S.end(), pid)` TLE

注意 STL set 使用 `S.lower_bound(pid)`

```c++
class Solution {
public:
    using PII = pair<int, int>;
    using TIII = tuple<int, int, int>;
    
    vector<int> closestRoom(vector<vector<int>>& rooms, vector<vector<int>>& queries) {
        vector<PII> ve;
        for (auto & r : rooms)
            ve.push_back({r[1], r[0]});
        sort(ve.begin(), ve.end());
        reverse(ve.begin(), ve.end());
        
        vector<TIII> qs;
        int m = queries.size();
        for (int i = 0; i < m; ++ i )
            qs.push_back({queries[i][1], queries[i][0], i});
        sort(qs.begin(), qs.end());
        // 反向 面积从大到小 条件越来越严格
        reverse(qs.begin(), qs.end());
        
        vector<int> res(m, -1);
        int p = 0, n = ve.size();
        set<int> S;
        for (auto & [msz, pid, id] : qs) {
            while (p < n && ve[p].first >= msz) {
                S.insert(ve[p].second);
                p ++ ;
            }
            if (S.size()) {
                auto it = S.lower_bound(pid); // ATTENTION lower_bound(S.begin(), S.end(), pid); 就会超时
                int t = 2e9;
                if (it != S.end()) {
                    if (abs(*it - pid) < abs(t - pid))
                        t = *it;
                }
                if (it != S.begin()) {
                    it -- ;
                    if (abs(*it - pid) <= abs(t - pid))
                        t = *it;
                }
                res[id] = t;
            }
        }
        return res;
    }
};
```

小trick

```c++
class Solution {
public:
    // using PII = pair<int, int>;
    // using TIII = tuple<int, int, int>;
    
    vector<int> closestRoom(vector<vector<int>>& rooms, vector<vector<int>>& queries) {
        auto cmp = [&](auto & a, auto & b){
            return a[1] > b[1];
        };
        sort(rooms.begin(), rooms.end(), cmp);
        int m = queries.size();
        for (int i = 0; i < m; ++ i )
            queries[i].push_back(i);
        sort(queries.begin(), queries.end(), cmp);
        
        vector<int> res(m, -1);
        int p = 0, n = rooms.size();
        set<int> S;
        for (auto & q : queries) {
            int pid = q[0], msz = q[1], id = q[2];
            while (p < n && rooms[p][1] >= msz) {
                S.insert(rooms[p][0]);
                p ++ ;
            }
            if (S.size()) {
                auto it = S.lower_bound(pid);
                int t = 2e9;
                if (it != S.end()) {
                    if (*it - pid < t - pid)
                        t = *it;
                }
                if (it != S.begin()) {
                    it -- ;
                    if (pid - *it <= t - pid)
                        t = *it;
                }
                res[id] = t;
            }
        }
        return res;
    }
};
```
