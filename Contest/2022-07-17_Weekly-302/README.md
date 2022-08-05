## [比赛链接](https://leetcode.cn/contest/weekly-contest-302/)

>   virtual rank: 173 / 7092


### [2341. 数组能形成多少数对](https://leetcode.cn/problems/maximum-number-of-pairs-in-array/)

略

```c++
class Solution {
public:
    vector<int> numberOfPairs(vector<int>& nums) {
        unordered_map<int, int> hash;
        for (auto x : nums)
            hash[x] ++ ;
        
        int a = 0, b = 0;
        for (auto [k, v] : hash)
            a += v / 2, hash[k] = v % 2;
        for (auto [k, v] : hash)
            if (v)
                b ++ ;
        return {a, b};
    }
};
```


### [2342. 数位和相等数对的最大和](https://leetcode.cn/problems/max-sum-of-a-pair-with-equal-sum-of-digits/)

略

```c++
class Solution {
public:
    int maximumSum(vector<int>& nums) {
        unordered_map<int, vector<int>> hash;
        for (auto x : nums) {
            int y = 0, t = x;
            while (t)
                y += t % 10, t /= 10;
            hash[y].push_back(x);
        }
        int res = -1;
        for (auto [k, v] : hash) {
            if (v.size() == 1)
                continue;
            sort(v.begin(), v.end());
            int n = v.size();
            res = max(res, v[n - 2] + v[n - 1]);
        }
        return res;
    }
};
```

### [2343. 裁剪数字后查询第 K 小的数字](https://leetcode.cn/problems/query-kth-smallest-trimmed-number/)

简单离线操作即可

另有基数排序做法 略

```c++
class Solution {
public:
    using PSI = pair<string, int>;      // string, i
    using TIII = tuple<int, int, int>;  // trim, k, i
    
    vector<int> smallestTrimmedNumbers(vector<string>& nums, vector<vector<int>>& queries) {
        vector<TIII> qs;
        for (int i = 0; i < queries.size(); ++ i )
            qs.push_back({queries[i][1], queries[i][0], i});
        sort(qs.begin(), qs.end());
        reverse(qs.begin(), qs.end());
        
        int n = nums.size(), m = nums[0].size();
        vector<PSI> ns;
        for (int i = 0; i < n; ++ i )
            ns.push_back({nums[i], i});
        sort(ns.begin(), ns.end());
        
        vector<int> res(queries.size());
        for (auto [trim, k, i] : qs) {
            if (ns[0].first.size() > trim) {
                int idx = ns[0].first.size() - trim;
                for (int j = 0; j < n; ++ j ) {
                    string s = ns[j].first;
                    ns[j].first = s.substr(idx);
                }
                sort(ns.begin(), ns.end());
            }
            res[i] = ns[k - 1].second;
        }
        return res;
    }
};
```

### [2344. 使数组可以被整除的最少删除次数](https://leetcode.cn/problems/minimum-deletions-to-make-array-divisible/)

略

```c++
class Solution {
public:
    int minOperations(vector<int>& nums, vector<int>& numsDivide) {
        int gcd = numsDivide[0];
        for (int i = 1; i < numsDivide.size(); ++ i )
            gcd = __gcd(gcd, numsDivide[i]);
        
        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size(); ++ i )
            if (gcd % nums[i] == 0)
                return i;
        return -1;
    }
};
```
