## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-245)

rank: 146 / 4270


### [5784. 重新分配字符使所有字符串都相等](https://leetcode-cn.com/problems/redistribute-characters-to-make-all-strings-equal/)

直接统计个数即可

```c++
class Solution {
public:
    bool makeEqual(vector<string>& words) {
        int n = words.size();
        unordered_map<char, int> hash;
        for (auto w : words)
            for (auto c : w)
                hash[c] ++ ;
        for (auto [k, v] : hash)
            if (v % n)
                return false;
        return true;
    }
};
```


### [5786. 可移除字符的最大数目](https://leetcode-cn.com/problems/maximum-number-of-removable-characters/)

显然具有单调性 二分即可

```c++
class Solution {
public:
    string s, p;
    vector<int> rm;
    int ns, np;
    
    bool check(int m) {
        vector<bool> st(ns + 1);
        for (int i = 0; i < m; ++ i )
            st[rm[i]] = true;
        int idx = 0;
        for (int i = 0; i < ns; ++ i )
            if (!st[i] && s[i] == p[idx])
                idx ++ ;
        return idx >= np;
    }
    
    int maximumRemovals(string s, string p, vector<int>& removable) {
        ns = s.size(), np = p.size();
        this->s = s, this->p = p;
        this->rm = removable;
        int l = 0, r = rm.size() + 1;
        while (l < r) {
            int m = l + r >> 1;
            if (check(m))
                l = m + 1;
            else
                r = m;
        }
        return l - 1;
    }
};
```



```python
class Solution:
    def maximumRemovals(self, s: str, p: str, nums: List[int]) -> int:
        def check(k):
            st = [False] * ns
            for i in range(k):
                st[nums[i]] = True
            j = 0
            for i in range(ns):
                if not st[i] and j < np and s[i] == p[j]:  # python字符串最后不是'/0' 
                    j += 1
            #         if j == np:
            #             return True
            # return False
            return j >= np
        
        ns, np = len(s), len(p)
        n = len(nums)
        l, r = 0, n + 1
        while l < r:
            m = l + (r - l) // 2
            if check(m):
                l = m + 1
            else:
                r = m 
        return l - 1
```







### [5785. 合并若干三元组以形成目标三元组](https://leetcode-cn.com/problems/merge-triplets-to-form-target-triplet/)

显然只有**某纬度最大的**理应发挥作用 遍历即可

```c++
class Solution {
public:
    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
        int mx1 = 0, mx2 = 0, mx3 = 0;
        for (auto & ts : triplets)
            if (ts[0] <= target[0] && ts[1] <= target[1] && ts[2] <= target[2])
                mx1 = max(mx1, ts[0]), mx2 = max(mx2, ts[1]), mx3 = max(mx3, ts[2]);
        return mx1 == target[0] && mx2 == target[1] && mx3 == target[2];
    }
};
```





### [5787. 最佳运动员的比拼回合](https://leetcode-cn.com/problems/the-earliest-and-latest-rounds-where-players-compete/)

显然二进制枚举搜索即可

**比赛时忘了加记忆化 TLE 数次... 加行记忆化就过...**

**加强搜索敏感度**

```c++
class Solution {
public:
    int n, p1, p2;
    int minr, maxr;
    
    unordered_set<int> S;
    
    void dfs(int st, int d) {
        if (S.count(st))
            return;
        S.insert(st);
        
        int sz = __builtin_popcount(st);
        if (sz < 2)
            return;
        
        int cp = sz / 2;
        
        vector<int> ve;
        for (int i = 0; i < n; ++ i )
            if (st >> i & 1)
                ve.emplace_back(i);
        
        for (int i = 0; i < cp; ++ i )
            if (ve[i] + 1 == p1 && ve[sz - i - 1] + 1 == p2 || ve[i] + 1 == p2 && ve[sz - i - 1] + 1 == p1) {
                minr = min(minr, d), maxr = max(maxr, d);
                return;
            }
        
        // 某位为1则对应前半部分被淘汰
        for (int i = 0; i < 1 << cp; ++ i ) {
            int t = st;
            for (int j = 0; j < cp; ++ j )
                if (i >> j & 1)
                    t ^= 1 << ve[j];
                else
                    t ^= 1 << ve[sz - j - 1];
            if ((t >> (p1 - 1) & 1) == 0 || (t >> (p2 - 1) & 1) == 0)
                continue;
            
            dfs(t, d + 1);
        }
    }
    
    vector<int> earliestAndLatest(int n, int firstPlayer, int secondPlayer) {
        this->n = n, this->p1 = firstPlayer, this->p2 = secondPlayer;
        minr = 2e9, maxr = -2e9;
        
        dfs((1 << n) - 1, 1);
        
        return {minr, maxr};
    }
};
```