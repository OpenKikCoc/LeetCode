## [比赛链接](https://leetcode.cn/contest/biweekly-contest-78/)


### [2269. 找到一个数字的 K 美丽值](https://leetcode.cn/problems/find-the-k-beauty-of-a-number/)

略

```c++
class Solution {
public:
    int divisorSubstrings(int num, int k) {
        string s = to_string(num);
        int n = s.size(), res = 0;
        for (int i = 0; i + k <= n; ++ i ) {
            string t = s.substr(i, k);
            int x = stoi(t);
            if (x && num % x == 0)
                res ++ ;
        }
        return res;
    }
};
```


### [2270. 分割数组的方案数](https://leetcode.cn/problems/number-of-ways-to-split-array/)

略

```c++
class Solution {
public:
    using LL = long long;
    
    int waysToSplitArray(vector<int>& nums) {
        int n = nums.size();
        vector<LL> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + (LL)nums[i - 1];
        
        int res = 0;
        for (int i = 1; i < n; ++ i ) {
            if (s[i] >= s[n] - s[i])
                res ++ ;
        }
        return res;
    }
};
```

### [2271. 毯子覆盖的最多白色砖块数](https://leetcode.cn/problems/maximum-white-tiles-covered-by-a-carpet/) [TAG]

自己推显然是左/右端点之一，细节略多的模拟

```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;
    
    vector<PII> ts;
    
    int maximumWhiteTiles(vector<vector<int>>& tiles, int carpetLen) {
        sort(tiles.begin(), tiles.end());
        for (auto & t : tiles) {
            int l = t[0], r = t[1];
            if (ts.empty() || ts.back().second < l - 1)
                ts.push_back({l, r});
            else
                ts.back().second = r;
        }
        int n = ts.size();
        vector<LL> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + (LL)(ts[i - 1].second - ts[i - 1].first + 1);
        
        LL res = 0;
        for (int i = 1; i <= n; ++ i ) {
            auto [l, r] = ts[i - 1];
            // cout << "=== l = " << l << " r = " << r << endl;
            int t = 0;
            {
                int L = i, R = n;
                while (L < R) {
                    int m = L + R >> 1;
                    if (ts[m - 1].first < l + carpetLen)
                        L = m + 1;
                    else
                        R = m;
                }
                // ... .first >= l + len 的第一个
                if (L - 1 >= 1) {
                    int id = L - 1;
                    LL t = s[id - 1] + (min(s[id] - s[id - 1], (LL)(l + carpetLen) - ts[id - 1].first)) - s[i - 1];
                    // cout << " [1] i = " << i << " id = " << id << " t = " << t << endl;
                    res = max(res, t);
                }
            }
            {
                int L = 1, R = i;
                while (L < R) {
                    int m = L + R >> 1;
                    if (ts[m - 1].second <= r - carpetLen)
                        L = m + 1;
                    else
                        R = m;
                }
                // ... .second > r - carpetLen 的第一个, 意即当前段必然包含了一部分
                int id = L;
                // cout << " L = " << L << endl;
                LL t = s[i] - s[id] + min(s[id] - s[id - 1], (LL)ts[id - 1].second - (r - carpetLen));
                // cout << " [2] i = " << i << " id = " << id << " t = " << t << endl;
                res = max(res, t);
            }
        }
        return res;
    }
};
```

实际上贪心推导可知必然是左/右端点，则可以直接双指针扫描。

```c++
class Solution {
public:
    using LL = long long;
    
    // 贪心结论：毯子左端点一定和某组瓷砖的左端点一致
    int maximumWhiteTiles(vector<vector<int>>& tiles, int carpetLen) {
        sort(tiles.begin(), tiles.end());
        LL res = 0, t = 0;
        for (int i = 0, j = 0; i < tiles.size(); ++ i ) {
            while (j < tiles.size() && tiles[j][1] + 1 <= tiles[i][0] + carpetLen)
                t += tiles[j][1] - tiles[j][0] + 1, j ++ ;
            // while 结束后 j 处的瓷砖无法完全覆盖
            if (j < tiles.size())
                // 注意计算思路：最后一段不完整的可以直接这么算
                res = max(res, t + max(0, tiles[i][0] + carpetLen - tiles[j][0]));
            else
                res = max(res, t);
            t -= tiles[i][1] - tiles[i][0] + 1;
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    using LL = long long;
    
    // 另一实现：每次放在右端点
    int maximumWhiteTiles(vector<vector<int>>& tiles, int carpetLen) {
        sort(tiles.begin(), tiles.end());
        LL res = 0, t = 0;
        for (int i = 0, j = 0; j < tiles.size(); ++ j ) {
            t += tiles[j][1] - tiles[j][0] + 1;
            while (i < j && tiles[i][1] <= tiles[j][1] - carpetLen)
                t -= tiles[i][1] - tiles[i][0] + 1, i ++ ;
            // ATTENTION: 在此条件下 应当是 t - x, 注意 x 的计算逻辑
            res = max(res, t - max(0, tiles[j][1] - carpetLen - tiles[i][0] + 1));
        }
        return res;
    }
};
```



### [2272. 最大波动的子字符串](https://leetcode.cn/problems/substring-with-largest-variance/) [TAG]

**最大子序和模型转化**，以及 `diff_with_b` 的维护

```c++
class Solution {
public:
    // 显然无法枚举区间，考虑枚举两个元素
    int largestVariance(string s) {
        int res = 0;
        for (char c1 = 'a'; c1 <= 'z'; ++ c1 )      // 较大的
            for (char c2 = 'a'; c2 <= 'z'; ++ c2 )  // 较小的
                if (c1 != c2) {
                    // diff 表示 c1-c2 差值; diff_with_b 表示包含了b的次数差值，初始化-inf
                    int diff = 0, diff_with_b = -1e8, t = 0;
                    for (auto c : s) {
                        if (c == c1)
                            diff ++ , diff_with_b ++ ;
                        else if (c == c2)
                            // ATTENTION: 若 diff < 0 则重置为 0
                            diff_with_b = -- diff , diff = max(diff, 0);
                        t = max(t, diff_with_b);
                    }
                    res = max(res, t);
                }
        return res;
    }
};
```

```c++
class Solution {
public:
    // 显然无法枚举区间，考虑枚举两个元素
    int largestVariance(string s) {
        int res = 0;
        for (char c1 = 'a'; c1 <= 'z'; ++ c1 )      // 较大的
            for (char c2 = 'a'; c2 <= 'z'; ++ c2 )  // 较小的
                if (c1 != c2) {
                    // diff 表示 c1-c2 差值; diff_with_b 表示包含了b的次数差值，初始化-inf
                    int diff = 0, diff_with_b = -1e8, t = 0;
                    for (auto c : s) {
                        if (c == c1)
                            // 思考：diff_with_b 如何保证必然包含 b [更新逻辑 不能取max(0, xxx)]
                            diff = max(0, diff) + 1, diff_with_b = diff_with_b + 1;
                        else if (c == c2)
                            // ATTENTION: 转移; diff 重置
                            diff = diff - 1, diff_with_b = diff, diff = max(diff, 0);
                        t = max(t, diff_with_b);
                    }
                    res = max(res, t);
                }
        return res;
    }
};
```

