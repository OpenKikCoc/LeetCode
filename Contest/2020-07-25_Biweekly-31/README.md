## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-31/)

### [1523. 在区间范围内统计奇数数目](https://leetcode-cn.com/problems/count-odd-numbers-in-an-interval-range/)

显然：对于某个数 `x`  ，小于等于它的所有奇数个数为 `(x+1)/2`

```c++
    int countOdds(int low, int high) {
        return (high+1)/2-low/2;
    }
```

### [1524. 和为奇数的子数组数目](https://leetcode-cn.com/problems/number-of-sub-arrays-with-odd-sum/)

>    子数组：连续数组

前缀和思想 边处理边统计

```c++
    const int mod = 1e9+7;
    int numOfSubarrays(vector<int>& arr) {
        long long res = 0;
        int sum = 0;
        int cnt0 = 1, cnt1 = 0; // 偶奇
        for(auto v : arr) {
            sum += v;
            if(sum&1) res = res + cnt0, ++cnt1;  // 可以modadd的 这里不会超过long long所以略去
            else res = res + cnt1, ++cnt0;
        }
        return res%mod;
    }
```

### [1525. 字符串的好分割数目](https://leetcode-cn.com/problems/number-of-good-ways-to-split-a-string/)

把字符串分左右两部分 前缀和统计到某个 index 处的所有字符的个数 最后枚举分割点计算左右字符个数即可

```c++
    int numSplits(string s) {
        int n = s.size();
        int M = 26;
        vector<vector<int>> c(n+1, vector<int>(M));
        for(int i = 1; i <= n; ++i) {
            c[i] = c[i-1];
            ++c[i][s[i-1]-'a'];
        }
        int res = 0;
        for(int i = 1; i < n; ++i) {
            int flag = 0;
            int l = 0, r = 0;
            for(int j = 0; j < M; ++j) {
                if(c[i][j]) ++l;
                if(c[n][j]-c[i][j]) ++r;
            }
            if(l == r) ++res;
        }
        return res;
    }
```

### [1526. 形成目标数组的子数组最少增加次数](https://leetcode-cn.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array/) [TAG]

结论

```c++
    int minNumberOperations(vector<int>& target) {
        int res = target[0], n = target.size();
        for(int i = 1; i < n; ++i) {
            res += max(target[i] - target[i-1], 0);
        }
        return res;
    }
```
