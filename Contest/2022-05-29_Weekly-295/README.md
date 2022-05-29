## [比赛链接](https://leetcode.cn/contest/weekly-contest-295)

>   261 / 6447


### [6078. 重排字符形成目标字符串](https://leetcode.cn/problems/rearrange-characters-to-make-target-string/)



```c++
class Solution {
public:
    int rearrangeCharacters(string s, string target) {
        unordered_map<char, int> h1, h2;
        for (auto c : s)
            h1[c] ++ ;
        for (auto c : target)
            h2[c] ++ ;
        int res = 1e9;
        for (char c = 'a'; c <= 'z'; ++ c )
            if (h2[c])
                res = min(res, h1[c] / h2[c]);
        return res == 1e9 ? 0 : res;
    }
};
```


### [6079. 价格减免](https://leetcode.cn/problems/apply-discount-to-prices/)



```c++
class Solution {
public:
    using LL = long long;
    using LD = double;
    
    char t[110];
    
    bool check(string & s, int disc) {
        int n = s.size();
        if (n <= 1)
            return false;
        if (s[0] != '$')
            return false;
        for (int i = 1; i < n; ++ i )
            if (!isdigit(s[i]))
                return false;
        s = s.substr(1);
        LL x = stoll(s);
        LD v = (LD)x * ((LD)100.0 - disc) / 100.0;
        // s = tostring(v);
        sprintf(t, "%.2lf", v);
        s.resize(strlen(t));
        for (int i = 0; i < strlen(t); ++ i )
            s[i] = t[i];
        return true;
    }
    
    string discountPrices(string sentence, int discount) {
        stringstream ss(sentence);
        string s, res;
        while (ss >> s) {
            if (check(s, discount)) {
                res += '$' + s + ' ';
            } else {
                res += s + ' ';
            }
        }
        if (res.size())
            res.pop_back();
        return res;
    }
};
```

### [6080. 使数组按非递减顺序排列](https://leetcode.cn/problems/steps-to-make-array-non-decreasing/) [TAG]

单调栈 + c数组维护

思想 重复做

```c++
class Solution {
public:
    // 找到右侧第一个大于等于当前数的位置，中间的都需要消除  ==> 单调递减栈
    //      此时显然需要统计中间的最大消耗               ==> c 数组
    //      重点在于 if (stk.size()) c[i] = t + 1, res = max(res, c[i]);
    //      ==> 理由: 递减栈存储元素及其被删除的时间c 已更新当前的c（临时变量t）
    //          当栈为空：说明前面没有比当前元素大的，c即为0
    int totalSteps_2(vector<int>& nums) {
        int n = nums.size(), res = 0;
        vector<int> stk, c(n);
        for (int i = 0; i < n; ++ i ) {
            int t = 0;
            while (stk.size() && nums[stk.back()] <= nums[i]) {
                t = max(t, c[stk.back()]);
                stk.pop_back();
            }
            // ATTENTION 只有栈不为空 当前位置才需要最终被当前的栈顶所消耗 也即才需要统计当前元素被干掉的时间
            // 否则当前元素可以留下，不需要统计cost
            if (stk.size()) {
                c[i] = t + 1;
                res = max(res, c[i]);
            }
            stk.push_back(i);
        }
        return res;
    }
    
    // 为每个元素找到吃掉它的那个元素 ==> 逆序维护单调递减(可以相等)栈
    //  ATTENTION: 则在 while 循环弹出过程中，弹出的元素都应是整个过程中被当前元素吃掉的
    //      则：当前元素的 cost = max(当前已有的cost+1, 被弹出元素本身的cost) 【重要】
    int totalSteps(vector<int>& nums) {
        int n = nums.size(), res = 0;
        vector<int> stk, c(n);
        for (int i = n - 1; i >= 0; -- i ) {
            while (stk.size() && nums[stk.back()] < nums[i]) {
                res = max(res, c[i] = max(c[i] + 1, c[stk.back()]));
                stk.pop_back();
            }
            stk.push_back(i);
        }
        
        return res;
    }
};
```

### [6081. 到达角落需要移除障碍物的最小数目](https://leetcode.cn/problems/minimum-obstacle-removal-to-reach-corner/)

0-1 bfs 略

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    int n, m;
    vector<vector<int>> g;
    vector<vector<bool>> st;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    
    int minimumObstacles(vector<vector<int>>& grid) {
        g = grid, n = g.size(), m = g[0].size();
        st = vector<vector<bool>>(n, vector<bool>(m));
        // d = vector<vector<int>>(n, vector<int>(m, 1e9));
        
        deque<PII> dq;
        dq.push_back(PII{0, 0});
        while (!dq.empty()) {
            auto [d, id] = dq.front(); dq.pop_front();
            int x = id / m, y = id % m;
            if (st[x][y])
                continue;
            st[x][y] = true;
            if (x == n - 1 && y == m - 1)
                return d;
            for (int i = 0; i < 4; ++ i ) {
                int nx = x + dx[i], ny = y + dy[i];
                if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                    continue;
                if (g[nx][ny] == 0)
                    dq.push_front({d, nx * m + ny});
                else
                    dq.push_back({d + 1, nx * m + ny});
            }
        }
        return 0;
    }
};
```
