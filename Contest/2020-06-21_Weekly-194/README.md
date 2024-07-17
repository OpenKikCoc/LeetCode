## [比赛链接](https://leetcode.cn/contest/weekly-contest-194/)


### [1486. 数组异或操作](https://leetcode.cn/problems/xor-operation-in-an-array/)

略

```c++
    int xorOperation(int n, int start) {
        int res = 0;
        for(int i = 0; i < n; ++i) res ^= start + 2*i;
        return res;
    }
```


### [1487. 保证文件名唯一](https://leetcode.cn/problems/making-file-names-unique/)

略

```c++
    unordered_map<string, int> c;
    vector<string> getFolderNames(vector<string>& names) {
        vector<string> res;
        for(auto str : names) {
            if(!c[str]) {
                res.push_back(str);
                ++c[str];
            } else {
                string nstr = str + "(" + to_string(c[str]++) + ")";
                while(c[nstr]) {
                    nstr = str + "(" + to_string(c[str]++) + ")";
                }
                res.push_back(nstr);
                ++c[nstr];
            }
        }
        return res;
    }
```

### [1488. 避免洪水泛滥](https://leetcode.cn/problems/avoid-flood-in-the-city/)

贪心 写法思路完全正确 vector二分查找超时

```c++
// 最后一个用例超时
    unordered_map<int, int> m;  // 某一个湖泊 上一次下雨的下标（是哪一天） 无数个湖泊所以用map
    vector<int> avoidFlood(vector<int>& rains) {
        int n = rains.size();
        // 没下雨的天下标
        vector<int> zero;
        vector<int> res;
        for(int i = 0; i < n; ++i) {
            if(rains[i]) {
                if(m[rains[i]]) {
                    auto it = lower_bound(zero.begin(), zero.end(), m[rains[i]]);
                    if(it == zero.end()) return vector<int>{};
                    else {
                        res[*it-1] = rains[i];
                        zero.erase(it);
                    }
                }
                m[rains[i]] = i+1;
                res.push_back(-1);
            } else {
                // rains[i] == 0
                zero.push_back(i+1);
                res.push_back(0);   // 默认什么都不动
            }
        }
        for(int i = 0; i < n; ++i) {
            if(!res[i]) res[i] = 1;
        }
        return res;
    }
```

*woc。。。*数组改成set就过了

【**TAG**】这种记录下来需要二分的用set

```c++
    unordered_map<int, int> m;  // 某一个湖泊 上一次下雨的下标（是哪一天） 无数个湖泊所以用map
    vector<int> avoidFlood(vector<int>& rains) {
        int n = rains.size();
        // 没下雨的天下标
        set<int> zero;
        //vector<int> res(n,1);
        vector<int> res;
        for(int i = 0; i < n; ++i) {
            if(rains[i]) {
                if(m[rains[i]]) {
                    auto it = zero.lower_bound(m[rains[i]]);
                    if(it == zero.end()) return vector<int>{};
                    else {
                        res[*it-1] = rains[i];
                        zero.erase(it);
                    }
                }
                m[rains[i]] = i+1;
                //res[i] = -1;
                res.push_back(-1);
            } else {
                // rains[i] == 0
                zero.insert(i+1);
                res.push_back(1);
            }
        }
        return res;
    }
```





### [1489. 找到最小生成树里的关键边和伪关键边](https://leetcode.cn/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/)

Kruskal 检查选边不选边得到的mst即可

```c++
    int fa[105];
    int find(int x) {
        return x == fa[x] ? x : fa[x] = find(fa[x]);
    }
    bool merge(int x, int y) {
        int u = find(x), v = find(y);
        if(u == v) return false;
        fa[u] = v;
        return true;
    }

    int n, m;
    pair<int, pair<int, int>> p[205], pp[205];
    int kruskal(int x) {
        for(int i = 0; i < n; ++i) fa[i] = i;
        int cnt = 0, cost = 0, tot = 0;
        for(int i = 0; i < m; ++i) {
            if(i != x) p[tot++] = pp[i];
        }
        sort(p, p + tot);
        for(int i = 0; i < tot; ++i) if(merge(p[i].second.first, p[i].second.second)) ++cnt, cost += p[i].first;
        return cnt == n-1 ? cost : INT_MAX;
    }
    int kruskal2(int x) {
        for(int i = 0; i < n; ++i) fa[i] = i;
        int cnt = 0, cost = 0, tot = 0;
        for(int i = 0; i < m; ++i) {
            if(i != x) p[tot++] = pp[i];
            else merge(pp[i].second.first, pp[i].second.second), ++cnt, cost += pp[i].first;
        }
        sort(p, p + tot);
        for(int i = 0; i < tot; ++i) if(merge(p[i].second.first, p[i].second.second)) ++cnt, cost += p[i].first;
        return cnt == n-1 ? cost : INT_MAX;
    }
    vector<vector<int>> findCriticalAndPseudoCriticalEdges(int n, vector<vector<int>>& edges) {
        vector<int> key, nkey;
        this->n = n;
        m = edges.size();
        for(int i = 0; i < m; ++i) {
            pp[i].first = edges[i][2];
            pp[i].second.first = edges[i][0], pp[i].second.second = edges[i][1];
        }
        int mint = kruskal(-1);
        for(int i = 0; i < m; ++i) {
            if(kruskal(i) != mint) key.push_back(i);
            else if(kruskal2(i) == mint) nkey.push_back(i);
        }
        vector<vector<int>> res;
        res.push_back(key);
        res.push_back(nkey);
        return res;
    }
```

代码简化一下：

```c++
    int fa[105];
    int find(int x) {
        return x == fa[x] ? x : fa[x] = find(fa[x]);
    }
    bool merge(int x, int y) {
        int u = find(x), v = find(y);
        if(u == v) return false;
        fa[u] = v;
        return true;
    }

    int n, m;
    pair<int, pair<int, int>> p[205], pp[205];
    int kruskal(int x, bool choose) {
        for(int i = 0; i < n; ++i) fa[i] = i;
        int cnt = 0, cost = 0, tot = 0;
        for(int i = 0; i < m; ++i) {
            if(i != x) p[tot++] = pp[i];
            else if(choose) merge(pp[i].second.first, pp[i].second.second), ++cnt, cost += pp[i].first;
        }
        sort(p, p + tot);
        for(int i = 0; i < tot; ++i) if(merge(p[i].second.first, p[i].second.second)) ++cnt, cost += p[i].first;
        return cnt == n-1 ? cost : INT_MAX;
    }
    vector<vector<int>> findCriticalAndPseudoCriticalEdges(int n, vector<vector<int>>& edges) {
        vector<int> key, nkey;
        this->n = n;
        m = edges.size();
        for(int i = 0; i < m; ++i) {
            pp[i].first = edges[i][2];
            pp[i].second.first = edges[i][0], pp[i].second.second = edges[i][1];
        }
        int mint = kruskal(-1, false);
        for(int i = 0; i < m; ++i) {
            if(kruskal(i, false) != mint) key.push_back(i);
            else if(kruskal(i, true) == mint) nkey.push_back(i);
        }
        vector<vector<int>> res;
        res.push_back(key);
        res.push_back(nkey);
        return res;
    }
```

