## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-62/)


### [2022. 将一维数组转变成二维数组](https://leetcode-cn.com/problems/convert-1d-array-into-2d-array/)

简单模拟

```c++
class Solution {
public:
    vector<vector<int>> construct2DArray(vector<int>& original, int m, int n) {
        if (original.size() != m * n)
            return {};
        vector<vector<int>> res(m, vector<int>(n));
        for (int i = 0, k = 0; i < m; ++ i )
            for (int j = 0; j < n; ++ j )
                res[i][j] = original[k ++ ];
        return res;
    }
};
```


### [2023. 连接后等于目标字符串的字符串对](https://leetcode-cn.com/problems/number-of-pairs-of-strings-with-concatenation-equal-to-target/)

模拟 略

```c++
class Solution {
public:
    int numOfPairs(vector<string>& nums, string target) {
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < n; ++ j )
                if (i != j) {
                    if (nums[i] + nums[j] == target)
                        res ++ ;
                }
        return res;
    }
};
```

### [2024. 考试的最大困扰度](https://leetcode-cn.com/problems/maximize-the-confusion-of-an-exam/)

简单滑动窗口 略

```c++
class Solution {
public:
    int maxConsecutiveAnswers(string s, int k) {
        int n = s.size(), res = 0;
        {
            // T
            for (int l = 0, r = 0, cnt = 0; r < n; ++ r ) {
                if (s[r] != 'T')
                    cnt ++ ;
                while (l <= r && cnt > k)
                    if (s[l ++ ] != 'T')
                        cnt -- ;
                res = max(res, r - l + 1);
            }
        }
        {
            // F
            for (int l = 0, r = 0, cnt = 0; r < n; ++ r ) {
                if (s[r] != 'F')
                    cnt ++ ;
                while (l <= r && cnt > k)
                    if (s[l ++ ] != 'F')
                        cnt -- ;
                res = max(res, r - l + 1);
            }
        }
        return res;
    }
};
```

### [2025. 分割数组的最多方案数](https://leetcode-cn.com/problems/maximum-number-of-ways-to-partition-an-array/) [TAG]

显然有分情况讨论

**重点在于将修改一个数造成后缀部分全部被动修改的结果化为偏移**

**维护偏移量来统一计数**

```c++
class Solution {
public:
    using LL = long long;
    
    int waysToPartition(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;
        
        vector<LL> s(n);
        for (int i = 0; i < n; ++ i )
            s[i] = (i ? s[i - 1] : 0) + nums[i];
        
        {
            // do not modify
            int ret = 0;
            for (int i = 0; i < n - 1; ++ i )
                if (s[i] == s[n - 1] - s[i])
                    ret ++ ;
            res = max(res, ret);
        }
        {
            // modify once
            // ATTENTION 枚举每个位置 通过hash-table找出符合要求的分界点的数量
            // 改变位置分别是 [前缀or后缀] 时的出现情况
            unordered_map<LL, int> l, r;
            // 细节 n - 1
            for (int i = 0; i < n - 1; ++ i )
                l[s[i]] ++ ;
            for (int i = n - 1; i >= 0; -- i ) {
                // 细节 n - 1
                if (i < n - 1)
                    l[s[i]] -- , r[s[i]] ++ ;
                
                // change the i-th item, get new sum
                LL sum = s[n - 1] - nums[i] + k;
                if (sum & 1)
                    continue;
                LL tar = sum >> 1;
                // ATTENTION: tar - k + nums[i]
                // 核心在于改变当前数字后后缀都会发生偏移 所以找偏移前的数值
                res = max(res, l[tar] + r[tar - k + nums[i]]);
            }
        }
        
        return res;
    }
};
```
