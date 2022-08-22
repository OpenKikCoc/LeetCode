## [比赛链接](https://leetcode.cn/contest/weekly-contest-306/)

>   virtual rank: 90 / 7500


### [2373. 矩阵中的局部最大值](https://leetcode.cn/problems/largest-local-values-in-a-matrix/)



```c++
class Solution {
public:
    int dx[8] = {-1, -1, -1, 0, 0, 1, 1, 1}, dy[8] = {-1, 0, 1, 1, -1, -1, 0, 1};
    vector<vector<int>> largestLocal(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<int>> res(n - 2, vector<int>(n - 2));
        for (int i = 1; i < n - 1; ++ i )
            for (int j = 1; j < n - 1; ++ j ) {
                int t = grid[i][j];
                for (int k = 0; k < 8; ++ k ) {
                    int x = i + dx[k], y = j + dy[k];
                    t = max(t, grid[x][y]);
                }
                res[i - 1][j - 1] = t;
            }
        return res;
    }
};
```


### [2374. 边积分最高的节点](https://leetcode.cn/problems/node-with-highest-edge-score/)

注意写 longlong

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL c[N];
    int edgeScore(vector<int>& edges) {
        int n = edges.size();
        memset(c, 0, sizeof c);
        for (int i = 0; i < n; ++ i )
            c[edges[i]] += (LL)i;
        int p = -1;
        for (int i = 0; i < n; ++ i )
            if (p == -1 || c[p] < c[i])
                p = i;
        return p;
    }
};
```

### [2375. 根据模式串构造最小数字](https://leetcode.cn/problems/construct-smallest-number-from-di-string/)



```c++
class Solution {
public:
    int n;
    
    bool check(string & a, string & b) {
        for (int i = 1; i <= n; ++ i )
            if ((a[i] > a[i - 1]) && (b[i - 1] != 'I') || (a[i] < a[i - 1]) && (b[i - 1] != 'D'))
                return false;
        return true;
    }
    
    string smallestNumber(string pattern) {
        n = pattern.size();
        string t, res;
        for (int i = 1; i <= n + 1; ++ i )
            t.push_back('0' + i);
        
        do {
            if (check(t, pattern)) {
                res = t;
                break;
            }
        } while (next_permutation(t.begin(), t.end()));
        
        return res;
    }
};
```

### [2376. 统计特殊整数](https://leetcode.cn/problems/count-special-integers/)

同 **[LeetCode 1012. 至少有 1 位重复的数字](https://leetcode.cn/problems/numbers-with-repeated-digits/)**

```c++
class Solution {
public:
    // 排列数
    int P(int a, int b) {
        int ret = 1;
        for (int i = a, j = 0; j < b; -- i , ++ j )
            ret *= i;
        return ret;
    }
    
    int countSpecialNumbers(int n) {
        vector<int> nums;
        while (n)
            nums.push_back(n % 10), n /= 10;
        
        int res = 0;
        // 1. 枚举较少位数的情况
        for (int i = 1; i < nums.size(); ++ i )
            // 首位不能为 0, 后面的每个都和前面的不同
            res += 9 * P(9, i - 1);
        // 2. 枚举相同位数的情况, 但是首位较低, 后续自由选
        res += (nums.back() - 1) * P(9, nums.size() - 1);

        // 3. 位数相同, 且首位相同的情况, 后续选择会受限制
        vector<bool> st(10);    // 前后有关联关系 对于本题来说就是哪个数有没有被用过
        st[nums.back()] = true;
        for (int i = nums.size() - 2; i >= 0; -- i ) {
            int x = nums[i];
            for (int j = 0; j < x; ++ j )
                if (!st[j])
                    // 用过的数 nums.size()-i ==> 没有用过的数 10-(nums.size()-i)
                    res += P(10 - (nums.size() - i), i);
            
            if (st[x])
                return res;
            st[x] = true;
        }
        return res + 1;
        
    }
};
```
