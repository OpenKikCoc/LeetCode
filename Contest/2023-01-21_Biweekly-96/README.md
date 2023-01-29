## [比赛链接](https://leetcode.cn/contest/biweekly-contest-96/)


### [2540. 最小公共值](https://leetcode.cn/problems/minimum-common-value/)



```c++
class Solution {
public:
    int getCommon(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> hash;
        for (auto x : nums1)
            hash[x] ++ ;
        for (auto x : nums2)
            if (hash.count(x))
                return x;
        return -1;
    }
};
```


### [2541. 使数组中所有元素相等的最小操作数 II](https://leetcode.cn/problems/minimum-operations-to-make-array-equal-ii/)



```c++
class Solution {
public:
    using LL = long long;
    
    long long minOperations(vector<int>& nums1, vector<int>& nums2, int k) {
        int n = nums1.size();
        if (k == 0) {
            for (int i = 0; i < n; ++ i )
                if (nums1[i] != nums2[i])
                    return -1;
            return 0;
        }
        LL a = 0, b = 0;
        for (int i = 0; i < n; ++ i ) {
            LL d = nums1[i] - nums2[i];
            if (d % k)
                return -1;
            LL t = d / k;
            if (t >= 0)
                a += t;
            else
                b -= t;
        }
        if (a != b)
            return -1;
        return a;
    }
};
```

### [2542. 最大子序列的分数](https://leetcode.cn/problems/maximum-subsequence-score/)

经典题

贪心 + 堆维护

```c++
class Solution {
public:
    using LL = long long;
    using PII = pair<int, int>;
    
    long long maxScore(vector<int>& nums1, vector<int>& nums2, int k) {
        int n = nums1.size();
        vector<PII> xs;
        for (int i = 0; i < n; ++ i )
            xs.push_back({nums2[i], nums1[i]});
        sort(xs.begin(), xs.end());
        
        LL res = 0;
        
        priority_queue<int, vector<int>, greater<int>> heap;
        LL s = 0;
        for (int i = n - k + 1; i <= n; ++ i )
            heap.push(xs[i - 1].second), s += xs[i - 1].second;
        res = max(res, s * xs[n - k + 1 - 1].first);
        
        for (int i = n - k; i >= 1; -- i ) {
            LL minv = xs[i - 1].first;
            {
                heap.push(xs[i - 1].second);
                s += xs[i - 1].second;
            }
            {
                int t = heap.top(); heap.pop();
                s -= t;
            }
            res = max(res, s * minv);
        }
        
        return res;
    }
};
```

### [2543. 判断一个点是否可以到达](https://leetcode.cn/problems/check-if-point-is-reachable/) [TAG]

猜结论

```c++
class Solution {
public:
    bool isReachable(int targetX, int targetY) {
        while (targetX % 2 == 0)
            targetX /= 2;
        while (targetY % 2 == 0)
            targetY /= 2;
        
        return __gcd(targetX, targetY) == 1;
    }
};
```

结论：$(1,1)$ 能走到 $(x,y)$，当且仅当 $x$ 和 $y$ 的最大公因数是 $2$ 的若干次方。

更易理解地：前两种操作不改变横纵坐标的最大公约数，后两种操作可以使得最大公约数乘以 2。因此我们最终点的横纵坐标的最大公约数是 2 的幂次。

