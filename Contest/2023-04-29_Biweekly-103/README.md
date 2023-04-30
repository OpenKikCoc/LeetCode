## [比赛链接](https://leetcode.cn/contest/biweekly-contest-103/)


### [6406. K个元素的最大和](https://leetcode.cn/problems/maximum-sum-with-exactly-k-elements/)



```c++
class Solution {
public:
    int maximizeSum(vector<int>& nums, int k) {
        int maxv = 0;
        for (auto x : nums)
            maxv = max(maxv, x);
        int res = 0;
        for (int i = 0; i < k; ++ i )
            res += maxv, maxv ++ ;
        return res;
    }
};
```


### [6405. 找到两个数组的前缀公共数组](https://leetcode.cn/problems/find-the-prefix-common-array-of-two-arrays/)



```c++
class Solution {
public:
    vector<int> findThePrefixCommonArray(vector<int>& A, vector<int>& B) {
        int n = A.size();
        vector<int> res;
        for (int i = 0; i < n; ++ i ) {
            static int c[55];
            memset(c, 0, sizeof c);
            for (int j = 0; j <= i; ++ j )
                c[A[j]] ++ , c[B[j]] ++ ;
            int t = 0;
            for (int j = 0; j <= 50; ++ j )
                if (c[j] == 2)
                    t ++ ;
            res.push_back(t);
        }
        return res;
    }
};
```

### [6403. 网格图中鱼的最大数目](https://leetcode.cn/problems/maximum-number-of-fish-in-a-grid/)



```c++
class Solution {
public:
    const static int N = 11;
    
    int n, m;
    vector<vector<int>> g;
    
    int tot;
    
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    void dfs(int x, int y) {
        tot += g[x][y];
        g[x][y] = 0;
        for (int i = 0; i < 4; ++ i ) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx < 0 || nx >= n || ny < 0 || ny >= m)
                continue;
            if (!g[nx][ny])
                continue;
            dfs(nx, ny);
        }
    }
    
    int findMaxFish(vector<vector<int>>& grid) {
        this->g = grid;
        this->n = g.size(), this->m = g[0].size();
        
        int res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (g[i][j]) {
                    tot = 0;
                    dfs(i, j);
                    res = max(res, tot);
                }
        return res;
    }
};
```

### [6404. 将数组清空](https://leetcode.cn/problems/make-array-empty/)



```c++
class Solution {
public:
    // 单点修改(修改成inf) 区间查询 => 感觉并不是
    // 考虑重要条件【元素 互不相同】则显然可以按照大小排序 随后计算并更新新的起始位置
    
    using LL = long long;
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    int tr[N];  // 记录每个位置对应的原始元素是否已经被移除 注意下标偏移
    void init() {
        memset(tr, 0, sizeof tr);
    }
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int y) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += y;
    }
    int sum(int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    long long countOperationsToEmptyArray(vector<int>& nums) {
        int n = nums.size();
        vector<PII> xs;
        for (int i = 0; i < n; ++ i )
            xs.push_back({nums[i], i});
        sort(xs.begin(), xs.end()); // nums 互不相同
        // 则 现在一定是按照下面的顺序移除所有元素
        init();
        int x = 0;
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            auto [_, y] = xs[i];
            // 下标为 y, 本次操作之前位置在 x
            if (x <= y) {
                // 向后移动
                int w = (y - x) - (sum(y + 1) - sum(x));                    // [x, y] 闭区间
                res += w + 1;
            } else {
                int w = (n - x + y) - (sum(N - 1) - sum(x) + sum(y + 1));   // 排除 [x, y] 区间
                res += w + 1;
            }
            add(y + 1, 1);
            x = y;
        }
        return res;
    }
};
```
