## [比赛链接](https://leetcode.cn/contest/biweekly-contest-122/)


### [3010. 将数组分成最小总代价的子数组 I](https://leetcode.cn/problems/divide-an-array-into-subarrays-with-minimum-cost-i/)

找后门最小即可 略

```c++
class Solution {
public:
    int minimumCost(vector<int>& nums) {
        int res = nums[0];
        int minv_1 = 1e9, minv_2 = 1e9;
        for (int i = 1; i < nums.size(); ++ i ) {
            int x = nums[i];
            if (x < minv_1) {
                minv_2 = minv_1, minv_1 = x;
            } else if (x == minv_1 || x <= minv_2) {
                minv_2 = x;
            }
        }
        return res + minv_1 + minv_2;
    }
};
```


### [3011. 判断一个数组是否可以变为有序](https://leetcode.cn/problems/find-if-array-can-be-sorted/)

经典联通性 略

```c++
class Solution {
public:
    
    int get(int x) {
        return __builtin_popcount(x);
    }
    
    bool canSortArray(vector<int>& nums) {
        vector<int> tar = nums;
        sort(tar.begin(), tar.end());
        
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            vector<int> t;
            while (j < n && get(nums[i]) == get(nums[j]))
                t.push_back(nums[j ++ ]);
            sort(t.begin(), t.end());
            for (int k = i; k < j; ++ k )
                nums[k] = t[k - i];
            // cout << " i = " << i << " j = " << j <<  endl;
            i = j - 1;
        }
        
        return tar == nums;
    }
};
```

### [3012. 通过操作使数组长度最小](https://leetcode.cn/problems/minimize-length-of-array-using-operations/) [TAG]

思维题

```c++
class Solution {
public:
    // 本质: 任意挑两个数，小的干掉大的并能够在末尾留下 [小的/0]
    //      => 1. 消耗较大的数，结果最后只剩下一堆最小的数
    //         2. 这堆最小的数内部消耗
    //  容易知道，如果最小的数只有 1 个，最终答案就是 1
    //  如果不止一个，需要探索能够构造一个比全局最小数更小的数
    //      ATTNTION 自己想的是相邻数字取模...
    //      实际上可以直接对【最小的数字取模】...【思维】
    using PII = pair<int, int>;
    
    bool check(vector<PII> & t, int v) {
        for (int i = 0; i < t.size(); ++ i ) {
            // WRONG
            // int mod = t[i].first % t[i - 1].first;
            
            int mod = t[i].first % v;
            if (mod /*non-zero*/ && mod < v)
                return true;
        }
        return false;
    }
    
    int minimumArrayLength(vector<int>& nums) {
        unordered_map<int, int> h;
        for (auto x : nums)
            h[x] ++ ;
        
        vector<PII> t;
        for (auto [k, v] : h)
            t.push_back({k, v});
        sort(t.begin(), t.end());

        auto x = t[0].second;
        if (x == 1)
            return 1;
        else if (check(t, t[0].first))
            return 1;
        
        return (x + 1) / 2;
    }
};
```

### [3013. 将数组分成最小总代价的子数组 II](https://leetcode.cn/problems/divide-an-array-into-subarrays-with-minimum-cost-ii/) [TAG]

标准滑动窗口

```c++
using LL = long long;
struct Magic {
    int K;
    // s1 保存前 k 小值，s2 保存其它
    multiset<LL> s1, s2;
    LL sum;

    Magic(int K): K(K), sum(0) {}

    // 简化后续维护操作
    void adjust() {
        while (s1.size() < K && s2.size() > 0) {
            LL t = *(s2.begin());
            s2.erase(s2.begin());
            s1.insert(t);
            sum += t;
        }
        while (s1.size() > K) {
            LL t = *(s1.rbegin());
            s1.erase(prev(s1.end()));
            s2.insert(t);
            sum -= t;
        }
    }

    void add(LL x) {
        if (!s2.empty() && x >= *(s2.begin()))
            s2.insert(x);
        else
            s1.insert(x), sum += x;
        adjust();
    }

    void sub(LL x) {
        auto it = s1.find(x);
        if (it != s1.end())
            s1.erase(it), sum -= x;
        else
            s2.erase(s2.find(x));
        adjust();
    }
};

class Solution {
public:
    // 一开始想复杂了
    // 实际上题目只要求 第二&第K 二者之间呢不超过 dist 而非所有端点都不超过
    // => 枚举第 k 段的起始位置，滑动窗口维护前面 k-2 个最小值的总和即可

    long long minimumCost(vector<int>& nums, int k, int dist) {
        int n = nums.size();

        Magic m(k - 2); // 初始化窗口

        for (int i = 1; i < k - 1; ++ i )
            m.add(nums[i]);
        
        LL res = m.sum + nums[k - 1];   // 默认情况: 最后一个数组以 k-1 起始
        for (int i = k; i < n; ++ i ) {
            int t = i - dist - 1;
            if (t > 0)
                m.sub(nums[t]);
            m.add(nums[i - 1]);
            // ATTENTION nums[i] 是最后一个，m 维护的是中间的 k-2 个
            res = min(res, m.sum + nums[i]);
        }
        return res + nums[0];
    }
};
```
