## [比赛链接](https://leetcode-cn.com/contest/cnunionpay-2022spring/)


### [回文链表](https://leetcode-cn.com/contest/cnunionpay-2022spring/problems/D7rekZ/)

略

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
    bool isPalindrome(ListNode* head) {
        vector<int> ve;
        while (head)
            ve.push_back(head->val), head = head->next;
        
        int n = ve.size(), p1 = -1, p2 = -1;
        for (int i = 0, j = n - 1; i < j; ++ i , -- j )
            if (ve[i] != ve[j]) {
                p1 = i, p2 = j;
                break;
            }
        if (p1 == -1)
            return true;
        {
            bool flag = true;
            for (int i = p1 + 1, j = p2; i < j; ++ i , -- j )
                if (ve[i] != ve[j]) {
                    flag = false;
                    break;
                }
            if (flag)
                return true;
        }
        {
            bool flag = true;
            for (int i = p1, j = p2 - 1; i < j; ++ i , -- j )
                if (ve[i] != ve[j]) {
                    flag = false;
                    break;
                }
            if (flag)
                return true;
        }
        return false;
    }
};
```


### [优惠活动系统](https://leetcode-cn.com/contest/cnunionpay-2022spring/problems/kDPV0f/)

考虑了用 set 直接存并加速查找

实际上暴力遍历就可以过

```c++
class DiscountSystem {
public:
    struct acts {
        int id, p, dis, num, lim;
        unordered_map<int, int> user;
        acts() {}
        acts(int _id, int _p, int _dis, int _num, int _lim) {
            id = _id, p = _p, dis = _dis, num = _num, lim = _lim;
        }
    };
    
    map<int, acts> S;
    
    DiscountSystem() {
        S.clear();
    }
    
    void addActivity(int actId, int priceLimit, int discount, int number, int userLimit) {
        S[actId] = {actId, priceLimit, discount, number, userLimit};
    }
    
    void removeActivity(int actId) {
        S.erase(actId);
    }
    
    int consume(int userId, int cost) {
        int maxDis = 0, id = -1;
        for (auto & [k, v] : S)
            if (v.p <= cost && v.num) {
                auto m = v.user;
                if (m.count(userId) && m[userId] == v.lim)
                    continue;
                if (v.dis > maxDis)
                    maxDis = v.dis, id = k;
            }
        if (id != -1) {
            S[id].user[userId] ++ , S[id].num -- ;
        }
        return cost - maxDis;
    }
};

/**
 * Your DiscountSystem object will be instantiated and called as such:
 * DiscountSystem* obj = new DiscountSystem();
 * obj->addActivity(actId,priceLimit,discount,number,userLimit);
 * obj->removeActivity(actId);
 * int param_3 = obj->consume(userId,cost);
 */
```

### [理财产品](https://leetcode-cn.com/contest/cnunionpay-2022spring/problems/I4mOGz/) [TAG]

数学计算 细节

```c++
class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;
    
    int maxInvestment(vector<int>& product, int limit) {
        sort(product.begin(), product.end());
        reverse(product.begin(), product.end());
        
        int n = product.size();
        LL s = 0, tot = 0, res = 0;
        for (int i = 0; i < n; ++ i ) {
            s += product[i], tot += (1LL + product[i]) * product[i] / 2;
            LL t = s - limit;
            if (t > 0) {
                // 平均还剩a 有b个剩余a+1
                LL a = t / (i + 1), b = t % (i + 1);
                // 为了后面ret计算准确 如果当前不合法直接break
                if (a > product[i])
                    break;
                
                {
                    LL ret = 0;
                    if (b)
                        ret += (0LL + a + 1) * b;
                    ret += (1LL + a) * a / 2 * (i + 1);
                    res = max(res, tot - ret);
                // cout << " i = " << i << " p[i] = " << product[i] << " t = " << t << " a = " << a << " b = " << b << " tot = " << tot << " ret = " << ret << " tot-ret = " << tot - ret << endl;
                }
            } else {
                // cout << " i = " << i << " p[i] = " << product[i] << " t = " << t << " tot = " << tot << endl;
                res = max(res, tot);
            }
        }
        return res % MOD;
    }
};
```

### [合作开发](https://leetcode-cn.com/contest/cnunionpay-2022spring/problems/lCh58I/) [TAG]

状压 + 数学

```c++
class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;
    
    LL p[4] = {1, 1000, 1000000, 1000000000};
    
    int coopDevelop(vector<vector<int>>& skills) {
        int n = skills.size();
        map<LL, LL> hash;
        for (auto & s : skills) {
            sort(s.begin(), s.end());
            // encode
            LL st = 0;
            for (int i = 0; i < s.size(); ++ i )
                st += s[i] * p[i];
            hash[st] ++ ;
        }
        
        LL res = (LL)n * (n - 1) / 2;
        for (auto [k, v] : hash) {
            // decode
            vector<int> ve;
            for (LL i = 0, j = k; j; ++ i , j /= 1000 )
                ve.push_back(j % 1000);
            
            int m = ve.size();
            // 非空非全 真子集
            for (int i = 1; i < (1 << m) - 1; ++ i ) {
                LL st = 0, c = 0;
                for (LL j = 0; j < m; ++ j )
                    if (i >> j & 1)
                        st += ve[j] * p[c ++ ];
                
                if (hash.count(st))
                    res -= hash[st] * v;
            }
            res -= v * (v - 1) / 2;
        }
        return res % MOD;
    }
};
```
