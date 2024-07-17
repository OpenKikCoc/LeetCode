## [比赛链接](https://leetcode.cn/contest/weekly-contest-208/)

模拟 200+/3800+

### [5523. 文件夹操作日志搜集器](https://leetcode.cn/problems/crawler-log-folder/)

栈模拟即可

```c++
    int minOperations(vector<string>& logs) {
        stack<string> st;
        for(auto& s : logs) {
            if(s == "./") continue;
            else if(s == "../") {
                if(st.size()) st.pop();
            } else st.push(s);
        }
        return st.size();
    }
```


### [5524. 经营摩天轮的最大利润](https://leetcode.cn/problems/maximum-profit-of-operating-a-centennial-wheel/)

模拟即可

```c++
    int minOperationsMaxProfit(vector<int>& customers, int boardingCost, int runningCost) {
        int res = -1, p = -1, cus = 0, tot = 0;
        int sz = customers.size();
        for(int i = 0; ; ++i) {
            if(i < sz) cus += customers[i];
            int c = min(cus, 4);
            tot += boardingCost*c - runningCost;
            if(tot > res) res = tot, p = i+1;
            cus -= c;
            if(i >= sz && !cus) break;
        }
        return p; 
    }
```

### [5525. 皇位继承顺序](https://leetcode.cn/problems/throne-inheritance/)

显然先序遍历

```c++
    // 先序遍历
    string king;
    unordered_map<string, vector<string>> mp;
    unordered_map<string, bool> dead;
    ThroneInheritance(string kingName) {
        king = kingName;
    }
    
    void birth(string parentName, string childName) {
        mp[parentName].push_back(childName);
    }
    
    void death(string name) {
        dead[name] = true;
    }
    
    void dfs(string& fa, vector<string>& res) {
        if(!dead[fa]) res.push_back(fa);
        for(auto& son : mp[fa]) {
            dfs(son, res);
        }
    }
    
    vector<string> getInheritanceOrder() {
        vector<string> res;
        dfs(king, res);
        return res;
    }
```

### [5526. 最多可达成的换楼请求数目](https://leetcode.cn/problems/maximum-number-of-achievable-transfer-requests/)

数据范围可以暴力枚举

使用状态压缩 遍历所有情况

**注意判断合法的方法仅仅只是 in==out 不需要考虑图以及流**

```c++
    int maximumRequests(int n, vector<vector<int>>& requests) {
        int sz = requests.size();
        int top = 1<<sz, res = 0;
        for(int st = 0; st < top; ++st) {
            int c = 0;
            vector<int> in(n), out(n);
            for(int i = 0; i < sz; ++i) if(st & (1<<i))
                ++out[requests[i][0]], ++in[requests[i][1]], ++c;
            for(int i = 0; i < n; ++i) if(in[i] != out[i]) {c = -1; break;}
            res = max(res, c);
        }
        return res;
    }
```
