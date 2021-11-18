## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-63/)


### [2037. 使每位学生都有座位的最少移动次数](https://leetcode-cn.com/problems/minimum-number-of-moves-to-seat-everyone/)

排序即可 略

```c++
class Solution {
public:
    int minMovesToSeat(vector<int>& seats, vector<int>& students) {
        sort(seats.begin(), seats.end());
        sort(students.begin(), students.end());
        int n = seats.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            res += abs(seats[i] - students[i]);
        return res;
    }
};
```


### [2038. 如果相邻两个颜色均相同则删除当前颜色](https://leetcode-cn.com/problems/remove-colored-pieces-if-both-neighbors-are-the-same-color/)

显然每个人只能删除某一颜色的 故统计总共的可删除次数随后比大小即可

```c++
class Solution {
public:
    bool winnerOfGame(string colors) {
        int n = colors.size();
        int a = 0, b = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n && colors[j] == colors[i])
                j ++ ;
            if (j - i > 2) {
                if (colors[i] == 'A')
                    a += j - i - 2;
                else
                    b += j - i - 2;
            }
            i = j - 1;
        }
        
        return a > b;
    }
};
```

### [2039. 网络空闲的时刻](https://leetcode-cn.com/problems/the-time-when-the-network-becomes-idle/)

显然跑最短路 然后计算延续值即可

计算细节

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1e5 + 10, M = N << 1;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    vector<int> dis;
    
    void dijkstra(int s) {
        priority_queue<PII, vector<PII>> pq;
        pq.push({0, 0}), dis[0] = 0;
        while (pq.size()) {
            auto [t, d] = pq.top();
            pq.pop();
            for (int i = h[t]; ~i; i = ne[i]) {
                int j = e[i];
                if (dis[j] > d + 1) {
                    dis[j] = d + 1;
                    pq.push({j, dis[j]});
                }
            }
        }
    }
    
    int get(int d, int p) {
        int tot = d * 2;
        if (tot <= p)
            return tot;
        // ATTENTION
        return ((tot + p - 1) / p - 1) * p + tot;
    }
    
    int networkBecomesIdle(vector<vector<int>>& edges, vector<int>& patience) {
        this->n = patience.size();
        this->dis = vector<int>(n, 2e9);
        
        init();
        for (auto & ed : edges) {
            int a = ed[0], b = ed[1];
            add(a, b), add(b, a);
        }
        dijkstra(0);
        
        int res = 0;
        for (int i = 0; i < n; ++ i )
            res = max(res, get(dis[i], patience[i]));
        return res + 1;
    }
};
```

### [2040. 两个有序数组的第 K 小乘积](https://leetcode-cn.com/problems/kth-smallest-product-of-two-sorted-arrays/) [TAG]

比较显然的 二分套二分即可

需要注意的点是数据有负数

**细节综合题**

-   **在选取左右边界时需要事先考虑计算最小最大值（计算方式）**
-   **check 中 v 的值不可知 不好二分 根据正负划分情况即可解决**

【**非常好的二分综合应用题**】

```c++
class Solution {
public:
    using LL = long long;
    
    vector<int> ns1, ns2;
    int n1, n2;
    LL k;   // ATTENTION
    
    bool check(LL mid) {
        LL c = 0;
        for (auto v : ns1) {
            int l = 0, r = n2;
            // 无法直接二分 故根据v的正负性质来二分
            if (v > 0) {
                // 找到 > mid 的第一个数
                // 左侧的所有即为所求（不包括当前）
                while (l < r) {
                    int m = l + (r - l) / 2;
                    if ((LL)ns2[m] * v <= mid)
                        l = m + 1;
                    else
                        r = m;
                }
                c += l;
            } else if (v < 0) {
                // 找到 <= mid 的第一个数
                // 右侧的所有即为所求（包括当前）
                while (l < r) {
                    int m = l + (r - l) / 2;
                    if ((LL)ns2[m] * v > mid)
                        l = m + 1;
                    else
                        r = m;
                }
                c += (n2 - l);
            } else {
                // v == 0
                if (mid >= 0)
                    c += n2;
            }
        }
        return c >= k;
    }
    
    // 经典求两数组乘积最值
    pair<LL, LL> getMinMax() {
        LL lv1 = ns1[0], rv1 = ns1[n1 - 1];
        LL lv2 = ns2[0], rv2 = ns2[n2 - 1];
        vector<LL> ve = {lv1 * lv2, lv1 * rv2, lv2 * rv1, rv1 * rv2};
        LL minv = LONG_MAX, maxv = LONG_MIN;
        for (auto v : ve)
            minv = min(minv, v), maxv = max(maxv, v);
        return {minv, maxv};
    }
    
    long long kthSmallestProduct(vector<int>& nums1, vector<int>& nums2, long long k) {
        this->ns1 = nums1, this->ns2 = nums2;
        this->n1 = ns1.size(), this->n2 = ns2.size(), this->k = k;
        auto [l, r] = getMinMax();
        while (l < r) {
            LL m = l + (r - l) / 2;
            if (check(m))
                r = m;
            else
                l = m + 1;
        }
        return l;
    }
};
```
