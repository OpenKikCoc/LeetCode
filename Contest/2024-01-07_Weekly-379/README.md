## [比赛链接](https://leetcode.cn/contest/weekly-contest-379/)


### [3000. 对角线最长的矩形的面积](https://leetcode.cn/problems/maximum-area-of-longest-diagonal-rectangle/)



```c++
class Solution {
public:
    int areaOfMaxDiagonal(vector<vector<int>>& dimensions) {
        int d = 0, s = 0;
        for (auto & r : dimensions) {
            int a = r[0], b = r[1];
            int t = a * a + b * b;
            if (t > d) {
                d = t;
                s = a * b;
            } else if (t == d && a * b > s)
                s = a * b;
        }
        return s;
    }
};
```


### [3001. 捕获黑皇后需要的最少移动次数](https://leetcode.cn/problems/minimum-moves-to-capture-the-queen/)

trick

```c++
class Solution {
public:
    // ATTENTION trick 答案至多为 2
    //   搜索显然不可行，换个思路
    //   由于【车】的存在:
    //   - 如果和皇后在同行/列 如果有阻挡需要 1+1 否则只需要 1
    //   - 如果不同行且不同列 一定狂月 2 次走到
    // 则 只需要判断一次能否走到即可

    int dx1[4] = {-1, 0, 1, 0}, dy1[4] = {0, 1, 0, -1};
    int dx2[8] = {-1, -1, 1, 1}, dy2[4] = {-1, 1, 1, -1};

    int X, Y;

    bool check(int x, int y, int dx[], int dy[], int stoneX, int stoneY) {
        // 枚举方向和步数
        for (int i = 0; i < 4; ++ i )
            for (int t = 1; t <= 8; ++ t ) {
                int nx = x + dx[i] * t, ny = y + dy[i] * t;
                if (nx < 1 || nx > 8 || ny < 1 || ny > 8)
                    continue;
                // ATTENTION 彼此撞到 排除
                if (nx == stoneX && ny == stoneY)
                    break;
                if (nx == X && ny == Y)
                    return true;
            }
        return false;
    }

    int minMovesToCaptureTheQueen(int a, int b, int c, int d, int e, int f) {
        this->X = e, this->Y = f;

        // 枚举车只走一步
        if (check(a, b, dx1, dy1, c, d))
            return 1;
        // 枚举象只走一步
        if (check(c, d, dx2, dy2, a, b))
            return 1;
        return 2;
    }
};
```

### [3002. 移除后集合的最多元素数](https://leetcode.cn/problems/maximum-size-of-a-set-after-removals/)

简单分类讨论

```c++
class Solution {
public:
    int maximumSetSize(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        
        unordered_set<int> s1, s2, inc;
        {
            for (auto x : nums1)
                s1.insert(x);
            for (auto x : nums2) {
                s2.insert(x);
                if (s1.count(x))
                    inc.insert(x);
            }
        }
        // 先单独把各自独有的抽出来 不能超过 n/2
        int n1 = 0, n2 = 0;
        {
            for (auto x : s1) {
                if (inc.count(x))
                    continue;
                n1 ++ ;
            }
            for (auto x : s2) {
                if (inc.count(x))
                    continue;
                n2 ++ ;
            }
            n1 = min(n1, n / 2), n2 = min(n2, n / 2);
        }
        // 再分配交集，决定交集由哪一方来出
        int available = max(n / 2 - n1, 0) + max(n / 2 - n2, 0);
        return n1 + n2 + min(int(inc.size()), available);
    }
};
```

### [3003. 执行操作后的最大分割数量](https://leetcode.cn/problems/maximize-the-number-of-partitions-after-operations/) [TAG]

推导 转换思路 结合前后缀分解降低复杂度

```c++
class Solution {
public:
    // 首先 梳理明确:
    //      假设不产生修改 则 [无论从左/从右侧开始贪心分段 段的总数都是相同的] 不同的是区间具体的左右边界
    //
    // 考虑前后缀分解 枚举在某个位置修改 以及改成不同字符对整体带来的影响

    using PII = pair<int, int>; // seg-index, mask
    const static int N = 1e4 + 10;

    int K;
    PII l[N], r[N];

    void update(int bit, int & idx, int & size, int & mask) {
        if (mask & bit)
            return;
        
        if (size + 1 > K) {
            // 需要从当前位置作为起始 新增一段
            idx ++ ;
            mask = bit;
            size = 1;
        } else {
            mask |= bit;
            size ++ ;
        }
    }

    int maxPartitionsAfterOperations(string s, int k) {
        // ATTENTION 必须特判
        if (k == 26)
            return 1;

        this->K = k;
        int n = s.size();
        for (int i = 1, idx = 1, size = 0, mask = 0; i <= n; ++ i ) {
            int bit = 1 << (s[i - 1] - 'a');
            update(bit, idx, size, mask);
            l[i] = {idx, mask};
        }
        for (int i = n, idx = 1, size = 0, mask = 0; i >= 1; -- i ) {
            int bit = 1 << (s[i - 1] - 'a');
            update(bit, idx, size, mask);
            r[i] = {idx, mask};
        }

        int res = l[n].first;   // 默认不修改的情况下

        for (int i = 1; i <= n; ++ i ) {
            auto [l_idx, l_mask] = l[i - 1];
            auto [r_idx, r_mask] = r[i + 1];
            int union_size = __builtin_popcount(l_mask | r_mask);
            int tot = l_idx + r_idx;    // 假设从当前位置割裂 总共有多少段
            if (union_size < k) {
                // 无论 i 位置上取什么值 左右都会合并
                tot -- ;
            } else if (union_size < 26) {
                // 看当前位置是否 “能够独立”
                bool f1 = (l_idx == 0 || __builtin_popcount(l_mask) == k);
                bool f2 = (r_idx == 0 || __builtin_popcount(r_mask) == k);
                if (f1 && f2)
                    tot ++ ;
            }
            // 否则 i 位置上只能归并到 左/右 中的一个 => tot 不变

            res = max(res, tot);
        }
        return res;
    }
};
```
