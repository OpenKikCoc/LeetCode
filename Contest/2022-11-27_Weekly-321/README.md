## [比赛链接](https://leetcode.cn/contest/weekly-contest-321/)


### [2485. 找出中枢整数](https://leetcode.cn/problems/find-the-pivot-integer/)

略

```c++
class Solution {
public:
    int pivotInteger(int n) {
        int tot = (1 + n) * n / 2, s = 0;
        for (int i = 1; i <= n; ++ i ) {
            s += i;
            if (s == tot)
                return i;
            tot -= i;
        }
        return -1;
    }
};
```


### [2486. 追加字符以获得子序列](https://leetcode.cn/problems/append-characters-to-string-to-make-subsequence/)

略

```c++
class Solution {
public:
    int appendCharacters(string s, string t) {
        int n = s.size(), m = t.size(), p = 0;
        for (int i = 0; i < n && p < m; ++ i ) {
            if (s[i] == t[p])
                p ++ ;
        }
        return m - p;
    }
};
```

### [2487. 从链表中移除节点](https://leetcode.cn/problems/remove-nodes-from-linked-list/)

略

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
    ListNode* removeNodes(ListNode* head) {
        vector<ListNode*> st;
        while (head) {
            while (st.size() && st.back()->val < head->val)
                st.pop_back();
            st.push_back(head);
            head = head->next;
        }
        int n = st.size();
        for (int i = 0; i < n - 1; ++ i )
            st[i]->next = st[i + 1];
        st.back()->next = nullptr;
        return st[0];
    }
};
```

### [2488. 统计中位数为 K 的子数组](https://leetcode.cn/problems/count-subarrays-with-median-k/) [TAG]

加快速度

```c++
class Solution {
public:
    // ATTENTION: nums 中的整数 互不相同
    // 子数组是数组中的一个连续部分
    const static int N = 1e5 + 10;
    
    unordered_map<int, int> hash, rh;
    
    int l[N], r[N];
    
    int countSubarrays(vector<int>& nums, int k) {
        int n = nums.size();
        {
            for (int i = 0; i < n; ++ i )
                hash[nums[i]] = i;
        }
        {
            if (!hash.count(k))
                return 0;
        }
        int p = hash[k];
        {
            for (int i = p - 1, t = 0; i >= 0; -- i ) {
                l[i] = l[i + 1] + (nums[i] < k);
            }
            for (int i = p + 1; i < n; ++ i ) {
                r[i] = r[i - 1] + (nums[i] < k);
            }
            // ATTENTION 计算数量差值的计数 (smaller - bigger)
            for (int i = p; i < n; ++ i ) {
                int x = r[i], y = i - p - r[i];
                rh[r[i] - y] ++ ;
            }
        }
        
        
        int res = 0;
        // 枚举左侧起始点 累加右侧差值的计数
        for (int i = 0; i <= p; ++ i ) {
            int x = (p - i) - l[i], y = x - l[i];   // 大于k的数量为x, (bigger - smaller)的数量为y
            
            int last = res;
            res += rh[y] + rh[y - 1];
        }
        return res;
    }
};
```
