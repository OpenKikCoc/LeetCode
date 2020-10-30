## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-11/)


### [1228. 等差数列中缺失的数字](https://leetcode-cn.com/problems/missing-number-in-arithmetic-progression/)

投票统计法 然后校验 liouzhou_101和自己思路一致

赛榜还有两次扫描（1.等差计数2.判断是否等差计数为1）的做法

题解区有求和利用等差公式的做法

```c++
    int missingNumber(vector<int>& arr) {
        int n = arr.size();
        int c = 1, d = arr[1] - arr[0];
        for(int i = 2; i < n; ++i) {
            if(arr[i] - arr[i-1] == d) ++c;
            else {
                --c;
                if(!c) c = 1, d = arr[i] - arr[i-1];
            }
        }
        for(int i = 1; i < n; ++i)
            if(arr[i] - arr[i-1] != d) return arr[i-1] + d;
        // d = 0
        return arr[0];
    }
```


### [1229. 安排会议日程](https://leetcode-cn.com/problems/meeting-scheduler/)

预选 + 暴力判断

可以双指针过 todo

```c++
    vector<int> minAvailableDuration(vector<vector<int>>& slots1, vector<vector<int>>& slots2, int duration) {
        vector<vector<int>> s1, s2;
        for(auto & s : slots1) if(s[0] + duration <= s[1]) s1.push_back(s);
        for(auto & s : slots2) if(s[0] + duration <= s[1]) s2.push_back(s);
        int n1 = s1.size(), n2 = s2.size();
        vector<int> res{INT_MAX, INT_MAX};
        int l, r;
        for(int i = 0; i < n1; ++i)
            for(int j = 0; j < n2; ++j) {
                l = max(s1[i][0], s2[j][0]), r = min(s1[i][1], s2[j][1]);
                if(l + duration <= r && l < res[0]) res[0] = l, res[1] = l+duration;
            }
        if(res[0] == INT_MAX) return vector<int>{};
        return res;
    }
```

### [1230. 抛掷硬币](https://leetcode-cn.com/problems/toss-strange-coins/)

线性 dp

```c++
    double probabilityOfHeads(vector<double>& prob, int target) {
        int n = prob.size();
        // f[i][j] 表示抛 i 个有 j 个正面朝上的概率
        // f[i][j] = f[i][j]*(1-prob[i]) + f[i-1][j-1] * prob[i];
        vector<vector<double>> f(n+1, vector<double>(n+1));
        f[0][0] = 1;
        for(int i = 1; i <= n; ++i) {
            f[i][0] = f[i-1][0] * (1.0 - prob[i-1]);
            // for(int j = 1; j <= target && j <= i; ++j) 优化
            for(int j = 1; j <= i; ++j)
                f[i][j] = f[i-1][j]*(1.0 - prob[i-1]) + f[i-1][j-1] * prob[i-1];
        }
        return f[n][target];
    }
```

### [1231. 分享巧克力](https://leetcode-cn.com/problems/divide-chocolate/)

二分即可

```c++
    vector<int> ss;
    int n, tot, K;
    bool check(int m) {
        // 最小间隔是m
        int c = 0, sum = 0;
        for(int i = 0; i < n; ++i) {
            sum += ss[i];
            if(sum >= m) {
                ++c;
                sum = 0;
            }
        }
        return c >= K+1;
    }
    int maximizeSweetness(vector<int>& sweetness, int K) {
        this->ss = sweetness;
        this->n = ss.size();
        this->K = K;
        tot = 0;
        for(auto & v : ss) tot += v;
        int l = 0, r = tot;
        while(l < r) {
            int m = l + (r-l)/2;
            //cout << l << " " << r << " " << m << endl;
            // 要找到刚好不行的最小值 返回最小值-1
            if(check(m)) l = m + 1;
            else r = m;
        }
        // ATTENTION: 这里需要先检查 l
        if(check(l)) return l;
        return l-1;
    }
```
