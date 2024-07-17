## [比赛链接](https://leetcode.cn/contest/weekly-contest-268/)


### [2078. 两栋颜色不同且距离最远的房子](https://leetcode.cn/problems/two-furthest-houses-with-different-colors/)



```c++
class Solution {
public:
    int maxDistance(vector<int>& colors) {
        int n = colors.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                if (colors[i] != colors[j])
                    res = max(res, j - i);
        return res;
    }
};
```


### [2079. 给植物浇水](https://leetcode.cn/problems/watering-plants/)

注意不够就要回去补水

即 `t = cap - ps[i]` 而非 `t += cap - ps[i]`

```c++
class Solution {
public:
    int wateringPlants(vector<int>& ps, int cap) {
        int n = ps.size(), res = 0;
        for (int i = 0, t = cap; i < n; ++ i ) {
            if (ps[i] <= t)
                t -= ps[i], res ++ ;
            else
                t = cap - ps[i], res += i * 2 + 1;
        }
        return res;
    }
};
```

### [2080. 区间内查询数字的频率](https://leetcode.cn/problems/range-frequency-queries/)

经典二分应用

注意加引用

```c++
class RangeFreqQuery {
public:
    const static int N = 10010;
    
    vector<int> vs[N];
    
    RangeFreqQuery(vector<int>& arr) {
        for (int i = 0; i < N; ++ i )
            vs[i].clear();
        
        int n = arr.size();
        for (int i = 0; i < n; ++ i )
            vs[arr[i]].push_back(i);
    }
    
    int query(int left, int right, int value) {
        auto & ve = vs[value];
        auto l = lower_bound(ve.begin(), ve.end(), left);
        auto r = lower_bound(ve.begin(), ve.end(), right + 1);
        return r - l;
    }
};

/**
 * Your RangeFreqQuery object will be instantiated and called as such:
 * RangeFreqQuery* obj = new RangeFreqQuery(arr);
 * int param_1 = obj->query(left,right,value);
 */
```

简单优化

```c++
class RangeFreqQuery {
public:
    const static int N = 10010;
    
    vector<int> vs[N];
    
    RangeFreqQuery(vector<int>& arr) {
        for (int i = 0; i < N; ++ i )
            vs[i].clear();
        
        int n = arr.size();
        for (int i = 0; i < n; ++ i )
            vs[arr[i]].push_back(i);
    }
    
    int query(int left, int right, int value) {
        auto & ve = vs[value];
        if (ve.empty())
            return 0;
        vector<int>::iterator l, r;
        if (left <= ve.front())
            l = ve.begin();
        else
            l = lower_bound(ve.begin(), ve.end(), left);
        if (right >= ve.back())
            r = ve.end();
        else
            r = lower_bound(ve.begin(), ve.end(), right + 1);
        return r - l;
    }
};

/**
 * Your RangeFreqQuery object will be instantiated and called as such:
 * RangeFreqQuery* obj = new RangeFreqQuery(arr);
 * int param_1 = obj->query(left,right,value);
 */
```

### [2081. k 镜像数字的和](https://leetcode.cn/problems/sum-of-k-mirror-numbers/) [TAG]

**经典 求k进制下的第n个回文数字**

```c++
class Solution {
public:
    // 基础知识: [求 k 进制下的第 n 个回文数]
    // 在此基础上加上 10 进制回文的判断，中间累加和即可
    // 
    // Knowledge: 1e9里的十进制回文数有109998个
    using LL = long long;
    
    bool check(LL x) {
        string s = to_string(x);
        for (int i = 0, j = s.size() - 1; i < j; ++ i , -- j )
            if (s[i] != s[j])
                return false;
        return true;
    }
    
    long long kMirror(int k, int n) {
        LL res = 0, l = 1;
        while (n) {
            LL r = l * k;
            for (int op = 0; op < 2; ++ op )
                for (int i = l; i < r && n; ++ i ) {
                    int x = (op ? i : i / k);   // 生成奇数还是偶数位 0代表奇数
                    LL conbined = i;
                    while (x) {
                        conbined = conbined * k + x % k;
                        x /= k;
                    }
                    // 本题要求 10 进制回文  特殊处理
                    if (check(conbined) && n) {
                        res += conbined;
                        n -- ;
                    }
                }
            l = r;
        }
        return res;
    }
};
```
