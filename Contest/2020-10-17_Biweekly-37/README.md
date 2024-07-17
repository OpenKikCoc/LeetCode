## [比赛链接](https://leetcode.cn/contest/biweekly-contest-37/)


### [5122. 删除某些元素后的数组均值](https://leetcode.cn/problems/mean-of-array-after-removing-some-elements/)

模拟

```c++
    double trimMean(vector<int>& arr) {
        int n = arr.size();
        sort(arr.begin(), arr.end());
        double sum = 0;
        for(int i = n/20; i < n/20*19; ++i) sum += arr[i];
        return sum / (n/20.0*18.0);
    }
```


### [5528. 网络信号最好的坐标](https://leetcode.cn/problems/coordinate-with-maximum-network-quality/)

暴力 注意精度

```c++
    vector<vector<int>> ts;
    int r, sz;
    int get(int x, int y) {
        int res = 0;
        for(auto & t : ts) {
            double d = sqrt((t[0]-x)*(t[0]-x) + (t[1]-y)*(t[1]-y));
            if(d > r) continue;
            double v = (double)t[2] / (1.0+d);
            res += v;
        }
        return res;
    }
    vector<int> bestCoordinate(vector<vector<int>>& towers, int radius) {
        this->ts = towers;
        this->r = radius;
        this->sz = towers.size();
        // 范围不超过50 枚举n^2复杂度*n
        int x = 0, y = 0, mx = 0;
        for(int i = 0; i <= 50; ++i)
            for(int j = 0; j <= 50; ++j) {
                int v = get(i, j);
                if(v > mx) mx = v, x = i, y = j;
            }
        return vector<int>{x, y};
    }
```

### [5527. 大小为 K 的不重叠线段的数目](https://leetcode.cn/problems/number-of-sets-of-k-non-overlapping-line-segments/) [TAG]

dp

```c++
    // f[i][k] 表示长度为i j段段方案数 
    const int mod = 1e9+7;
    int numberOfSets(int n, int k) {
        vector<vector<pair<int, int>>> f(n+1, vector<pair<int, int>>(k+1));
        // first not     second has
        f[0][0].first = 1;
        for(int i = 1; i < n; ++i)
            for(int j = 0; j <= k; ++j) {
                f[i][j].first = (f[i-1][j].first + f[i-1][j].second) % mod;
                f[i][j].second = f[i-1][j].second;
                if(j > 0) {
                    // 第j段长度为1
                    f[i][j].second = (f[i][j].second + f[i-1][j-1].first) % mod;
                    f[i][j].second = (f[i][j].second + f[i-1][j-1].second) % mod;
                }
            }
        return (f[n-1][k].first + f[n-1][k].second) % mod;
    }
```

数学解法 [链接](https://leetcode.cn/problems/number-of-sets-of-k-non-overlapping-line-segments/solution/da-xiao-wei-k-de-bu-zhong-die-xian-duan-de-shu-mu-/)

```python
class Solution:
    def numberOfSets(self, n: int, k: int) -> int:
        return math.comb(n + k - 1, k * 2) % (10**9 + 7)
```



### [5530. 奇妙序列](https://leetcode.cn/problems/fancy-sequence/) [TAG]

乘法逆元 略

```c++
#define LL long long

class Fancy {
private:
    vector<LL> nums;
    LL add, mul;
    const int mod = 1000000007;
    // 快速幂
    LL power(LL x, int y) {
        LL tot = 1, p = x;
        for (; y; y >>= 1) {
            if (y & 1)
                tot = (tot * p) % mod;
            p = (p * p) % mod;
        }
        return tot;
    }

public:
    Fancy() {
        add = 0;
        mul = 1;
    }
    
    void append(int val) {
        val = ((val - add) % mod + mod) % mod;
        val = (val * power(mul, mod - 2)) % mod;  // val * inv(val)
        nums.push_back(val);
    }
    
    void addAll(int inc) {
        add = (add + inc) % mod;
    }
    
    void multAll(int m) {
        add = add * m % mod;
        mul = mul * m % mod;
    }
    
    int getIndex(int idx) {
        if (idx >= nums.size())
            return -1;
        return (nums[idx] * mul + add) % mod;
    }
};
```

也可以用数据结构 但是本质不是考数据结构 线段树做法略