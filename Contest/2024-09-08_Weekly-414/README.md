## [比赛链接](https://leetcode.cn/contest/weekly-contest-414)

### [3280. 将日期转换为二进制表示](https://leetcode.cn/problems/convert-date-to-binary/)



```c++
class Solution {
public:
    string get(int x) {
        string ret;
        while (x) {
            ret += '0' + (x & 1);
            x >>= 1;
        }
        reverse(ret.begin(), ret.end());
        return ret;
    }
    
    string convertDateToBinary(string date) {
        int n = date.size();
        vector<int> xs;
        for (int i = 0; i < n; ++ i ) {
            if (date[i] == '-')
                continue;
            int j = i;
            while (j < n && isdigit(date[j]))
                j ++ ;
            xs.push_back(stoi(date.substr(i, j - i)));
            i = j - 1;
        }
        
        string res;
        for (auto x : xs) {
            if (res.size())
                res += '-';
            res += get(x);
        }
        return res;
    }
};
```

### [3281. 范围内整数的最大得分](https://leetcode.cn/problems/maximize-score-of-numbers-in-ranges/)



```c++
class Solution {
public:
    // 最小值最大 较显然的是二分答案  -> 定义特定阈值 看能否在约束下遍历数组
    //  重要的点: 整数两两          -> 排序
    using LL = long long;
    
    vector<int> st;
    int n, d;
    
    bool check(LL m) {
        LL last = -1e10;
        for (int i = 0; i < n; ++ i ) {
            if ((LL)st[i] + d < last + m)
                return false;
            last = max((LL)st[i], last + m);
        }
        return true;
    }
    
    int maxPossibleScore(vector<int>& start, int d) {
        this->st = start; this->n = st.size(); this->d = d;
        sort(st.begin(), st.end());
        
        LL l = 0, r = 1e10;    // WA [1000000000,0] 1000000000, r 需要 > 2e9
        while (l < r) {
            LL m = l + (r - l) / 2;
            if (check(m))
                l = m + 1;
            else
                r = m;
        }
        return l - 1;
    }
};
```

### [3282. 到达数组末尾的最大得分](https://leetcode.cn/problems/reach-end-of-array-with-max-score/)

脑筋急转弯 / trick

显然能取最大取最大即可

```c++
class Solution {
public:
    using LL = long long;
    
    //      f[i] = max{f[j] + nums[i] * (j - i)}
    // =>        = max{f[j] + nums[i] * j} - nums[i] * i;
    // =>          从后向前遍历时 如果f[j_l] < f[j_r]则没有必要使用 (必然更差) => TLE
    //
    // => 脑筋急转弯 每走一步的开销是nums[i] 则一定尽量按最大的nums[i]来走...
    
    long long findMaximumScore(vector<int>& nums) {
        int n = nums.size();
        
        LL res = 0;
        for (int i = 1, step = nums[0]; i < n; ++ i ) {
            res += step;
            step = max(step, nums[i]);
        }
        
        return res;
    }
};
```

### [3283. 吃掉所有兵需要的最多移动次数](https://leetcode.cn/problems/maximum-number-of-moves-to-kill-all-pawns/) [TAG]

显然可以状压枚举

注意优雅的实现处理细节

```c++
class Solution {
public:
    // 看到 position.length <= 15 考虑状压枚举
    // f[i][j] 当前已经访问过的兵二进制状态为i 当前在第j个兵 的总距离
    // 其中 由i的bit数量可以推断是 alice/bob 操作，并影响其转移来源取 max/min
    //
    using PII = pair<int, int>;
    const static int N = 50, M = 16;    // M = 15+1 把起始点也作为一个兵
    
    int dx[8] = {-1, -2, -2, -1, 1, 2, 2, 1}, dy[8] = {-2, -1, 1, 2, 2, 1, -1, -2};
    int dis[M][N][N];   // 记录每个兵到任意位置到距离
    
    vector<vector<int>> ps;
    int n;
    
    void calc_dis() {
        memset(dis, -1, sizeof dis);
        
        auto bfs = [&](int s) {
            queue<PII> q;
            q.push({ps[s][0], ps[s][1]});
            dis[s][ps[s][0]][ps[s][1]] = 0;
            while (!q.empty()) {
                auto [x, y] = q.front();
                q.pop();
                for (int i = 0; i < 8; ++ i ) {
                    int nx = x + dx[i], ny = y + dy[i];
                    if (nx < 0 || nx >= 50 || ny < 0 || ny >= 50)
                        continue;
                    if (dis[s][nx][ny] != -1)
                        continue;
                    dis[s][nx][ny] = dis[s][x][y] + 1;
                    q.push({nx, ny});
                }
            }
        };
        for (int i = 0; i < n; ++ i )
            bfs(i);
    }
    
    int f[1 << M][M];   // 状态定义
    
    int dp(int st, int last) {
        if (st == (1 << n) - 1)
            return 0;
        
        if (f[st][last] != -1)
            return f[st][last];
        
        // 奇数alice先走,求最大(初始化最小)
        int bit_count = __builtin_popcount(st);
        int ret = (bit_count & 1) ? -1e9 : 1e9;
        
        // 枚举下一位往哪里去
        // ATTENTION: 如果要枚举上一位从哪里来 初始化状态会更为复杂
        for (int i = 0; i < n; ++ i ) {
            if (st >> i & 1)
                continue;
            int t = dp(st | 1 << i, i) + dis[last][ps[i][0]][ps[i][1]];
            ret = (bit_count & 1) ? max(ret, t) : min(ret, t);
        }
        return f[st][last] = ret;
    }
    
    int maxMoves(int kx, int ky, vector<vector<int>>& positions) {
        positions.push_back({kx, ky});  // ATTENTION: 加入起始点 简化后续流程
        this->ps = positions;
        this->n = ps.size();
        
        calc_dis();
        
        memset(f, -1, sizeof f);
        return dp(1 << (n - 1), n - 1);
    }
};
```
