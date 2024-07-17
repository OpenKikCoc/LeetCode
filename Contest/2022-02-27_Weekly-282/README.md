## [比赛链接]()

>   rank: 92 / 7155


### [6008. 统计包含给定前缀的字符串](https://leetcode.cn/problems/counting-words-with-a-given-prefix/)

模拟即可

```c++
class Solution {
public:
    bool check(string & a, string & b) {
        int n = a.size(), m = b.size();
        if (n < m)
            return false;
        for (int i = 0; i < m; ++ i )
            if (a[i] != b[i])
                return false;
        return true;
    }
    
    int prefixCount(vector<string>& words, string pref) {
        int res = 0;
        for (auto & w : words)
            if (check(w, pref))
                res ++ ;
        return res;
    }
};
```


### [6009. 使两字符串互为字母异位词的最少步骤数](https://leetcode.cn/problems/minimum-number-of-steps-to-make-two-strings-anagram-ii/)

略

```c++
class Solution {
public:
    const static int N = 30;
    
    int c1[N], c2[N];
    
    int minSteps(string s, string t) {
        memset(c1, 0, sizeof c1);
        memset(c2, 0, sizeof c2);
        for (auto c : s)
            c1[c - 'a'] ++ ;
        for (auto c : t)
            c2[c - 'a'] ++ ;
        int res = 0;
        for (int i = 0; i < 26; ++ i )
            res += abs(c1[i] - c2[i]);
        return res;
    }
};
```

### [6010. 完成旅途的最少时间](https://leetcode.cn/problems/minimum-time-to-complete-trips/)

这题测试数据集的数据范围目测有点问题 RE一发

不能直接预估右边界 用了 `maxv * tt` 稳一些

```c++
class Solution {
public:
    using LL = long long;
    
    vector<int> ts;
    LL tt, maxv;
    
    LL check(LL m) {
        LL cnt = 0;
        for (auto t : ts) {
            cnt += m / t;
            if (cnt >= tt)
                break;
        }
            
        return cnt >= tt;
    }
    
    long long minimumTime(vector<int>& time, int totalTrips) {
        ts = time, tt = (LL)totalTrips;
        maxv = 0;
        for (auto v : time)
            maxv = max(maxv, (LL)v);
        
        LL l = 0, r = maxv * tt;
        while (l < r) {
            LL mid = l + r >> 1;
            if (check(mid))
                r = mid;
            else
                l = mid + 1;
        }
        return l;
    }
};
```

### [6011. 完成比赛的最少时间](https://leetcode.cn/problems/minimum-time-to-finish-the-race/)

显然根据数据范围 简化dp即可

```c++
class Solution {
public:
    // 2^10 = 1024 2^14
    // 一个轮胎最多使用 1 * 2^14 跑15圈, 耗时 1e5 * 14 + 2 + 
    using LL = long long;
    const static int N = 1e3 + 10, M = 16;
    
    LL dis[M], f[N];
    
    int minimumFinishTime(vector<vector<int>>& tires, int changeTime, int numLaps) {
        memset(dis, 0x3f, sizeof dis);
        int n = tires.size();
        for (auto & t : tires) {
            LL d[N];
            d[0] = 0;
            LL f = t[0], r = t[1];
            for (int i = 1, j = 1; i < M; ++ i , j *= r ) {
                d[i] = d[i - 1] + f * j;
                if (d[i] > 2e5)
                    break;
                dis[i] = min(dis[i], d[i]);
            }
        }
        
        for (int i = 0; i < N; ++ i )
            f[i] = 1e18;
        f[0] = 0;
        for (int i = 1; i <= numLaps; ++ i ) {
            for (int j = 1; j < M; ++ j )
                if (i - j >= 0)
                    f[i] = min(f[i], f[i - j] + dis[j] + changeTime);
        }
        
        return f[numLaps] - changeTime;
    }
};
```
