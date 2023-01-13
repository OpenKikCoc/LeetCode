## [比赛链接](https://leetcode.cn/contest/biweekly-contest-93/)


### [2496. 数组中字符串的最大值](https://leetcode.cn/problems/maximum-value-of-a-string-in-an-array/)



```c++
class Solution {
public:
    int check(string & s) {
        for (auto c : s)
            if (isalpha(c))
                return s.size();
        return stoi(s);
    }
    
    int maximumValue(vector<string>& strs) {
        int res = 0;
        for (auto s : strs) {
            res = max(res, check(s));
        }
        return res;
    }
};
```


### [2497. 图中最大星和](https://leetcode.cn/problems/maximum-star-sum-of-a-graph/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = N << 1, INF = 0x3f3f3f3f;
    
    int h[N], e[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b) {
        e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    int maxStarSum(vector<int>& vals, vector<vector<int>>& edges, int k) {
        int n = vals.size();
        init();
        for (auto & e : edges)
            add(e[0], e[1]), add(e[1], e[0]);
        
        int res = -INF;
        for (int i = 0; i < n; ++ i ) {
            int t = vals[i];
            vector<int> xs;
            for (int j = h[i]; ~j; j = ne[j]) {
                int v = e[j];
                if (vals[v] >= 0)
                    xs.push_back(vals[v]);
            }
            if (xs.size()) {
                sort(xs.begin(), xs.end());
                reverse(xs.begin(), xs.end());
                
                for (int j = 0; j < k && j < xs.size(); ++ j )
                    if (xs[j] <= 0)
                        break;
                    else
                        t += xs[j];
            }
            
            res = max(res, t);
        }
        return res;
    }
};
```

### [2498. 青蛙过河 II](https://leetcode.cn/problems/frog-jump-ii/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    vector<int> sts;
    int n;
    
    bool st[N];
    
    bool check(int m) {
        memset(st, 0, sizeof st);
        
        {
            for (int i = 0, j = 0; i < n && j < n; ) {
                while (j < n && sts[j] - sts[i] <= m)
                    j ++ ;
                // j - 1 是可以到达的最远的点
                if (j - 1 == i)
                    return false;
                if (j == n)
                    break;
                i = j - 1;
                st[i] = true;   // 使用石头
            }
        }

        {
            for (int i = 0, j = 0; i < n && j < n; ) {
                while (j < n && sts[j] - sts[i] <= m)
                    j ++ ;
                {
                    int t = j - 1;
                    while (st[t])
                        t -- ;
                    if (t <= i)
                        return false;
                    i = t;
                    st[i] = true;
                }
            }
        }
        return true;
    }
    
    int maxJump(vector<int>& stones) {
        this->sts = stones, this->n = sts.size();
        
        int l = 0, r = 1e9;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (check(m))
                r = m;
            else
                l = m + 1;
        }
        return l;
    }
};
```

贪心 重要的是反证证明

```c++
class Solution {
public:
    int maxJump(vector<int>& stones) {
        int res = stones[1] - stones[0];
        for (int i = 2; i < stones.size(); ++ i )
            res = max(res, stones[i] - stones[i - 2]);
        return res;
    }
};
```



### [2499. 让数组不相等的最小总代价](https://leetcode.cn/problems/minimum-total-cost-to-make-arrays-unequal/) [TAG]

分情况讨论 需要思维推导

```c++
class Solution {
public:
    // 分情况讨论
    // x = nums1[i] = nums2[i]
    // 1. x 的众数的次数 <= 需要调整的数字总数 / 2
    //     1.1 如果总数是偶数 内部两两匹配即可【思考 为什么直接两两匹配就行? 考虑每一个至少交换一次 而两两匹配恰好满足】
    //     1.2 如果总数是奇数 【ATTENTION】
    //         则出现的数字种数至少为 3 ==> 意味着必然有一种方式使得其中一个位置与 nums1[0] 交换剩下的两两匹配 【抽屉原理】
    // 2. x 的众数的次数 > 需要调整的数字总数 / 2
    //     两两匹配后多出的众数需要与借助其他（非需要调整的）位置交换
    //     在这些不需要调整的位置中 找到 nums1&nums2 都不为种数的 交换累加即可
    //     直到把所有多出的次数都交换完
    
    using LL = long long;
    const static int N = 1e5 + 10;
    
    int c[N];
    
    long long minimumTotalCost(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        
        memset(c, 0, sizeof c);
        int cnt = 0, mode = 0, mode_cnt = 0;
        LL res = 0;
        for (int i = 0; i < n; ++ i )
            if (nums1[i] == nums2[i]) {
                int x = nums1[i];
                cnt ++ ;            // 需要调整的位置 ++
                c[x] ++ ;           // 出现的数量 ++
                if (c[x] > mode_cnt)
                    // 更新众数及众数出现的数量
                    mode = x, mode_cnt = c[x];
                
                // 必不可少的代价
                res += i;
            }
        
        // 计算除了内部两两消化之外，还需借助其他位置的数量
        // 如果众数数量未过半，则 t <= 0 可以直接跳过后续计算流程
        int t = mode_cnt - (cnt - mode_cnt);
        for (int i = 0; i < n && t > 0; ++ i )
            // 合法的可借助的位置
            if (nums1[i] != nums2[i]) {
                if (nums1[i] != mode && nums2[i] != mode) {
                    res += i;
                    t -- ;
                }
            }
        
        // 如果还有未处理的
        if (t > 0)
            return -1;
        return res;
    }
};
```
