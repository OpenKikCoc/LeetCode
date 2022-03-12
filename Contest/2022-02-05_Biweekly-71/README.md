## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-71/)


### [2160. 拆分数位后四位数字的最小和](https://leetcode-cn.com/problems/minimum-sum-of-four-digit-number-after-splitting-digits/)

略

```c++
class Solution {
public:
    string get(vector<char> & v) {
        sort(v.begin(), v.end());
        string t;
        for (auto c : v)
            t.push_back(c);
        return t;
    }
    
    int minimumSum(int num) {
        string s = to_string(num);
        int n = s.size(), res = INT_MAX;
        for (int i = 0; i < 1 << n; ++ i ) {
            vector<char> a, b;
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1)
                    a.push_back(s[j]);
                else
                    b.push_back(s[j]);
            if (a.size() && b.size()) {
                int t = stoi(get(a)) + stoi(get(b));
                // int t = 0;
                res = min(res, t);
            }
        }
        return res;
    }
};
```

更简洁

```c++
class Solution {
public:
    int minimumSum(int num) {
        int a = num / 1000, b = num / 100 % 10, c = num / 10 % 10, d = num % 10;
        int x[4] = { a, b, c, d };
        sort(x, x + 4);
        return x[0] * 10 + x[2] + x[1] * 10 + x[3];
    }
};
```

### [2161. 根据给定数字划分数组](https://leetcode-cn.com/problems/partition-array-according-to-given-pivot/)

略

```c++
class Solution {
public:
    vector<int> pivotArray(vector<int>& nums, int pivot) {
        int n = nums.size();
        vector<int> res;
        vector<bool> st(n);
        for (int i = 0; i < n; ++ i )
            if (nums[i] < pivot && !st[i])
                res.push_back(nums[i]), st[i] = true;
        for (int i = 0; i < n; ++ i )
            if (nums[i] == pivot && !st[i])
                res.push_back(nums[i]), st[i] = true;
        for (int i = 0; i < n; ++ i )
            if (nums[i] > pivot && !st[i])
                res.push_back(nums[i]), st[i] = true;
        return res;
    }
};
```

### [2162. 设置时间的最少代价](https://leetcode-cn.com/problems/minimum-cost-to-set-cooking-time/)

要么加俩 if 判断要么枚举 [0, 10000) 的范围再判断是不是等于 tartgetSeconds

**注意 if 判断条件**

```c++
class Solution {
public:
    int x, mc, pc;
    
    int get(int v) {
        int last = x, ret = 0;
        string s = to_string(v);
        for (auto c : s)
            if (c - '0' != last) {
                ret += mc + pc;
                last = c - '0';
            } else
                ret += pc;
        // cout << " v = " << v << " s = " << s << " ret = " << ret << endl;
        return ret;
    }
    
    int minCostSetTime(int startAt, int moveCost, int pushCost, int targetSeconds) {
        this-> x = startAt, this-> mc = moveCost, this-> pc = pushCost;
        int res = INT_MAX;
        if (targetSeconds / 60 < 100) {
            int m = targetSeconds / 60, s = targetSeconds % 60;
            res = min(res, get(m * 100 + s));
        }
        if (targetSeconds >= 60 && targetSeconds % 60 < 40) {
            int m = targetSeconds / 60 - 1, s = targetSeconds % 60 + 60;
            res = min(res, get(m * 100 + s));
        }
        // cout << endl;
        return res;
    }
};
```

### [2163. 删除元素后和的最小差值](https://leetcode-cn.com/problems/minimum-difference-in-sums-after-removal-of-elements/) [TAG]

一直在想排序贪心，实际上可以使用前后缀分解的思路

```c++
class Solution {
public:
    using LL = long long;
    
    long long minimumDifference(vector<int>& nums) {
        int m = nums.size(), n = m / 3;
        vector<LL> l(m + 2, INT_MAX), r(m + 2, INT_MAX);
        
        {
            priority_queue<int> heap;
            LL s = 0;
            for (int i = 1; i <= n; ++ i )
                heap.push(nums[i - 1]), s += nums[i - 1];
            l[n] = s;
            for (int i = n + 1; i <= m; ++ i ) {
                heap.push(nums[i - 1]);
                int t = heap.top(); heap.pop();
                s = s - t + nums[i - 1];
                l[i] = s;
            }
        }
        {
            priority_queue<int, vector<int>, greater<int>> heap;
            LL s = 0;
            for (int i = m; i >= n * 2 + 1; -- i )
                heap.push(nums[i - 1]), s += nums[i - 1];
            r[2 * n + 1] = s;   // ATTENTION
            for (int i = 2 * n; i >= 1; -- i ) {
                heap.push(nums[i - 1]);
                int t = heap.top(); heap.pop();
                s = s - t + nums[i - 1];
                r[i] = s;
            }
        }
        
        LL res = 1e18;
        for (int i = n; i <= 2 * n; ++ i ) {
            res = min(res, l[i] - r[i + 1]);
            // cout << "i = " << i << " l = " << l[i] << " r = " << r[i + 1] << endl;
        }
            
        return res;
    }
};
```
