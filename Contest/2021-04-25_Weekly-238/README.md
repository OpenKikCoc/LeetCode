## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-238/)

virtual rank: 162 / 3977

23 min

AK


### [1837. K 进制表示下的各位数字总和](https://leetcode-cn.com/problems/sum-of-digits-in-base-k/)

略

```c++
class Solution {
public:
    int sumBase(int n, int k) {
        vector<int> ve;
        while (n)
            ve.push_back(n % k), n /= k;
        int res = 0;
        for (auto v : ve)
            res += v;
        return res;
    }
};
```


### [1838. 最高频元素的频数](https://leetcode-cn.com/problems/frequency-of-the-most-frequent-element/)

窗口即可，和 yxc 赛后的题解一致

```c++
class Solution {
public:
    using LL = long long;
    vector<LL> s;
    int maxFrequency(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        s = vector<LL>(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + nums[i - 1];
        
        int res = 0;
        for (int l = 1, r = 1; r <= n; ++ r ) {
            LL v = nums[r - 1];
            while (l < r && v * (r - l + 1) - (s[r] - s[l - 1]) > k)
                l ++ ;
            res = max(res, r - l + 1);
        }
        return res;
    }
};
```

实现可以优化

```c++
using LL = long long;
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        LL ans = 1;
        for (LL i = 1, j = 0, sum = 0; i < (int)nums.size(); i += 1) {
            sum += (LL)(nums[i] - nums[i - 1]) * (i - j);
            while(sum > k){
                sum -= nums[i] - nums[j];
                j += 1;
            }
            ans = max(ans, i - j + 1);
        }
        return ans;
    }
};
```



### [1839. 所有元音按顺序排布的最长子字符串](https://leetcode-cn.com/problems/longest-substring-of-all-vowels-in-order/)

同样可以窗口做

```c++
class Solution {
public:
    unordered_map<char, int> hash;
    
    bool check() {
        int c = 0;
        for (auto [k, v] : hash)
            if (v > 0)
                c ++ ;
        return c == 5;
    }
    
    int longestBeautifulSubstring(string word) {
        int n = word.size();
        int res = 0;
        for (int i = 0; i < n; ++ i ) {
            hash.clear();  // 注意清空
            int j = i;
            while (j < n && (j == i || word[j] >= word[j - 1]))
                hash[word[j]] ++ , j ++ ;
            if (check())
                res = max(res, j - i);
            i = j - 1;
        }
        return res;
    }
};
```

也可以线性扫描

```c++
class Solution {
public:
    int longestBeautifulSubstring(string word) {
        int inf = 500000;
        int A = -inf, B = -inf, C = -inf, D = -inf, E = -inf, ans = 0;
        for(char c : word){
            if(c == 'a'){
                A = max(A + 1, 1);
                B = C = D = E = -inf;
            }
            if(c == 'e'){
                B = max(A + 1, B + 1);
                A = C = D = E = -inf;
            }
            if(c == 'i'){
                C = max(B + 1, C + 1);
                A = B = D = E = -inf;
            }
            if(c == 'o'){
                D = max(D + 1, C + 1);
                A = B = C = E = -inf;
            }
            if(c == 'u'){
                E = max(E + 1, D + 1);
                A = B = C = D = -inf;
            }
            ans = max(ans, E);
        }
        return ans;
    }
};
```

注意，如果本题前后顺序不满足字典序，则需如下：

```c++
class Solution {
public:
    int longestBeautifulSubstring(string s) {
        int res = 0;
        string p = "aeiou";
        for (int i = 0; i < s.size(); i ++ ) {
            if (s[i] != 'a') continue;
            int j = i, k = 0;
            while (j < s.size()) {
                if (s[j] == p[k]) j ++ ;
                else {
                    if (k == 4) break;
                    if (s[j] == p[k + 1]) j ++, k ++ ;
                    else break;
                }
                if (k == 4) res = max(res, j - i);
            }
            i = j - 1;
        }
        return res;
    }
};
```



### [1840. 最高建筑高度](https://leetcode-cn.com/problems/maximum-building-height/)

LIS + 离散化

```c++
class Solution {
public:
    // 先上升再下降 LIS问题
    // 直接求俩LIS超时 注意数据范围是1e9
    //
    // restrictions 长度 考虑可以离散化
    using LL = long long;
    unordered_map<int, LL> limit;
    vector<LL> h1, h2, h;
    vector<int> ids;
    
    int get(int i1, int i2) {
        int id1 = ids[i1], id2 = ids[i2];
        int len = id2 - id1 + 1;            // 向上向下总计多少个
        int dis = abs(h[i1] - h[i2]) + 2;   // 向下多少个
        return (len - dis + 1) / 2 + max(h[i1], h[i2]);
    }
    
    int maxBuilding(int n, vector<vector<int>>& restrictions) {
        // 无限制要求下 位置x的最大高度为x-1
        ids.push_back(1);       // case
        ids.push_back(n + 1);   // case
        for (auto & r : restrictions) {
            int id = r[0], mxh = r[1];
            limit[id] = min(id - 1, mxh);
            ids.push_back(id);
        }
        sort(ids.begin(), ids.end());
        int l = ids.size() - 2;     // rest_id = [1, l]
        h1 = h2 = h = vector<LL>(l + 2);
        
        h1[0] = 0;
        for (int i = 1; i <= l; ++ i ) {
            int id = ids[i];
            h1[i] = min(h1[i - 1] + id - ids[i - 1], limit[id]);
        }
        
        h2[l + 1] = 2e9;
        for (int i = l; i >= 1; -- i ) {
            int id = ids[i];
            h2[i] = min(h2[i + 1] + ids[i + 1] - id, limit[id]);
        }
        
        for (int i = 1; i <= l; ++ i )
            h[i] = min(h1[i], h2[i]);
        
        int res = 0;
        if (!l)
            res = n - 1;
        else
            res = n - ids[l] + h[l];
        for (int i = 1; i <= l; ++ i )
            res = max(res, get(i -  1, i));
        
        return res;
    }
};
```

另

```c++
class Solution {
public:
    int maxBuilding(int n, vector<vector<int>>& h) {
        typedef long long LL;
        h.push_back({1, 0});
        sort(h.begin(), h.end());
        if (h.back()[0] != n) h.push_back({n, n - 1});
        int m = h.size();
        vector<LL> f(m + 1, INT_MAX), g(m + 1, INT_MAX);
        f[0] = -1;
        for (int i = 1; i < m; i ++ ) {
            int x = h[i][0], y = h[i][1];
            f[i] = min(f[i - 1], (LL)y - x);
        }
        for (int i = m - 1; i >= 0; i -- ) {
            int x = h[i][0], y = h[i][1];
            g[i] = min(g[i + 1], (LL)y + x);
        }
        LL res = 0;
        for (int i = 0; i < m; i ++ ) {
            int x = h[i][0];
            if (i) {
                LL Y = (f[i - 1] + g[i]) / 2;
                LL X = Y - f[i - 1];
                if (X >= h[i - 1][0] && X <= h[i][0])
                    res = max(res, Y);
            }
            res = max(res, min(x + f[i], -x + g[i]));
        }
        return res;
    }
};
```

