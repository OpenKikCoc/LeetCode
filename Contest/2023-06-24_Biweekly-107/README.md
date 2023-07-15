## [比赛链接](https://leetcode.cn/contest/biweekly-contest-107/)


### [2744. 最大字符串配对数目](https://leetcode.cn/problems/find-maximum-number-of-string-pairs/)



```c++
class Solution {
public:
    int maximumNumberOfStringPairs(vector<string>& words) {
        int n = words.size();
        vector<bool> st(n);
        int res = 0;
        for (int i = 0; i < n; ++ i ) {
            if (st[i])
                continue;
            for (int j = i + 1; j < n; ++ j ) {
                if (st[j])
                    continue;
                auto t = words[j];
                reverse(t.begin(), t.end());
                if (words[i] == t) {
                    st[i] = st[j] = true;
                    res ++ ;
                    break;
                }
            }
        }
        return res;
    }
};
```


### [2745. 构造最长的新字符串](https://leetcode.cn/problems/construct-the-longest-new-string/)

思维

```c++
class Solution {
public:
    // AB 左边只能用 BB/AB 右边只能用 AA/AB
    // 只能是 BBABAA BBABAA...
    //       ABAABB ABAABB...
    //       AABBAB AABBAB...
    //    AABB AABB...
    // AABB[AB]AABBAA
    // BB[AB]AABBAA
    int longestString(int x, int y, int z) {
        if (x == y) {
            return (x + y + z) * 2;
        } else {
            if (x > y) {
                int t = min(x, y + 1);
                return (t + y + z) * 2;
            } else {
                int t = min(y, x + 1);
                return (x + t + z) * 2;
            }
        }
        return -1;
    }
};
```

### [2746. 字符串连接删减字母](https://leetcode.cn/problems/decremental-string-concatenation/)



```c++
class Solution {
public:
    // ATTENTION: 题意的重要条件是 “对于 words 里的单词必须按顺序连接”
    //  则对于前 i 个字符串，第 i 个一定位于首部或者尾部【这就保证解空间很小】
    // 一开始自己理解成可以任意两个串连接了
    
    const static int N = 1010, M = 26, INF = 0x3f3f3f3f;
    
    int f[N][M][M]; // 所有前 i 个串连在一起，起始字母 j 结束字母 k 的最小长度
    
    int minimizeConcatenatedLength(vector<string>& words) {
        memset(f, 0x3f, sizeof f);
        
        int n = words.size();
        f[1][words[0][0] - 'a'][words[0].back() - 'a'] = words[0].size();
        
        for (int i = 2; i <= n; ++ i ) {
            auto & w = words[i - 1];
            int a = w[0] - 'a', b = w.back() - 'a', len = w.size();
            // 枚举上一个的状态
            for (int j = 0; j < M; ++ j )
                for (int k = 0; k < M; ++ k )
                    if (f[i - 1][j][k] < INF / 2) { // 上一个合法
                        // 接在前面
                        {
                            f[i][a][k] = min(f[i][a][k], f[i - 1][j][k] + len - (b == j));
                        }
                        // 接在后面
                        {
                            f[i][j][b] = min(f[i][j][b], f[i - 1][j][k] + len - (a == k));
                        }
                    }
        }
        
        int res = INF;
        for (int i = 0; i < M; ++ i )
            for (int j = 0; j < M; ++ j )
                res = min(res, f[n][i][j]);
        return res;
    }
};
```

### [2747. 统计没有收到请求的服务器数目](https://leetcode.cn/problems/count-zero-request-servers/)



```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    int sum;
    unordered_map<int, int> h;
    void add(int x) {
        h[x] ++ ;
        if (h[x] == 1)
            sum ++ ;
    }
    void sub(int x) {
        h[x] -- ;
        if (h[x] == 0)
            sum -- ;
    }
    
    vector<int> countServers(int n, vector<vector<int>>& logs, int x, vector<int>& queries) {
        sort(logs.begin(), logs.end(), [](const vector<int> & a, const vector<int> & b) {
            return a[1] < b[1];     // 按时间排序
        });
        vector<PII> qs;
        for (int i = 0; i < queries.size(); ++ i )
            qs.push_back({queries[i], i});
        sort(qs.begin(), qs.end()); // 按时间排序
        
        int sz = logs.size(), m = qs.size();
        vector<int> res(m);
        
        sum = 0; h.clear();
        for (int i = 0, l = 0, r = 0; i < m; ++ i ) {
            auto [t, idx] = qs[i];
            while (r < sz && logs[r][1] <= t)
                add(logs[r ++ ][0]);
            while (l < r && logs[l][1] < t - x)
                sub(logs[l ++ ][0]);
            res[idx] = n - sum;
        }
        
        return res;
    }
};
```
