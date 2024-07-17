## [比赛链接](https://leetcode.cn/contest/weekly-contest-239/)


### [1848. 到目标元素的最小距离](https://leetcode.cn/problems/minimum-distance-to-the-target-element/)

略

```c++
class Solution {
public:
    int getMinDistance(vector<int>& nums, int target, int start) {
        int res = 2e9, n = nums.size();
        for (int i = 0; i < n; ++ i )
            if (nums[i] == target)
                res = min(res, abs(i - start));
        return res;
    }
};
```


### [1849. 将字符串拆分为递减的连续值](https://leetcode.cn/problems/splitting-a-string-into-descending-consecutive-values/)

一开始写的比较丑

```c++
class Solution {
public:
    using LL = long long;
    int n;
    string s;
    
    bool check(int p) {
        LL v = stoll(s.substr(0, p));
        int r = p;
        while (r < n) {
            LL t = 0;
            int q = r;
            while (q < n && t * 10 + s[q] - '0' <= v - 1) {
                t = t * 10 + s[q] - '0';
                q ++ ;
            }
            if (q == r || t != v - 1)
                return false;
            r = q;
            v = t;
        }
        // return r == n;
        return true;
    }
    
    bool splitString(string s) {
        n = s.size();
        this->s = s;
        if (n == 1)
            return false;
        else if (n == 2)
            return s[0] == s[1] + 1;
        else if (n == 3)
            return stoi(s.substr(0, 1)) == stoi(s.substr(1, 2)) + 1 || stoi(s.substr(0, 2)) == stoi(s.substr(2, 1)) + 1;
        
        for (int i = 1; i < n - 1; ++ i )
            if (check(i))
                return true;
        return false;
    }
};
```

其实换 ULL 就可以省很多事

```c++
class Solution {
public:
    using ULL = unsigned long long;
    int n;
    string s;
    
    bool check(int p) {
        ULL v = stoull(s.substr(0, p));
        int r = p;
        while (r < n) {
            ULL t = 0;
            int q = r;
            while (q < n && t * 10 + s[q] - '0' <= v - 1) {
                t = t * 10 + s[q] - '0';
                q ++ ;
            }
            if (q == r || t != v - 1)
                return false;
            r = q;
            v = t;
        }
        // return r == n;
        return true;
    }
    
    bool splitString(string s) {
        n = s.size();
        this->s = s;
        if (n == 1)
            return false;
        
        for (int i = 1; i < n; ++ i )
            if (check(i))
                return true;
        return false;
    }
};
```

也可以直接二进制枚举分界位置 [TAG]

```c++
class Solution {
public:
    using ULL = unsigned long long;
    
    bool splitString(string s) {
        int n = s.size();
        for (int i = 1; i < 1 << n - 1; ++ i ) {
            bool f = true;
            ULL last = -1, x = s[0] - '0';
            for (int j = 0; j < n - 1; ++ j )
                if (i >> j & 1) {
                    if (last != -1 && x != last - 1) {
                        f = false;
                        break;
                    }
                    last = x, x = s[j + 1] - '0';
                } else
                    x = x * 10 + s[j + 1] - '0';
            if (x != last - 1)
                f = false;
            if (f)
                return true;
        }
        return false;
    }
};
```

递归

```c++
class Solution {
public:
    bool dfs(string s, long long prev, int u) {
        if (u >= s.size()) return true;
        typedef long long LL;
        for (int i = 1; u + i <= s.size(); ++ i) {
            string str = s.substr(u, i);
            LL t = stoll(str);
            if (t > 1e11) return false;
            if (prev != -1 && t > prev - 1) return false;
            if (prev == -1 && i != s.size() || prev - 1 == t) {
                if (dfs(s, t, u + i)) return true;
            }
        }
        return false;
    }
    bool splitString(string s) {
        return dfs(s, -1, 0);
    }
};
```

### [1850. 邻位交换的最小次数](https://leetcode.cn/problems/minimum-adjacent-swaps-to-reach-the-kth-smallest-number/) [TAG]

转化为归并排序

```c++
class Solution {
public:
    int getMinSwaps(string num, int k) {
        string ori = num;
        while (k -- )
            next_permutation(num.begin(), num.end());
        
        int n = ori.size();
        vector<int> c(n);
        int cnt[10] = {0};
        for (int i = 0; i < n; ++ i ) {
            int x = ori[i] - '0';
            cnt[x] ++ ;
            int y = cnt[x];
            // 找对应的该数的位置
            for (int j = 0; j < n; ++ j )
                if (num[j] - '0' == x && -- y == 0) {
                    c[i] = j;
                    break;
                }
        }
        int res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                if (c[i] > c[j])
                    res ++ ;
        return res;
    }
};
```

### [1851. 包含每个查询的最小区间](https://leetcode.cn/problems/minimum-interval-to-include-each-query/) [TAG]

细节

```c++
class Solution {
public:
    // 并查集 经典模型 疯狂的馒头
    vector<int> xs, p, w;
    
    int find(int x) {
        if (p[x] != x)
            p[x] = find(p[x]);
        return p[x];
    }
    
    int get(int x) {
        return lower_bound(xs.begin(), xs.end(), x) - xs.begin();
    }
    
    vector<int> minInterval(vector<vector<int>>& segs, vector<int>& queries) {
        for (auto & s : segs)
            xs.push_back(s[0]), xs.push_back(s[1]);
        for (auto x : queries)
            xs.push_back(x);
        sort(xs.begin(), xs.end());
        xs.erase(unique(xs.begin(), xs.end()), xs.end());
        
        int n = xs.size();
        p.resize(n + 1), w.resize(n + 1, -1);
        for (int i = 0; i < n + 1; ++ i )
            p[i] = i;
        
        // 按区间长度排序 优先染短区间【细节】
        sort(segs.begin(), segs.end(), [](vector<int> & a, vector<int> & b) {
            return a[1] - a[0] < b[1] - b[0];
        });
        
        for (auto & s : segs) {
            int l = get(s[0]), r = get(s[1]), len = s[1] - s[0] + 1;
            while (find(l) <= r) {
                l = find(l);
                w[l] = len;
                p[l] = l + 1;
            }
        }
        
        vector<int> res;
        for (auto x : queries)
            res.push_back(w[get(x)]);
        return res;
    }
};
```
