## [比赛链接](https://leetcode.cn/contest/biweekly-contest-75/)

>   virtual rank: 33 / 4335


### [6033. 转换数字的最少位翻转次数](https://leetcode.cn/problems/minimum-bit-flips-to-convert-number/)

略

```c++
class Solution {
public:
    int minBitFlips(int start, int goal) {
        int x = start ^ goal;
        return __builtin_popcount(x);
    }
};
```


### [6034. 数组的三角和](https://leetcode.cn/problems/find-triangular-sum-of-an-array/)

模拟 略

```c++
class Solution {
public:
    int triangularSum(vector<int>& nums) {
        while (nums.size() > 1) {
            vector<int> t;
            int n = nums.size();
            for (int i = 0; i < n - 1; ++ i )
                t.push_back((nums[i] + nums[i + 1]) % 10);
            nums = t;
        }
        return nums[0];
    }
};
```

### [6035. 选择建筑的方案数](https://leetcode.cn/problems/number-of-ways-to-select-buildings/)

前后缀分解 也有其他思路可以优化 略

```c++
class Solution {
public:
    using LL = long long;
    
    string s;
    int n;
    
    LL f(char c) {
        vector<int> l(n + 2), r(n + 2);
        for (int i = 1; i <= n; ++ i )
            if (s[i - 1] == c)
                l[i] = l[i - 1];
            else
                l[i] = l[i - 1] + 1;
        for (int i = n; i >= 1; -- i )
            if (s[i - 1] == c)
                r[i] = r[i + 1];
            else
                r[i] = r[i + 1] + 1;
        
        LL res = 0;
        for (int i = 1; i <= n; ++ i )
            if (s[i - 1] == c) {
                LL L = l[i - 1], R = r[i + 1];
                res += L * R;
            }
        return res;
    }
    
    long long numberOfWays(string s) {
        this->s = s;
        this->n = s.size();
        return f('0') + f('1');
    }
};
```

### [6036. 构造字符串的总得分和](https://leetcode.cn/problems/sum-of-scores-of-built-strings/)

拓展 kmp 略

```c++
class Solution {
public:
    using LL = long long;
    
    string s;
    int n;
    
    vector<LL> z_func() {
        vector<LL> z(n);
        for (int i = 1, l = 0, r = 0; i < n; ++ i ) {
            if (i <= r && z[i - l] < r - i + 1)
                z[i] = z[i - l];
            else {
                z[i] = max(0, r - i + 1);
                while (i + z[i] < n && s[z[i]] == s[i + z[i]])
                    z[i] ++ ;
            }
            if (i + z[i] - 1 > r)
                l = i, r = i + z[i] - 1;
        }
        return z;
    }
    
    long long sumScores(string s) {
        this->s = s, this->n = s.size();
        auto z = z_func();
        LL res = 0;
        for (auto x : z)
            res += x;
        return res + n; // 0 前缀在这里认为是 n 的长度
    }
};
```
