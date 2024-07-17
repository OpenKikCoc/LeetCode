## [比赛链接](https://leetcode.cn/contest/weekly-contest-278/)

>   virtual rank 150 AK


### [2154. 将找到的值乘以 2](https://leetcode.cn/problems/keep-multiplying-found-values-by-two/)

略

```c++
class Solution {
public:
    int findFinalValue(vector<int>& nums, int original) {
        unordered_set<int> S;
        for (auto x : nums)
            S.insert(x);
        int res = original;
        while (S.count(res))
            res *= 2;
        return res;
    }
};
```


### [2155. 分组得分最高的所有下标](https://leetcode.cn/problems/all-divisions-with-the-highest-score-of-a-binary-array/)

略

```c++
class Solution {
public:
    vector<int> maxScoreIndices(vector<int>& nums) {
        int n = nums.size();
        vector<int> s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + nums[i - 1];
        
        int t = 0;
        vector<int> v(n + 1);
        for (int i = 0; i <= n; ++ i ) {
            int l = i - s[i], r = s[n] - s[i];
            v[i] = l + r;
            t = max(t, l + r);
        }
        vector<int> res;
        for (int i = 0; i <= n; ++ i )
            if (v[i] == t)
                res.push_back(i);
        return res;
    }
};
```

### [2156. 查找给定哈希值的子串](https://leetcode.cn/problems/find-substring-with-given-hash-value/) [TAG]

非常好的非常规【字符串hash】结合滑动窗口

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 2e4 + 10;
    
    int P, M;
    LL p[N];
    
    string subStrHash(string s, int power, int modulo, int k, int hashValue) {
        this->P = power, this->M = modulo;
        int n = s.size();
        {
            p[0] = 1;
            for (int i = 1; i <= n; ++ i )
                p[i] = p[i - 1] * P % M;
        }
        
        int res = 0;
        LL x = 0;
        for (int i = n - k; i < n; ++ i )
            x = (x + p[i - (n - k)] * (s[i] - 'a' + 1) % M) % M;
        if (x == hashValue)
            res = n - k; // DO NOT return, its the last not the first
        
        for (int i = n - 1; i >= k; -- i ) {
            int j = i - k;
            x = ((x - p[k - 1] * (s[i] - 'a' + 1) % M) % M + M) % M;
            x = (x * P % M + (s[j] - 'a' + 1) % M) % M;
            if (x == hashValue)
                // return s.substr(i - k, k); // DO NOT return, its the last not the first
                res = i - k;
        }
        return s.substr(res, k);
    }
};
```

### [2157. 字符串分组](https://leetcode.cn/problems/groups-of-strings/)

很好的并查集应用题

```c++
class Solution {
public:
    const static int N = 2e4 + 10;
    
    int p[N], sz[N];
    void init() {
        for (int i = 0; i < N; ++ i )
            p[i] = i, sz[i] = 1;
    }
    int find(int x) {
        if (p[x] != x)
            p[x] = find(p[x]);
        return p[x];
    }
    void merge(int a, int b) {
        p[a] = b;
        sz[b] += sz[a];
    }
    
    vector<int> groupStrings(vector<string>& words) {
        int n = words.size();
        vector<int> st(n);
        for (int i = 0; i < n; ++ i ) {
            auto & w = words[i];
            int x = 0;
            for (auto c : w)
                x += 1 << (c - 'a');
            st[i] = x;
        }
        
        unordered_map<int, vector<int>> hash;
        for (int i = 0; i < n; ++ i )
            hash[st[i]].push_back(i);
        
        init();
        // inner
        for (auto & [x, ids] : hash) {
            int m = ids.size();
            for (int i = 1; i < m; ++ i ) {
                int pa = find(ids[i - 1]), pb = find(ids[i]);
                if (pa != pb)
                    merge(pa, pb);
            }
        }
        
        // outer
        for (auto & [x, ids] : hash) {
            int a = ids[0];
            // add or sub
            for (int i = 0; i < 26; ++ i ) {
                int nx = x ^ (1 << i);
                if (hash.count(nx)) {
                    int b = hash[nx][0];
                    int pa = find(a), pb = find(b);
                    if (pa != pb)
                        merge(pa, pb);
                }
            }
            // modify
            for (int i = 0; i < 26; ++ i )
                if (x >> i & 1)
                    for (int j = 0; j < 26; ++ j )
                        if ((x >> j & 1) == 0) {
                            int nx = x ^ (1 << i) ^ (1 << j);
                            if (hash.count(nx)) {
                                int b = hash[nx][0];
                                int pa = find(a), pb = find(b);
                                if (pa != pb)
                                    merge(pa, pb);
                            }
                        }
        }
        
        vector<int> res(2);
        for (int i = 0; i < n; ++ i )
            if (i == find(i))
                res[0] ++ , res[1] = max(res[1], sz[i]);
        return res;
    }
};
```
