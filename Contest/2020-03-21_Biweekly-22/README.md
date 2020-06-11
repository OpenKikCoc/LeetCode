## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-22/)


### [1385. 两个数组间的距离值](https://leetcode-cn.com/problems/find-the-distance-value-between-two-arrays/)

「**距离值**」 定义为符合此描述的元素数目：对于元素 `arr1[i]` ，不存在任何元素 `arr2[j]` 满足 `|arr1[i]-arr2[j]| <= d` 。

```c++
class Solution {
public:
    int findTheDistanceValue(vector<int>& arr1, vector<int>& arr2, int d) {
        int res = 0;
        for(auto v1 : arr1) {
            bool flag = true;
            for(auto v2 : arr2) {
                if(abs(v1-v2) <= d) {flag = false; break;}
            }
            if(flag) ++res;
        }
        return res;
    }
};
```

也可以排序二分查找最接近arr1[i]的值

### [1386. 安排电影院座位](https://leetcode-cn.com/problems/cinema-seat-allocation/)  [TAG]

2-9位 连续4个0的情况统计

```c++
class Solution {
public:
    // 2-5 4-7 6-9
    int maxNumberOfFamilies(int n, vector<vector<int>>& reservedSeats) {
        int l = 0b11110000;
        int m = 0b11000011;
        int r = 0b00001111;
        
        unordered_map<int, int> occupied;
        for(auto v : reservedSeats) {
            if(v[1] > 1 && v[1] < 10) {
                occupied[v[0]] |= 1<<(v[1] - 2);
            }
        }
        int res = (n-occupied.size())*2;
        //cout <<res<<endl;
        for(auto v : occupied) {
            if(((v.second|l) == l) || ((v.second|r) == r) || ((v.second|m) == m)) ++res;
        }
        return res;
    }
};
```

或者

```c++
class Solution {
public:
    int maxNumberOfFamilies(int n, vector<vector<int>>& re) {
        unordered_map<int, unordered_set<int>> s;
        int cnt = 0;
        bool f = 0;
        for(auto it : re) {
            s[it[0]].insert(it[1]);
        }
        for(auto it : s) {
            f = 0;
            if(!it.second.count(2) && !it.second.count(3) && !it.second.count(4) && !it.second.count(5)) ++cnt, f = 1;
            if(!it.second.count(6) && !it.second.count(7) && !it.second.count(8) && !it.second.count(9)) ++cnt, f = 1;
            if(!it.second.count(4) && !it.second.count(5) && !it.second.count(6) && !it.second.count(7) && !f) ++cnt;
        }
        return cnt + 2 * (n - s.size());
    }
};
```



### [1387. 将整数按权重排序](https://leetcode-cn.com/problems/sort-integers-by-the-power-value/)

定义权重为如下操作次数 直至变为1:

如果 x 是偶数，那么 x = x / 2
如果 x 是奇数，那么 x = 3 * x + 1

返回区间权重排序后的第k个

```c++
class Solution {
public:
    int getKth(int lo, int hi, int k) {
        vector<pair<int,int>> res;
        int v, cnt;
        for(int i = lo; i <= hi; ++i) {
            cnt = 0, v = i;
            while(v != 1) {
                if(v&1) v = v*3+1;
                else v /= 2;
                ++cnt;
            }
            res.push_back({cnt,i});
        }
        sort(res.begin(), res.end());
        return res[k-1].second;
    }
};
```

求权重可以借助记忆化搜索优化

```c++
class Solution {
public:
    unordered_map <int, int> f;

    int getF(int x) {
        if (f.find(x) != f.end()) return f[x];
        if (x == 1) return f[x] = 0;
        if (x & 1) return f[x] = getF(x * 3 + 1) + 1;
        else return f[x] = getF(x / 2) + 1;
    }

    int getKth(int lo, int hi, int k) {
        vector <int> v;
        for (int i = lo; i <= hi; ++i) v.push_back(i);
        sort(v.begin(), v.end(), [&] (int u, int v) {
            if (getF(u) != getF(v)) return getF(u) < getF(v);
            else return u < v;
        });
        return v[k - 1];
    }
};
```



### [1388. 3n 块披萨](https://leetcode-cn.com/problems/pizza-with-3n-slices/) [TAG]

一圈 取披萨 求最优

题意转化：

> 给一个长度为 3n3*n* 的环状序列，你可以在其中选择 n*n* 个数，并且任意两个数不能相邻，求这 n*n* 个数的最大值。

环状序列相较于普通序列，相当于添加了一个限制：普通序列中的第一个和最后一个数不能同时选。这样以来，我们只需要对普通序列进行两遍动态即可得到答案，第一遍动态规划中我们删去普通序列中的第一个数，表示我们不会选第一个数；第二遍动态规划中我们删去普通序列中的最后一个数，表示我们不会选最后一个数。将这两遍动态规划得到的结果去较大值，即为在环状序列上的答案。

```c++
class Solution {
public:
    int calculate(const vector<int>& slices) {
        int n = slices.size();
        int choose = (n + 1) / 3;
        vector<vector<int>> dp(n + 1, vector<int>(choose + 1));
        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j <= choose; ++j) {
                dp[i][j] = max(dp[i - 1][j], (i - 2 >= 0 ? dp[i - 2][j - 1] : 0) + slices[i - 1]);
            }
        }
        return dp[n][choose];
    }

    int maxSizeSlices(vector<int>& slices) {
        vector<int> v1(slices.begin() + 1, slices.end());
        vector<int> v2(slices.begin(), slices.end() - 1);
        int ans1 = calculate(v1);
        int ans2 = calculate(v2);
        return max(ans1, ans2);
    }
};
```
