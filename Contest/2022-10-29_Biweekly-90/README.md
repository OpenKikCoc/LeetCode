## [比赛链接](https://leetcode.cn/contest/biweekly-contest-90/)


### [6225. 差值数组不同的字符串](https://leetcode.cn/problems/odd-string-difference/)



```c++
class Solution {
public:
    string oddString(vector<string>& words) {
        map<vector<int>, vector<string>> hash;
        for (auto & w : words) {
            int n = w.size();
            vector<int> t;
            for (int i = 1; i < n; ++ i )
                t.push_back(w[i] - w[i - 1]);
            hash[t].push_back(w);
        }
        for (auto [k, v] : hash)
            if (v.size() == 1)
                return v.back();
        return "";
    }
};
```


### [6228. 距离字典两次编辑以内的单词](https://leetcode.cn/problems/words-within-two-edits-of-dictionary/)



```c++
class Solution {
public:
    bool check(string & a, string & b) {
        int n = a.size(), c = 0;
        for (int i = 0; i < n; ++ i )
            if (a[i] != b[i]) {
                c ++ ;
                if (c > 2)
                    break;
            }
        return c <= 2;
    }
    
    vector<string> twoEditWords(vector<string>& queries, vector<string>& dictionary) {
        vector<string> res;
        for (auto & q : queries) {
            bool flag = false;
            for (auto & d : dictionary)
                if (check(q, d)) {
                    flag = true;
                    break;
                }
            if (flag)
                res.push_back(q);
        }
        return res;
    }
};
```

### [6226. 摧毁一系列目标](https://leetcode.cn/problems/destroy-sequential-targets/)



```c++
class Solution {
public:
    int destroyTargets(vector<int>& nums, int space) {
        int n = nums.size();
        unordered_map<int, int> h1, h2;
        for (int i = 0; i < n; ++ i ) {
            int t = nums[i] % space;
            h1[t] ++ ;
            if (h2.count(t)) {
                h2[t] = min(h2[t], nums[i]);
            } else
                h2[t] = nums[i];
        }
        
        int p = -1;
        for (auto [k, v] : h1)
            if (p == -1 || h1[p] < v || h1[p] == v && h2[p] > h2[k])
                p = k;
        return h2[p];
    }
};
```

### [6227. 下一个更大元素 IV](https://leetcode.cn/problems/next-greater-element-iv/)

显然离线思想 => 按大小降序和坐标顺序排序 依次加入并查询

```c++
class Solution {
public:
    // 从大到小 从前往后 查询并加入
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    int tr[N];
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int y) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += y;
    }
    int query(int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    bool check(int m, int p) {
        return query(m) - query(p) < 2;
    }
    
    vector<int> secondGreaterElement(vector<int>& nums) {
        int n = nums.size();
        
        vector<PII> xs;
        for (int i = 1; i <= n; ++ i )
            xs.push_back({nums[i - 1], -i});
        sort(xs.begin(), xs.end());
        reverse(xs.begin(), xs.end());
        
        memset(tr, 0, sizeof tr);
        vector<int> res(n, -1);
        for (int i = 1; i <= n; ++ i ) {
            auto [x, p] = xs[i - 1];
            p = -p;
            
            int l = p, r = n + 1;
            while (l < r) {
                int m = l + r >> 1;
                if (check(m, p))
                    l = m + 1;
                else
                    r = m;
            }
            if (l != n + 1)
                res[p - 1] = nums[l - 1];	// ATTENTION p-1 instead of i-1
            
            if (query(p) - query(p - 1) == 0)
                add(p, 1);
        }
        
        return res;
    }
};
```

可以不用 BIT 而是直接使用 set 进一步优化时间复杂度

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    vector<int> secondGreaterElement(vector<int>& nums) {
        int n = nums.size();
        vector<PII> xs;
        for (int i = 0; i < n; ++ i )
            xs.push_back({nums[i], i});
        sort(xs.begin(), xs.end()); // 不关心第二维 因为后面会 while 统一处理
        reverse(xs.begin(), xs.end());
        
        vector<int> res(n, -1);
        
        set<int> S;
        S.insert(n + 10), S.insert(n + 11); // 哨兵
        
        for (int i = 0; i < n; ++ i ) {
            auto [x, p] = xs[i];
            int j = i + 1;
            while (j < n && xs[j].first == x)
                j ++ ;
            
            // 这一堆相同的数 放在一起统一处理
            for (int k = i; k < j; ++ k ) {
                auto it = S.lower_bound(xs[k].second);  // ATTENTION 加入的是坐标
                it ++ ;
                if (*it < n)
                    res[xs[k].second] = nums[*it];
            }
            for (int k = i; k < j; ++ k )
                S.insert(xs[k].second);                 // ATTENTION 加入的是坐标
            i = j - 1;
        }
        return res;
    }
};
```

