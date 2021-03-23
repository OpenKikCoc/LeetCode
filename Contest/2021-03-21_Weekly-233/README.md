## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-233/)


### [1800. 最大升序子数组和](https://leetcode-cn.com/problems/maximum-ascending-subarray-sum/)

暴力即可 自己线性做法可以应对数据范围更大的情况

```c++
class Solution {
public:
    int maxAscendingSum(vector<int>& nums) {
        int n = nums.size();
        int res = 0;
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1, t = nums[i];
            while (j < n && nums[j] > nums[j - 1])
                t += nums[j ++ ] ;
            res = max(res, t);
            i = j - 1;
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    int maxAscendingSum(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n);
        dp[0] = nums[0];
        for (int i = 1; i < n; ++i) {
            if (nums[i] > nums[i - 1]) dp[i] = dp[i - 1] + nums[i];
            else dp[i] = nums[i];
        }
        return *max_element(dp.begin(), dp.end());
    }
};
```

### [1801. 积压订单中的订单总数](https://leetcode-cn.com/problems/number-of-orders-in-the-backlog/)

堆排即可 略

```c++
class Solution {
public:
    const int MOD = 1e9 + 7;
    using PII = pair<int, int>;
    using LL = long long;
    int getNumberOfBacklogOrders(vector<vector<int>>& orders) {
        priority_queue<PII, vector<PII>, greater<PII>> sells;
        priority_queue<PII, vector<PII>, less<PII>> buys;
        int n = orders.size();
        for (int i = 0; i < n; ++ i ) {
            auto & os = orders[i];
            int cnt = os[1], type = os[2], price = os[0];
            if (type) {
                while (buys.size() && buys.top().first >= price) {
                    auto [t_price, t_cnt] = buys.top(); buys.pop();
                    int cost = min(cnt, t_cnt);
                    cnt -= cost, t_cnt -= cost;
                    if (t_cnt) {
                        buys.push({t_price, t_cnt});
                        break;
                    }
                }
                // 1 sell
                if (cnt)
                    sells.push({price, cnt});
            } else {
                while (sells.size() && sells.top().first <= price) {
                    auto [t_price, t_cnt] = sells.top(); sells.pop();
                    int cost = min(cnt, t_cnt);
                    cnt -= cost, t_cnt -= cost;
                    if (t_cnt) {
                        sells.push({t_price, t_cnt});
                        break;
                    }
                }
                // 0 buy
                if (cnt)
                    buys.push({price, cnt});
            }
        }
        
        LL res = 0;
        while (buys.size()) {
            auto [p, c] = buys.top(); buys.pop();
            res = (res + c) % MOD;
        }
        while (sells.size()) {
            auto [p, c] = sells.top(); sells.pop();
            res = (res + c) % MOD;
        }
            
        return res;
    }
};
```

### [1802. 有界数组中指定下标处的最大值](https://leetcode-cn.com/problems/maximum-value-at-a-given-index-in-a-bounded-array/)

注意细节 有好几个超时的 case

```c++
class Solution {
public:
    int maxValue(int n, int index, int maxSum) {
        maxSum -= n;
        int v = 1, w = 0;
        while (maxSum) {
            int tot = min(index + w, n - 1) - max(index - w, 0) + 1;
            if (tot >= n) {
                // 扩张已经无用了
                v += maxSum / n;
                break;
            }
            if (maxSum >= tot) {
                maxSum -= tot;
                v ++ ;
                w ++ ;
            } else
                break;
        }
        return v;
    }
};
```

大量用二分的 也可以 复杂度稍高一些

注意 用二分的方法在具体计算时仍要借助公式优化计算过程 否则仍然TLE

```c++
class Solution {
public:
    long long getSum(int len, int mx) {
        long long a, b, more = 0;
        if (len >= mx) {
            a = 1, b = mx;
            more = len - mx;
        } else {
            a = mx - len + 1;
            b = mx;
            more = 0;
        }
        
        long long c = (b - a + 1);
        return (a + b) * c / 2 + more;
    }
    
    int maxValue(int n, int index, int maxSum) {
        int l = 0, r = maxSum;
        while (l < r) {
            int mid = (l + r + 1) / 2;
            long long sum = getSum(index + 1, mid) + getSum(n - index, mid) - mid;
            if (sum <= maxSum) {
                l = mid;
            } else {
                r = mid - 1;
            }
        }
        return l;
    }
};
```

### [1803. 统计异或值在范围内的数对有多少](https://leetcode-cn.com/problems/count-pairs-with-xor-in-a-range/) [TAG]

显然 Trie 注意求区间变为区间减 以及在 query 中的实现

```c++
class Solution {
public:
    const static int N = 16;
    int son[1 << N][2], v[1 << N], cnt;
    
    void insert(int x) {
        int p = 0;
        for (int i = 15; i >= 0; -- i ) {
            int t = x >> i & 1;
            if (!son[p][t])
                son[p][t] = ++ cnt ;
            p = son[p][t];
            v[p] ++ ;
        }
    }
    
    // 求小于等于 hi 的节点个数
    int query(int x, int hi) {
        int p = 0, res = 0;
        for (int i = 15; i >= 0; -- i ) {
            int t = x >> i & 1, k = hi >> i & 1;
            if (k) {
                // k = 1 则当前位可以和以前的数值异或 0/1 均合法
                // 相同值产生异或结果为0 直接累加即可
                if (son[p][t])
                    res += v[son[p][t]];
                // 不同值不存在 直接返回
                if (!son[p][!t])
                    return res;
                p = son[p][!t];
            } else {
                // k = 0 只能选择异或结果为0的分支
                if (!son[p][t])
                    return res;
                p = son[p][t];
            }
        }
        res += v[p];
        return res;
    }
    
    int countPairs(vector<int>& nums, int low, int high) {
        memset(son, 0, sizeof son);
        memset(v, 0, sizeof v);
        cnt = 0;
        
        int res = 0;
        for (auto v : nums) {
            insert(v);
            res += query(v, high) - query(v, low - 1);
        }
        return res;
    }
};
```
