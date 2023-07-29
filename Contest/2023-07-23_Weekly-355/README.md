## [比赛链接](https://leetcode.cn/contest/weekly-contest-355/)


### [2788. 按分隔符拆分字符串](https://leetcode.cn/problems/split-strings-by-separator/)



```c++
class Solution {
public:
    vector<string> split(string & w, char sep) {
        vector<string> ret;
        int n = w.size();
        for (int i = 0; i < n; ++ i ) {
            if (w[i] == sep)
                continue;
            int j = i;
            while (j < n && w[j] != sep)
                j ++ ;
            ret.push_back(w.substr(i, j - i));
            i = j - 1;
        }
        return ret;
    }
    
    vector<string> splitWordsBySeparator(vector<string>& words, char separator) {
        vector<string> res;
        for (auto & w : words) {
            auto ws = split(w, separator);
            for (auto s : ws)
                if (s.size())
                    res.push_back(s);
        }
        return res;
    }
};
```


### [2789. 合并后数组中的最大元素](https://leetcode.cn/problems/largest-element-in-an-array-after-merge-operations/)

单调栈思想 略有变形

题解区有一次遍历的统计思想 略

```c++
class Solution {
public:
    // 考虑单调栈 记录总和与当前的最大值
    using LL = long long;
    using PLI = pair<LL, int>;
    
    const static int N = 1e5 + 10;
    
    PLI stk[N];
    int top;
    
    long long maxArrayValue(vector<int>& nums) {
        int n = nums.size();
        top = 0;
        
        for (int i = n - 1; i >= 0; -- i ) {
            stk[top ++ ] = {nums[i], nums[i]};
            while (top >= 2 && stk[top - 1].second <= stk[top - 2].first) {
                stk[top - 2].first += stk[top - 1].first;
                stk[top - 2].second = max(stk[top - 2].second, stk[top - 1].second);
                top -- ;
            }
        }
        
        LL res = 0;
        for (int i = 0; i < top; ++ i )
            res = max(res, stk[i].first);
        return res;
    }
};
```

### [2790. 长度递增组的最大数目](https://leetcode.cn/problems/maximum-number-of-groups-with-increasing-length/) [TAG]

贪心排序 构造思维

```c++
class Solution {
public:
    // 考虑 按照数量降序
    // 第i次需要把前i大的各自-1 减完之后有可能发生顺序变化
    // 显然不能用堆枚举 复杂度无法接受
    using LL = long long;

    vector<int> uls;

    int maxIncreasingGroups(vector<int>& usageLimits) {
        this->uls = usageLimits;
        sort(uls.begin(), uls.end());
        
        LL rest = 0, res = 0;
        for (auto x : uls) {
            // 直接加  因为不管是“构造不了”还是“构造完有余”都可以给后面用
            // ATTENTION 思维与证明 为什么这样一定可以构造
            // 以柱状图的形式思考
            // 每次新加一个数构造相当于基于原本的再追加一列【一定能够通过置换使得其可用】
            rest += x;
            if (rest >= res + 1) {
                rest -= res + 1;
                res ++ ;
            }
        }
        return res;
    }
};
```

### [2791. 树中可以形成回文的路径数](https://leetcode.cn/problems/count-paths-that-can-form-a-palindrome-in-a-tree/)

经典的暴力优化思路

```c++
class Solution {
public:
    // 关键点：可以重新排列
    // 则 只需要关心两个点之间的不同字符的奇偶性即可
    //
    // 又因为 1e5 数据范围显然不能两两枚举
    // 考虑直接统计从根到某个节点的所有字符的奇偶状态 并全局计数
    // 最后遍历节点即可
    using LL = long long;
    const static int N = 1e5 + 10, M = N;
    
    int h[N], e[M], w[M], ne[M], idx;
    void init() {
        memset(h, -1, sizeof h);
        idx = 0;
    }
    void add(int a, int b, int c) {
        e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx ++ ;
    }
    
    unordered_map<int, int> count;
    int st[N];
    void dfs(int u, int s) {
        st[u] = s;
        count[s] ++ ;
        for (int i = h[u]; ~i; i = ne[i]) {
            int j = e[i];
            int t = w[i];
            dfs(j, s ^ (1 << t));
        }
    }
    
    long long countPalindromePaths(vector<int>& parent, string s) {
        init();
        int n = parent.size();
        for (int i = 1; i < n; ++ i )
            add(parent[i], i, s[i] - 'a');
        
        count.clear();
        memset(st, 0, sizeof st);
        dfs(0, 0);
        
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            int a = st[i];
            // 奇偶性相同的情况 要排除自身
            res = res + ((LL)count[a] - 1);
            // 奇偶性不同的情况
            for (int j = 0; j < 26; ++ j ) {
                int b = a ^ (1 << j);
                res = res + (LL)count[b];
            }
        }
        return res / 2;
    }
};
```
