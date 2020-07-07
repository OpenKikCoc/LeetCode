## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-196/)


### [1502. 判断能否形成等差数列](https://leetcode-cn.com/problems/can-make-arithmetic-progression-from-sequence/)

略

```c++
    bool canMakeArithmeticProgression(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        int n = arr.size(), d = arr[1] - arr[0];
        for(int i = 2; i < n; ++i) {
            if(arr[i] - arr[i-1] != d) return false;
        }
        return true;
    }
```


### [1503. 所有蚂蚁掉下来前的最后一刻](https://leetcode-cn.com/problems/last-moment-before-all-ants-fall-out-of-a-plank/)

略

```c++
    int getLastMoment(int n, vector<int>& left, vector<int>& right) {
        int res = 0;
        for(auto v : left) {
            res = max(res, v);
        }
        for(auto v : right) {
            res = max(res, n-v);
        }
        return res;
    }
```

### [1504. 统计全 1 子矩形](https://leetcode-cn.com/problems/count-submatrices-with-all-ones/) [TAG]

思想：

1. 记录每一行到当前位置的连续1数量
2. 从当前位置 `(i, j)` 开始向上寻找 维护宽度w 取min

```c++
    int numSubmat(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size(), res = 0;
        vector<vector<int>> s(m, vector<int>(n));
        for(int i = 0; i < m; ++i) {
            int c = 0;
            for(int j = 0; j < n; ++j) {
                if(mat[i][j]) ++c;
                else c = 0;
                s[i][j] = c; 
            }
        }
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) {
                int w = 0x3f3f3f3f;
                for(int k = i; k >= 0; --k) {
                    w = min(w, s[k][j]);
                    res += w;
                }
            }
            
        return res;
    }
```

### [1505. 最多 K 次交换相邻数位后得到的最小整数](https://leetcode-cn.com/problems/minimum-possible-integer-after-at-most-k-adjacent-swaps-on-digits/) [TAG] 模版题

考虑：

1. 贪心：把最靠前的数字`x` 改最小，此时的 `最小` 需满足与 `x ` 位置差小于剩余可移动步数。随后进行的操作：将 `x` 与 `最小` 数字间的所有数字右移。
2. 线段树：动态维护异动区间 以及 查找区间最小值来和靠前数交换

更新模版 参考[liouzhou_101](https://leetcode-cn.com/u/liouzhou_101/)

```c++
template<class data_type>
struct segment_tree
{
    using T = data_type;
    int n;
    vector<T> a;
    
    using initialize_type = function<void(T&, int)>;
    using merge_type = function<void(T&, const T&, const T&)>;
    using pushdown_type = function<void(T&, int, int, T&, T&)>;
    initialize_type initialize;
    merge_type merge;
    pushdown_type pushdown;
    
    void clear(int k, int L, int R)
    {
        pushdown(a[k], L, R, a[k<<1], a[k<<1|1]);
    }
    void update(int k)
    {
        merge(a[k], a[k<<1], a[k<<1|1]);
    }
    void build(int k, int L, int R)
    {
        if (L == R)
        {
            initialize(a[k], L);
            return;
        }
        int m = (L+R)>>1;
        build(k<<1, L, m);
        build(k<<1|1, m+1, R);
        update(k);
    }
    segment_tree(int n, const initialize_type &initialize, const merge_type &merge, const pushdown_type &pushdown)
    {
        assert(n >= 1);
        this->n = n;
        this->initialize = initialize;
        this->merge = merge;
        this->pushdown = pushdown;
        a = vector<T>(4*n+1);
        build(1, 1, n);
    }
    
    using modifier_type = function<void(T&, int, int)>;
    void modify(int k, int L, int R, int x, int y, const modifier_type &modifier)
    {
        if (L == x && R == y)
        {
            modifier(a[k], L, R);
            return;
        }
        int m = (L+R)>>1;
        clear(k, L, R);
        if (y <= m)
            modify(k<<1, L, m, x, y, modifier);
        else if (x > m)
            modify(k<<1|1, m+1, R, x, y, modifier);
        else
        {
            modify(k<<1, L, m, x, m, modifier);
            modify(k<<1|1, m+1, R, m+1, y, modifier);
        }
        update(k);
    }
    void modify(int x, int y, const modifier_type &modifier)
    {
        assert(1 <= x && x <= y && y <= n);
        modify(1, 1, n, x, y, modifier);
    }
    
    template<class result_type, class convert_type = function<result_type(const T&)>, class calculate_type = function<result_type(const result_type&, const result_type&)>>
    result_type query(int k, int L, int R, int x, int y, const convert_type &convert, const calculate_type &calculate)
    {
        if (L == x && R == y)
            return convert(a[k]);
        int m = (L+R)>>1;
        clear(k, L, R);
        if (y <= m)
            return query<result_type>(k<<1, L, m, x, y, convert, calculate);
        if (x > m)
            return query<result_type>(k<<1|1, m+1, R, x, y, convert, calculate);
        return calculate(query<result_type>(k<<1, L, m, x, m, convert, calculate), query<result_type>(k<<1|1, m+1, R, m+1, y, convert, calculate));
    }
    template<class result_type, class convert_type = function<result_type(const T&)>, class calculate_type = function<result_type(const result_type&, const result_type&)>>
    result_type query(int x, int y, const convert_type &convert, const calculate_type &calculate)
    {
        assert(1 <= x && x <= y && y <= n);
        return query<result_type>(1, 1, n, x, y, convert, calculate);
    }
    
    T query(int x, int y)
    {
        assert(1 <= x && x <= y && y <= n);
        function<T(const T&)> convert = [](const T &it) -> T
        {
            return it;
        };
        function<T(const T&, const T&)> calculate = [&](const T &Lc, const T &Rc) -> T
        {
            T ret;
            merge(ret, Lc, Rc);
            return ret;
        };
        return query<T>(x, y, convert, calculate);
    }
};


class Solution {
public:
    string minInteger(string s, int k) {
        int n = s.size();
        vector<vector<int>> v(10);
        for (int i = n-1; i >= 0; --i) v[s[i]-'0'].push_back(i);
        
        struct node {
            int val;
        };
        auto initialize = [](node &it, int id) -> void {
            it.val = 1;
        };
        auto merge = [&](node &it, const node& Lc, const node& Rc) -> void {
            it.val = Lc.val+Rc.val;
        };
        auto pushdown = [&](node &it, int L, int R, node &Lc, node &Rc) -> void {
        };
        segment_tree<node> H(n, initialize, merge, pushdown);
        
        string res;
        for (int i = 0; i < n; ++i) {
            // 找最小数字换
            for (int d = 0; d <= 9; ++d) {
                if (v[d].empty()) continue;
                // 找当前数字最靠前的
                int pos = v[d].back();
                // 计算移动消耗
                int tmp = H.query(1, pos+1).val-1;
                if (tmp <= k) {
                    res += d+'0';
                    k -= tmp;
                    v[d].pop_back();
                    // 维护
                    H.modify(pos+1, pos+1, [&](node &it, int, int){
                        it.val -= 1;
                    });
                    break;
                }
            }
        }
        return res;
    }
};
```
