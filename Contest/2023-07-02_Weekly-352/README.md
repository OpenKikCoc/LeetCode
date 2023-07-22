## [比赛链接](https://leetcode.cn/contest/weekly-contest-352/)


### [2760. 最长奇偶子数组](https://leetcode.cn/problems/longest-even-odd-subarray-with-threshold/)



```c++
class Solution {
public:
    // 要求: 偶数开头 奇偶交叉 且不大于 threshold
    int longestAlternatingSubarray(vector<int>& nums, int threshold) {
        int n = nums.size();
        for (int w = n; w >= 1; -- w ) {
            bool flag = false;
            for (int i = 0; i + w - 1 < n; ++ i ) {
                if (nums[i] & 1)
                    continue;
                
                int j = i + w - 1;
                bool t = true;
                for (int x = i; x <= j; ++ x )
                    if (nums[x] > threshold) {
                        t = false;
                        break;
                    }
                for (int x = i; x < j; ++ x )
                    if (nums[x] % 2 == nums[x + 1] % 2) {
                        t = false;
                        break;
                    }
                if (t) {
                    flag = true;
                    break;
                }
            }
            if (flag)
                return w;
        }
        return 0;
    }
};
```


### [2761. 和等于目标值的质数对](https://leetcode.cn/problems/prime-pairs-with-target-sum/)

这类需要预处理的 最好只初始化一次

```c++
// n <= 1e6
const static int N = 1e6 + 10;
static bool flag;

int primes[N], cnt;
bool st[N];
void init() {
    if (flag)
        return;
    flag = true;

    cnt = 0;
    memset(st, 0, sizeof st);
    for (int i = 2; i < N; ++ i ) {
        if (!st[i])
            primes[cnt ++ ] = i;
        for (int j = 0; primes[j] <= (N - 1) / i; ++ j ) {
            st[primes[j] * i] = true;
            if (i % primes[j] == 0)
                break;
        }
    }
}

class Solution {
public:
    vector<vector<int>> findPrimePairs(int n) {
        init();
        
        vector<vector<int>> res;
        for (int i = 0, j = cnt - 1; i <= j; ++ i ) {
            while (i < j && primes[i] + primes[j] > n)
                j -- ;
            // cout << "  i = " << i << " j = " << j << endl;
            if (primes[i] + primes[j] == n)
                res.push_back({primes[i], primes[j]});
        }
        // cout << " ===== " << endl;
        return res;
    }
};
```

### [2762. 不间断子数组](https://leetcode.cn/problems/continuous-subarrays/)

显然是双指针 要更快想到

```c++
class Solution {
public:
    // 1e5 数据范围显然不能 n^2
    // 考虑 每个位置作为右端点，左端点都有哪些选择
    //  => 可以 sliding window【要能更快地想到】
    using LL = long long;
    using PLI = pair<LL, int>;
    const static int N = 1e5 + 10;
    
    int q[N];
    multiset<PLI> S;
    bool valid() {
        if (S.size() <= 1)
            return true;
        auto minv = (*S.begin()).first;
        auto maxv = (*S.rbegin()).first;
        return maxv <= minv + 2;
    }
    
    long long continuousSubarrays(vector<int>& nums) {
        int n = nums.size();
        LL res = 0;
        for (int l = 0, r = 0; r < n; ++ r ) {
            S.insert({nums[r], r});    // ATTENTION 考虑到升序排序
            while (l < r && !valid()) {
                S.erase(S.find({nums[l], l}));
                l ++ ;
            }
            res += (r - l) + 1;
        }
        return res;
    }
};
```

### [2763. 所有子数组中不平衡数字之和](https://leetcode.cn/problems/sum-of-imbalance-numbers-of-all-subarrays/)

显然是经典的暴力优化 边遍历边维护计数值

```c++
class Solution {
public:
    // 1e3 显然最多 n^2logn
    //  枚举左右端点 枚举右端点过程中【维护计数值】

    int sumImbalanceNumbers(vector<int>& nums) {
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            map<int, int> h;
            int t = 0;
            for (int j = i; j < n; ++ j ) {
                int x = nums[j];
                // 已存在的情况 计数值没有任何变化
                if (h[x]) {
                    res += t;
                    continue;
                }

                // 不存在的情况 会新增一个数值
                //  此时
                //  - [-1, +1] 减少一个
                //  - [-1,  _] 不变
                //  - [ _, +1] 不变
                //  - [ _,  _] 根据左右侧有没有判断是否会增加   // ATTENTION 如果都有要-1

                h[x] ++ ;   // 方便后续查找迭代器

                if (h.count(x - 1) && h.count(x + 1))       // ATTENTION h[x-1] 会直接创建 default 值
                    t -- ;
                else if (!h.count(x - 1) && !h.count(x + 1)) {
                    int l = 0, r = 0;
                    if (h.lower_bound(x) != h.begin())      // x 左侧存在其他值
                        l = 1;
                    if (h.upper_bound(x) != h.end())        // x 右侧存在其他值
                        r = 1;
                    
                    t += l + r - (l && r ? 1 : 0);          // 如果左右都存在，则还要-1
                } // else do nothing

                h[x] ++ ;
                res += t;
            }
        }
        return res;
    }
};
```
