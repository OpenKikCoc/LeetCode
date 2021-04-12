## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-235/)


### [1816. 截断句子](https://leetcode-cn.com/problems/truncate-sentence/)

略

```c++
class Solution {
public:
    string truncateSentence(string s, int k) {
        istringstream in(s);
        vector<string> ve;
        while (in >> s)
            ve.push_back(s);
        while (ve.size() > k)
            ve.pop_back();
        string res;
        for (auto v : ve)
            res += v + " ";
        if (res.size())
            res.pop_back();
        return res;
    }
};
```


### [1817. 查找用户活跃分钟数](https://leetcode-cn.com/problems/finding-the-users-active-minutes/)

略

```c++
class Solution {
public:
    vector<int> findingUsersActiveMinutes(vector<vector<int>>& logs, int k) {
        unordered_map<int, unordered_set<int>> hash;
        for (auto & l : logs) {
            int id = l[0], time = l[1];
            hash[id].insert(time);
        }
        
        vector<int> res(k);
        for (auto [_, s] : hash)
            res[s.size() - 1] ++ ;
        return res;
    }
};
```

### [1818. 绝对差值和](https://leetcode-cn.com/problems/minimum-absolute-sum-difference/)

显然二分

注意再开个数组排序 如果直接用 `set<int>` 超时

注意取左右两侧的写法

```c++
class Solution {
public:
    using LL = long long;
    const int MOD = 1e9 + 7;
    int minAbsoluteSumDiff(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        LL s = 0;
        vector<int> ve;
        for (int i = 0; i < n; ++ i ) {
            s += abs(nums1[i] - nums2[i]);
            ve.push_back(nums1[i]);
        }
        sort(ve.begin(), ve.end());
        
        LL res = s;
        for (int i = 0; i < n; ++ i ) {
            int t = lower_bound(ve.begin(), ve.end(), nums2[i]) - ve.begin();
            if (t < n)
                res = min(res, s - abs(nums1[i] - nums2[i]) + abs(ve[t] - nums2[i]));
            if (t > 0)
                res = min(res, s - abs(nums1[i] - nums2[i]) + abs(ve[t - 1] - nums2[i]));
        }
        return res % MOD;
    }
};
```

### [1819. 序列中不同最大公约数的数目](https://leetcode-cn.com/problems/number-of-different-subsequences-gcds/)

逆向考虑枚举每一个 GCD 即可

```c++
ass Solution {
public:
    int countDifferentSubsequenceGCDs(vector<int>& nums) {
        vector<bool> st(200010);
        int mxv = 0;
        for (auto v : nums) {
            mxv = max(mxv, v);
            st[v] = true;
        }
        
        int res = 0;
        for (int i = 1; i <= mxv; ++ i ) {
            int g = -1;
            for (int j = i; j <= mxv; j += i)
                if (st[j]) {
                    if (g == -1)
                        g = j;
                    else
                        g = __gcd(j, g); // ATTENTION
                }
            if (g == i)
                res ++ ;
        }
        return res;
    }
};
```
