## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-14/)


### [1271. 十六进制魔术数字](https://leetcode-cn.com/problems/hexspeak/)

模拟即可

```c++
    string toHexspeak(string num) {
        long long n = 0;
        for(auto c : num) {
            int v = c - '0';
            n *= 10;
            n += v;
        }
        //cout << n << endl;
        string res;
        while(n) {
            int v = n % 16;
            if(v == 0) res.push_back('O');
            else if(v == 1) res.push_back('I');
            else if(v >= 10) res.push_back('A' + (v-10));
            else return "ERROR";
            n /= 16;
        }
        reverse(res.begin(), res.end());
        return res;
    }
```


### [1272. 删除区间](https://leetcode-cn.com/problems/remove-interval/)

模拟 分类讨论即可

```c++
    vector<vector<int>> removeInterval(vector<vector<int>>& intervals, vector<int>& toBeRemoved) {
        int n = intervals.size(), s = toBeRemoved[0], t = toBeRemoved[1];
        vector<vector<int>> res;
        for(auto p : intervals) {
            if(p[1] < s || p[0] > t) {
                res.push_back(p);
            } else if(p[1] <= t && p[0] >= s) {
                continue;
            } else if(p[1] > t && p[0] < s) {
                res.push_back({p[0], s});
                res.push_back({t, p[1]});
            } else if(p[1] <= t) {
                res.push_back({p[0], s});
            } else if(p[0] >= s) {
                res.push_back({t, p[1]});
            }
        }
        sort(res.begin(), res.end());
        return res;
    }
```

### [1273. 删除树节点](https://leetcode-cn.com/problems/delete-tree-nodes/)

搜索即可

```c++
    int cnt = 0;
    void dfs(vector<vector<int>>& son, vector<bool>& vis, int x) {
        if(x == -1) return;
        vis[x] = true;
        ++cnt;
        for(auto y : son[x]) if(!vis[y]) {
            dfs(son, vis, y);
        }
    }
    int deleteTreeNodes(int nodes, vector<int>& parent, vector<int>& value) {
        int n = nodes;
        vector<vector<int>> son(n);
        vector<int> val(n);
        for(int i = 0; i < n; ++i) if(parent[i] != -1) son[parent[i]].push_back(i);
        for(int i = 0; i < n; ++i) {
            val[i] += value[i];
            int fa = parent[i];
            while(fa != -1) {
                val[fa] += value[i];
                fa = parent[fa];
            }
        }
        vector<bool> vis(n);
        for(int i = 0; i < n; ++i) if(!vis[i] && val[i]==0) dfs(son, vis, i);
        return n-cnt;
    }
```

有种更优雅的写法

> 之前有一种：该写法在子树被切掉时影响父节点的忧虑
> 
> 其实不必的，子树被切掉其和必然为0，直接传回 {0, 0} 即可，对父的求和无影响

```c++
    vector<vector<int>> sons;
    vector<int> vals;
    
    pair<int, int> dfs(int x) {
        int size = 1, sum = vals[x];
        for (auto y : sons[x]) {
            auto [sz, val] = dfs(y);
            size += sz, sum += val;
        }
        if (sum == 0) return {0, 0};
        return {size, sum};
    }
    
    int deleteTreeNodes(int nodes, vector<int>& parent, vector<int>& value) {
        sons.clear();
        sons.resize(nodes);
        vals = value;
        for (int i = 0; i < nodes; ++i) {
            if (parent[i] == -1) continue;
            sons[parent[i]].push_back(i);
        }
        int ans = dfs(0).first;
        return ans;
    }
```


### [1274. 矩形内船只的数目](https://leetcode-cn.com/problems/number-of-ships-in-a-rectangle/) [TAG]

二维 分治+四分查找

> 对于当前查找的矩形区域，如果 API 返回 False ，我们得到区域内没有船只，可以舍弃该区域。
>
> 但如果 API 返回 True，我们得到区域内有船只，为了确定船只的位置，我们需要将区域划分成若干个互不相交的小区域，分别调用 API 继续进行查找。
>
> 直到某一次查找的区域为一个点，即满足 topRight == bottomLeft 时，如果 API 返回 True，我们就确定了一艘船只的位置，可以将计数器增加 1。
>
> 在查找完成后，计数器中的值即为船只的数目。

```c++
    int countShips(Sea sea, vector<int> topRight, vector<int> bottomLeft) {
        int x1 = topRight[0], y1 = topRight[1], x2 = bottomLeft[0], y2 = bottomLeft[1];
        if(x1 < x2 || y1 < y2 || !sea.hasShips(topRight, bottomLeft)) return 0;
        if(x1 == x2 && y1 == y2) return 1;
        int mx = (x1+x2)/2, my = (y1+y2)/2;
        return countShips(sea, {mx, my}, {x2, y2}) + \
                countShips(sea, {mx, y1}, {x2, my+1}) + \
                countShips(sea, {x1, my}, {mx+1, y2}) + \
                countShips(sea, {x1, y1}, {mx+1, my+1});
    }
```
