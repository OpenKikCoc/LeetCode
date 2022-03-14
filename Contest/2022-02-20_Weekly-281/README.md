## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-281/)


### [2180. 统计各位数字之和为偶数的整数个数](https://leetcode-cn.com/problems/count-integers-with-even-digit-sum/)

略

```c++
class Solution {
public:
    bool check(int x) {
        int c = 0;
        while (x)
            c += x % 10, x /= 10;
        return c % 2 == 0;
    }
    
    int countEven(int num) {
        int res = 0;
        for (int i = 1; i <= num; ++ i )
            if (check(i))
                res ++ ;
        return res;
    }
};
```


### [2181. 合并零之间的节点](https://leetcode-cn.com/problems/merge-nodes-in-between-zeros/)

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
    ListNode* mergeNodes(ListNode* head) {
        vector<int> a, b;
        while (head)
            a.push_back(head->val), head = head->next;
        
        int n = a.size();
        for (int i = 0; i < n; ++ i ) {
            // can be deleted
            if (a[i])
                continue;
            
            int j = i + 1;
            while (j < n && a[j])
                j ++ ;
            int t = 0;
            for (int k = i + 1; k < j; ++ k )
                t += a[k];
            b.push_back(t);
            i = j - 1;
        }
        b.pop_back();
        
        ListNode * dummy = new ListNode(-1);
        auto pre = dummy;
        for (auto x : b) {
            pre->next = new ListNode(x);
            pre = pre->next;
        }
        return dummy->next;
    }
};
```

### [2182. 构造限制重复的字符串](https://leetcode-cn.com/problems/construct-string-with-repeat-limit/)

略

```c++
class Solution {
public:
    const static int N = 27;
    
    int cnt[N];
    
    string repeatLimitedString(string s, int rl) {
        for (auto c : s)
            cnt[c - 'a'] ++ ;
        
        string res;
        for (int i = 25; i >= 0; -- i ) {
            while (cnt[i]) {
                int c = 0;
                while (cnt[i] && c < rl)
                    res.push_back('a' + i), cnt[i] -- , c ++ ;
                if (cnt[i]) {
                    bool flag = false;
                    for (int j = 25; j >= 0; -- j )
                        if (j != i && cnt[j]) {
                            res.push_back('a' + j), cnt[j] -- ;
                            flag = true;
                            break;
                        }
                    if (!flag)
                        break;
                }
            }
        }
        return res;
    }
};
```

### [2183. 统计可以被 K 整除的下标对数目](https://leetcode-cn.com/problems/count-array-pairs-divisible-by-k/) [TAG]

简单数学思维

```c++
// TLE 114 / 115
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL cnt[N], s[N];
    
    long long countPairs(vector<int>& nums, int k) {
        for (auto x : nums)
            cnt[x] ++ ;
        for (int i = 1; i < N; ++ i )
            s[i] = s[i - 1] + cnt[i];
        
        LL res = 0, n = nums.size();
        for (int i = 1; i < N; ++ i )
            if (cnt[i]) {
                if ((LL)i * i % k == 0)
                    res += cnt[i] * (cnt[i] - 1) / 2;
                
                if ((LL)i % k == 0) {
                    res += cnt[i] * s[i - 1];
                } else {
                    LL t = k / __gcd(k, i);
                    // 需要优化此处
                    for (int j = t; j < i; j += t )
                        if ((LL)i * j % k == 0)
                            res += cnt[i] * cnt[j];
                }
            }
        return res;
    }
};
```

标准代码：

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    LL cnt[N], hash[N];
    
    long long countPairs(vector<int>& nums, int k) {
        for (auto x : nums)
            cnt[x] ++ ;
        
        // 记忆: 每个数的倍数出现了多少次
        // O(nlogn)
        // unordered_map<int, int> hash; ==> TLE
        for (int i = 1; i < N; ++ i )
            if (cnt[i])
                hash[i] = cnt[i];
        for (int i = 1; i < N; ++ i )
            for (int j = i + i; j < N; j += i )
                hash[i] += hash[j];
        
        LL res = 0;
        for (int i = 1; i < N; ++ i )
            if (cnt[i]) {
                LL t = k / __gcd(k, i);
                res += cnt[i] * hash[t];
                if ((LL)i * i % k == 0)
                    res -= cnt[i];
            }
        
        return res / 2;
    }
};
```

