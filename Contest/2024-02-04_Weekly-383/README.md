## [比赛链接](https://leetcode.cn/contest/weekly-contest-383/)

>   virtual rank:
>
>   87 / 2691
>   0:01:17 0:18:22 0:36:26 0:18:14  1


### [3028. 边界上的蚂蚁](https://leetcode.cn/problems/ant-on-the-boundary/)



```c++
class Solution {
public:
    int returnToBoundaryCount(vector<int>& nums) {
        int p = 0, res = 0;
        for (auto x : nums) {
            p += x;
            if (p == 0)
                res ++ ;
        }
        return res;
    }
};
```


### [3029. 将单词恢复初始状态所需的最短时间 I](https://leetcode.cn/problems/minimum-time-to-revert-word-to-initial-state-i/)

同 4 略

```c++

```

### [3030. 找出网格的区域平均强度](https://leetcode.cn/problems/find-the-grid-of-region-average/)

模拟即可 略

```c++
class Solution {
public:
    // 重要条件：区域 是一个 3 x 3 的子网格
    // 显然 枚举的思路有很多 最简单的方式是枚举所有的 "区域" 并对符合条件的区域累加指定下标的值
    
    int dx[3] = {0, 1, 2}, dy[3] = {0, 1, 2};
    
    bool check(vector<vector<int>> & g, int i, int j, int threshold) {
        // row
        {
            if (abs(g[i][j + 1] - g[i][j]) > threshold || abs(g[i][j + 1] - g[i][j + 2]) > threshold)
                return false;
            if (abs(g[i + 1][j + 1] - g[i + 1][j]) > threshold || abs(g[i + 1][j + 1] - g[i + 1][j + 2]) > threshold)
                return false;
            if (abs(g[i + 2][j + 1] - g[i + 2][j]) > threshold || abs(g[i + 2][j + 1] - g[i + 2][j + 2]) > threshold)
                return false;
        }
        // col
        {
            if (abs(g[i + 1][j] - g[i][j]) > threshold || abs(g[i + 1][j] - g[i + 2][j]) > threshold)
                return false;
            if (abs(g[i + 1][j + 1] - g[i][j + 1]) > threshold || abs(g[i + 1][j + 1] - g[i + 2][j + 1]) > threshold)
                return false;
            if (abs(g[i + 1][j + 2] - g[i][j + 2]) > threshold || abs(g[i + 1][j + 2] - g[i + 2][j + 2]) > threshold)
                return false;
        }
        return true;
    }
    
    vector<vector<int>> resultGrid(vector<vector<int>>& image, int threshold) {
        int n = image.size(), m = image[0].size();
        vector<vector<int>> res(n, vector<int>(m)), cnt(n, vector<int>(m));
        
        // 枚举左上角坐标
        for (int i = 0; i < n - 2; ++ i )
            for (int j = 0; j < m - 2; ++ j ) {
                if (!check(image, i, j, threshold))
                    continue;
                
                int sum = 0;
                for (int x = 0; x < 3; ++ x )
                    for (int y = 0; y < 3; ++ y )
                        sum += image[i + x][j + y];
                
                int val = sum / 9;
                // cout << " i = " << i << " j = " << j << " sum = " << sum << " val = " << val << endl;
                
                for (int x = 0; x < 3; ++ x )
                    for (int y = 0; y < 3; ++ y )
                        res[i + x][j + y] += val, cnt[i + x][j + y] ++ ;
            }
        
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                if (cnt[i][j])
                    res[i][j] /= cnt[i][j];
                else
                    res[i][j] = image[i][j];
        return res;
    }
};
```

### [3031. 将单词恢复初始状态所需的最短时间 II](https://leetcode.cn/problems/minimum-time-to-revert-word-to-initial-state-ii/)

题意分析 显然只需要对比后缀与前缀

1.   直接跑 string hash 即可

2.   更简单的方式是 扩展 kmp

```c++
class Solution {
public:
    using ULL = unsigned long long;
    const static int N = 1e6 + 10, P = 131;
    
    ULL h[N], p[N];
    bool st[N];
    
    ULL get(int l, int r) {
        return h[r] - h[l - 1] * p[r - l + 1];
    }
    
    int minimumTimeToInitialState(string word, int k) {
        int n = word.size();
        h[0] = 0, p[0] = 1;
        for (int i = 1; i <= n; ++ i ) {
            h[i] = h[i - 1] * P + word[i - 1];
            p[i] = p[i - 1] * P;
        }
        
        memset(st, 0, sizeof st);
        for (int i = 1, x = k/*定义为新的开头的原始下标*/; x <= n/*因为 如果超过了 n 则后面是任意的字母 一定可以拼成*/; x += k, ++ i ) {
            int w = n - x;
            if (get(1, w) == get(x + 1, n))
                return i;
        }
        return (n + k - 1) / k;
    }
};
```

```c++
class Solution {
public:
    int minimumTimeToInitialState(string word, int k) {
        int n = word.size();
        vector<int> z(n);
        for (int i = 1, l = 0, r = 0; i < n; ++ i ) {
            if (i <= r && z[i - l] < r - i + 1)
                z[i] = z[i - l];
            else {
                z[i] = max(0, r - i + 1);
                while (i + z[i] < n && word[z[i]] == word[i + z[i]])
                    z[i] ++ ;
            }
            if (i + z[i] - 1 > r)
                l = i, r = i + z[i] - 1;
            
            // Special logic
            if (i % k == 0 && z[i] >= n - i)
                return i / k;
        }
        return (n + k - 1) / k;
    }
};
```

