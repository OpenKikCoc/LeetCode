## [比赛链接](https://leetcode.cn/contest/biweekly-contest-49/)

16 min

virtual ranking: 86 / 3193

### [1812. 判断国际象棋棋盘中一个格子的颜色](https://leetcode.cn/problems/determine-color-of-a-chessboard-square/)

对角线和奇偶性即可

```c++
class Solution {
public:
    bool squareIsWhite(string coordinates) {
        return ((coordinates[0] - 'a' + 1) + (coordinates[1])) & 1;
    }
};
```

```c++
class Solution {
public:
    bool squareIsWhite(string c) {
        return (c[0] + c[1]) % 2;
    }
};
```

或 各自奇偶性

```c++
class Solution {
public:
    bool squareIsWhite(string a) {
        return (a[0] % 2) != (a[1] % 2);
    }
};
```

### [1813. 句子相似性 III](https://leetcode.cn/problems/sentence-similarity-iii/)

模拟即可

```c++
class Solution {
public:
    vector<string> get(string a) {
        istringstream in(a);
        string s;
        vector<string> ret;
        while (in >> s)
            ret.push_back(s);
        return ret;
    }
    
    bool check(string a, string b) {
        auto va = get(a);
        auto vb = get(b);
        int sza = va.size(), szb = vb.size();
        if (sza < szb) {
            swap(va, vb);
            swap(sza, szb);
        }
        // sza >= szb
        int p1 = 0;
        while (p1 < szb && va[p1] == vb[p1])
            p1 ++ ;
        reverse(va.begin(), va.end());
        reverse(vb.begin(), vb.end());
        int p2 = 0;
        while (p2 < szb && va[p2] == vb[p2])
            p2 ++ ;
        return p1 + p2 >= szb;
    }
    
    bool areSentencesSimilar(string sentence1, string sentence2) {
        return check(sentence1, sentence2);
    }
};
```

### [1814. 统计一个数组中好对子的数目](https://leetcode.cn/problems/count-nice-pairs-in-an-array/)

线性统计即可

```c++
class Solution {
public:
    using LL = long long;
    const int MOD = 1e9 + 7;
    
    int rev(int x) {
        string xs = to_string(x);
        while (xs.size() > 1 && xs.back() == 0)
            xs.pop_back();
        reverse(xs.begin(), xs.end());
        return stoi(xs);
    }
    
    int countNicePairs(vector<int>& nums) {
        unordered_map<int, int> hash;
        int n = nums.size();
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            int t = nums[i] - rev(nums[i]);
            if (hash.count(t))
                res = (res + hash[t]) % MOD;
            hash[t] ++ ;
        }
        return res;
    }
};
```

也可以

```c++
class Solution {
public:
    int countNicePairs(vector<int>& nums) {
        unordered_map<int, int> cnt;
        for (auto t: nums) {
            int x = t;
            string s = to_string(x);
            reverse(s.begin(), s.end());
            int y = stoi(s);
            cnt[x - y] ++ ;
        }
        const int MOD = 1e9 + 7;
        int res = 0;
        for (auto [k, v]: cnt)
            res = (res +  (long long)v * (v - 1) / 2) % MOD;
        return res;
    }
};
```

### [1815. 得到新鲜甜甜圈的最多组数](https://leetcode.cn/problems/maximum-number-of-groups-getting-fresh-donuts/) [TAG]

典型模拟退火 【数据范围不大 答案和顺序有关】

```c++
class Solution {
public:
    int n, m;
    vector<int> w;
    int res;
    
    int calc() {
        int ret = 1;
        for (int i = 0, s = 0; i < n; ++ i ) {
            s = (s + w[i]) % m;
            if (!s && i < n - 1)
                ret ++ ;
        }
        res = max(res, ret);
        return ret;
    }
    
    void simulate_anneal() {
        random_shuffle(w.begin(), w.end());
        for (double t = 1e6; t > 1e-5; t *= 0.97) {
            int a = rand() % n, b = rand() % n;
            int x = calc();
            swap(w[a], w[b]);
            int y = calc();
            int delta = x - y;
            if (!(exp(-delta / t) > (double)rand() / RAND_MAX))
                swap(w[a], w[b]);
        }
    }
    
    int maxHappyGroups(int batchSize, vector<int>& groups) {
        w = groups;
        n = w.size();
        m = batchSize;
        res = 0;
        for (int i = 0; i < 80; ++ i )
            simulate_anneal();
        return res;
    }
};
```

或者状态压缩 但需要对状态表示进行优化（编码）

```c++
int c[10], d[10];
int pw[10];
int f[1000010];

class Solution {
public:
    int maxHappyGroups(int b, vector<int>& groups) {
        memset(c, 0, sizeof c);
        memset(f, 0, sizeof f);
        
        for (auto v : groups)
            c[v % b] ++ ;

        // 编码        
        int mx = 1;
        pw[0] = 1;
        for (int i = 0; i < b; ++ i ) {
            mx *= (c[i] + 1);
            pw[i + 1] = pw[i] * (c[i] + 1);
        }
        
        int res = 0;
        f[0] = 1;
        for (int i = 1; i < mx; ++ i ) {
            int x = i, s = 0;
            for (int j = 0; j < b; ++ j ) {
                // 映射
                d[j] = x % (c[j] + 1);
                x /= (c[j] + 1);

                if (d[j] > 0)
                    f[i] = max(f[i], f[i - pw[j]]);
                // d[j]频次 j值
                s = (s + d[j] * j) % b;
            }
            res = max(res, f[i]);
            if (s == 0)
                f[i] ++ ;
        }
        return res;
    }
};
```
