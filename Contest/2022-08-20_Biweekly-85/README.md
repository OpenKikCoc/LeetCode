## [比赛链接](https://leetcode.cn/contest/biweekly-contest-85/)

>   virtual rank: 89 / 4193


### [6156. 得到 K 个黑块的最少涂色次数](https://leetcode.cn/problems/minimum-recolors-to-get-k-consecutive-black-blocks/)



```c++
class Solution {
public:
    int minimumRecolors(string blocks, int k) {
        int n = blocks.size(), s = 0;
        for (int i = 0; i < k; ++ i )
            s += blocks[i] == 'B';
        int res = k - s;
        for (int i = k; i < n; ++ i ) {
            s += blocks[i] == 'B';
            s -= blocks[i - k] == 'B';
            res = min(res, k - s);
        }
        return res;
    }
};
```


### [6157. 二进制字符串重新安排顺序需要的时间](https://leetcode.cn/problems/time-needed-to-rearrange-a-binary-string/)



```c++
class Solution {
public:
    int secondsToRemoveOccurrences(string s) {
        int res = 0;
        for (;;) {
            bool flag = false;
            
            {
                int n = s.size();
                string g = s;
                for (int i = 1; i < n; ++ i )
                    if (g[i] == '1' && g[i - 1] == '0')
                        s[i] = '0', s[i - 1] = '1', i ++ , flag = true;
            }
            
            if (!flag)
                break;
            res ++ ;
        }
        return res;
    }
};
```

注意有 O(n) 写法

```c++
class Solution {
public:
    int secondsToRemoveOccurrences(string s) {
        int res = 0, cnt = 0;
        for (auto c : s)
            if (c == '0')
                cnt ++ ;
            else if (cnt)   // ATTENTION 左边有0才需要计数
                res = max(res + 1, cnt);
        return res;
    }
};
```



### [6158. 字母移位 II](https://leetcode.cn/problems/shifting-letters-ii/)

注意下标偏移

```c++
class Solution {
public:
    const static int N = 5e4 + 10;
    
    int d[N];
    
    string shiftingLetters(string s, vector<vector<int>>& shifts) {
        int n = s.size();
        memset(d, 0, sizeof d);
        for (auto & op : shifts) {
            int l = op[0], r = op[1], delta = (op[2] ? 1 : -1);
            d[l + 1] += delta, d[r + 1 + 1] -= delta;
        }
        for (int i = 1; i < N; ++ i )
            d[i] += d[i - 1];
        for (int i = 1; i < N; ++ i )
            d[i] = (d[i] % 26 + 26) % 26;
        
        for (int i = 1; i <= n; ++ i )
            s[i - 1] = 'a' + ((s[i - 1] - 'a' + d[i]) % 26);
        return s;
    }
};
```

### [6159. 删除操作后的最大子段和](https://leetcode.cn/problems/maximum-segment-sum-after-removals/)

经典并查集维护连通性，逆序操作即可，略

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    int pa[N];
    LL sz[N];
    void init() {
        memset(sz, 0, sizeof sz);
        for (int i = 0; i < N; ++ i )
            pa[i] = i;
    }
    int find(int x) {
        if (pa[x] != x)
            pa[x] = find(pa[x]);
        return pa[x];
    }
    
    vector<long long> maximumSegmentSum(vector<int>& nums, vector<int>& removeQueries) {
        init();
        int n = nums.size();
        vector<bool> t(n, false);
        
        vector<LL> res;
        LL maxv = 0;
        for (int _ = n - 1; _ >= 0; -- _ ) {
            res.push_back(maxv);
            int i = removeQueries[_];
            sz[i] = nums[i]; // ATTENTION sz[i] = nums[i]
            if (i + 1 < n && t[i + 1]) {
                sz[find(i + 1)] += sz[find(i)];
                pa[find(i)] = find(i + 1);
            }
            if (i - 1 >= 0 && t[i - 1]) {
                sz[find(i - 1)] += sz[find(i)];
                pa[find(i)] = find(i - 1);
            }
            maxv = max(maxv, sz[find(i)]);
            t[i] = true;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```
