## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-57/)

>   virtual rank: 75 / 2933


### [5804. 检查是否所有字符出现次数相同](https://leetcode-cn.com/problems/check-if-all-characters-have-equal-number-of-occurrences/)

模拟 略

```c++
class Solution {
public:
    bool areOccurrencesEqual(string s) {
        unordered_map<char, int> cnt;
        for (auto c : s)
            cnt[c] ++ ;
        unordered_set<int> S;
        for (auto [k, v] : cnt)
            S.insert(v);
        return S.size() == 1;
    }
};
```


### [5805. 最小未被占据椅子的编号](https://leetcode-cn.com/problems/the-number-of-the-smallest-unoccupied-chair/)

维护堆即可 略

注意 `当时间 i 为 st 时仍需弹出 used` ，或者直接加个 break 即可

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    int smallestChair(vector<vector<int>>& times, int targetFriend) {
        int n = times.size();
        int st = times[targetFriend][0];
        sort(times.begin(), times.end());
        
        priority_queue<int, vector<int>, greater<int>> q;
        for (int i = 0; i < n; ++ i )
            q.push(i);
        priority_queue<PII, vector<PII>, greater<PII>> used;
        
        for (int i = 0, j = 0; i <= st; ++ i ) {
            while (used.size() && used.top().first <= i) {
                int id = used.top().second;
                used.pop();
                q.push(id);
            }
            // ATTENTION
            if (i == st)
                break;
            if (i == times[j][0]) {
                int id = q.top(); q.pop();
                used.push({times[j][1], id});
                j ++ ;
            }
        }
        return q.top();
    }
};
```

或者直接扫完返回结果

```c++
class Solution {
public:
    int smallestChair(vector<vector<int>>& times, int targetFriend) {
        vector<vector<int>> v(100010);
        vector<vector<int>> w(100010);
        int n = times.size();
        for (int i = 0; i < n; ++i) {
            int x = times[i][0], y = times[i][1];
            v[x].push_back(i);
            w[y].push_back(i);
        }
        set<int> H;
        for (int i = 0; i < n; ++i) H.insert(i);
        vector<int> res(n);
        for (int i = 1; i <= 100000; ++i) {
            for (auto id : w[i]) {
                H.insert(res[id]);
            }
            for (auto id : v[i]) {
                res[id] = *H.begin();
                H.erase(res[id]);
            }
        }
        return res[targetFriend];
    }
};
```



### [5806. 描述绘画结果](https://leetcode-cn.com/problems/describe-the-painting/)

显然差分即可，本题要求分割点需单独成段，特殊标记即可。略

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    bool st[N];
    LL c[N]; // ATTENTION
    
    vector<vector<long long>> splitPainting(vector<vector<int>>& segments) {
        for (auto & seg : segments) {
            int l = seg[0], r = seg[1], v = seg[2];
            c[l] += v, c[r] -= v;
            st[l] = st[r] = true;
        }
        for (int i = 1; i < N; ++ i )
            c[i] += c[i - 1];
        
        vector<vector<LL>> res;
        for (int i = 1; i < N; ++ i ) {
            int j = i + 1;
            while (j < N && c[j] == c[j - 1] && !st[j])
                j ++ ;
            vector<LL> t = {i, j, c[i]};
            if (c[i])
                res.push_back(t);
            i = j - 1;
        }
        return res;
    }
};
```

或直接根据输入的边界，离散化再扫

```c++
using LL = long long;
constexpr int N = 1e5 + 10;
class Solution {
public:
    vector<vector<LL>> splitPainting(vector<vector<int>>& segments) {
        vector<LL> sum(N);
        vector<int> w;
        for (auto& v : segments) {
            sum[v[0]] += v[2];
            sum[v[1]] -= v[2];
            w.push_back(v[0]);
            w.push_back(v[1]);
        }
        for (int i = 1; i < N; i ++ ) sum[i] += sum[i - 1];
        sort(w.begin(), w.end());
        w.resize(unique(w.begin(), w.end()) - w.begin());
        vector<vector<LL>> ans;
        for (int i = 0; i + 1 < w.size(); i ++ )
            if (sum[w[i]])
                ans.push_back({w[i], w[i + 1], sum[w[i]]});
        return ans;
    }
};
```



### [5196. 队列中可以看到的人数](https://leetcode-cn.com/problems/number-of-visible-people-in-a-queue/)

此类题目显然先想考虑 `按高度加入` or `按方向加入`

本题按方向先加入右侧的点 需注意找到的是当前点右侧第一个大于等于当前点的数作为右边界

>   部分题解使用了大于等于当前点的最后一个数，是错误的

```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int stk[N], top;
    
    vector<int> canSeePersonsCount(vector<int>& heights) {
        int n = heights.size();
        this->top = 0;
        
        vector<int> res(n);
        for (int i = n - 1; i >= 0; -- i ) {
            int cnt = 0;
            while (top && heights[stk[top - 1]] < heights[i])
                top -- , cnt ++ ;
            if (top)
                cnt ++ ;
            res[i] = cnt;
            // 等于 后面的看不到
            while (top && heights[stk[top - 1]] == heights[i])
                top -- ;
            stk[top ++ ] = i;
        }
        return res;
    }
};
```

也可使用数组简化栈操作

```c++
class Solution {
public:
    vector<int> canSeePersonsCount(vector<int>& heights) {
        int n = heights.size();
        vector<int> ans(n), v;
        for (int i = n - 1; i >= 0; i -= 1) {
            int j = lower_bound(v.begin(), v.end(), heights[i], greater<int>()) - v.begin();
            ans[i] = v.size() - j + (j != 0);
            while (not v.empty() and v.back() <= heights[i])
                v.pop_back();
            v.push_back(heights[i]);
        }
        return ans;
    }
};
```

