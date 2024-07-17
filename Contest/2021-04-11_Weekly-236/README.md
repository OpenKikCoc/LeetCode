## [比赛链接](https://leetcode.cn/contest/weekly-contest-236/)


### [1822. 数组元素积的符号](https://leetcode.cn/problems/sign-of-the-product-of-an-array/)

直接判正负号即可

```c++
class Solution {
public:
    using LL = long long;
    int arraySign(vector<int>& nums) {
        LL s = 1;
        for (auto v : nums)
            if (v == 0)
                s = 0;
            else
                s = s * (v > 0 ? 1 : -1);
        if (!s)
            return 0;
        return s > 0 ? 1 : -1;
    }
};
```


### [1823. 找出游戏的获胜者](https://leetcode.cn/problems/find-the-winner-of-the-circular-game/)

约瑟夫环 略

```c++
class Solution {
public:
    int findTheWinner(int n, int k) {
        int res = 0;
        for (int i = 2; i <= n; ++ i )
            res = (res + k) % i;
        return res + 1;
    }
};
```

### [1824. 最少侧跳次数](https://leetcode.cn/problems/minimum-sideway-jumps/) [TAG]

显然分层最短路 考虑递推dp

> 分层最短路的特点 只能从上一层到达下一层 拓扑无环
>
> 考虑当前层只由上一层的点来更新 不考虑本层内
>
> `if (b[i] != k + 1)` 本质是上一层直接向右走时无障碍
>
> **本质上是转移思路的转化**

双端队列也能过 略

```c++
const int N = 500010, INF = 1e8;

int f[N][3];

class Solution {
public:
    // 注意题意 可以跳的时候不借助障碍
    
    int minSideJumps(vector<int>& b) {
        int n = b.size() - 1;
        f[0][0] = f[0][2] = 1, f[0][1] = 0;
        
        for (int i = 1; i <= n; ++ i )
            for (int j = 0; j < 3; ++ j )
                if (b[i] == j + 1)
                    f[i][j] = INF;
                else {
                    f[i][j] = INF;
                    for (int k = 0; k < 3; ++ k )
                        if (b[i] != k + 1)  // ATTENTION
                            f[i][j] = min(f[i][j], f[i - 1][k] + (k != j));
                }
        return min(f[n][0], min(f[n][1], f[n][2]));
    }
};
```

### [1825. 求出 MK 平均值](https://leetcode.cn/problems/finding-mk-average/) [TAG]

显然平衡树

```c++
class MKAverage {
public:
    using LL = long long;

    struct Range {
        multiset<int> s;
        LL sum = 0;
        void insert(int x) {
            s.insert(x);
            sum += x;
        }
        void remove(int x) {
            s.erase(s.find(x));
            sum -= x;
        }
    } L, M, R;

    int m, k;
    vector<int> q;

    MKAverage(int m, int k) {
        this->m = m, this->k = k;
    }
    
    void addElement(int num) {
        q.push_back(num);
        if (q.size() < m)
            return;
        if (q.size() == m) {
            auto w = q;
            sort(w.begin(), w.end());
            for (int i = 0; i < k; ++ i )
                L.insert(w[i]);
            for (int i = k; i < m - k; ++ i )
                M.insert(w[i]);
            for (int i = m - k; i < m; ++ i )
                R.insert(w[i]);
        } else {
            M.insert(num);
            if (*M.s.begin() < *L.s.rbegin()) {
                int x = *M.s.begin(), y = *L.s.rbegin();
                M.remove(x), L.insert(x);
                L.remove(y), M.insert(y);
            }
            if (*M.s.rbegin() > *R.s.begin()) {
                int x = *M.s.rbegin(), y = *R.s.begin();
                M.remove(x), R.insert(x);
                R.remove(y), M.insert(y);
            }

            num = q[q.size() - 1 - m];
            if (M.s.count(num))
                M.remove(num);
            else if (L.s.count(num)) {
                L.remove(num);
                int x = *M.s.begin();
                M.remove(x), L.insert(x);
            } else {
                R.remove(num);
                int x = *M.s.rbegin();
                M.remove(x), R.insert(x);
            }
        }
    }
    
    int calculateMKAverage() {
        if (q.size() < m)
            return -1;
        return M.sum / M.s.size();
    }
};

/**
 * Your MKAverage object will be instantiated and called as such:
 * MKAverage* obj = new MKAverage(m, k);
 * obj->addElement(num);
 * int param_2 = obj->calculateMKAverage();
 */
```
