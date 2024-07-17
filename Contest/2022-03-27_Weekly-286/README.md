## [比赛链接](https://leetcode.cn/contest/weekly-contest-286)


### [5268. 找出两数组的不同](https://leetcode.cn/problems/find-the-difference-of-two-arrays/)

略

```c++
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> s1, s2;
        for (auto x : nums1)
            s1.insert(x);
        for (auto x : nums2)
            s2.insert(x);
        
        vector<vector<int>> res;
        {
            vector<int> t;
            for (auto x : s1)
                if (s2.find(x) == s2.end())
                    t.push_back(x);
            res.push_back(t);
        }
        {
            vector<int> t;
            for (auto x : s2)
                if (s1.find(x) == s1.end())
                    t.push_back(x);
            res.push_back(t);
        }
        return res;
    }
};
```


### [5236. 美化数组的最少删除数](https://leetcode.cn/problems/minimum-deletions-to-make-array-beautiful/)

贪心 略

```c++
class Solution {
public:
    int minDeletion(vector<int>& nums) {
        int n = nums.size();
        vector<int> t;
        for (int i = 0; i < n; ++ i ) {
            if (t.size() % 2 == 0 || (t.empty() || nums[i] != t.back()))
                t.push_back(nums[i]);
        }
        if (t.size() & 1)
            t.pop_back();
        return n - t.size();
    }
};
```

### [5253. 找到指定长度的回文数](https://leetcode.cn/problems/find-palindrome-with-fixed-length/) [TAG]

观察 折半 构造

```c++
class Solution {
public:
    // 1e15 数据范围较大 观察知当前长度的第k大也即折半后的第k大 故直接折半构造
    using LL = long long;
    
    vector<long long> kthPalindrome(vector<int>& queries, int intLength) {
        int m = (intLength + 1) / 2;
        LL base = pow(10, m - 1), upper = base * 9;
        vector<LL> res;
        for (auto x : queries)
            // ATTENTION: base * 9, not base * 10
            if (x <= upper) {
                LL v = base + x - 1;
                string s = to_string(v);
                if (intLength & 1) {
                    int n = s.size();
                    for (int i = n - 2; i >= 0; -- i )
                        s.push_back(s[i]);
                    res.push_back(stoll(s));
                } else {
                    int n = s.size();
                    for (int i = n - 1; i >= 0; -- i )
                        s.push_back(s[i]);
                    res.push_back(stoll(s));
                }
            } else
                res.push_back(-1);
        return res;
    }
};
```

### [5269. 从栈中取出 K 个硬币的最大面值和](https://leetcode.cn/problems/maximum-value-of-k-coins-from-piles/)

简单分组背包 略

```c++
class Solution {
public:
    const static int N = 1e3 + 10, M = 2e3 + 10;
    
    int f[2][M], s[M];
    
    int maxValueOfCoins(vector<vector<int>>& piles, int k) {
        memset(f, 0xcf, sizeof f);  // -inf
        f[0][0] = 0;
        int n = piles.size();
        for (int i = 1; i <= n; ++ i ) {
            auto & p = piles[i - 1];
            int m = p.size();
            s[0] = 0;
            for (int j = 1; j <= m; ++ j )
                s[j] = s[j - 1] + p[j - 1];
            
            int now = i & 1, pre = (i - 1) & 1;
            for (int j = 0; j <= k; ++ j ) {
                f[now][j] = f[pre][j];
                for (int z = 0; z <= m && j - z >= 0; ++ z )
                    f[now][j] = max(f[now][j], f[pre][j - z] + s[z]);
            }
        }
        return f[n & 1][k];
    }
};
```
