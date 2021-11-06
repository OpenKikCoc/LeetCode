## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-258/)


### [2000. 反转单词前缀](https://leetcode-cn.com/problems/reverse-prefix-of-word/)

模拟即可

```c++
class Solution {
public:
    string reversePrefix(string word, char ch) {
        int n = word.size();
        for (int i = 0; i < n; ++ i )
            if (word[i] == ch) {
                for (int j = 0, k = i; j < k; ++ j , -- k )
                    swap(word[j], word[k]);
                break;
            }
        return word;
    }
};
```

简洁代码

```c++
class Solution {
public:
    string reversePrefix(string s, char a) {
        int pos = find(s.begin(), s.end(), a) - s.begin();
        if (pos < s.size()) {
            reverse(s.begin(), s.begin() + pos + 1);
        }
        return s;
    }
};
```


### [2001. 可互换矩形的组数](https://leetcode-cn.com/problems/number-of-pairs-of-interchangeable-rectangles/)

`double` 统计即可 对于本题只要保证精度即可边统计边更新记录

```c++
class Solution {
public:
    using LL = long long;
    
    // wi * hj == wj * hi
    long long interchangeableRectangles(vector<vector<int>>& recs) {
        unordered_map<double, int> cnt;
        LL res = 0;
        for (auto rec : recs) {
            double w = rec[0], h = rec[1];
            res += cnt[w / h];
            cnt[w / h] ++ ;
        }
        return res;
    }
};
```

更稳妥的做法

```c++
class Solution {
public:
    using LL = long long;
    LL interchangeableRectangles(vector<vector<int>>& rectangles) {
        const int n = rectangles.size();
        unordered_map<LL, int> seen;

        LL ans = 0;
        for (const auto &r : rectangles) {
            int w = r[0], h = r[1];
            const int g = __gcd(r[0], r[1]);

            w /= g; h /= g;
            LL hv = (LL)(w) * 100001 + h;

            ans += seen[hv];
            seen[hv]++;
        }

        return ans;
    }
};
```

### [2002. 两个回文子序列长度的最大乘积](https://leetcode-cn.com/problems/maximum-product-of-the-length-of-two-palindromic-subsequences/)

二进制枚举即可

> 枚举子集

```c++
class Solution {
public:
    const static int N = 13;
    
    string s;
    int n;
    int hash[1 << N];
    
    int get(int st) {
        if (hash[st] != -1)
            return hash[st];
        string t;
        for (int i = 0; i < n; ++ i )
            if (st >> i & 1)
                t.push_back(s[i]);
        int len = t.size();
        for (int i = 0, j = len - 1; i < j; ++ i , -- j )
            if (t[i] != t[j])
                return hash[st] = 0;
        return hash[st] = len;
    }
    
    int maxProduct(string s) {
        this->s = s;
        this->n = s.size();
        
        memset(hash, -1, sizeof hash);
        
        int res = 0;
        
        for (int i = 0; i < 1 << n; ++ i ) {
            // 枚举i的一半 240ms
            int t = i & (i - 1);
            for (int j = t; j; j = (j - 1) & i)
                res = max(res, get(j) * get(i ^ j));
            
            // 枚举全局  时间多一点点 差别不大
            // for (int j = i; j; j = (j - 1) & i)
            //    res = max(res, get(j) * get(i ^ j));
        }
        
        return res;
    }
};
```

显然判断是否回文有较多的重复操作 可以把判断回文放到前面来

```c++
class Solution {
public:
    int maxProduct(string s) {
        const int n = s.size();

        vector<int> st(1 << n);
        for (int mask = 0; mask < (1 << n); mask++) {
            string t;
            for (int i = 0; i < n; i++)
                if ((mask >> i) & 1)
                    t += s[i];

            bool ok = true;
            for (int i = 0, j = t.size() - 1; i < j; i++, j--)
                if (t[i] != t[j]) {
                    ok = false;
                    break;
                }

            st[mask] = ok ? t.size() : 0;
        }

        int ans = 0;
        for (int mask = 0; mask < (1 << n); mask++)
            for (int m1 = mask; m1 > 0; m1 = (m1 - 1) & mask) {
                int m2 = mask ^ m1;
                ans = max(ans, st[m1] * st[m2]);
            }

        return ans;
    }
};
```

### [2003. 每棵子树内缺失的最小基因值](https://leetcode-cn.com/problems/smallest-missing-genetic-value-in-each-subtree/) [TAG]

#### 启发式合并 通用做法 【重复做增强熟练度】

1. 递归遍历，每次通过启发式合并每个节点下所有子树节点，启发式合并也是按 size 合并，即小的 size 暴力合并到大的 size 上。
2. 对于每个节点，其答案不会小于所有子树答案的最大值，且不会超过以当前节点子树的大小加 1，此时可以暴力从最大值开始枚举答案，判断是否为第一个缺失的值。最后枚举的次数累加起来最多为 nn 次。
3. 启发式合并的算法**无需基因值互不相同**，更加通用。

```c++
class Solution {
private:
    vector<int> ans;
    vector<vector<int>> graph;
    vector<int> f;
    vector<unordered_set<int>> seen;  // set

    void merge(int x, int y) {
        int fx = f[x], fy = f[y];
        if (seen[fx].size() < seen[fy].size()) {
            for (int num : seen[fx])
                seen[fy].insert(num);
            f[x] = fy;
        } else {
            for (int num : seen[fy])
                seen[fx].insert(num);
            f[y] = fx;
        }
    }

    void dfs(int u) {
        int mex = 1;
        for (int v : graph[u]) {
            dfs(v);
            merge(u, v);
            mex = max(mex, ans[v]);
        }

        int fu = f[u];
        while (seen[fu].find(mex) != seen[fu].end())
            mex++;

        ans[u] = mex;
    }

public:
    vector<int> smallestMissingValueSubtree(vector<int>& parents, vector<int>& nums) {
        const int n = parents.size();
        graph.resize(n);
        for (int i = 1; i < n; i++)
            graph[parents[i]].push_back(i);

        f.resize(n);
        seen.resize(n);
        for (int i = 0; i < n; i++) {
            f[i] = i;
            seen[i].insert(nums[i]);
        }

        ans.resize(n);
        dfs(0);
        return ans;
    }
};
```




#### 遍历找1 并不通用也很丑陋的做法

1. 由于基因值互不相同，所以可以首先找到基因值为 1 的节点，确定当前节点到根节点的一条链，记为 ancestors（按顺序由底到根）。非链上的节点的答案显然都为 1。

2. 求出每个节点，其祖先节点第一次到达链的节点，记为 belong(i)。

3. 开始遍历 ancestors，并从 2 开始枚举值。
    
    - 对于当前值 m，如果没有对应的节点，则直接将尚未遍历的 ancestors 链中的节点的答案都置为 m，然后结束。
    
    - 如果有对应的节点，找到其 belong 值 target。
      - 如果 target 没有被遍历过，则从之前遍历到的位置开始遍历 ancestor 直到 target，并将遍历过程中的节点答案置为 mm。
      -  如果 target 已经被遍历过，则无需操作。
    
    - 如果 ancestors 已经被遍历完了，则结束。

```c++
class Solution {
private:
    vector<int> ans;
    vector<vector<int>> graph;
    vector<int> belong;

    void mark(int u, int banned, int ancestor) {
        belong[u] = ancestor;

        for (int v : graph[u])
            if (v != banned)
                mark(v, banned, ancestor);
    }

public:
    vector<int> smallestMissingValueSubtree(vector<int>& parents, vector<int>& nums) {
        const int n = parents.size();
        graph.resize(n);
        for (int i = 1; i < n; i++)
            graph[parents[i]].push_back(i);

        vector<int> h(n + 2, -1);
        for (int i = 0; i < n; i++)
            if (nums[i] <= n)
                h[nums[i]] = i;

        ans.resize(n, 1);
        vector<int> ancestors;

        int p = h[1];
        while (p != -1) {
            ancestors.push_back(p);
            ans[p] = 0;
            p = parents[p];
        }

        belong.resize(n);
        for (int i = ancestors.size() - 1; i >= 0; i--)
            mark(ancestors[i], i == 0 ? -1 : ancestors[i - 1], ancestors[i]);

        for (int m = 2, i = 0; i < ancestors.size(); m++) {
            int target = -1;
            if (h[m] != -1)
                target = belong[h[m]];

            if (target != -1 && ans[target] > 0)
                continue;

            while (i < ancestors.size() && ancestors[i] != target) {
                ans[ancestors[i]] = m;
                i++;
            }
        }

        return ans;
    }
};
```



#### TLE bitset

自己 `bitset` TLE...

```c++
// TLE 51 / 67
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int h[N], e[N], ne[N], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int n;
    vector<int> w, res;
    vector<bitset<N>> f; // ...不会初始化 vector<bitset<N>>
    
    void dfs(int u) {
        f[u].set();
        f[u].set(w[u], 0);
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            dfs(j);
            f[u] &= f[j];
        }
        res[u] = f[u]._Find_next(0);
        // cout << " u = " << u << " f[u] = " << f[u] << " res[u] = " << res[u] <<  endl;
    }
    
    vector<int> smallestMissingValueSubtree(vector<int>& parents, vector<int>& nums) {
        init();
        this->w = nums;
        this->n = parents.size();
        this->res = vector<int>(n);
        this->f = vector<bitset<N>>(n);
        
        for (int i = 0; i < n; ++ i )
            if (parents[i] != -1)
                add(parents[i], i);
        
        dfs(0);
        
        return res;
    }
};
```