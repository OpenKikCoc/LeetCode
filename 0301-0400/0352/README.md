#  [352. 将数据流变为多个不相交区间](https://leetcode.cn/problems/data-stream-as-disjoint-intervals/)

## 题意



## 题解

平衡树

```c++
class SummaryRanges {
public:
    /** Initialize your data structure here. */
    typedef long long LL;
    const LL INF = 1e18;
    typedef pair<LL, LL> PLL;
    #define x first
    #define y second
    
    set<PLL> S;

    SummaryRanges() {
        S.insert({-INF, -INF}), S.insert({INF, INF});
    }
    
    void addNum(int x) {
        auto r = S.upper_bound({x, INT_MAX});
        auto l = r;
        -- l;
        if (l->y >= x) return;
        if (l->y == x - 1 && r->x == x + 1)
            S.insert({l->x, r->y}), S.erase(l), S.erase(r);
        else if (l->y == x - 1)
            S.insert({l->x, x}), S.erase(l);
        else if (r->x == x + 1)
            S.insert({x, r->y}), S.erase(r);
        else
            S.insert({x, x});
    }
    
    vector<vector<int>> getIntervals() {
        vector<vector<int>> res;
        for (auto & p : S)
            if (p.x != -INF && p.x != INF)
                res.push_back({(int)p.x, (int)p.y});
        return res;
    }
};

/**
 * Your SummaryRanges object will be instantiated and called as such:
 * SummaryRanges* obj = new SummaryRanges();
 * obj->addNum(val);
 * vector<vector<int>> param_2 = obj->getIntervals();
 */
```



```python3

```

