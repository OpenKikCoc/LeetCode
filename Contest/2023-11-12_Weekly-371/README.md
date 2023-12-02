## [比赛链接](https://leetcode.cn/contest/weekly-contest-371/)

>   virtual rank:
>
>   128 / 3637
>
>   19  0:58:15  0:03:09  0:09:12  0:28:05 1  0:48:15 1


### [2932. 找出强数对的最大异或值 I](https://leetcode.cn/problems/maximum-strong-pair-xor-i/)



```c++
class Solution {
public:
    int maximumStrongPairXor(vector<int>& nums) {
        int ret = 0, n = nums.size();
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j ) {
                int x = nums[i], y = nums[j];
                if (abs(x - y) <= min(x, y))
                    ret = max(ret, x ^ y);
            }
        return ret;
    }
};
```


### [2933. 高访问员工](https://leetcode.cn/problems/high-access-employees/)



```c++
class Solution {
public:
    int parse(string & s) {
        int h = (s[0] - '0') * 10 + s[1] - '0';
        int m = (s[2] - '0') * 10 + s[3] - '0';
        return h * 60 + m;
    }
    
    bool check(vector<string> & xs) {
        int n = xs.size();
        if (n < 3)
            return false;
        for (int i = 2; i < n; ++ i ) {
            string a = xs[i - 2], b = xs[i];
            int t1 = parse(a), t2 = parse(b);
            if (t2 - t1 < 60)
                return true;
        }
        return false;
    }
    
    vector<string> findHighAccessEmployees(vector<vector<string>>& access_times) {
        unordered_map<string, vector<string>> h;
        for (auto & ts : access_times)
            h[ts[0]].push_back(ts[1]);
        
        vector<string> res;
        for (auto & [k, v] : h) {
            sort(v.begin(), v.end());
            if (check(v))
                res.push_back(k);
        }
        return res;
    }
};
```

### [2934. 最大化数组末位元素的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-maximize-last-elements-in-arrays/)

思考 注意no发生变化的条件

```c++
class Solution {
public:
    // 分析题意 对于某一个具体的下标i 其只能被分配到具体的一个数组中
    //  以末尾不调换为例，计算结果x【如果末尾调换，n-x即可】
    
    int minOperations(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        int x1 = nums1.back(), x2 = nums2.back();
        int res = 0, no = 0;
        for (int i = 0; i < n; ++ i ) {
            int a = nums1[i], b = nums2[i];
            // 考虑此时的大小关系
            if (a <= x1 && b <= x2) {
                // do nothing
                if (a <= x2 && b <= x1)
                    no ++ ; // ATTENTION 注意条件
            } else {
                // 不管有多少种情况，本质都需要尝试调换
                if (a <= x2 && b <= x1) {
                    res ++ ;
                } else
                    return -1;
            }
        }
        return min(res, n - res - no);
    }
};
```

### [2935. 找出强数对的最大异或值 II](https://leetcode.cn/problems/maximum-strong-pair-xor-ii/)

经典暴力优化

双指针(单调性证明) + Trie(删除操作)

```c++
class Solution {
public:
    // 较显然的，需要针对第一题的实现做 "暴力优化"
    //     考虑将强数对的条件发生转化: 排序后，当前位置的元素向前找，差值不能超过当前元素值的所有位置中，异或值最大的
    // => 显然 双指针扫描 + Trie维护 且结合了动态删除
    
    // ATTENTION N 的取值需要是 length * 20
    // 【因为值域原因，每个值都可能产生20个trie中的节点】
    const static int N = 5e4 * 20 + 10, M = 22;
    
    int tr[N][2], cnt[N], idx;
    
    void init() {
        memset(tr, 0, sizeof tr);
        idx = 0;
    }
    void insert(int x) {
        int p = 0;
        for (int i = M - 1; i >= 0; -- i ) {
            int u = x >> i & 1;
            if (!tr[p][u])
                tr[p][u] = ++ idx;
            p = tr[p][u];
            cnt[p] ++ ;     // ATTENTION
        }
    }
    void remove(int x) {
        int p = 0;
        for (int i = M - 1; i >= 0; -- i ) {
            int u = x >> i & 1;
            p = tr[p][u];   // 一定存在
            cnt[p] -- ;     // ATTENTION
        }
    }
    int query(int x) {
        int p = 0, ret = 0;
        for (int i = M - 1; i >= 0; -- i ) {
            int u = x >> i & 1;
            if (!tr[p][!u] || !cnt[tr[p][!u]])  // ATTENTION
                p = tr[p][u];
            else {
                ret |= 1 << i;
                p = tr[p][!u];
            }
        }
        return ret;
    }
    
    int maximumStrongPairXor(vector<int>& nums) {
        init();
        int n = nums.size(), res = 0;
        sort(nums.begin(), nums.end());
        for (int i = 0, j = 0; j < n; ++ j ) {
            while (i < j && nums[j] - nums[i] > nums[i])    // ATTENTION 思考条件
                remove(nums[i ++ ]);
            // cout << " j = " << j << " i = " << i << " query = " << query(nums[j]) << endl;
            res = max(res, query(nums[j]));
            insert(nums[j]);
        }
        return res;
    }
};
```
