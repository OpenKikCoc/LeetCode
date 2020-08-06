## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-198/) 微软专场


### [1518. 换酒问题](https://leetcode-cn.com/problems/water-bottles/)

略

```c++
    int numWaterBottles(int numBottles, int numExchange) {
        int res = numBottles;
        while(numBottles >= numExchange) {
            res += numBottles/numExchange;
            numBottles = numBottles / numExchange + numBottles % numExchange;
        }
        return res;
    }
```


### [1519. 子树中标签相同的节点数](https://leetcode-cn.com/problems/number-of-nodes-in-the-sub-tree-with-the-same-label/)

树DP 略

```c++
    vector<int> countSubTrees(int n, vector<vector<int>>& edges, string labels) {
        vector<vector<int>> es(n);
        for(auto e : edges) {
            es[e[0]].push_back(e[1]);
            es[e[1]].push_back(e[0]);
        }
        vector<vector<int>> cc(n, vector<int>(26));
        vector<int> res(n);
        function<void(int,int)> dfs = [&](int x, int fa) {
            ++cc[x][labels[x]-'a'];
            for(auto y : es[x]) {
                if(y == fa) continue;
                dfs(y, x);
                for(int i = 0; i < 26; ++i) cc[x][i] += cc[y][i];
            }
            res[x] = cc[x][labels[x]-'a'];
        };
        dfs(0, -1);
        return res;
    }
```

### [1520. 最多的不重叠子字符串](https://leetcode-cn.com/problems/maximum-number-of-non-overlapping-substrings/) [TAG]

> 给你一个只包含小写字母的字符串 s ，你需要找到 s 中最多数目的非空子字符串，满足如下条件：
>
> 1. 这些字符串之间互不重叠，也就是说对于任意两个子字符串 s[i..j] 和 s[k..l] ，要么 j < k 要么 i > l 。
> 2. 如果一个子字符串包含字符 c ，那么 s 中所有 c 字符都应该在这个子字符串中。

贪心

先获取满足条件2的所有子串，再依据条件1调整子串列表，随后按照子串长度贪心旋转即可

```c++
    vector<string> maxNumOfSubstrings(string s) {
        int n = s.size(), inf = 1e9;
        vector<vector<int>> pos(26);
        vector<int> l(26, inf), r(26, -inf);
        for(int i = 0; i < n; ++i) {
            int v = s[i] - 'a';
            pos[v].push_back(i);
            l[v] = min(l[v], i);
            r[v] = max(r[v], i);
        }
        // 扩边界
        vector<pair<int,int>> H;
        for(int i = 0; i < 26; ++i) if(l[i] != inf) {
            int nl = l[i], nr = r[i];
            // XXXXX for(int j = l[i]+1; j < r[i]; ++j) { 思考 应该是下面这样
            for(int j = l[i]+1; j < nr; ++j) {
                int v = s[j] - 'a';
                if(l[v] >= nl && r[v] <= nr) continue;
                nl = min(nl, l[v]);
                nr = max(nr, r[v]);
                j = nl; // 前面 continue确保此处一定会更新
            }
            H.push_back({nl, nr});
        }
        // 排序
        sort(H.begin(), H.end(), [&](const pair<int, int>& p1, const pair<int, int>& p2){
            return p1.second - p1.first < p2.second - p2.first;
        });
        vector<string> res;
        // 排除内包含
        vector<bool> vis(H.size());
        for(int i = 0; i < H.size(); ++i) {
            if(vis[i]) continue;
            auto [x, y] = H[i];
            for(int j = 0; j < H.size(); ++j) {
                auto [lj, rj] = H[j];
                if(lj <= x && y <= rj) vis[j] = true;
            }
            res.push_back(s.substr(x, y-x+1));
        }
        return res;
    }
```

### [1521. 找到最接近目标值的函数值](https://leetcode-cn.com/problems/find-a-value-of-a-mysterious-function-closest-to-target/) [TAG]

可以部分参考 [898. 子数组按位或操作](https://leetcode-cn.com/problems/bitwise-ors-of-subarrays/) 

** 1 动态维护 **

[题解]()

```c++
    int closestToTarget(vector<int>& arr, int target) {
        int res = abs(arr[0] - target);
        vector<int> valid = {arr[0]};
        for(int v : arr) {
            vector<int> validNew = {v};
            res = min(res, abs(v-target));
            for(int pv : valid) {
                validNew.push_back(pv&v);
                res = min(res, abs((pv&v)-target));
            }
            validNew.erase(unique(validNew.begin(), validNew.end()), validNew.end());
            valid = validNew;
        }
        return res;
    }
```

** 2 模拟退火 **

```c++
    //通过预处理，快速求解arr[L..R]的与值
    int pre[100001][20] = {0};
    
    int get(int L, int R, int target) {
        int val = 0;
        for(int i = 0, bit = 1; i < 20; i++, bit <<= 1) {
            // 如果第 i 个bit 在 [L,R] 中全为 1，那么与值的该bit也必然为 1。
            if(pre[R][i] - pre[L-1][i] == R-L+1) {
                val |= bit;   
            }
        }
        return abs(val-target);
    }
    
    // 用模拟退火求解关于 L 的局部最优解
    int query(int L, int n, int target) {
        int dir[2] = {-1, 1};  // 两个方向
        int step = 1000; // 初始步长
        int now = L; // R 的起始位置
        int best = 100000000; // 局部最优解
        
        while(step > 0) {
            int Lpos = now + step*dir[0];
            if(Lpos < L) {
                Lpos = L;
            }
            int Rpos = now + step*dir[1];
            if(Rpos > n) {
                Rpos = n;
            }
            // 向左右两个方向各走一步，求值
            int ldis = get(L, Lpos, target);
            int rdis = get(L, Rpos, target);
            int pbest = best;
            
            //更新位置及最优解
            if(ldis < best) {
                now = Lpos;
                best = ldis;
            }
            if(rdis < best) {
                now = Rpos;
                best = rdis;
            }
            
            //如果没有找到更优解，那就缩小步长
            if(pbest == best) {
                step /= 2;
            }
        }
        return best;
    }
    
    int closestToTarget(vector<int>& arr, int target) {
        int anw = 100000000;
        
        //统计前 i 个数字中，第 j 个bit 为 1 的数量。
        for(int i = 0; i < arr.size(); i++) {
            for(int j = 0, bit = 1; j < 20; j++, bit <<= 1) {
                pre[i+1][j] = pre[i][j] + ((bit&arr[i]) ? 1 : 0);
            }
        }
        
        for(int i = 1; i <= arr.size(); i++) {
            anw = min(anw, query(i, arr.size(), target));
        }
        
        return anw;
    }
```
