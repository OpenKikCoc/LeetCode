## [比赛链接](https://leetcode.cn/contest/weekly-contest-358/)

>   virtual rank: 109 / 4475
>
>   0:02:27  0:06:49  0:27:19  2  0:53:01


### [2815. 数组中的最大数对和](https://leetcode.cn/problems/max-pair-sum-in-an-array/)



```c++
class Solution {
public:
    int max_val(int x) {
        int ret = 0;
        while (x)
            ret = max(ret, x % 10), x /= 10;
        return ret;
    }
    
    int maxSum(vector<int>& nums) {
        int n = nums.size(), res = -1;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j ) {
                if (max_val(nums[i]) == max_val(nums[j]))
                    res = max(res, nums[i] + nums[j]);
            }
        return res;
    }
};
```


### [2816. 翻倍以链表形式表示的数字](https://leetcode.cn/problems/double-a-number-represented-as-a-linked-list/)



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
    // 链表中节点的数目在范围 [1, 10^4] 内
    //  => 显然要高精度
    
    ListNode* doubleIt(ListNode* head) {
        vector<int> xs;
        for (auto p = head; p; p = p->next)
            xs.push_back(p->val);
        reverse(xs.begin(), xs.end());
        
        vector<int> ys;
        for (int i = 0, t = 0; i < xs.size() || t; ++ i ) {
            if (i < xs.size())
                t += xs[i] * 2;
            ys.push_back(t % 10);
            t /= 10;
        }
        while (ys.size() > 1 && ys.back() == 0)
            ys.pop_back();
        
        ListNode * pre = nullptr;
        for (auto p : ys) {
            ListNode * t = new ListNode(p);
            t->next = pre;
            pre = t;
        }
        return pre;
    }
};
```

### [2817. 限制条件下元素之间的最小绝对差](https://leetcode.cn/problems/minimum-absolute-difference-between-elements-with-constraint/)

实际上直接双指针维护即可 实现略

```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int l[N], r[N];
    
    int minAbsoluteDifference(vector<int>& nums, int x) {
        int n = nums.size();
        
        {
            memset(l, 0x3f, sizeof l);
            set<int> S;
            
            for (int i = 0; i < n; ++ i ) {
                if (i - x >= 0)
                    S.insert(nums[i - x]);
                
                auto it = S.lower_bound(nums[i]);
                int t = 1e9;
                if (it != S.end())
                    t = min(t, (*it) - nums[i]);
                if (it != S.begin()) {
                    it -- ;
                    t = min(t, nums[i] - (*it));
                }
                l[i] = t;
            }
        }
        {
            memset(r, 0x3f, sizeof r);
            set<int> S;
            
            for (int i = n - 1; i >= 0; -- i ) {
                if (i + x < n)
                    S.insert(nums[i + x]);
                
                auto it = S.lower_bound(nums[i]);
                int t = 1e9;
                if (it != S.end())
                    t = min(t, (*it) - nums[i]);
                if (it != S.begin()) {
                    it -- ;
                    t = min(t, nums[i] - (*it));
                }
                r[i] = t;
            }
        }
        int res = 2e9;
        for (int i = 0; i < n; ++ i )
            res = min(res, min(l[i], r[i]));
        return res;
    }
};
```

### [2818. 操作使得分最大](https://leetcode.cn/problems/apply-operations-to-maximize-score/)

经典的前后缀分解 结合素数筛和快速幂

```c++
using LL = long long;
const static int N = 1e5 + 10, MOD = 1e9 + 7;
static bool f = false;

int primes[N], cnt;
bool st[N];

void init() {
    if (f)
        return;
    f = true;
    
    memset(st, 0, sizeof st);
    cnt = 0;
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
    // 某个位置可以被多次选 只要其被包含在不同的子数组中 且是最靠左的位置（单调栈）
    //  则 考虑每一个位置的元素可以作为发挥作用的元素 其左右端点可以延伸到多远 => 对应有多少个区间可用
    //  最后排序 依次取用区间即可
    
    using PIL = pair<int, LL>;
    
    int ps[N];
    int n;
    
    int l[N], r[N];
    
    LL qmi(LL a, LL b) {
        LL ret = 1;
        while (b) {
            if (b & 1)
                ret = ret * a % MOD;
            a = a * a % MOD;
            b >>= 1;
        }
        return ret;
    }
    
    int maximumScore(vector<int>& nums, int k) {
        init();
        this->n = nums.size();
        
        for (int i = 0; i < n; ++ i ) {
            int t = 0, x = nums[i];
            for (int j = 0; primes[j] <= x; ++ j )
                if (x % primes[j] == 0) {
                    t ++ ;
                    while (x % primes[j] == 0)
                        x /= primes[j];
                }
                    
            ps[i] = t;
        }
        
        {
            // 向左最多延伸到哪里 默认显然是到 -1
            for (int i = 0; i < n; ++ i )
                l[i] = -1;
            
            stack<int> stk;
            for (int i = n - 1; i >= 0; -- i ) {
                int x = ps[i];
                while (stk.size() && ps[stk.top()] <= x) {
                    l[stk.top()] = i;
                    stk.pop();
                }
                stk.push(i);
            }
        }
        {
            // 向右
            for (int i = 0; i < n; ++ i )
                r[i] = n;
            
            stack<int> stk;
            for (int i = 0; i < n; ++ i ) {
                int x = ps[i];
                while (stk.size() && ps[stk.top()] < x) {   // 必须要大于 才能发挥作用
                    r[stk.top()] = i;
                    stk.pop();
                }
                stk.push(i);
            }
        }
        
        priority_queue<PIL> q;
        for (int i = 0; i < n; ++ i ) {
            LL x = i - l[i], y = r[i] - i;
            q.push({nums[i], x * y});
        }
        
        LL res = 1, tot = k;
        for (; tot && q.size();) {
            auto [k, v] = q.top(); q.pop();
            LL cost = min(v, tot);
            tot -= cost;
            
            res = (res * qmi(k, cost)) % MOD;
        }
        
        return res;
    }
};
```
