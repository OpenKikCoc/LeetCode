## [比赛链接](https://leetcode.cn/contest/biweekly-contest-17/)


### [1313. 解压缩编码列表](https://leetcode.cn/problems/decompress-run-length-encoded-list/)

略

```c++
    vector<int> decompressRLElist(vector<int>& nums) {
        int n = nums.size();
        vector<int> res;
        for(int i = 0; i < n; i += 2) {
            int freq = nums[i], val = nums[i+1];
            for(int j = 0; j < freq; ++j) res.push_back(val);
        }
        return res;
    }
```


### [1314. 矩阵区域和](https://leetcode.cn/problems/matrix-block-sum/)

前缀和思想 略

```c++
    // 对于每一个i j  它右下角是 min(i+k, m) min(j+k, n)
    // 减去这两个 min(i+k, m) max(j-k, 0)         max(i-k, 0) min(j+k, n)
    // 加上 max(i-k, 0) max(j-k, 0)
    vector<vector<int>> matrixBlockSum(vector<vector<int>>& mat, int K) {
        int m = mat.size(), n = mat[0].size();
        vector<vector<int>> sum(m+1, vector<int>(n+1));
        for(int i = 1; i <= m; ++i)
            for(int j = 1; j <= n; ++j)
                sum[i][j] = sum[i][j-1] + sum[i-1][j] - sum[i-1][j-1] + mat[i-1][j-1];
        vector<vector<int>> res(m, vector<int>(n));
        for(int i = 1; i <= m; ++i) {
            int u = max(i-K, 1), d = min(i+K, m);
            for(int j = 1; j <= n; ++j) {
                int l = max(j-K, 1), r = min(j+K, n);
                res[i-1][j-1] = sum[d][r] - sum[d][l-1] - sum[u-1][r] + sum[u-1][l-1];
            }
        }
        return res;
    }
```

### [1315. 祖父节点值为偶数的节点和](https://leetcode.cn/problems/sum-of-nodes-with-even-valued-grandparent/) [TAG]

直接记录父节点和祖父节点的值 对于root其父和祖父均为**任意奇数**（这里使用-1）

```c++
    int res;
    void dfs(TreeNode* r, int f, int ff){
        if(ff%2 == 0) res += r->val;
        if(r->left) dfs(r->left, r->val, f);
        if(r->right) dfs(r->right, r->val, f);
    }
    int sumEvenGrandparent(TreeNode* root) {
        dfs(root, -1, -1);
        return res;
    }
```

### [1316. 不同的循环子字符串](https://leetcode.cn/problems/distinct-echo-substrings/) [TAG]

暴力 字符串hash

```c++
    // 每一个字符串如果可以找到两个不重合的相同子串
    // 暴力
    int distinctEchoSubstrings(string text) {
        unordered_set<string> res;
        const char* t = text.c_str();
        for(int i = 0; i < text.size(); ++i) {
            for(int j = 1; i+j*2 <= text.size(); ++j) {
                if(memcmp(t+i, t+i+j, j) == 0) res.insert(text.substr(i, j));
            }
        }
        return res.size();
    }
```

字符串hash **[TAG]**

```c++
    using ll = long long;
    int distinctEchoSubstrings(string text) {
        int n = text.size();
        const ll mod = 1e9+7, B = 31;
        // 计算hash
        vector<ll> h(n+1);
        for(int i = 0; i < n; ++i) h[i+1] = (h[i]*B+text[i])%mod;
        vector<ll> p(n+1);
        p[0] = 1;
        for(int i = 1; i <= n; ++i) p[i] = p[i-1]*B%mod;
        auto get = [&](int x, int y) {
            return (h[y]-h[x-1]*p[y-x+1]%mod+mod)%mod;
        };
        unordered_set<ll> H;
        for(int i = 1; i <= n; ++i) {
            for(int j = i+1; j <= n; j += 2) {
                int len = (j-i+1)/2;
                int k = i+len-1;
                ll h1 = get(i, k), h2 = get(k+1, j);
                if(h1 == h2) H.insert(h1);
            }
        }
        return H.size();
    }
```

