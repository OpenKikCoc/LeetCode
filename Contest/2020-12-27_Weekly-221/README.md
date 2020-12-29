## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-221/)

手速问题 3/4

virtual rating: 175 / 3397

### [1704. 判断字符串的两半是否相似](https://leetcode-cn.com/problems/determine-if-string-halves-are-alike/)

略

```c++
ass Solution {
public:
    int get(string s) {
        int res = 0;
        for (auto cc : s) {
            char c = tolower(cc);
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') ++ res;
        }
        return res;
    }
    bool halvesAreAlike(string s) {
        int n = s.size();
        string a = s.substr(0, n / 2);
        string b = s.substr(n / 2);
        return get(a) == get(b);
    }
};
```


### [1705. 吃苹果的最大数目](https://leetcode-cn.com/problems/maximum-number-of-eaten-apples/)

优先队列贪心即可

```c++
class Solution {
public:
    using PII = pair<int, int>;
    int eatenApples(vector<int>& apples, vector<int>& days) {
        priority_queue<PII, vector<PII>, greater<PII>> heap;
        int res = 0, n = apples.size();
        for (int i = 0; i < n || heap.size(); ++ i ) {
            if (i < n && apples[i]) heap.push({i + days[i] - 1, apples[i]});
            while (heap.size() && heap.top().first < i) heap.pop();
            if (heap.size()) {
                auto [ddl, cnt] = heap.top(); heap.pop();
                // cout << "i =  " << i << " ddl = " << ddl << " cnt = " << cnt << endl;
                -- cnt;
                ++ res;
                if (cnt) heap.push({ddl, cnt});
            }
        }
        return res;
    }
};
```

### [1706. 球会落何处](https://leetcode-cn.com/problems/where-will-the-ball-fall/)

模拟即可

```c++
class Solution {
public:
    int m, n;
    int get(vector<vector<int>>& g, int c) {
        int x = 0, y = c;
        while (x < m) {
            if (g[x][y] == 1) {
                if (y == n - 1 || g[x][y + 1] == -1) return -1;
                x += 1, y += 1;
            } else {
                if (y == 0 || g[x][y - 1] == 1) return -1;
                x += 1, y -= 1;
            }
        }
        return y;
    }
    vector<int> findBall(vector<vector<int>>& grid) {
        m = grid.size(), n = grid[0].size();
        vector<int> res;
        for (int i = 0; i < n; ++ i )
            res.push_back(get(grid, i));
        return res;
    }
};
```

### [1707. 与数组中元素的最大异或值](https://leetcode-cn.com/problems/maximum-xor-with-an-element-from-array/) [TAG]

在线 Trie 做法贪心选择前面为 1 的时候结果会错，形如：

> [536870912,0,534710168,330218644,142254206]
> [[558240772,1000000000],[307628050,1000000000],[3319300,1000000000],[2751604,683297522],[214004,404207941]]
> WRONG:
> [1050219420,844498962,540190212,539622516,-1]
> CORRECT:
> [1050219420,844498962,540190212,539622516,330170208]

正确做法，离线 Trie

```c++
struct Node {
    int x, m, k;
    bool operator< (const Node& t) const {
        return m < t.m;
    }
}q[100010];

int son[3100000][2];

class Solution {
public:
    int idx = 0;
    void insert(int v) {
        int p = 0;
        for (int i = 30; i >= 0; -- i ) {
            int u = (v >> i) & 1;
            if (!son[p][u]) son[p][u] = ++ idx;
            p = son[p][u];
        }
    }
    int query(int v) {
        if (!idx) return -1;
        int p = 0, ret = 0;
        for (int i = 30; i >= 0; -- i ) {
            int u = (v >> i) & 1;
            if(!son[p][!u]) {
                // 相反的不存在 走相同的 当前这一位不产生异或增益
                p = son[p][u];
            } else {
                // 相反的存在 该位异或值为1
                p = son[p][!u];
                ret |= 1 << i;
            }
        }
        return ret;
    }
    vector<int> maximizeXor(vector<int>& nums, vector<vector<int>>& queries) {
        idx = 0;
        memset(son, 0, sizeof son);
        
        int n = nums.size(), m = queries.size();
        for (int i = 0; i < m; ++ i )
            q[i] = {queries[i][0], queries[i][1], i};
        sort(q, q + m);
        sort(nums.begin(), nums.end());
        vector<int> res(m);
        for (int i = 0, j = 0; j < m; ++ j ) {
            while (i < n && nums[i] <= q[j].m) insert(nums[i ++ ]);
            res[q[j].k] = query(q[j].x);
        }
        return res;
    }
};
```
