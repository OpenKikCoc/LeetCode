## [比赛链接](https://leetcode.cn/contest/biweekly-contest-80/)

>   160 / 3949


### [2299. 强密码检验器 II](https://leetcode.cn/problems/strong-password-checker-ii/)

略

```c++
class Solution {
public:
    bool strongPasswordCheckerII(string s) {
        if (s.size() < 8)
            return false;
        {
            bool flag = false;
            for (auto c : s)
                if (c >= 'a' && c <= 'z') {
                    flag = true;
                    break;
                }
            if (!flag)
                return false;
        }
        
        {
            bool flag = false;
            for (auto c : s)
                if (c >= 'A' && c <= 'Z') {
                    flag = true;
                    break;
                }
            if (!flag)
                return false;
        }
        
        {
            bool flag = false;
            for (auto c : s)
                if (c >= '0' && c <= '9') {
                    flag = true;
                    break;
                }
            if (!flag)
                return false;
        }
        
        {
            bool flag = false;
            string t = "!@#$%^&*()-+";
            for (auto c : s) {
                for (auto x : t)
                    if (c == x) {
                        flag = true;
                        break;
                    }
                if (flag)
                    break;
            }
            if (!flag)
                return false;
        }
        
        for (int i = 1; i < s.size(); ++ i )
            if (s[i] == s[i - 1])
                return false;
        return true;
    }
};
```


### [2300. 咒语和药水的成功对数](https://leetcode.cn/problems/successful-pairs-of-spells-and-potions/)

略

```c++
class Solution {
public:
    using PII = pair<int, int>;
    using LL = long long;
    
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        int n = spells.size(), m = potions.size();
        
        vector<PII> xs;
        for (int i = 0; i < n; ++ i )
            xs.push_back({spells[i], i});
        sort(xs.begin(), xs.end());
        reverse(xs.begin(), xs.end());
        sort(potions.begin(), potions.end());
        
        vector<int> res(n);
        for (int i = 0, j = 0; i < n; ++ i ) {
            auto [x, id] = xs[i];
            while (j < m && (LL)x * potions[j] < success)
                j ++ ;
            res[id] = m - j;
        }
        return res;
    }
};
```

### [2301. 替换字符后匹配](https://leetcode.cn/problems/match-substring-after-replacement/)

尝试写了字符串hash 实际上暴力枚举就能过

```c++
class Solution {
public:
    unordered_map<char, unordered_set<char>> hash;
    
    int n, m;
    
    bool matchReplacement(string s, string sub, vector<vector<char>>& mappings) {
        this->n = s.size(), this->m = sub.size();
        for (auto & m : mappings) {
            char a = m[0], b = m[1];
            hash[b].insert(a);
        }
        
        for (int i = m - 1; i < n; ++ i ) {
            int l = i - m + 1, r = i;
            bool flag = true;
            for (int j = l; j <= r; ++ j ) {
                if (s[j] == sub[j - l])
                    continue;
                // cout << "i = " << i << " j = " << j << " s[j] = " << s[j] << " sub = " << sub[j - l] << endl;
                if (!hash[s[j]].count(sub[j - l])) {
                    flag = false;
                    break;
                }
            }
                
            if (flag)
                return true;
        }
        
        return false;
    }
};
```

也可以 bitset 加速

```c++
// Heltion
class Solution {
public:
    bool matchReplacement(string s, string sub, vector<vector<char>>& mappings) {
        vector<bitset<128>> mp(128);
        for (int i = 0; i < 128; i += 1) mp[i].set(i);
        for (auto v : mappings)
            mp[v[0]].set(v[1]);
        for (int i = 0; i + sub.size() <= s.size(); i += 1) {
            bool ok = true;
            for (int j = 0; j < sub.size() and ok; j += 1)
                ok = mp[sub[j]].test(s[i + j]);
            if (ok) return true;
        }
        return false;
    }
};
```

### [2302. 统计得分小于 K 的子数组数目](https://leetcode.cn/problems/count-subarrays-with-score-less-than-k/)

略

```c++
class Solution {
public:
    using LL = long long;
    
    long long countSubarrays(vector<int>& nums, long long k) {
        int n = nums.size();
        LL s = 0, res = 0;
        for (int i = 0, j = 0; j < n; ++ j ) {
            s += nums[j];
            while (i <= j && s * (j - i + 1) >= k)
                s -= nums[i], i ++ ;
            if (i <= j) {
                LL w = j - i + 1;
                // cout << " i = " << i << " j = " << j << " s = " << s << " add = " << w << endl;
                
                res += w;
            }
        }
        return res;
    }
};
```
