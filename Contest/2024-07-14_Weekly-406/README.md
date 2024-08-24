## [比赛链接](https://leetcode.cn/contest/weekly-contest-406/)


### [3216. 交换后字典序最小的字符串](https://leetcode.cn/problems/lexicographically-smallest-string-after-a-swap/)



```c++
class Solution {
public:
    string getSmallestString(string s) {
        int n = s.size();
        for (int i = 0; i < n - 1; ++ i ) {
            if (((s[i] - '0') & 1) != ((s[i + 1] - '0') & 1))
                continue;
            if (s[i] <= s[i + 1])
                continue;
            swap(s[i], s[i + 1]);
            return s;
        }
        return s;
    }
};
```


### [3217. 从链表中移除在数组中存在的节点](https://leetcode.cn/problems/delete-nodes-from-linked-list-present-in-array/)



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
    ListNode* modifiedList(vector<int>& nums, ListNode* head) {
        unordered_set<int> S;
        for (auto x : nums)
            S.insert(x);
        
        ListNode * dummy = new ListNode(-1);
        auto pre = dummy;
        while (head) {
            if (!S.count(head->val))
                pre->next = head, pre = head;
            head = head->next;
        }
        pre->next = nullptr;   // ATTENTION
        return dummy->next;
    }
};
```

### [3218. 切蛋糕的最小总开销 I](https://leetcode.cn/problems/minimum-cost-for-cutting-cake-i/)

棋盘分割

```c++
class Solution {
public:
    using PII = pair<int, int>;
    using LL = long long;
    
    int m, n;
    vector<int> hc, vc;
    
    map<PII, LL> mem;
    
    LL dp(int u, int d, int l, int r) {
        if (u == d && l == r )
            return 0;
        
        auto pi = PII{u * 2e3 + d, l * 2e3 + r};
        if (mem.count(pi))
            return mem[pi];
        
        LL ret = 1e15;
        
        for (int i = u; i < d; ++ i )
            ret = min(ret, dp(u, i, l, r) + dp(i + 1, d, l, r) + hc[i]);
        for (int i = l; i < r; ++ i )
            ret = min(ret, dp(u, d, l, i) + dp(u, d, i + 1, r) + vc[i]);
        return mem[pi] = ret;
    }
    
    int minimumCost(int m, int n, vector<int>& horizontalCut, vector<int>& verticalCut) {
        this->m = m, this->n = n;
        this->hc = horizontalCut, this->vc = verticalCut;
        
        this->mem.clear();
        return dp(0, m - 1, 0, n - 1);
    }
};
```

### [3219. 切蛋糕的最小总开销 II](https://leetcode.cn/problems/minimum-cost-for-cutting-cake-ii/)

贪心，重点在于思路的证明

> 每条水平线和垂直线，最终都要全部切完
>
> - 横切 hc[i] 的贡献等于此前 `竖切的次数 +1`
> - 竖切 vc[i] 的贡献等于此前 `横切的次数 +1`
>
> 因为对于某一个具体的 i，是否 `一切到底` 对数值统计没有影响，故假定都是一切到底
>
> 考虑 `相邻交换` 易知 **优先切开销更大的**

```c++
class Solution {
public:
    using LL = long long;
    
    long long minimumCost(int m, int n, vector<int>& horizontalCut, vector<int>& verticalCut) {
        sort(horizontalCut.begin(), horizontalCut.end(), greater<int>());
        sort(verticalCut.begin(), verticalCut.end(), greater<int>());
        
        LL res = 0;
        int i = 0, j = 0;
        while (i < m - 1 && j < n - 1)  // ATTENTION 判断条件 < len-1
            if (horizontalCut[i] > verticalCut[j])
                res += (LL)(j + 1) * horizontalCut[i], i ++ ;
            else
                res += (LL)(i + 1) * verticalCut[j], j ++ ;
        
        while (i < m - 1)
            res += (LL)(j + 1) * horizontalCut[i], i ++ ;
        while (j < n - 1)
            res += (LL)(i + 1) * verticalCut[j], j ++ ;
        
        return res;
    }
};
```
