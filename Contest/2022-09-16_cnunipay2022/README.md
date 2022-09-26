## [比赛链接](https://leetcode.cn/contest/cnunionpay2022/)


### [重构链表](https://leetcode.cn/contest/cnunionpay2022/problems/VLNEbD/)



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
    ListNode* reContruct(ListNode* head) {
        ListNode * dummy = new ListNode(-1);
        dummy->next = head;
        auto p = dummy;
        while (p->next) {
            if (p->next->val % 2 == 0)
                p->next = p->next->next;
            else
                p = p->next;
        }
        return dummy->next;
    }
};
```


### [勘探补给](https://leetcode.cn/contest/cnunionpay2022/problems/6olJmJ/)



```c++
class Solution {
public:
    vector<int> explorationSupply(vector<int>& station, vector<int>& pos) {
        int n = station.size();
        vector<int> res;
        for (auto x : pos) {
            auto it = lower_bound(station.begin(), station.end(), x);
            int t = INT_MAX;
            auto p = station.end();
            if (it != station.end()) {
                if (*it - x <= t)
                    t = *it - x, p = it;
            }
            if (it != station.begin()) {
                it -- ;
                if (x - *it <= t)
                    t = x - *it, p = it;
            }
            res.push_back(p - station.begin());
        }
        return res;
    }
};
```

### [风能发电](https://leetcode.cn/contest/cnunionpay2022/problems/wMGN0t/)



```c++
class Solution {
public:
    int StoredEnergy(int storeLimit, const vector<int>& power, const vector<vector<int>>& supply) {
        int n = power.size(), m = supply.size();
        int s = 0;
        for (int i = 0, j = 0, minv, maxv; i < n; ++ i ) {
            if (j < m && supply[j][0] == i) {
                minv = supply[j][1], maxv = supply[j][2];
                j ++ ;
            }
            if (power[i] >= minv && power[i] <= maxv)
                continue;
            if (power[i] < minv) {
                int need = minv - power[i], has = s;
                s -= min(has, need);
            }
            if (power[i] > maxv) {
                int more = power[i] - maxv, cap = storeLimit - s;
                s += min(more, cap);
            }
        }
        return s;
    }
};
```

### [设计自动售货机](https://leetcode.cn/contest/cnunionpay2022/problems/NyZD2B/)



```c++
class VendingMachine {
public:
    using LL = long long;
    using PII = pair<int, int>;
    
    // item->{[price, endtime] -> cnt}
    unordered_map<string, map<PII, int>> hash;
    // customer->int
    unordered_map<string, int> cnt;
    
    VendingMachine() {
        hash.clear();
        cnt.clear();
    }
    
    void addItem(int time, int number, string item, int price, int duration) {
        PII val = {price, time + duration};
        auto & m = hash[item];
        m[val] += number;
    }
    
    long long sell(int time, string customer, string item, int number) {
        auto & m = hash[item];
        
        {
            int tot = 0;
            set<PII> S;
            for (auto & [pe, c] : m) {
                auto [p, e] = pe;
                if (e < time) {
                    S.insert(pe);
                    continue;
                }
                tot += c;
            }
            for (auto & e : S)
                m.erase(m.find(e));
            if (tot < number)
                return -1;
        }
        
        LL cost = 0;
        {
            int need = number;
            set<PII> S;
            for (auto & [pe, c] : m) {
                auto [p, e] = pe;
                int use = min(need, c);
                
                cost += (LL)p * use;
                if (c == use) {
                    S.insert(pe);
                    need -= use;
                } else {
                    c -= use;
                    need -= use;
                    break;
                }
            }
            for (auto & e : S)
                m.erase(m.find(e));
        }
        
        int rate = max(70, 100 - cnt[customer]);
        cnt[customer] ++ ;
        return (cost * rate + 99) / 100;
    }
};
```
