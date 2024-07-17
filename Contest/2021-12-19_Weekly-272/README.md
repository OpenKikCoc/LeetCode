## [比赛链接](https://leetcode.cn/contest/weekly-contest-272/)

> virtual rank: 41 / 4698


### [2108. 找出数组中的第一个回文字符串](https://leetcode.cn/problems/find-first-palindromic-string-in-the-array/)

略

```c++
class Solution {
public:
    bool check(string & s) {
        int n = s.size();
        for (int i = 0, j = n - 1; i < j; ++ i , -- j )
            if (s[i] != s[j])
                return false;
        return true;
    }
    
    string firstPalindrome(vector<string>& words) {
        for (auto & w : words)
            if (check(w))
                return w;
        return "";
    }
};
```


### [2109. 向字符串添加空格](https://leetcode.cn/problems/adding-spaces-to-a-string/)

略

```c++
class Solution {
public:
    string addSpaces(string s, vector<int>& spaces) {
        int n = s.size(), m = spaces.size();
        string res;
        for (int i = 0, p = 0; i < n; ++ i ) {
            while (p < m && spaces[p] < i)
                p ++ ;
            if (p < m && spaces[p] == i)
                res.push_back(' ');
            res.push_back(s[i]);
        }
        return res;
    }
};
```

### [2110. 股票平滑下跌阶段的数目](https://leetcode.cn/problems/number-of-smooth-descent-periods-of-a-stock/)

经典双指针 略

```c++
class Solution {
public:
    using LL = long long;
    
    long long getDescentPeriods(vector<int>& prices) {
        int n = prices.size();
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n && prices[j] == prices[j - 1] - 1)
                j ++ ;
            LL k = j - i;
            res += k * (k + 1) / 2;
            i = j - 1;
        }
        return res;
    }
};
```

### [2111. 使数组 K 递增的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-make-the-array-k-increasing/)

LIS 应用 略

```c++
class Solution {
public:
    int count(vector<int> & vs) {
        vector<int> f;
        for (auto x : vs)
            if (f.empty() || f.back() <= x)
                f.push_back(x);
            else
                *lower_bound(f.begin(), f.end(), x + 1) = x;
        return vs.size() - f.size();
    }
    
    int kIncreasing(vector<int>& arr, int k) {
        vector<vector<int>> g(k);
        int n = arr.size();
        for (int i = 0; i < n; ++ i )
            g[i % k].push_back(arr[i]);
        
        int res = 0;
        for (int i = 0; i < k; ++ i )
            res += count(g[i]);
        return res;
    }
};
```
