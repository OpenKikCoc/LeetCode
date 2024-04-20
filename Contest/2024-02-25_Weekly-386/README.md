## [比赛链接](https://leetcode.cn/contest/weekly-contest-386/)


### [3046. 分割数组](https://leetcode.cn/problems/split-the-array/)

实际上只要不超过 2 个重复即可，略

```c++
class Solution {
public:
    bool isPossibleToSplit(vector<int>& nums) {
        unordered_map<int, int> h;
        for (auto x : nums)
            h[x] ++ ;
        
        int d = 0;
        for (auto [k, v] : h) {
            if (v > 2)
                return false;
            d += v == 2;
        }
        return d <= nums.size() / 2;
    }
};
```


### [3047. 求交集区域内的最大正方形面积](https://leetcode.cn/problems/find-the-largest-area-of-square-inside-two-rectangles/)

枚举即可

```c++
class Solution {
public:
    // 数据范围更大点就需要扫描线 对于1e3显然可以暴力
    using LL = long long;
    
    
    long long largestSquareArea(vector<vector<int>>& bottomLeft, vector<vector<int>>& topRight) {
        int n = bottomLeft.size();
        
        LL res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < i; ++ j ) {
                int dx = max(0, min(topRight[i][0], topRight[j][0]) - max(bottomLeft[i][0], bottomLeft[j][0]));
                int dy = max(0, min(topRight[i][1], topRight[j][1]) - max(bottomLeft[i][1], bottomLeft[j][1]));
                LL w = min(dx, dy);
                res = max(res, w * w);
            }
        return res;
    }
};
```

### [3048. 标记所有下标的最早秒数 I](https://leetcode.cn/problems/earliest-second-to-mark-indices-i/)

显然有二分性质 核心在于二分校验逻辑

标记 x 时必然发生在 changeIndices[i] == x 时，有较严格条件限制，则可假定标记行为一定发生在末尾，并从前往后贪心填充即可【从前往后比从后往前实现更简单】

```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;
    const static int N = 5e3 + 10;
    
    int n;
    int ns[N];
    vector<int> cs[N];
    
    bool check(int m) {
        if (m < n)
            return false;

        vector<PII> xs;     // ATTENTION 如果是逆序往前推导 实现会非常困难 考虑从前往后尽可能早的填充靠前的
        for (int i = 1; i <= n; ++ i ) {
            auto it = lower_bound(cs[i].begin(), cs[i].end(), m + 1);
            if (it == cs[i].begin())
                return false;
            it -- ;
            xs.push_back({*it, i});
        }
        
        sort(xs.begin(), xs.end());
        int tot = 0, last = 0;
        
        for (auto [idx, v] : xs) {
            tot += idx - last;  // 新增的空位置
            if (tot < ns[v] + 1)
                return false;   // 无法填充当前数字
            tot -= ns[v] + 1;
            last = idx;
        }
        return true;
    }
    
    int earliestSecondToMarkIndices(vector<int>& nums, vector<int>& changeIndices) {
        this->n = nums.size();
        for (int i = 1; i <= n; ++ i )
            ns[i] = nums[i - 1];
        for (int i = 1; i <= changeIndices.size(); ++ i )
            cs[changeIndices[i - 1]].push_back(i);
        
        for (int i = 1; i <= n; ++ i )
            if (cs[i].empty())
                return -1;
        
        int l = 0, r = 2e9;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (check(m))
                r = m;
            else
                l = m + 1;
        }
        return check(l) ? l : -1;
    }
};
```

### [3049. 标记所有下标的最早秒数 II](https://leetcode.cn/problems/earliest-second-to-mark-indices-ii/) [TAG]

需要非常注意的是...题意和前面不一样...

本题不对标记时机做要求，则问题得以简化

校验函数需结合贪心思想 使用反悔堆维护发生 "快速消除" 的下标及相应代价即可

重复做

```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;
    const static int N = 5e3 + 10;
    
    int n;
    int ns[N];
    // vector<int> cs[N];
    int ci[N], first[N];
    LL sum = 0;
    
    bool check(int m) {
        if (m < n)
            return false;
        
        // 显然如果能一次撤销(直接打到0) 都应当一次撤销
        // 如果对于某个位置来说无法撤销 则应当尝试回滚之前的撤销取消 取消的时候应当取消回滚cost最小的
        //  ATTENTION 由于swap的情况存在 必须逆序遍历[思考]
        priority_queue<int, vector<int>, greater<int>> heap;     // cost
        
        // ATTENTION 因为需要关注最左侧的位置 因而不能像T3那样跳跃访问
        //  需要使用原始 changeIndices
        LL cnt = 0, save = 0;
        for (int i = m; i >= 1; -- i ) {
            int idx = ci[i];
            if (ns[idx] <= 1 || first[idx] < i) {   // 当前位置可以作为前面某个位置的标记操作占位
                cnt ++ ;
                continue;
            }

            if (cnt) {
                heap.push(ns[idx]);
                save += ns[idx];
                cnt -- ;
            } else {
                if (!heap.empty() && heap.top() <= ns[idx]) {
                    // swap
                    int t = heap.top();
                    save += ns[idx] - t;
                    heap.pop(), heap.push(ns[idx]);
                }
                cnt ++ ;    // ATTENTION 当前位置本身没有新增操作 可以保留这个时间【思考】
            }
        }
        // sum + n: 理论上总的操作次数
        return cnt >= sum + n - save - heap.size();
    }
    
    int earliestSecondToMarkIndices(vector<int>& nums, vector<int>& changeIndices) {
        this->n = nums.size();
        for (int i = 1; i <= n; ++ i )
            ns[i] = nums[i - 1];
        
        memset(first, 0, sizeof first);
        for (int i = changeIndices.size(); i >= 1; -- i )      // reverse for `first`
            ci[i] = changeIndices[i - 1], first[changeIndices[i - 1]] = i;

        this->sum = 0;
        for (auto x : nums)
            sum += x;
        
        int l = 0, r = changeIndices.size() + 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (check(m))
                r = m;
            else
                l = m + 1;
        }
        return (l <= changeIndices.size()/*ATTENTION*/ && check(l)) ? l : -1;
    }
};
```
