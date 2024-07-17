## [比赛链接](https://leetcode.cn/contest/weekly-contest-242/)


### [1869. 哪种连续子字符串更长](https://leetcode.cn/problems/longer-contiguous-segments-of-ones-than-zeros/)

略

```c++
class Solution {
public:
    int get(string s, char tar) {
        int ret = 0, cnt = 0;
        for (auto c : s)
            if (c == tar) {
                cnt ++ ;
            } else {
                ret = max(ret, cnt);
                cnt = 0;
            }
        ret = max(ret, cnt);
        return ret;
    }
    
    bool checkZeroOnes(string s) {
        return get(s, '1') > get(s, '0');
    }
};
```

更优雅的实现

```c++
class Solution {
public:
    bool checkZeroOnes(string s) {
        int one = 0, zero = 0;
        for (int i = 0, x = 0, y = 0; i < s.size(); i ++ ) {
            if (s[i] == '0') y ++ , x = 0;
            else y = 0, x ++ ;
            one = max(one, x);
            zero = max(zero, y);
        }
        return one > zero;
    }
};
```

### [1870. 准时到达的列车最小时速](https://leetcode.cn/problems/minimum-speed-to-arrive-on-time/)

二分即可

```c++
class Solution {
public:
    vector<int> d;
    int n;
    double h;
    
    bool check(int m) {
        double ret = 0;
        for (int i = 0; i < n - 1; ++ i )
            ret += (int)((d[i] + m - 1) / m);
        return ret + double(d[n - 1]) / m <= h;
    }
    
    int minSpeedOnTime(vector<int>& dist, double hour) {
        this->d = dist;
        this->n = d.size();
        this->h = hour;
        
        int l = 1, r = 1e7;
        while (l < r) {
            int m = l + r >> 1;
            if (check(m))
                r = m;
            else
                l = m + 1;
        }
        return check(l) ? l : -1;
    }
};
```

### [1871. 跳跃游戏 VII](https://leetcode.cn/problems/jump-game-vii/)

当前 x 位置能否跳到取决于 `[x - maxJump, x - minJump]` 区间是否有可达点

显然可以借助 BIT 维护

```c++
class Solution {
public:
    const static int N = 2e5 + 10;
    int tr[N], n;
    
    int lowbit(int x) {
        return x & -x;
    }
    void add(int x, int c) {
        for (int i = x; i <= n; i += lowbit(i))
            tr[i] += c;
    }
    int sum(int x) {
        int res = 0;
        for (int i = x; i; i -= lowbit(i))
            res += tr[i];
        return res;
    }
    
    bool canReach(string s, int minJump, int maxJump) {
        memset(tr, 0, sizeof tr);
        this->n = s.size();
        add(1, 1);
        for (int i = 2; i <= n; ++ i )
            if (s[i - 1] == '0') {
                int l = max(i - maxJump - 1, 0), r = max(i - minJump, 0);
                if (sum(r) - sum(l) > 0) {
                    add(i, 1);
                }
            }
        return sum(n) - sum(n - 1) > 0;
    }
};
```

或 dp 的思路，判断是否有合法方案，维护到某个位置位置可以跳到的所有位置的个数(前缀和)

```c++
class Solution {
public:
    bool canReach(string str, int a, int b) {
        int n = str.size();
        vector<int> f(n + 1), s(n + 1);
        f[1] = 1;
        s[1] = 1;
        for (int i = 2; i <= n; i ++ ) {
            if (str[i - 1] == '0' && i - a >= 1) {
                int l = max(1, i - b), r = i - a;
                if (s[r] > s[l - 1]) f[i] = 1;
            }
            s[i] = s[i - 1] + f[i];
        }
        return f[n];
    }
};
```

### [1872. 石子游戏 VIII](https://leetcode.cn/problems/stone-game-viii/) [TAG]

博弈 dp ，注意 **类似 LCIS 的常数优化** `TAG`

```c++
class Solution {
public:
    int stoneGameVIII(vector<int>& stones) {
        int n = stones.size();
        reverse(stones.begin(), stones.end());
        vector<int> f(n + 1), s(n + 1);
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + stones[i - 1];
        int v = s[n] - s[0] + f[1];
        for (int i = 2; i <= n; ++ i ) {
            // 优化
            f[i] = v;
            v = max(v, s[n] - s[i - 1] - f[i]);
            // 本次操作之后 下次剩余至多 i - 2 + 1
            // f[i] = INT_MIN;
            // for (int j = 1; j <= i - 1; ++ j )
            //     f[i] = max(f[i], s[n] - s[j - 1] - f[j]);
        }
        return f[n];
    }
};
```