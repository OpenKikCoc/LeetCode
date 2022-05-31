## [比赛链接](https://leetcode.cn/contest/weekly-contest-293/)

>   virtual rank: 45 / 7357
>
>   0:27:20


### [2273. 移除字母异位词后的结果数组](https://leetcode.cn/problems/find-resultant-array-after-removing-anagrams/)

略

```c++
class Solution {
public:
    bool check(vector<string> & ws, int i, int j) {
        string s1 = ws[i], s2 = ws[j];
        sort(s1.begin(), s1.end());
        sort(s2.begin(), s2.end());
        return s1 == s2;
    }
    
    vector<string> removeAnagrams(vector<string>& words) {
        vector<string> res;
        int n = words.size();
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            while (j < n && check(words, i, j))
                j ++ ;
            res.push_back(words[i]);
            i = j - 1;
        }
        return res;
    }
};
```


### [2274. 不含特殊楼层的最大连续楼层数](https://leetcode.cn/problems/maximum-consecutive-floors-without-special-floors/)

略

```c++
class Solution {
public:
    int maxConsecutive(int bottom, int top, vector<int>& special) {
        special.push_back(bottom - 1), special.push_back(top + 1);
        sort(special.begin(), special.end());
        int n = special.size(), res = 0;
        for (int i = 1; i < n; ++ i )
            res = max(res, special[i] - special[i - 1] - 1);
        return res;
    }
};
```

### [2275. 按位与结果大于零的最长组合](https://leetcode.cn/problems/largest-combination-with-bitwise-and-greater-than-zero/)

显然单独考虑每一位即可 略

```c++
class Solution {
public:
    // 1e7 => 2^28
    const static int N = 29;
    
    int c[N];
    
    int largestCombination(vector<int>& candidates) {
        for (auto x : candidates)
            for (int i = 0; i < N; ++ i )
                if (x >> i & 1)
                    c[i] ++ ;
        int res = 0;
        for (int i = 0; i < N; ++ i )
            res = max(res, c[i]);
        return res;
    }
};
```

### [2276. 统计区间中的整数数目](https://leetcode.cn/problems/count-integers-in-intervals/)

区间赋值，显然珂朵莉树一遍过

注意初始化 0

```c++
class CountIntervals {
public:
    const static int INF = 2e9;
    
    int tot;
    struct Node_t {
        int l, r;
        mutable int v;
        inline bool operator<(const Node_t & o) const {
            return l < o.l;
        }
    };
    set<Node_t> odt;
    auto split(int x) {
        auto it = odt.lower_bound({x, 0, 0});
        if (it != odt.end() && it->l == x)
            return it;
        it -- ;
        auto [l, r, v] = *it;
        // ...
        odt.erase(it);
        odt.insert({l, x - 1, v});
        return odt.insert({x, r, v}).first;
    }
    void merge(set<Node_t>::iterator it) {
        if (it == odt.end() || it == odt.begin())
            return;
        auto lit = prev(it);
        auto [ll, lr, lv] = *lit;
        auto [rl, rr, rv] = *it;
        if (lv == rv) {
            odt.erase(lit), odt.erase(it), odt.insert({ll, rr, lv});
            // ...
        }
    }
    void assign(int l, int r, int v) {
        auto itr = split(r + 1), itl = split(l);
        
        // ... start
        for (auto it = itl; it != itr; ++ it ) {
            auto [tl, tr, tv] = *it;
            if (tv)
                tot -= tr - tl + 1;
        }
        tot += r - l + 1;
        // ... end
        
        odt.erase(itl, itr);
        odt.insert({l, r, v});
        merge(odt.lower_bound({l, 0, 0})), merge(itr);
    }
    
    CountIntervals() {
        tot = 0;
        odt.clear();
        odt.insert({-INF, INF, 0});
    }
    
    void add(int left, int right) {
        assign(left, right, 1);
    }
    
    int count() {
        return tot;
    }
};

/**
 * Your CountIntervals object will be instantiated and called as such:
 * CountIntervals* obj = new CountIntervals();
 * obj->add(left,right);
 * int param_2 = obj->count();
 */
```
