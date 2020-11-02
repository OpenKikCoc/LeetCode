## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-213/)


### [1640. 能否连接形成数组](https://leetcode-cn.com/problems/check-array-formation-through-concatenation/)

搜索

```c++
    int n, m;
    vector<int> t;
    vector<vector<int>> ps;
    vector<bool> vis;
    vector<int> len;
    bool check(int u, int i) {
        int l = len[i];
        for(int x = u, y = 0; y < l; ++x, ++y)
            if(t[x] != ps[i][y]) return false;
        return true;
    }
    bool dfs(int u) {
        if(u == n) return true;
        for(int i = 0; i < m; ++i) {
            if(u + len[i] > n || vis[i]) continue;
            vis[i] = true;
            if(check(u, i) && dfs(u+len[i])) return true;
            vis[i] = false;
        }
        return false;
    }
    bool canFormArray(vector<int>& arr, vector<vector<int>>& pieces) {
        t = arr, ps = pieces;
        n = t.size(), m = ps.size();
        vis = vector<bool>(m);
        len = vector<int>(m);
        for(int i = 0; i < m; ++i) len[i] = ps[i].size();
        return dfs(0);
    }
```

题解区：以pieces中数组的第一个值作为key，整个数组作为value保存在unordered_map中，然后对arr数组进行一遍扫描判断

```c++
    bool canFormArray(vector<int>& arr, vector<vector<int>>& pieces) {
        unordered_map<int, int> dic;
        for (int i = 0; i < pieces.size(); i++) {
            dic[pieces[i][0]] = i;
        }

        for (int i = 0; i < arr.size();) {
            if (dic.find(arr[i]) == dic.end()) return false;
            auto& p = pieces[dic[arr[i]]];
            for (int j = 0; j < p.size(); j++, i++) {
                if (arr[i] != p[j]) return false;
            }
        }
        return true;
    }
```


### [1641. 统计字典序元音字符串的数目](https://leetcode-cn.com/problems/count-sorted-vowel-strings/) 

隔板法

> 从 n+4 个放置隔板的位置中选择 4 个

```c++
    int countVowelStrings(int n) {
        return (n + 4) * (n + 3) * (n + 2) * (n + 1) / 24;
    }
```

### [1642. 可以到达的最远建筑](https://leetcode-cn.com/problems/furthest-building-you-can-reach/) [TAG]


>
> 我们可以用贪心的思路来想这个问题。
>
> 「梯子」相当于一次性的无限量砖块，那么我们一定是把梯子用在刀刃上。
>
> 也就是说，如果我们有 ll 架梯子，那么我们会在 Δh 最大的那 ll 次使用梯子，
>
> 而在剩余的情况下使用砖块。
>

>
> 这样一来，我们就可以得到正确的算法了：
>
> 我们使用优先队列实时维护不超过 ll 个最大的 Δh，这些就是使用梯子的地方。
>
> 对于剩余的 Δh，我们需要使用砖块，因此需要对它们进行累加，
>
> 如果某一时刻这个累加值超过了砖块的数目 b，那么我们就再也无法移动了。
>

搜索超时 代码如下

```c++
    vector<int> hs;
    int n, res = 0;
    unordered_map<int, int> hashbs, hashls;
    void dfs(int p, int bs, int ls) {
        if(p >= n) return;
        if(hashbs[p] && hashls[p] && hashbs[p] <= bs && hashls[p] <= ls) return;  // 剪枝
        hashbs[p] = bs, hashls[p] = ls;
        res = max(res, p);
        if(hs[p] >= hs[p+1]) dfs(p+1, bs, ls);
        else {
            if(bs >= hs[p+1] - hs[p]) dfs(p+1, bs-(hs[p+1]-hs[p]), ls);
            if(ls) dfs(p+1, bs, ls-1);
        }
    }
    
    int furthestBuilding(vector<int>& heights, int bricks, int ladders) {
        hs = heights;
        n = hs.size();
        hs.push_back(0);
        dfs(0, bricks, ladders);
        return res;
    }
```

正确贪心

```c++
    int furthestBuilding(vector<int>& heights, int bricks, int ladders) {
        int n = heights.size();
        // 由于我们需要维护最大的 l 个值，因此使用小根堆
        priority_queue<int, vector<int>, greater<int>> q;
        // 需要使用砖块的 delta h 的和
        int sumH = 0;
        for (int i = 1; i < n; ++i) {
            int deltaH = heights[i] - heights[i - 1];
            if (deltaH > 0) {
                q.push(deltaH);
                // 如果优先队列已满，需要拿出一个其中的最小值，改为使用砖块
                if (q.size() > ladders) {
                    sumH += q.top();
                    q.pop();
                }
                if (sumH > bricks) {
                    return i - 1;
                }
            }
        }
        return n - 1;
    }
```

### [1643. 第 K 条最小指令](https://leetcode-cn.com/problems/kth-smallest-instructions/) [TAG]

根据组合数 判断第 k 小应往哪边走

```c++
    int c[101][101];
    string kthSmallestPath(vector<int>& destination, int k) {
        int n = destination[0], m = destination[1];
        for (int i = 0; i <= n + m; i ++) c[i][0] = 1;
        for (int i = 1; i <= n + m; i ++)
            for (int j = 1; j <= i; j ++)
                c[i][j] = c[i - 1][j] + c[i - 1][j - 1];
        k --;
        string ans = "";
        int curm = 0, curn = 0;
        for (int i = 0; i < n + m; i ++) {
            if (curm < m) {
                int res = c[m - curm - 1 + n - curn][n - curn];
                if (k >= res) {
                    k -= res;
                    ans += "V";
                    ++ curn;
                }
                else {
                    ans += "H";
                    ++ curm;
                }
            }
            else {
                ans += "V";
                ++ curn;
            }
        }
        return ans;
    }
```
