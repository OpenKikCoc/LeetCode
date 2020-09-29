## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-13/)


### [1256. 加密数字](https://leetcode-cn.com/problems/encode-number/)

自己模拟实现如下：

主要是找到该数字所在的段，随后计算 01 值

```c++
    // 0位的数有1个
    // 1       2
    // 2       4
    // 3       8
    string encode(int num) {
        if(!num) return "";
        else if(num == 1) return "0";
        else if(num == 2) return "1";
        int b = 0, c = 1, tot = 1;
        while(num - tot >= c*2) {
            ++b;
            c *= 2;
            tot += c;
        }
        // num 位数为 b+1
        //cout <<"num="<<num<<" b="<<b<<" c="<<c <<" tot="<<tot<<endl;
        int idx = num - tot;
        int p = 1 << b;
        string res;
        while(p) {
            if(p & idx) res.push_back('1');
            else res.push_back('0');
            p >>= 1;
        }
        return res;
    }
```

可以直接找规律：结果就是 `原来的值+1 转换为二进制后去除最高位`

```c++
    string encode(int num) {
        ++num;
        string res;
        while(num) {
            if(num&1) res.push_back('1');
            else res.push_back('0');
            num >>= 1;
        }
        res.pop_back();
        reverse(res.begin(), res.end());
        return res;
    }
```

### [1257. 最小公共区域](https://leetcode-cn.com/problems/smallest-common-region/)

类似 最近公共祖先 的办法

代码有点冗余 随后简化

```c++
    unordered_map<string, vector<string>> mp;
    unordered_map<string, bool> in;
    string dfs(string& t, string& s1, string& s2) {
        if(t == s1 || t == s2) return t;
        if(mp[t].empty()) return "";
        string res;
        int cnt = 0;
        for(auto& s : mp[t]) {
            string ret = dfs(s, s1, s2);
            if(ret != "") res = ret, ++cnt;
        }
        if(cnt == 1) return res;
        else if(cnt == 2) return t;
        return "";
    }
    string findSmallestRegion(vector<vector<string>>& regions, string region1, string region2) {
        vector<string> out;
        for(auto& regs : regions) {
            int sz = regs.size();
            out.push_back(regs[0]);
            for(int i = 1; i < sz; ++i) {
                mp[regs[0]].push_back(regs[i]);
                in[regs[i]] = true;
            }
        }
        vector<string> ve;
        for(auto t : out) if(in[t] == false) ve.push_back(t);
        //cout << "ve.size=" << ve.size() << " t="<<ve[0]<<endl;
        string res;
        for(auto& t : ve) {
            res = dfs(t, region1, region2);
            if(res != "") return res;
        }
        return res;
    }
```

题解区也有从一个点逐个向上并统计set的做法 略

### [1258. 近义词句子](https://leetcode-cn.com/problems/synonymous-sentences/)

并查集建图+搜索回溯即可

```c++
    unordered_map<string, string> fa;
    string find(string& x) {
        if(x == fa[x]) return x;
        return fa[x] = find(fa[x]);
    }
    void merge(string& s1, string& s2) {
        string f1 = find(s1), f2 = find(s2);
        if(f1 != f2) {
            fa[f1] = f2;
        }
    }

    vector<vector<string>> ve;
    vector<string> t;
    vector<string> res;
    int n;
    void dfs(int pos) {
        if(pos == n) {
            string s;
            for(int i = 0; i < n; ++i) {
                if(i) s.push_back(' ');
                s += t[i];
            }
            res.push_back(s);
            return;
        }
        for(auto& s : ve[pos]) {
            t.push_back(s);
            dfs(pos+1);
            t.pop_back();
        }
    }

    vector<string> generateSentences(vector<vector<string>>& synonyms, string text) {
        for(auto& sy : synonyms) fa[sy[0]] = sy[0], fa[sy[1]] = sy[1];
        for(auto& sy : synonyms) merge(sy[0], sy[1]);
        for(auto& sy : synonyms) find(sy[0]), find(sy[1]);
        stringstream in(text);
        string w;
        while(in >> w) {
            vector<string> t;
            string f = find(w);
            //cout << "w="<<w<<" find="<<f<<endl;
            if(f != "") {
                for(auto& [k, v] : fa) if(v == f) t.push_back(k);
                sort(t.begin(), t.end());
            } else t.push_back(w);
            ve.push_back(t);
        }
        n = ve.size();
        dfs(0);
        return res;
    }
```

### [1259. 不相交的握手](https://leetcode-cn.com/problems/handshakes-that-dont-cross/) [TAG]

划分

> dp[n]= j=1∑n/2 dp[2\*j−2]\*dp[n−2\*j]

```c++
    const int mod = 1e9+7;
    int numberOfWays(int num_people) {
        int n = num_people;
        vector<long long> f(n+1, 1);
        for(int i = 2; i <= n; i += 2) {
            f[i] = 0;
            for(int j = 1; j < i; j += 2) f[i] = (f[i]+f[j-1]*f[i-j-1]%mod)%mod;
        }
        return f[n];
    }
```

```c++
    const int mod = 1e9+7;
    int numberOfWays(int num_people) {
        int n = num_people;
        vector<long long> f(n+1);
        f[0] = 1;
        // i 个人的情况
        // 第n个人与第j个相连
        for(int i = 2; i <= n; i += 2)
            // f[i] = 0;
            for(int j = 1; j < i; j += 2)
                f[i] += f[j-1]*f[i-j-1]%mod, f[i] %= mod;
        return f[n];
    }
```
