## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-30/)

### [1507. 转变日期格式](https://leetcode-cn.com/problems/reformat-date/)

略

```c++
    string reformatDate(string date) {
        string y,m,d;
        int n = date.size(), p = 0;
        while(p < n && date[p] >= '0' && date[p] <= '9') d += date[p++];
        if(d.size() < 2) d = "0"+d;
        while(date[p] != ' ') ++p;
        ++p;
        string mon = date.substr(p, 3);
        if(mon == "Jan") m = "01";
        else if(mon == "Feb") m = "02";
        else if(mon == "Mar") m = "03";
        else if(mon == "Apr") m = "04";
        else if(mon == "May") m = "05";
        else if(mon == "Jun") m = "06";
        else if(mon == "Jul") m = "07";
        else if(mon == "Aug") m = "08";
        else if(mon == "Sep") m = "09";
        else if(mon == "Oct") m = "10";
        else if(mon == "Nov") m = "11";
        else if(mon == "Dec") m = "12";
        while(date[p] != ' ') ++p;
        ++p;
        while(p < n) y += date[p++];
        return y + "-" + m + "-" + d;
    }
```

### [1508. 子数组和排序后的区间和](https://leetcode-cn.com/problems/range-sum-of-sorted-subarray-sums/)

模拟600ms

```c++
    const int mod = 1e9+7;
    int rangeSum(vector<int>& nums, int n, int l, int r) {
        vector<int> t, pre(n);
        int sum = 0;

        for(int i = 0; i < n; ++i) {
            pre[i] = nums[i] + (i?pre[i-1]:0);
            for(int j = 0; j < i; ++j) {
                t.push_back(pre[i] - pre[j]);
            }
            t.push_back(pre[i]);
        }
        sort(t.begin(), t.end());
        //for(auto v : t) cout <<v<<" ";
        //cout <<endl;
        long long res = 0;
        for(int i = l-1; i < r; ++i) res = (t[i]%mod + res) % mod;
        return res;
    }
```

### [1509. 三次操作后最大值与最小值的最小差](https://leetcode-cn.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves/)

可以任意修改三个数字 求修改后的最大最小值差

排序后有四种可能 比较取最小即可

```c++
    int minDifference(vector<int>& nums) {
        int n = nums.size();
        if(n <= 4) return 0;
        sort(nums.begin(), nums.end());
        int res = INT_MAX;
        for(int i = 0; i <= 3; ++i) {
            //cout <<nums[n-4+i]<<" "<<nums[i]<<endl;
            res = min(res, nums[n-4+i] - nums[i]);
        }
        return res;
    }
```

### [1510. 石子游戏 IV](https://leetcode-cn.com/problems/stone-game-iv/)

博弈dp 决策是取平方数

```c++
    bool winnerSquareGame(int n) {
        vector<bool> f(n+1);
        f[1] = true;
        for(int i = 2; i <= n; ++i) {
            for(int j = 1; i - j*j >= 0; ++j) {
                f[i] = !f[i-j*j];
                if(f[i]) break;
            }
        }
        return f[n];
    }

    bool winnerSquareGame(int n) {
        vector<bool> f(n+1);
        for(int i = 1; i <= n; ++i) {
            for(int j = 1; i - j*j >= 0; ++j) {
                f[i] = !f[i-j*j];
                if(f[i]) break;
            }
        }
        return f[n];
    }
```
