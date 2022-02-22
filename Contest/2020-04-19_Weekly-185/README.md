## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-185/)

### [1417. 重新格式化字符串](https://leetcode-cn.com/problems/reformat-the-string/)

字母数字相隔


```c++
class Solution {
public:
    string reformat(string s) {
        string res;
        int n = s.size();
        if(n<=1) return s;
        string s1,s2;
        for(int i = 0; i < n; ++i) {
            if(s[i] >= '0' && s[i] <= '9') s2.push_back(s[i]);
            else s1.push_back(s[i]);
        }
        if(s1.size() > s2.size() + 1 || s1.size() < s2.size()-1) return res;
        if(s1.size() > s2.size()) {
            for(int i = 0; i < n; ++i) {
                if(i&1) res.push_back(s2[i/2]);
                else res.push_back(s1[i/2]);
            }
        } else {
            for(int i = 0; i < n; ++i) {
                if(i&1) res.push_back(s1[i/2]);
                else res.push_back(s2[i/2]);
            }
        }
        return res;
    }
};
```

### [1418. 点菜展示表](https://leetcode-cn.com/problems/display-table-of-food-orders-in-a-restaurant/)

输出：每个桌 后面每个种类的菜点了几份


```c++
class Solution {
public:
    vector<vector<string>> displayTable(vector<vector<string>>& orders) {
        set<int> table;
        set<string> foods;
        unordered_map<string, int> m, h;
        int odlen = orders.size();
        for(int i = 0; i < odlen; ++i) {
            int t = stoi(orders[i][1]);
            table.insert(t);
            foods.insert(orders[i][2]);
            ++m[string(orders[i][1]+orders[i][2])];
        }
        //for(auto t : table) cout <<t<<endl;
        
        int tableNum = table.size();
        int foodsNum = foods.size();
        vector<vector<string>> res(tableNum+1);
        res[0].push_back("Table");
        for(auto f : foods) {
            res[0].push_back(f);
        }
        int p = 1;
        for(auto t : table) {
            res[p].push_back(to_string(t));
            for(auto f : foods) {
                int cnt = m[string(to_string(t)+f)];
                if(cnt) {
                    res[p].push_back(to_string(cnt));
                } else res[p].push_back("0");
            }
            ++p;
        }
        return res;
    }
};
```

### [1419. 数青蛙](https://leetcode-cn.com/problems/minimum-number-of-frogs-croaking/)

"croak"合法串中 尽可能最少的青蛙的个数


```c++
class Solution {
public:
    int minNumberOfFrogs(string croakOfFrogs) {
        int n = croakOfFrogs.size();
        if(n%5) return -1;
        int res = 0;
        //
        vector<int> hasNum(5, 0);    // 叫了c的 r的 a的 k的 必须时刻有顺序递减 >= 否则不合法
                                    // 合法的情况下 c的数量就是当前最少的 统计c
        for(int i = 0; i < n; ++i) {
            if(croakOfFrogs[i] == 'c') {
                ++hasNum[0];
            } else if(croakOfFrogs[i] == 'r') {
                ++hasNum[1];
            } else if(croakOfFrogs[i] == 'o') {
                ++hasNum[2];
            } else if(croakOfFrogs[i] == 'a') {
                ++hasNum[3];
            } else if(croakOfFrogs[i] == 'k') {
                ++hasNum[4];
            }
            //for(int j = 0; j < 5; ++j) cout <<hasNum[0] <<" "<<hasNum[1] <<" "<<hasNum[2] <<" "<<hasNum[3] <<" "<<hasNum[4]<<endl;
            if(hasNum[0] < hasNum[1] || hasNum[1] < hasNum[2] || hasNum[2] < hasNum[3] || hasNum[3] < hasNum[4]) return -1;
            res = max(res, hasNum[0]);
            if(hasNum[4]) {
                --hasNum[0];
                --hasNum[1];
                --hasNum[2];
                --hasNum[3];
                --hasNum[4];
            }
        }
        if(hasNum[0] || hasNum[1] || hasNum[2] || hasNum[3] || hasNum[4]) return -1;
        return res;
    }
};
```

### [1420. 生成数组](https://leetcode-cn.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons/)

经典前缀和优化


```c++
class Solution {
public:
    using LL = long long;
    const static int N = 55, M = 110, MOD = 1e9 + 7;

    // 有 i 个数，搜索代价为 j ，最大值为 k 的所有方案
    int f[N][N][M];

    int numOfArrays(int n, int m, int _k) {
        if (!_k)
            return 0;
        
        memset(f, 0, sizeof f);
        for (int i = 1; i <= m; ++ i )
            f[1][1][i] = 1;
        
        // i: 数的个数
        for (int i = 2; i <= n; ++ i )
            // j: 搜索代价
            for (int j = 1; j <= _k && j <= i; ++ j ) {
                // 优化
                int sum = 0;

                // k: 最大值
                for (int k = 1; k <= m; ++ k ) {
                    // 1. 最大值出现在前 i - 1 个元素中，则数组末尾的元素可以从 1 到 k 中随便取
                    f[i][j][k] = (LL)f[i - 1][j][k] * k % MOD;
                    // 2. 最大值出现在数组末尾，则此前搜索代价为 j - 1
                    // for (int x = 0; x < k; ++ x )
                    //     f[i][j][k] = ((LL)f[i][j][k] + f[i - 1][j - 1][x]) % MOD;
                    // 优化
                    f[i][j][k] = ((LL)f[i][j][k] + sum) % MOD;
                    sum = (sum + f[i - 1][j - 1][k]) % MOD;
                }
            }
        
        int res = 0;
        for (int i = 1; i <= m; ++ i )
            res = (res + f[n][_k][i]) % MOD;
        return res;
    }
};
```
