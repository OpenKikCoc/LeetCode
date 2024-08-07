#  [715. Range 模块](https://leetcode.cn/problems/range-module/)

## 题意



## 题解



```c++
typedef pair<int, int> PII;
const int INF = 2e9;

#define x first
#define y second

class RangeModule {
public:
    set<PII> S;

    RangeModule() {
        S.insert({-INF, -INF});
        S.insert({INF, INF});
    }

    void addRange(int left, int right) {
        auto i = S.lower_bound({left, -INF});
        i -- ;
        if (i->y < left) i ++ ;
        if (i->x > right) {
            S.insert({left, right});
        } else {
            // 已有区间的左侧在当前区间的范围内
            // j 找到所有将要被合并的区间
            auto j = i;
            while (j->x <= right) j ++ ;
            j -- ;
            // 合并后的新区间
            PII t(min(i->x, left), max(j->y, right));
            while (i != j) {
                // 写法
                auto k = i;
                k ++ ;
                S.erase(i);
                i = k;
            }
            S.erase(i);
            S.insert(t);
        }
    }

    bool queryRange(int left, int right) {
        auto i = S.upper_bound({left, INF});
        i -- ;
        return i->y >= right;
    }

    vector<PII> get(PII a, PII b) {
        vector<PII> res;
        if (a.x < b.x) {
            if (a.y > b.y) {
                res.push_back({a.x, b.x});
                res.push_back({b.y, a.y});
            } else {
                res.push_back({a.x, b.x});
            }
        } else {
            if (a.y > b.y) res.push_back({b.y, a.y});
        }
        return res;
    }

    void removeRange(int left, int right) {
        auto i = S.lower_bound({left, -INF});
        i -- ;
        if (i->y < left) i ++ ;
        if (i->x <= right) {
            // 已有区间和待删除区间有交集
            auto j = i;
            while (j->x <= right) j ++ ;
            j -- ;

            // 切割区间
            auto a = get(*i, {left, right});
            auto b = get(*j, {left, right});
            while (i != j) {
                auto k = i;
                k ++ ;
                S.erase(i);
                i = k;
            }
            S.erase(i);
            for (auto t: a) S.insert(t);
            for (auto t: b) S.insert(t);
        }
    }
};

/**
 * Your RangeModule object will be instantiated and called as such:
 * RangeModule* obj = new RangeModule();
 * obj->addRange(left,right);
 * bool param_2 = obj->queryRange(left,right);
 * obj->removeRange(left,right);
 */
```



```python3

```

