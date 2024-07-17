## [比赛链接](https://leetcode.cn/contest/weekly-contest-232/)


### [1790. 仅执行一次字符串交换能否使两个字符串相等](https://leetcode.cn/problems/check-if-one-string-swap-can-make-strings-equal/)

略

```c++
class Solution {
public:
    bool areAlmostEqual(string s1, string s2) {
        int n = s1.size();
        vector<int> ve;
        for (int i = 0; i < n; ++ i )
            if (s1[i] != s2[i])
                ve.push_back(i);
        return ve.empty() || ve.size() == 2 && s1[ve[1]] == s2[ve[0]] && s1[ve[0]] == s2[ve[1]];
    }
};
```


### [5702. 找出星型图的中心节点](https://leetcode.cn/problems/find-center-of-star-graph/)

度数 略

```c++
class Solution {
public:
    int findCenter(vector<vector<int>>& edges) {
        int n = edges.size() + 1;
        vector<vector<int>> es(n + 1);
        
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            es[a].push_back(b);
            es[b].push_back(a);
        }
        
        int p = 0;
        for (int i = 1; i <= n; ++ i )
            if (es[i].size() > es[p].size())
                    p = i;
        return p;
    }
};
```

更简单一些:

```c++
class Solution {
public:
    int findCenter(vector<vector<int>>& edges) {
        unordered_map<int, int> d;
        for (auto& e: edges) {
            int a = e[0], b = e[1];
            if ( ++ d[a] > 1) return a;
            if ( ++ d[b] > 1) return b;
        }
        return -1;
    }
};
```

### [1792. 最大平均通过率](https://leetcode.cn/problems/maximum-average-pass-ratio/)

贪心即可

```c++
class Solution {
public:
    using PDI = pair<double, int>;
    double maxAverageRatio(vector<vector<int>>& cs, int e) {
        int n = cs.size();
        
        priority_queue<PDI, vector<PDI>, less<PDI>> heap;
        for (int i = 0; i < n; ++ i ) {
            double up = (double)(cs[i][0] + 1) / (cs[i][1] + 1) - (double)cs[i][0] / cs[i][1];
            heap.push({up, i});
        }
        
        while (e -- ) {
            auto [_, i] = heap.top();
            heap.pop();
            
            cs[i][0] ++ , cs[i][1] ++ ;
            double up = (double)(cs[i][0] + 1) / (cs[i][1] + 1) - (double)cs[i][0] / cs[i][1];
            heap.push({up, i});
        }
        
        double rate = 0;
        for (int i = 0; i < n; ++ i ) {
            double r = (double)(min(cs[i][0], cs[i][1])) / cs[i][1];
            rate += r;
        }
        return rate / n;
    }
};
```

### [1793. 好子数组的最大分数](https://leetcode.cn/problems/maximum-score-of-a-good-subarray/) [TAG]

**线性做法**

```c++
class Solution {
public:
    int maximumScore(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;
        for (int i = nums[k], l = k, r = k; i >= 1; -- i ) {
            while (l - 1 >= 0 && nums[l - 1] >= i) -- l;
            while (r + 1 < n && nums[r + 1] >= i) ++ r;
            res = max(res, (r - l + 1) * i);
        }
        return res;
    }
};
```

另一

```c++
class Solution {
public:
    int maximumScore(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> left(n, -1), right(n, n);
        stack<int> st;
        for (int i = 0; i < n; ++i) {
            while (!st.empty() && nums[st.top()] > nums[i]) {
                right[st.top()] = i;
                st.pop();
            }
            st.push(i);
        }
        st = stack<int>();
        for (int i = n - 1; i >= 0; --i) {
            while (!st.empty() && nums[st.top()] > nums[i]) {
                left[st.top()] = i;
                st.pop();
            }
            st.push(i);
        }
        int ans = 0;
        for (int i = 0; i < n; ++i) {
            int l = left[i] + 1, r = right[i] - 1;
            if (l <= k && r >= k)
                ans = max(ans, (r - l + 1) * nums[i]);
        }
        return ans;
    }
};
```

and

```c++
class Solution {
public:
    int maximumScore(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> h(n + 2, -1), l(n + 2), r(n + 2), stk(n + 2);
        for (int i = 1; i <= n; i ++ ) h[i] = nums[i - 1];
        int tt = 0;
        stk[0] = 0;
        for (int i = 1; i <= n; i ++ ) {
            while (h[stk[tt]] >= h[i]) tt -- ;
            l[i] = stk[tt];
            stk[ ++ tt] = i;
        }
        tt = 0, stk[0] = n + 1;
        for (int i = n; i; i -- ) {
            while (h[stk[tt]] >= h[i]) tt -- ;
            r[i] = stk[tt];
            stk[ ++ tt] = i;
        }
        k ++ ;
        int res = 0;
        for (int i = 1; i <= n; i ++ )
            if (l[i] < k && r[i] > k)
                res = max(res, (r[i] - l[i] - 1) * h[i]);
        return res;
    }
};
```
