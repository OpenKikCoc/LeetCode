## [比赛链接](https://leetcode.cn/contest/biweekly-contest-45/)


### [1748. 唯一元素的和](https://leetcode.cn/problems/sum-of-unique-elements/)

略

```c++
class Solution {
public:
    int sumOfUnique(vector<int>& nums) {
        unordered_map<int, int> hash;
        for (auto v : nums) hash[v] ++ ;
        int res = 0;
        for (auto [k, v] : hash)
            if (v == 1)
                res += k;
        return res;
    }
};
```


### [1749. 任意子数组和的绝对值的最大值](https://leetcode.cn/problems/maximum-absolute-sum-of-any-subarray/)

记录之前的 min max 即可

```c++
class Solution {
public:
    int maxAbsoluteSum(vector<int>& nums) {
        int n = nums.size();
        int f1 = 0, f2 = 0, s = 0, res = 0;
        for (int i = 0; i < n; ++ i ) {
            s += nums[i];
            res = max(res, max(abs(s - f1), abs(s - f2)));
            f1 = min(f1, s), f2 = max(f2, s);
        }
        return res;
    }
};
```

### [1750. 删除字符串两端相同字符后的最短长度](https://leetcode.cn/problems/minimum-length-of-string-after-deleting-similar-ends/)

模拟 注意最后留一个不能再删

```c++
class Solution {
public:
    int minimumLength(string s) {
        int n = s.size();
        int l = 0, r = n - 1;
        while (l < r) {
            char c1 = s[l], c2 = s[r];
            if (c1 != c2) break;
            while (l <= r && s[l] == c1) ++ l ;
            while (l <= r && s[r] == c2) -- r ;
        }
        return r - l + 1;
    }
};
```

### [1751. 最多可以参加的会议数目 II](https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended-ii/)

如果权值1 显然可以堆

线性dp 略

```c++
class Solution {
public:
    using LL = long long;
    int maxValue(vector<vector<int>>& events, int k) {
        int n = events.size();
        sort(events.begin(), events.end(),
             [](const vector<int> & a, const vector<int> & b) {
                return a[1] < b[1];
        });
        events.insert(events.begin(), vector<int>{0, 0, 0});
        
        vector<vector<LL>> f(n + 1, vector<LL>(k + 1));
        f[0][0] = 0;
        
        for (int i = 1; i <= n; ++ i ) {
            int l = 0, r = i - 1;
            while (l < r) {
                int mid = l + r >> 1;
                if (events[mid + 1][1] >= events[i][0]) r = mid;
                else l = mid + 1;
            }
            
            f[i][0] = 0;
            for (int j = 1; j <= k; ++ j )
                f[i][j] = max(f[i - 1][j], f[l][j - 1] + events[i][2]);
        }
        return f[n][k];
    }
};
```
