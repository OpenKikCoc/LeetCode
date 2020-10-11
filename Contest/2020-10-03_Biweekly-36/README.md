## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-36/)


### [1603. 设计停车系统](https://leetcode-cn.com/problems/design-parking-system/)

模拟 略

```c++
    int b, m, s;
    ParkingSystem(int big, int medium, int small) {
        b = big, m = medium, s = small;
    }
    
    bool addCar(int carType) {
        if(carType == 1) {
            if(b) {--b; return true;}
            else return false;
        }else if(carType == 2) {
            if(m) {--m; return true;}
            else return false;
        }if(carType == 3) {
            if(s) {--s; return true;}
            else return false;
        }
        return false;
    }
```


### [1604. 警告一小时内使用相同员工卡大于等于三次的人](https://leetcode-cn.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period/)

排序 模拟

```c++
    map<string, vector<string>> mp;
    set<string> s;
    int get(string& ts) {
        return (ts[0]-'0')*600 + (ts[1]-'0')*60 + (ts[3]-'0')*10 + (ts[4]-'0');
    }
    bool check(vector<string>& v) {
        int sz = v.size();
        for(int i = 2; i < sz; ++i) {
            int l = i-2, r = i;
            int lt = get(v[l]), rt = get(v[r]);
            if(rt - lt <= 60) return true;
        }
        return false;
    }
    vector<string> alertNames(vector<string>& keyName, vector<string>& keyTime) {
        int n = keyName.size();
        for(int i = 0; i < n; ++i)
            mp[keyName[i]].push_back(keyTime[i]);
        for(auto& [k, v] : mp) {
            sort(v.begin(), v.end());
            if(check(v)) s.insert(k);
        }
        vector<string> res;
        for(auto& k : s) res.push_back(k);
        return res;
    }
```

处理这类输入有更好的办法 `sscanf`

```c++
    vector<string> alertNames(vector<string>& a, vector<string>& b) {
        int n = a.size();
        map<string, vector<int> > mp;
        for(int i = 0; i < n; i++) {
            int x, y;
            sscanf(b[i].c_str(), "%d:%d", &x, &y);
            mp[a[i]].pb(x * 60 + y);
        }
        set<string> ans;
        for(auto & tmp : mp) {
            sort(all(tmp.se));
            for(int i = 0; i + 2 < (int)tmp.se.size(); i++) {
                if(tmp.se[i + 2] - tmp.se[i] <= 60) {
                    ans.insert(tmp.fi);
                }
            }
        }
        vector<string> res(all(ans));
        return res;
    }
```

### [1605. 给定行和列的和求可行矩阵](https://leetcode-cn.com/problems/find-valid-matrix-given-row-and-column-sums/)

贪心 处理每一行 新的一行是新的子问题

```c++
    vector<vector<int>> restoreMatrix(vector<int>& rowSum, vector<int>& colSum) {
        int m = rowSum.size(), n = colSum.size();
        vector<vector<int>> res(m, vector<int>(n));
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) {
                res[i][j] = min(rowSum[i], colSum[j]);
                rowSum[i] -= res[i][j];
                colSum[j] -= res[i][j];
            }
        return res;
    }
```

### [1606. 找到处理最多请求的服务器](https://leetcode-cn.com/problems/find-servers-that-handled-most-number-of-requests/) [TAG]

核心在**构造待选列表以降低复杂度** 。

遍历每一个 `arrival` ， 数据范围较大不能每次遍历过程都模拟向后寻找。

考虑使用优先队列维护每一个服务器的结束时间，在每一个 `arrival` 到来的处理过程中，先更新之前曾执行任务的服务器列表 `busy` ，如果比当前时间小则加入可用集合 `svr` 。处理结束后，所有 `busy` 中的服务器均在当前处于忙状态。若 `svr` 空则无可用服务器，否则按题意找下标服务器，从 `svr` 清除并加入 `busy` 。

```c++
    vector<int> busiestServers(int k, vector<int>& arrival, vector<int>& load) {
        int n = arrival.size(), mx = 0;
        vector<int> cnt(n);
        set<int> svr;
        for(int i = 0; i < k; ++i) svr.insert(i);
        priority_queue<pair<int,int>> busy;
        for(int i = 0; i < n; ++i) {
            int p = i % k, t = arrival[i], c = load[i];
            while(!busy.empty() && busy.top().first * -1 <= t) {
                svr.insert(busy.top().second);
                busy.pop();
            }
            if(svr.empty()) continue;
            auto it = svr.lower_bound(p);
            if(it == svr.end()) it = svr.begin();
            p = *it;
            svr.erase(p);
            busy.push({-t-c, p});
            
            mx = max(mx, ++cnt[p]);
        }
        vector<int> res;
        for(int i = 0; i < n; ++i) if(cnt[i] == mx) res.push_back(i);
        return res;
    }
```
