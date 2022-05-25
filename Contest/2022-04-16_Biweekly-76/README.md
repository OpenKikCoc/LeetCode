## [比赛链接](https://leetcode.cn/contest/biweekly-contest-76/)

>   134 / 4477


### [2239. 找到最接近 0 的数字](https://leetcode.cn/problems/find-closest-number-to-zero/)

略

```c++
class Solution {
public:
    int findClosestNumber(vector<int>& nums) {
        int res = 1e9, dis = 1e9;
        for (auto x : nums)
            if (abs(x) < dis || abs(x) == dis && x > res)
                res = x, dis = abs(x);
        return res;
    }
};
```


### [2240. 买钢笔和铅笔的方案数](https://leetcode.cn/problems/number-of-ways-to-buy-pens-and-pencils/)

略 枚举即可

```c++
class Solution {
public:
    using LL = long long;
    long long waysToBuyPensPencils(int total, int cost1, int cost2) {
        LL s = total, c1 = cost1, c2 = cost2;
        LL res = 0;
        for (int i = 0; i <= s / c1; ++ i ) {
            LL t = s - c1 * i;
            res += t / c2 + 1;
        }
        return res;
    }
};
```

### [2241. 设计一个 ATM 机器](https://leetcode.cn/problems/design-an-atm-machine/)

加快速度

```c++
class ATM {
public:
    using LL = long long;
    const static int N = 5;
    
    LL c[N], p[N];
    
    ATM() {
        p[0] = 20, p[1] = 50, p[2] = 100, p[3] = 200, p[4] = 500;
        memset(c, 0, sizeof c);
    }
    
    void deposit(vector<int> banknotesCount) {
        for (int i = 0; i < N; ++ i )
            c[i] += banknotesCount[i];
    }
    
    vector<int> withdraw(int amount) {
        vector<int> res(N);
        for (int i = N - 1; i >= 0 && amount > 0; -- i )
            if (c[i]) {
                LL cnt = min(c[i], (LL)amount / p[i]);
                res[i] = cnt, amount -= cnt * p[i];
            }
        if (amount)
            return {-1};
        for (int i = 0; i < N; ++ i )
            c[i] -= res[i];
        return res;
    }
};

/**
 * Your ATM object will be instantiated and called as such:
 * ATM* obj = new ATM();
 * obj->deposit(banknotesCount);
 * vector<int> param_2 = obj->withdraw(amount);
 */
```

### [2242. 节点序列的最大得分](https://leetcode.cn/problems/maximum-score-of-a-node-sequence/)

刚开始想着建图 DFS 限定递归层数为 4 ，TLE

其实显然可以枚举一个必选的边，随后看该边上的两个点相连的所有点可以选哪些即可

```c++
class Solution {
public:
    const static int N = 5e4 + 10;
    
    int n;
    vector<int> sc;
    int mx[N][3];
    
    int maximumScore(vector<int>& scores, vector<vector<int>>& edges) {
        this->sc = scores, this->n = sc.size();
        memset(mx, -1, sizeof mx);  // ATTENTION 必须 因为 0 节点有意义
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            {
                int x = sc[b];
                if (mx[a][0] == -1 || x >= sc[mx[a][0]])
                    mx[a][2] = mx[a][1], mx[a][1] = mx[a][0], mx[a][0] = b;
                else if (mx[a][1] == -1 || x >= sc[mx[a][1]])
                    mx[a][2] = mx[a][1], mx[a][1] = b;
                else if (mx[a][2] == -1 || x > sc[mx[a][2]])
                    mx[a][2] = b;
            }
            
            {
                int x = sc[a];
                if (mx[b][0] == -1 || x >= sc[mx[b][0]])
                    mx[b][2] = mx[b][1], mx[b][1] = mx[b][0], mx[b][0] = a;
                else if (mx[b][1] == -1 || x >= sc[mx[b][1]])
                    mx[b][2] = mx[b][1], mx[b][1] = a;
                else if (mx[b][2] == -1 || x > sc[mx[b][2]])
                    mx[b][2] = a;
            }
            
        }
        
        int res = -1;
        for (auto & e : edges) {
            int a = e[0], b = e[1];
            vector<int> as, bs;
            for (int i = 0; i < 3; ++ i ) {
                if (mx[a][i] != -1 && mx[a][i] != b)
                    as.push_back(mx[a][i]);
                if (mx[b][i] != -1 && mx[b][i] != a)
                    bs.push_back(mx[b][i]);
            }
            int t = sc[a] + sc[b];
            for (auto & x : as)
                for (auto & y : bs)
                    if (x != y) {
                        // cout << x << " " << y << endl;
                        res = max(res, t + sc[x] + sc[y]);
                    }
        }
        return res;
    }
};
```
