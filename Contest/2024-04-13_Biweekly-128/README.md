## [比赛链接](https://leetcode.cn/contest/biweekly-contest-128/)

>   virtual rank: 106 / 2654
>
>   18	0:29:03	0:00:51	0:03:22	0:14:41	0:29:03


### [3110. 字符串的分数](https://leetcode.cn/problems/score-of-a-string/)



```c++
class Solution {
public:
    int scoreOfString(string s) {
        int res = 0;
        for (int i = 1; i < s.size(); ++ i )
            res += abs(s[i] - s[i - 1]);
        return res;
    }
};
```


### [3111. 覆盖所有点的最少矩形数目](https://leetcode.cn/problems/minimum-rectangles-to-cover-points/)



```c++
class Solution {
public:
    int minRectanglesToCoverPoints(vector<vector<int>>& points, int w) {
        sort(points.begin(), points.end());
        int n = points.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            while (j < n && points[j][0] <= points[i][0] + w)
                j ++ ;
            res ++ ;
            i = j - 1;
        }
        return res;
    }
};
```

### [3112. 访问消失节点的最少时间](https://leetcode.cn/problems/minimum-time-to-visit-disappearing-nodes/)



```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;
    const static int N = 5e4 + 10;
    
    vector<PII> es[N];
    LL dis[N];
    bool st[N];
    
    vector<int> minimumTime(int n, vector<vector<int>>& edges, vector<int>& disappear) {
        for (auto & e : edges) {
            int a = e[0], b = e[1], c = e[2];
            es[a].push_back({b, c}), es[b].push_back({a, c});
        }
        
        memset(dis, 0x3f, sizeof dis);
        memset(st, 0, sizeof st);
        
        priority_queue<PII, vector<PII>, greater<PII>> heap;
        dis[0] = 0;
        heap.push({0, 0});
        while (heap.size()) {
            auto [d, u] = heap.top();
            heap.pop();
            if (st[u])
                continue;
            st[u] = true;
            for (auto & [v, w] : es[u]) {
                int nd = d + w;
                if (disappear[v] > nd && dis[v] > nd)
                    heap.push({dis[v] = nd, v});
            }
        }
        
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            if (dis[i] <= disappear[i])
                res.push_back(dis[i]);
            else
                res.push_back(-1);
        return res;
    }
};
```

### [3113. 边界元素是最大值的子数组数目](https://leetcode.cn/problems/find-the-number-of-subarrays-where-boundary-elements-are-maximum/)

显然找到某位置左侧第一个比当前元素大的位置 期间所有相同元素的数量即为所求

```c++
class Solution {
public:
    // 子数组: 原数组的一个连续部分
    //  对于一个合法子数组 中间一定不包含比它大的元素(找到左侧第一个比它大的位置)
    
    using LL = long long;
    const static int N = 1e5 + 10;
    
    unordered_map<int, vector<int>> hash;
    int l[N];
    
    int get(vector<int> & xs, int x) {
        return lower_bound(xs.begin(), xs.end(), x) - xs.begin();
    }

    long long numberOfSubarrays(vector<int>& nums) {
        int n = nums.size();
        
        {
            memset(l, -1, sizeof l);
            stack<int> st;
            for (int i = n - 1; i >= 0; -- i ) {
                while (st.size() && nums[st.top()] < nums[i])
                    l[st.top()] = i, st.pop();
                st.push(i);
            }
            /* 等效逻辑 使用自己习惯的(前面一种)
            for (int i = 0; i < n; ++ i ) {
                while (st.size() && nums[st.top()] <= nums[i])
                    st.pop();
                if (st.size())
                    l[i] = st.top();
                st.push(i);
            }
            */
        }
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            int x = nums[i];
            int idx = get(hash[nums[i]], l[i]);
            int tot = hash[nums[i]].size();
            res += tot - idx + 1 /*1 为当前数字本身*/;
            hash[nums[i]].push_back(i);
        }
        
        return res;
    }
};
```

统计逻辑显然可以在维护单调栈时直接完成

```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;

    long long numberOfSubarrays(vector<int>& nums) {
        LL res = 0;
        
        stack<PII> st;
        for (int i = 0; i < nums.size(); ++ i ) {
            while (st.size() && nums[st.top().first] < nums[i])   // ATTENTION <
                st.pop();
            if (st.size() && nums[st.top().first] == nums[i])
                st.top().second ++ ;
            else
                st.push({i, 1});
            res += st.top().second;
        }
        
        return res;
    }
};
```

