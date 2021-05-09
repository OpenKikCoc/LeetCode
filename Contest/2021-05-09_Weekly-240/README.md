## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-240)

rank: 286 / 4306

### [5750. 人口最多的年份](https://leetcode-cn.com/problems/maximum-population-year/)

差分 其实暴力就可以

```c++
class Solution {
public:
    int maximumPopulation(vector<vector<int>>& logs) {
        vector<int> d(110);
        for (auto & l : logs) {
            int birth = l[0] - 1949, death = l[1] - 1949;
            d[birth] ++ , d[death] -- ;
        }
        int res = 0, mx = 0;
        for (int i = 1; i <= 100; ++ i ) {
            d[i] += d[i - 1];
            if (d[i] > mx)
                mx = d[i], res = i;
        }
        return res + 1949;
    }
};
```


### [5751. 下标对中的最大距离](https://leetcode-cn.com/problems/maximum-distance-between-a-pair-of-values/)

自己二分扫描

```c++
class Solution {
public:
    int maxDistance(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size(), n2 = nums2.size();
        int res = 0;
        for (int i = 0; i < n2; ++ i ) {
            int l = 0, r = n1, v = nums2[i];
            while (l < r) {
                int m = l + r >> 1;
                if (nums1[m] > v)
                    l = m + 1;
                else
                    r = m;
            }
            // l < n1 case
            if (l < n1 && i > l) {
                res = max(res, i - l);
            }
        }
        return res;
    }
};
```

其实双指针就可以 很好的双指针题目

```c++
class Solution {
public:
    int maxDistance(vector<int>& nums1, vector<int>& nums2) {
        int i = 0;
        int j = 0;
        int ans = 0;
        while (i < nums1.size() && j < nums2.size()) {
            if (i <= j && nums1[i] <= nums2[j]) {
                ans = max(ans, j-i);
                ++j;
            }
            else {
                if (nums1[i] > nums2[j]) ++i;
                else ++j;     
            }
        }
        return ans;
    }
};
```

### [5752. 子数组最小乘积的最大值](https://leetcode-cn.com/problems/maximum-subarray-min-product/)

单调栈 略

```c++
class Solution {
public:
    using LL = long long;
    const int MOD = 1e9 + 7;
    
    int maxSumMinProduct(vector<int>& nums) {
        int n = nums.size();
        vector<LL> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + nums[i - 1];
        
        // 两侧第一个小于其的位置
        vector<int> l(n + 1, 0), r(n + 1, n + 1);
        stack<int> st;
        for (int i = 1; i <= n; ++ i ) {
            while (st.size() && nums[st.top() - 1] > nums[i - 1]) {
                r[st.top()] = i;
                st.pop();
            }
            st.push(i);
        }
        while (st.size())
            st.pop();
        for (int i = n; i >= 1; -- i ) {
            while (st.size() && nums[st.top() - 1] > nums[i - 1]) {
                l[st.top()] = i;
                st.pop();
            }
            st.push(i);
        }
        
        LL res = 0;
        for (int i = 1; i <= n; ++ i ) {
            int v = nums[i - 1], lid = l[i], rid = r[i];
            LL t = (LL)v * (s[rid - 1] - s[lid]);
            res = max(res, t);
        }
        
        return res % MOD;
    }
};
```

### [5753. 有向图中最大颜色值](https://leetcode-cn.com/problems/largest-color-value-in-a-directed-graph/)

一开始写了判环 然后跑拓扑 其实直接拓扑就可以

随后正序递推即可 （正序dfs会TLE）

```c++
const int N = 1e5 + 10, M = 2e5 + 10;

int h[N], e[M], ne[M], idx;

void add(int a, int b) {
    e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
}

int q[N], d[N];
int f[N][26];

void init() {
    memset(h, -1, sizeof h);
    idx = 0;
    memset(d, 0, sizeof d);
    memset(f, 0, sizeof f);
}

class Solution {
public:
    int n;
    bool topsort() {
        int hh = 0, tt = -1;
        for (int i = 0; i < n; i ++ )
            if (!d[i])
                q[ ++ tt] = i;

        while (hh <= tt) {
            int t = q[hh ++ ];
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                if (-- d[j] == 0)
                    q[ ++ tt] = j;
            }
        }
        return tt == n - 1;
    }
    
    int largestPathValue(string colors, vector<vector<int>>& edges) {
        n = colors.size();
        init();
        for (auto & es : edges) {
            int a = es[0], b = es[1];
            add(a, b);
            d[b] ++ ;
        }
        if (!topsort())
            return -1;
        
        int res = 0;
        // 正序就是拓扑序列
        for (int i = 0; i < n; ++ i ) {
            int j = q[i], ci = colors[j] - 'a';  // 这里写成了colors[i] - 'a'比赛的时候WA
            f[j][ci] = max(f[j][ci], 1);     // 细节
            for (int k = h[j]; ~k; k = ne[k]) {
                int v = e[k], cv = colors[v] - 'a';
                for (int c = 0; c < 26; ++ c )
                    f[v][c] = max(f[v][c], f[j][c] + (c == cv));
            }
        }
        
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < 26; ++ j )
                res = max(res, f[i][j]);
        
        return res;
    }
};
```
