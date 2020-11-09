## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-214/)


### [1646. 获取生成数组中的最大值](https://leetcode-cn.com/problems/get-maximum-in-generated-array/)

直接生成

```c++
    int getMaximumGenerated(int n) {
        if(!n) return 0;
        vector<int> ve;
        ve.push_back(0); ve.push_back(1);
        int res = 1;
        for(int i = 2; i <= n; ++i) {
            if(i & 1) ve.push_back(ve[i/2] + ve[i/2+1]);
            else ve.push_back(ve[i/2]);
            res = max(res, ve[i]);
        }
        return res;
    }
```


### [1647. 字符频次唯一的最小删除次数](https://leetcode-cn.com/problems/minimum-deletions-to-make-character-frequencies-unique/)

排序即可

```c++
    int minDeletions(string s) {
        unordered_map<char, int> mp;
        for(auto & c : s) ++mp[c];
        vector<pair<int, char>> ve;
        for(auto & [k, v] : mp) ve.push_back({v, k});
        sort(ve.begin(), ve.end());
        int n = ve.size();
        int res = 0, lastc = 0x3f3f3f3f;
        for(int i = n-1; i >= 0; --i) {
            int v = ve[i].first;
            if(v < lastc) {
                lastc = v;
                continue;
            } else {
                // dif 需要减去的数值
                int dif = v - max(lastc-1, 0);
                res += dif;
                lastc = v - dif;
            }
        }
        return res;
    }
```

### [1648. 销售价值减少的颜色球](https://leetcode-cn.com/problems/sell-diminishing-valued-colored-balls/) [TAG]

使用 `堆` 找到可选最大值，复杂度 `O(orders * log n)` ，数据较大会超

考虑：必然存在一个阈值 T 使得结束后所有颜色球个数 `x <= T`。

故二分先查找 T，随后统计即可

```c++
    typedef long long LL;
    const int mod = 1e9+7;
    int maxProfit(vector<int>& inventory, int orders) {
        int n = inventory.size();
        int l = 0, r = 1e9+1;
        while(l < r) {
            int mid = l + (r-l)/2;
            // 大于等于 mid 的总个数 二分结束时 s<=orders 也即 l=r=T
            long long s = 0;
            for(int i = 0; i < n; ++i)
                if(inventory[i] >= mid) s += (inventory[i]-mid+1);
            if(s > orders) l = mid+1;
            else r = mid;
        }
        LL res = 0;
        for(auto & rv : inventory) if(rv >= l) {
            LL lv = l, cnt = rv-lv+1;
            (res += ((lv + rv) * cnt / 2) % mod) %= mod;
            orders -= cnt;
        }
        (res += LL(orders) * (l-1) % mod) %= mod;
        return res;
    }
```

### [1649. 通过指令创建有序数组](https://leetcode-cn.com/problems/create-sorted-array-through-instructions/)

裸数据结构

```c++
template<typename T>
class BIT_opsum {
public:
    T operator() (const T& u, const T& v) const {
        return u + v;
    }
};

template<typename T, typename Accumulate = BIT_opsum<T>>
class BIT {
private:
    vector<T> tree;
    Accumulate op;
    int n;

public:
    BIT(int _n, Accumulate _op = Accumulate{}): n(_n), tree(_n + 1), op(_op) {}

    static int lowbit(int x) {
        return x & (-x);
    }
    
    void update(int x, T value) {
        while (x <= n) {
            tree[x] = op(tree[x], value);
            x += lowbit(x);
        }
    }

    T query(int x) const {
        T ans{};
        while (x) {
            ans = op(ans, tree[x]);
            x -= lowbit(x);
        }
        return ans;
    }
};

class Solution {
public:
    int createSortedArray(vector<int>& a) {
        BIT<int> bit(*max_element(a.begin(), a.end()));
        long long op = 0;
        int cnt = 0;
        for (auto num: a) {
            int u = bit.query(num - 1);
            int v = cnt - bit.query(num);
            op += min(u, v);
            bit.update(num, 1);
            ++cnt;
        }
        return op % 1000000007;
    }
};
```
