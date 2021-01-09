## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-151/)


### [1169. 查询无效交易](https://leetcode-cn.com/problems/invalid-transactions/)

暴力即可 cpp 处理会麻烦些

```c++
class Solution {
public:
    using TSIIS = tuple<string, int, int, string>;
    
    tuple<string, int, int, string> get(string & tx) {
        int sz = tx.size();
        string name, city;
        int time, amount, id = 0;
        for (int i = 0; i < sz; ++ i ) {
            int j = i + 1;
            while (j < sz && tx[j] != ',') ++ j ;
            ++ id;
            string sub = tx.substr(i, j - i);
            if (id == 1) name = sub;
            else if (id == 2) time = stoi(sub.c_str());
            else if (id == 3) amount = stoi(sub.c_str());
            else city = sub;
            i = j;
        }
        return {name, time, amount, city};
    }
    
    vector<string> invalidTransactions(vector<string>& transactions) {
        int n = transactions.size();
        vector<TSIIS> txs;
        for (int i = 0; i < n; ++ i ) txs.push_back(get(transactions[i]));
        
        vector<bool> neg(n, false);
        for (int i = 0; i < n; ++ i ) {
            auto & [name, time, amount, city] = txs[i];
            if (amount > 1000) neg[i] = true;   // can not 'continue'
            for (int j = 0; j < i; ++ j ) {
                auto & [na, t, a, c] = txs[j];
                if (na == name && abs(t - time) <= 60 && c != city)
                    neg[i] = neg[j] = true;
            }
        }
        vector<string> res;
        for (int i = 0; i < n; ++ i )
            if (neg[i])
                res.push_back(transactions[i]);
        return res;
    }
};
```


### [1170. 比较字符串最小字母出现频次](https://leetcode-cn.com/problems/compare-strings-by-frequency-of-the-smallest-character/)

暴力

```c++
class Solution {
public:
    int f(string & s) {
        vector<int> cnt(26);
        for (auto & c : s)
            ++ cnt[c - 'a'];
        for (int i = 0; i < 26; ++ i )
            if (cnt[i])
                return cnt[i];
        return 0;
    }
    
    vector<int> numSmallerByFrequency(vector<string>& queries, vector<string>& words) {
        vector<int> ve, res;
        for (auto & w : words)
            ve.push_back(f(w));
        
        for (auto & q : queries) {
            int val = f(q), cnt = 0;
            for (auto & v : ve)
                if (val < v)
                    ++ cnt;
            res.push_back(cnt);
        }
        return res;
    }
};
```

### [1171. 从链表中删去总和值为零的连续节点](https://leetcode-cn.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/)

扫一遍即可

```c++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* removeZeroSumSublists(ListNode* head) {
        unordered_map<int, ListNode*> hash; // mem the pre
        ListNode * dummy = new ListNode(-1);
        dummy->next = head;
        int sum = 0;
        hash[0] = dummy;
        
        auto p = head, last = dummy;
        while (p) {
            sum += p->val;
            last = p;
            if (hash.count(sum)) {
                int tsum = 0;
                auto pre = hash[sum];
                auto first = pre->next;
                while (first != p->next) {
                    tsum += first->val;
                    hash.erase(sum + tsum);
                    first = first->next;
                }
                last = pre;
                pre->next = p->next;
            }
            hash[sum] = last;
            p = p->next;
        }
        return dummy->next;
    }
};
```

以前的写法，更简约清晰：

```c++
class Solution {
public:
    ListNode* removeZeroSumSublists(ListNode* head) {
        unordered_map<int, ListNode*> hash;     // 记录当前值节点
        ListNode * dummy = new ListNode(-1);
        dummy->next = head;
        int sum = 0;
        hash[0] = dummy;

        while(head) {
            sum += head->val;
            if(hash.count(sum)) {
                auto next = hash[sum]->next;
                hash[sum]->next = head->next;   // 在这里处理 更简约
                int csum = sum;
                while(next != head) {
                    csum += next->val;
                    hash.erase(csum);
                    next = next->next;
                }
                // 不管next->next
            } else hash[sum] = head;            // 而非last
            head = head->next;
        }
        return dummy->next;
    }
};
```

### [1172. 餐盘栈](https://leetcode-cn.com/problems/dinner-plate-stacks/) [TAG]

BIT 维护即可，注意换静态变量防止超时

```c++
// 本质: 快速找到以下数据
//      1. 从左往右第一个未满的栈  push
//      2. 从右往左第一个非空的栈  pop

// 静态 否则TLE
const int N = 100010;
static int tr[N];           // 维护栈中元素数目
static stack<int> stks[N];  // 替换很慢的 vector<stack<int>> stks;

class DinnerPlates {
public:
    // BIT
    void init() {
        memset(tr, 0, sizeof tr);
    }
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int v) {
        for (int i = x; i < N; i += lowbit(i)) tr[i] += v;
    }
    int sum(int x) {
        int res = 0;
        for (int i = x; i; i -= lowbit(i)) res += tr[i];
        return res;
    }
    // END OF BIT
    // 左侧第一个未满的栈
    int getL() {
        int l = 1, r = N;
        while (l < r) {
            int m = l + r >> 1;
            if (sum(m) >= m * cap) l = m + 1;
            else r = m;
        }
        return l;
    }
    // 右侧第一个非空的栈
    int getR() {
        int l = 1, r = N;
        while (l < r) {
            int m = l + r >> 1;
            if (sum(m) < tot) l = m + 1;
            else r = m;
        }
        return l;
    }
    
    int cap, tot;
    
    DinnerPlates(int capacity) {
        init();
        cap = capacity; tot = 0;
        // TLE stks = vector<stack<int>>(N);
        for (int i = 0; i < N; ++ i )
            while (!stks[i].empty())
                stks[i].pop();
    }
    
    void push(int val) {
        int idx = getL();
        stks[idx].push(val);
        ++ tot ; add(idx, 1);
    }
    
    int pop() {
        if (!tot) return -1;
        int idx = getR();
        int ret = stks[idx].top(); stks[idx].pop();
        -- tot ; add(idx, -1);
        return ret;
    }
    
    int popAtStack(int index) {
        int idx = index + 1;
        if (stks[idx].empty()) return -1;
        int ret = stks[idx].top(); stks[idx].pop();
        -- tot ; add(idx, -1);
        return ret;
    }
};

/**
 * Your DinnerPlates object will be instantiated and called as such:
 * DinnerPlates* obj = new DinnerPlates(capacity);
 * obj->push(val);
 * int param_2 = obj->pop();
 * int param_3 = obj->popAtStack(index);
 */
```
