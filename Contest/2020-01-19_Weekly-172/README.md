## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-172/)


### [1323. 6 和 9 组成的最大数字](https://leetcode-cn.com/problems/maximum-69-number/)

找到一个数字改成9即可

```c++
    int maximum69Number (int num) {
        string s = to_string(num);
        int n = s.size();
        for(int i = 0; i < n; ++i) {
            if(s[i] == '6') {
                s[i] = '9';
                break;
            }
        }
        return stoi(s);
    }
```


### [1324. 竖直打印单词](https://leetcode-cn.com/problems/print-words-vertically/)

需要注意的是 每一行都要去除末尾空格（WA了一发

```c++
    vector<string> printVertically(string s) {
        stringstream ss(s);
        vector<string> t;
        string ts;
        int maxl = 0, tsl;
        while(ss >> ts) {
            maxl = max(maxl, (int)ts.size());
            t.push_back(ts);
        }
        tsl = t.size();
        
        vector<string> res(maxl);
        for(int i = 0; i < maxl; ++i) {
            for(int j = 0; j < tsl; ++j) {
                if(t[j].size() <= i) res[i].push_back(' ');
                else res[i].push_back(t[j][i]);
            }
            while(res[i].back() == ' ') res[i].pop_back();
        }
        return res;
    }
```

### [1325. 删除给定值的叶子节点](https://leetcode-cn.com/problems/delete-leaves-with-a-given-value/)

递归即可

```c++
    // 
    void dfs(TreeNode* r, int t, TreeNode* p, bool l) {
        if(!r) return;
        dfs(r->left, t, r, true);
        dfs(r->right, t, r, false);
        if(!r->left && !r->right && r->val == t) {
            l ? p->left = nullptr : p->right = nullptr;
        }
    }
    TreeNode* removeLeafNodes(TreeNode* root, int target) {
        if(!root) return nullptr;
        dfs(root->left, target, root, true);
        dfs(root->right, target, root, false);
        if(!root->left && !root->right && root->val == target) return nullptr;
        return root;
    }
```

优化：

```c++
    TreeNode* removeLeafNodes(TreeNode* root, int target) {
        if (root->left) root->left = removeLeafNodes(root->left, target);
        if (root->right) root->right = removeLeafNodes(root->right, target);
        if (!root->left && !root->right && root->val == target) return nullptr;	//这样写是根不空 否则需要加个check: !root
        return root;
    }
```



### [1326. 灌溉花园的最少水龙头数目](https://leetcode-cn.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/) [TAG]

下面做法超时 34/35个测试用例 ` [输入10000] `

这种显然在每个区间都很短的情况下很慢 比如超时的用例 [0,1,....1,1,1,0,...]

```c++
    // 贪心 优先右边界大 右边界相同左边界越小越好 （这个位置本身范围为0的水龙头不可用
    int minTaps(int n, vector<int>& ranges) {
        vector<pair<int, int>> v;           // 需要排序 直接用pair<r, 0-l> 
        for(int i = 0; i <= n; ++i) {
            if(!ranges[i]) continue;        // 跳过0
            //cout <<"i="<<i<<" l="<<ranges[i]-i<<" r="<<ranges[i]+i<<endl;
            v.push_back({min(ranges[i]+i, n), ranges[i]-i});
        }
        sort(v.begin(), v.end());
        // 随后从后向前
        int p = v.size()-1, mx = n, res = 0;
        while(p >= 0) {
            ++res;
            int nmx = mx;
            // 从 r >= mx 的选出最靠左的一个来用
            while(p >= 0 && v[p].first >= mx) {
                nmx = min(nmx, -v[p].second);
                --p;
            }
            if(p < 0) {
                if(nmx <= 0) return res;
                else return -1;
            }
            //cout <<mx<<" get nmx="<<nmx<<endl;
            mx = nmx;
            if(mx <= 0) return res;
        }
        return -1;
    }
```

[更优的思想](https://leetcode-cn.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/solution/5318-by-ikaruga/)：

```c++
    // 考虑：每一个range都很大的情况【当然这道题限定了ranges<=100】 复杂度不会高于 n*100 = 1e6
    int minTaps(int n, vector<int>& ranges) {
        vector<int> v(n+1);
        for(int i = 0; i <= n; ++i) {
            if(!ranges[i]) continue;        // 跳过0
            int l = max(0, i-ranges[i]), r = min(n, i+ranges[i]);
            while(l < r && v[l] < r) v[l++] = r;
        }
        //for(auto vv : v) cout <<vv<<endl;
        int res = 0;
        int cur = 0;
        while(cur < n) {
            if(!v[cur]) return -1;
            cur = v[cur];
            ++res;
        }
        return res;
    }
```

动态规划：

```c++
    int minTaps(int n, vector<int>& ranges) {
        ++n;
        const int INF = 1e9;
        vector<int> f(n+1, INF);
        f[0] = 0;
        vector<vector<int>> v(n);
        for(int i = 0; i < n; ++i) {
            if(!ranges[i]) continue;
            int l = max(0, i-ranges[i]), r = min(n-1, i+ranges[i]);
            v[r-1].push_back(l);
        }
        for(int i = 0; i < n-1; ++i)
            for(auto j : v[i])
                for(int k = j; k <= i; ++k)
                    f[i+1] = min(f[i+1], f[k]+1);
        return f[n-1] >= INF ? -1 : f[n-1];
    }
```



本题限制 ` ranges[i] <= 100 `  