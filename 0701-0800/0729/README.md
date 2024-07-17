#  [729. 我的日程安排表 I](https://leetcode.cn/problems/my-calendar-i/)

## 题意



## 题解



```c++
class MyCalendar {
public:
    using PII = pair<int, int>;
    const int INF = 2e9;

    set<PII> S;

    MyCalendar() {
        S.insert({-INF, -INF});
        S.insert({INF, INF});
    }
    
    // 是否有交集
    bool check(PII a, PII b) {
        if (a.second <= b.first || b.second <= a.first)
            return false;
        return true;
    }

    bool book(int start, int end) {
        auto i = S.lower_bound({start, -INF});
        auto j = i;
        j -- ;
        PII t(start, end);
        if (check(*i, t) || check(*j, t))
            return false;
        S.insert(t);
        return true;
    }
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * MyCalendar* obj = new MyCalendar();
 * bool param_1 = obj->book(start,end);
 */
```



```python3

```

