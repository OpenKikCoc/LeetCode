## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-276/)


### [2138. 将字符串拆分为若干长度为 k 的组](https://leetcode-cn.com/problems/divide-a-string-into-groups-of-size-k/)

略

```c++
class Solution {
public:
    vector<string> divideString(string s, int k, char fill) {
        vector<string> res;
        int n = s.size();
        for (int i = 0; i < n; i += k ) {
            int j = i + k;
            if (j < n)
                res.push_back(s.substr(i, k));
            else {
                string t = s.substr(i);
                int sz = t.size();
                for (int j = 0; j < k - sz; ++ j )
                    t.push_back(fill);
                res.push_back(t);
            }
        }
        return res;
    }
};
```


### [2139. 得到目标值的最少行动次数](https://leetcode-cn.com/problems/minimum-moves-to-reach-target-score/)

略

```c++
class Solution {
public:
    int minMoves(int target, int md) {
        int res = 0, t = target;
        while (t > 1) {
            if (t % 2 == 0 && md)
                t /= 2, md -- , res ++ ;
            else {
                if (md)
                    t -- , res ++ ;
                else {
                    res += t - 1;
                    break;
                }
            }
                
        }
        return res;
    }
};
```

### [2140. 解决智力问题](https://leetcode-cn.com/problems/solving-questions-with-brainpower/)

略 注意递推细节

```c++
class Solution {
public:
    using LL = long long;
    
    long long mostPoints(vector<vector<int>>& q) {
        int n = q.size();
        vector<LL> f(n + 2), g(n + 2);
        
        for (int i = n; i >= 1; -- i ) {
            int x = q[i - 1][0], y = q[i - 1][1];
            f[i] = x + max(f[min(n + 1, i + y + 1)], g[min(n + 1, i + y + 1)]);
            g[i] = max(f[i + 1], g[i + 1]);
        }
        LL res = 0;
        for (int i = 1; i <= n; ++ i )
            res = max(res, max(f[i], g[i]));
        return res;
    }
};
```

### [2141. 同时运行 N 台电脑的最长时间](https://leetcode-cn.com/problems/maximum-running-time-of-n-computers/) [TAG]

[ABC227 D题](https://leetcode-cn.com/link/?target=https://atcoder.jp/contests/abc227/tasks/abc227_d)

经典题目 trick思维

```c++
class Solution {
public:
    // 受到二分算法的启发，最终答案的上限一定是 sum/n 下取整，但这个上限会受到一些高容量电池的限制无法达到。
    // 将电池容量从大到小排序，如果当前大容量的电池的容量小于或等于 sum/n 下取整，则根据二分法的结论，最终是可以达到这个上限的。
    // 否则，将最大容量的电池移除，同时分走一台电脑，问题规模缩小，直到满足条件为止。
    
    using LL = long long;
    
    long long maxRunTime(int n, vector<int>& bs) {
        sort(bs.begin(), bs.end());
        reverse(bs.begin(), bs.end());
        
        LL s = 0;
        for (auto x : bs)
            s += x;
        
        for (auto x : bs)
            if (x > s / n)
                // 当前电池可以给某个电脑一直用到最后（此处最后是指比后面其他所有的时间都长）
                // 则：不再需要考虑这个电脑（n -- ）和电池（s -= x）
                n -- , s -= x;
            else
                // 剩下的电池随意结合，充分使用
                return s / n;
        
        return 0;
    }
};
```
