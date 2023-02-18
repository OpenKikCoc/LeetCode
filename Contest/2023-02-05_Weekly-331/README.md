## [比赛链接](https://leetcode.cn/contest/weekly-contest-331/)


### [2558. 从数量最多的堆取走礼物](https://leetcode.cn/problems/take-gifts-from-the-richest-pile/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long pickGifts(vector<int>& gifts, int k) {
        priority_queue<int> q;
        for (auto x : gifts)
            q.push(x);
        while (k -- ) {
            int t = q.top(); q.pop();
            int left = sqrt(t), add = t - left;
            q.push(left);
        }
        LL res = 0;
        while (q.size()) {
            res += (LL)q.top();
            q.pop();
        }
        return res;
    }
};
```


### [2559. 统计范围内的元音字符串数](https://leetcode.cn/problems/count-vowel-strings-in-ranges/)



```c++
class Solution {
public:
    // 数据 sum(words[i].length) <= 3 * 10^5
    const static int N = 1e5 + 10;
    
    int tr[N];
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int y) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += y;
    }
    int sum(int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    vector<int> vowelStrings(vector<string>& words, vector<vector<int>>& queries) {
        unordered_set<char> S = {'a', 'e', 'i', 'o', 'u'};
        
        memset(tr, 0, sizeof tr);
        for (int i = 0; i < words.size(); ++ i ) {
            auto & w = words[i];
            if (S.count(w[0]) && S.count(w[w.size() - 1]))
                add(i + 1, 1);
        }
        vector<int> res;
        for (auto & q : queries) {
            int l = q[0] + 1, r = q[1] + 1;
            res.push_back(sum(r) - sum(l - 1));
        }
        return res;
    }
};
```

### [2560. 打家劫舍 IV](https://leetcode.cn/problems/house-robber-iv/)



```c++
class Solution {
public:
    // 显然二分
    using LL = long long;
    
    vector<int> ns;
    int n, k;
    
    bool check(LL m) {
        // 对于所有不超过 m 的位置，这些位置不能连续选择
        int c = 0;
        for (int i = 0; i < n; ++ i ) {
            if (ns[i] > m)
                continue;
            int j = i + 1;
            while (j < n && ns[j] <= m)
                j ++ ;
            int w = j - i;
            c += (w + 1) / 2;
            i = j - 1;
        }
        return c >= k;
    }
    
    int minCapability(vector<int>& nums, int k) {
        this->ns = nums, this->k = k, this->n = ns.size();
        
        LL l = 0, r = 1e9 + 10;
        while (l < r) {
            LL m = l + (r - l) / 2;
            if (check(m))   // 成功的话
                r = m;
            else
                l = m + 1;  // 失败 扩增
        }
        return l;
    }
};
```

### [2561. 重排水果](https://leetcode.cn/problems/rearranging-fruits/) [TAG]

较显然的，可以预处理各自多出的部分，并两两匹配【代价较小的与另一个的代价较大的匹配】

【同时可以借助其他代价较小的元素，间接交换两个元素】

```c++
class Solution {
public:
    // 非常重要的是，当我们理出来两边各自需要把哪些东西挪出去、以及挪出去具体多少个之后
    // 交换未必只发生在这些多出的元素之间，可以有其他元素参与进来(交换2次) ==> 增加交换次数 减少总开销
    using LL = long long;
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    long long minCost(vector<int>& basket1, vector<int>& basket2) {
        unordered_map<int, int> h0, h1, h2;
        {
            for (auto & x : basket1)
                h1[x] ++ , h0[x] ++ ;
            for (auto & x : basket2)
                h2[x] ++ , h0[x] ++ ;
            for (auto & [k, v] : h0)
                if (v & 1)
                    return -1;
        }
        
        // 同一侧的最小值 能把对侧、自己侧的两个最大值低成本的交换过来
        int minv = 2e9;
        for (auto & [k, v] : h1)
            minv = min(minv, k);
        for (auto & [k, v] : h2)
            minv = min(minv, k);
        
        vector<PII> x1, x2;
        for (auto & [k, v] : h1)
            if (v > h0[k] / 2)
                x1.push_back({k, v - h0[k] / 2});
        sort(x1.begin(), x1.end()); // ATTENTION
        // reverse(x1.begin(), x1.end());           // 【ATTENTION】 移除这个就能过
        for (auto & [k, v] : h2)
            if (v > h0[k] / 2)
                x2.push_back({k, v - h0[k] / 2});
        sort(x2.begin(), x2.end()); // ATTENTION
        reverse(x2.begin(), x2.end());
        
        LL res = 0;
        int n = x1.size(), m = x2.size();
        for (int i = 0, j = 0; i < n && j < m; ) {
            int cnt = min(x1[i].second, x2[j].second);
            LL cost = min(x1[i].first, x2[j].first);
            if (cost > minv * 2)
                cost = minv * 2;
            res += cost * cnt;
            x1[i].second -= cnt, x2[j].second -= cnt;
            if (x1[i].second == 0)
                i ++ ;
            if (x2[j].second == 0)
                j ++ ;
        }
        
        return res;
    }
};
```
