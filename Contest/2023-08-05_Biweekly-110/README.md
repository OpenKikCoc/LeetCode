## [比赛链接](https://leetcode.cn/contest/biweekly-contest-110/)

>   virtual rank: 94 / 2546
>   0:01:43 0:05:06 0:18:04


### [2806. 取整购买后的账户余额](https://leetcode.cn/problems/account-balance-after-rounded-purchase/)



```c++
class Solution {
public:
    int accountBalanceAfterPurchase(int purchaseAmount) {
        int t = purchaseAmount % 10;
        if (t < 5)
            purchaseAmount -= t;
        else
            purchaseAmount -= (t - 10);
        return 100 - purchaseAmount;
    }
};
```


### [2807. 在链表中插入最大公约数](https://leetcode.cn/problems/insert-greatest-common-divisors-in-linked-list/)



```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* insertGreatestCommonDivisors(ListNode* head) {
        ListNode * dummy = new ListNode(-1);
        dummy->next = head;
        for (auto p = head; p->next; ) {
            auto next = p->next;
            int g = __gcd(p->val, p->next->val);
            p->next = new ListNode(g);
            p->next->next = next;
            p = next;
        }
        return dummy->next;
    }
};
```

### [2808. 使循环数组所有元素相等的最少秒数](https://leetcode.cn/problems/minimum-seconds-to-equalize-a-circular-array/)

显然的可以按数值分类讨论

```c++
class Solution {
public:
    // 不变 / 变成左侧元素 / 变成右侧元素
    int n;
    
    int get(vector<int> & xs) {
        int last = xs.back() - n, ret = 0;
        for (auto x : xs) {
            int w = x - last;
            // cout << " x = " << x << " last = " << last << " w = " << w << endl;
            ret = max(ret, w / 2);
            last = x;
        }
        // cout << " ret = " << ret << endl;
        return ret;
    }
    
    int minimumSeconds(vector<int>& nums) {
        this->n = nums.size();
        unordered_map<int, vector<int>> h;
        for (int i = 0; i < n; ++ i )
            h[nums[i]].push_back(i);
        
        int res = 1e9;
        for (auto & [k, xs] : h)
            res = min(res, get(xs));
        return res;
    }
};
```

### [2809. 使数组和小于等于 x 的最少时间](https://leetcode.cn/problems/minimum-time-to-make-array-sum-at-most-x/) [TAG]

贪心

```c++
class Solution {
public:
    // 考虑: 最多在每个位置都set 0一次，如果这种情况下还不行那就永远不可能了
    //   又因为 操作次数与总和值并非 正/负相关 所以无法二分答案
    // 考虑 贪心     => 推测同一个位置只会执行一次
    //
    // 分析: 第 i 个位置的元素，在第 j 次操作时，总和减少的值为 nums1[i] + nums2[j] * j
    //
    // ATTENTION: 思考 【贪心的理论依据】
    // 假设我们已经确定要对第 a1, a2, ..., at 个元素进行操作，那么我们可以确定的“收益”就是 nums1[a1] + nums1[a2] + ... + nums1[at]。
    // 接下来要确定的就是操作元素的顺序，使得最终的“收益”最大。我们没有确定的收益就是 x * nums2[i]，显然应该把更大的 x 分给更大的 nums2[i]。
    // 也就是说，一定是按 nums2[i] 从小到大的顺序操作元素。
    //
    // ATTENTION: 基于排序不等式的选择型dp，特点是当子集唯一确定时，操作顺序被唯一确定
    
    // ATTENTION 关注数据范围 1e3
    using PII = pair<int, int>;
    const static int N = 1010;
    int f[N][N];    // [排序后] 只考虑前 i 个元素，其中 i 是第 j 个删除的情况下   能够减少的总量
    
    int minimumTime(vector<int>& nums1, vector<int>& nums2, int x) {
        int n = nums1.size();
        
        vector<PII> xs;
        for (int i = 0; i < n; ++ i )
            xs.push_back({nums2[i], nums1[i]});
        sort(xs.begin(), xs.end());
        
        // 转而求最大减值
        memset(f, 0xcf, sizeof f);
        f[0][0] = 0;
        // 前 i 个元素里，选了 j 个
        for (int i = 1; i <= n; ++ i )
            for (int j = 0; j <= i; ++ j ) {
                // 不选 i
                f[i][j] = f[i - 1][j];
                // 选 i
                if (j) {
                    // ATTENTION 思考 为什么可以直接当做第 j 个被选的去做处理？因为排序了
                    int t = xs[i - 1].second + j * xs[i - 1].first;
                    f[i][j] = max(f[i][j], f[i - 1][j - 1] + t);
                }
            }
        
        int s1 = 0, s2 = 0;
        for (auto x : nums1)
            s1 += x;
        for (auto x : nums2)
            s2 += x;
        // 枚举次数
        for (int i = 0; i <= n; ++ i ) {
            int t = s1 + s2 * i - f[n][i];
            if (t <= x)
                return i;
        }
        
        return -1;
    }
};
```
