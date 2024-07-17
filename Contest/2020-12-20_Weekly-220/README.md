## [比赛链接](https://leetcode.cn/contest/weekly-contest-220/)

34min finished

### [5629. 重新格式化电话号码](https://leetcode.cn/problems/reformat-phone-number/)

略

```c++
class Solution {
public:
    string reformatNumber(string number) {
        string num;
        for (auto c : number) if (c != ' ' && c != '-') num.push_back(c);
        int n = num.size(), i;
        string res;
        for (i = 0; i + 4 < n; i += 3 ) {
            string sub = num.substr(i, 3);
            res += "-" + sub;
        }
        if (i + 4 == n) {
            res += "-" + num.substr(i, 2);
            res += "-" + num.substr(i + 2);
        } else res += "-" + num.substr(i);
        if (res.size()) res.erase(res.begin());
        return res;
    }
};
```


### [1695. 删除子数组的最大得分](https://leetcode.cn/problems/maximum-erasure-value/)

简单滑动窗口

小优化：前缀和数组可以省略，直接在窗口滑动时计算总和即可

```c++
class Solution {
public:
    int maximumUniqueSubarray(vector<int>& nums) {
        unordered_map<int, int> hash;
        int n = nums.size(), res = 0;
        vector<int> s(n + 1);
        for (int i = 1; i <= n; ++ i ) s[i] = s[i - 1] + nums[i - 1];
        for (int l = 0, r = 0, mul = 0; r < n; ++ r ) {
            ++ hash[nums[r]];
            if (hash[nums[r]] == 2) ++ mul;
            
            while (mul && l < r) {
                -- hash[nums[l]];
                if (hash[nums[l]] == 1) -- mul;
                ++ l;
            }
            res = max(res, s[r + 1] - s[l]);
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    int maximumUniqueSubarray(vector<int>& nums) {
        unordered_map<int, int> hash;
        int res = 0;
        for (int i = 0, j = 0, s = 0; i < nums.size(); i ++ ) {
            int x = nums[i];
            hash[x] ++ ;
            s += x;
            while (hash[x] > 1) {
                s -= nums[j];
                hash[nums[j ++ ]] -- ;
            }
            res = max(res, s);
        }
        return res;
    }
};
```

### [1696. 跳跃游戏 VI](https://leetcode.cn/problems/jump-game-vi/)

简单单调队列优化dp

```c++
class Solution {
public:
    const int inf = 0x3f3f3f3f;
    int maxResult(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> f(n + 1);
        vector<int> q(n + 1);
        int hh = 0, tt = -1;
        f[0] = 0;
        for (int i = 1; i <= n; ++ i ) {
            if (hh <= tt && q[hh] < i - k) ++ hh;
            f[i] = f[q[hh]] + nums[i - 1];
            while (hh <= tt && f[q[tt]] <= f[i]) -- tt;
            q[ ++ tt] = i;
        }
        return f[n];
    }
};
```

### [1697. 检查边长度限制的路径是否存在](https://leetcode.cn/problems/checking-existence-of-edge-length-limited-paths/) [TAG]

离线并查集

> 还有 LCA 优化的做法，虚拟比赛的时候想的是 MST + LCA 
>
> TODO 补上这部分代码

```c++
const int N = 100010;

struct Node {
    int a, b, c, d;
    bool operator< (const Node& t) const {
        return c < t.c;
    }
}e[N], q[N];

class Solution {
public:
    vector<int> p;

    int find(int x) {
        if (p[x] != x) p[x] = find(p[x]);
        return p[x];
    }

    vector<bool> distanceLimitedPathsExist(int n, vector<vector<int>>& ee, vector<vector<int>>& qq) {
        int m = ee.size(), k = qq.size();
        for (int i = 0; i < m; ++ i )
            e[i] = {ee[i][0], ee[i][1], ee[i][2]};
        for (int i = 0; i < k; ++ i )
            q[i] = {qq[i][0], qq[i][1], qq[i][2], i};
        sort(e, e + m), sort(q, q + k);
        p.resize(n);
        for (int i = 0; i < n; ++ i ) p[i] = i;
        vector<bool> res(k);
        for (int i = 0, j = 0; i < k; ++ i ) {
            while (j < m && e[j].c < q[i].c) {
                int a = e[j].a, b = e[j].b;
                p[find(a)] = find(b);
                ++ j ;
            }
            res[q[i].d] = find(q[i].a) == find(q[i].b);
        }
        return res;
    }
};
```
