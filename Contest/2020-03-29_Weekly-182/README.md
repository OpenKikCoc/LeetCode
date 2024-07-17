## [比赛链接](https://leetcode.cn/contest/weekly-contest-182/)


### [1394. 找出数组中的幸运数](https://leetcode.cn/problems/find-lucky-integer-in-an-array/)

一个整数的出现频次和它的数值大小相等，称这个整数为「幸运数」

如果数组中存在多个幸运数，只需返回 最大 的那个。

```c++
class Solution {
public:
    int findLucky(vector<int>& arr) {
        unordered_map<int, int> m;
        for(auto v : arr) {
            ++m[v];
        }
        int res = -1;
        for(auto v : m) {
            if(v.first == v.second) {
                if(v.first > res) res = v.first;
            }
        }
        return res;
    }
};
```


### [1395. 统计作战单位数](https://leetcode.cn/problems/count-number-of-teams/)

一排n个rating 升序/降序3个可以成为一组单位 求可以组建的单位数量

暴力 以及dp

```c++
class Solution {
public:
    int numTeams(vector<int>& rating) {
        int n = rating.size();
        int res = 0;
        for(int i = 0; i < n; ++i) {
            for(int j = i+1; j < n; ++j) {
                for(int k = j+1; k < n; ++k) {
                    if(rating[i] < rating[j] && rating[j] < rating[k]) {
                        //cout <<i<<j<<k<<endl;
                        ++res;
                    }
                    if(rating[i] > rating[j] && rating[j] > rating[k]) {
                        //cout <<i<<j<<k<<endl;
                        ++res;
                    }
                }
            }
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    int numTeams(vector<int>& rating) {
        int n = rating.size();
        int res = 0;
        vector<int> dp1(n+1),dp2(n+1);
        for(int i = 1; i < n; ++i) {
            // skip i = 0
            for(int j = 0; j < i; ++j) {
                if(rating[j] < rating[i]) {
                    ++dp1[i];
                    if(dp1[j]) {
                        res += dp1[j];
                    }
                }
                if(rating[j] > rating[i]) {
                    ++dp2[i];
                    if(dp2[j]) {
                        res += dp2[j];
                    }
                }
            }
        }
        return res;
    }
};
```



### [1396. 设计地铁系统](https://leetcode.cn/problems/design-underground-system/)

主要是建模

```c++
class UndergroundSystem {
    unordered_map<int, pair<string, int>> checkRecord;
    unordered_map<string, pair<double, int>> count;    
    string getStationName(string startStation, string endStation) {
        return startStation + "," + endStation;
    }

public:
    UndergroundSystem() {
    }
    
    void checkIn(int id, string stationName, int t) {
        checkRecord[id] = {stationName, t};
    }
    
    void checkOut(int id, string stationName, int t) {
        string name = getStationName(checkRecord[id].first, stationName);
        t -= checkRecord[id].second;
        count[name].first += (double)t;
        count[name].second += 1;
    }
    
    double getAverageTime(string startStation, string endStation) {
        string name = getStationName(startStation, endStation);
        double ans = count[name].first / (double)count[name].second;
        return ans;
    }
};

```

### [1397. 找到所有好字符串](https://leetcode.cn/problems/find-all-good-strings/) [TAG]

数位dp

```c++
class Solution {
public:
    const static int MOD = 1e9 + 7;

    vector<int> get_next(string & s) {
        int m = s.size();
        vector<int> nxt(m + 1);
        nxt[0] = nxt[1] = 0;
        for (int i = 1; i < m; ++ i ) {
            int j = nxt[i];
            while (j && s[j] != s[i])
                j = nxt[j];
            if (s[j] == s[i])
                nxt[i + 1] = j + 1;
            else
                nxt[i + 1] = 0;
        }
        return nxt;
    }

    int n, m;
    vector<vector<int>> g, f;

    int calc(string & s, int flag) {
        int ret = 0, cur = 0;
        for (int i = 0; i < n; ++ i ) {
            int x = s[i] - 'a';
            for (int c = 0; c < x; ++ c )
                ret = (ret + f[n - i - 1][g[cur][c]]) % MOD;
            cur = g[cur][x];    // ATTENTION
            if (cur == m)
                break;
            if (i == n - 1 && flag && cur != m)
                ret = (ret + 1) % MOD;
        }
        return ret;
    }

    int findGoodStrings(int n, string s1, string s2, string evil) {
        this->n = n, this->m = evil.size();

        auto next = get_next(evil);

        // ATTENTION
        this->g = vector<vector<int>>(m + 1, vector<int>(26));
        for (int i = 0; i < m; ++ i )
            for (int c = 0; c < 26; ++ c ) {
                int j = i;
                while (j && evil[j] != 'a' + c)
                    j = next[j];
                if (evil[j] == 'a' + c)
                    g[i][c] = j + 1;
                else
                    g[i][c] = 0;
            }
        
        // 数位 dp 的预处理
        this->f = vector<vector<int>>(n + 1, vector<int>(m + 1));
        for (int j = 0; j < m; ++ j )
            f[0][j] = 1;
        for (int i = 1; i <= n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                f[i][j] = 0;
                for (int c = 0; c < 26; ++ c )
                    f[i][j] = (f[i][j] + f[i - 1][g[j][c]]) % MOD;
            }
        
        return (calc(s2, 1) - calc(s1, 0) + MOD) % MOD;
    }
};
```
