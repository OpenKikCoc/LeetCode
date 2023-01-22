## [比赛链接](https://leetcode.cn/contest/biweekly-contest-95/)

> virtual rank: 86 / 2880


### [2525. 根据规则将箱子分类](https://leetcode.cn/problems/categorize-box-according-to-criteria/)



```c++
class Solution {
public:
    using LL = long long;
    
    string categorizeBox(int l, int w, int h, int m) {
        bool f1 = (l >= 1e4 || w >= 1e4 || h >= 1e4 || (LL)l * w * h >= 1e9);
        bool f2 = m >= 100;
        if (f1 && f2)
            return "Both";
        if (!f1 && !f2)
            return "Neither";
        if (f1)
            return "Bulky";
        return "Heavy";
    }
};
```


### [2526. 找到数据流中的连续整数](https://leetcode.cn/problems/find-consecutive-integers-from-a-data-stream/)



```c++
class DataStream {
public:
    int v, k, c;
    
    DataStream(int value, int k) {
        this->v = value, this->k = k;
        this->c = 0;
    }
    
    bool consec(int num) {
        if (num != v) {
            c = 0;
            return false;
        } else {
            c ++ ;
            return c >= k;
        }
    }
};

/**
 * Your DataStream object will be instantiated and called as such:
 * DataStream* obj = new DataStream(value, k);
 * bool param_1 = obj->consec(num);
 */
```

### [2527. 查询数组 Xor 美丽值](https://leetcode.cn/problems/find-xor-beauty-of-array/)

猜结论

推导

> 首先题目中 $i,j$ 具有很强的对称性，而 $i,j$ 互换不改变式子的取值，因此，在 $i,j$ 不相等的情况下，`((nums[i] | nums[j]) & nums[k])` 取值会和 `((nums[j] | nums[i]) & nums[k])` 一致，而相等的两个数异或值为 $0$，因此对于所有的三元组而言 $i,j$ 不同的项会相互之间抵消
>
> 只需要考虑 $i=j$ 的情况，此时 `((nums[i] | nums[j]) & nums[k]) = nums[i] & nums[k]`，$i,k$ 又具有了对称性，`nums[i] & nums[k]` 与 `nums[k] & nums[i]` 也发生了抵消，只需要考虑 $i=k$ 的情形
>
> 最终只需要考虑中数组中所有数的异或和即可

```c++
class Solution {
public:
    int xorBeauty(vector<int>& nums) {
        int res = 0;
        for (auto x : nums)
            res ^= x;
        return res;
    }
};
```

### [2528. 最大化城市的最小供电站数目](https://leetcode.cn/problems/maximize-the-minimum-powered-city/)

二分 + 贪心的向右分配

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    int n, r, k;
    LL d[N], t[N];
    
    bool check(LL m) {
        memcpy(t, d, sizeof t);
        LL c = 0;
        // 贪心，当前位置作为叠加的区间的最左侧
        for (int i = 1; i <= n; ++ i ) {
            t[i] += t[i - 1];
            if (t[i] >= m)
                continue;
            LL add = m - t[i];
            c += add;
            t[i] += add, t[min(n, i + 2 * r) + 1] -= add;
        }
        return c <= k;
    }
    
    long long maxPower(vector<int>& stations, int r, int k) {
        this->n = stations.size(), this->r = r, this->k = k;
        for (int i = 1; i <= n; ++ i ) {
            int x = i, y = stations[i - 1];
            d[max(1, x - r)] += y, d[min(n, x + r) + 1] -= y;
        }
        
        LL L = 0, R = 1e12;
        while (L < R) {
            LL m = L + (R - L) / 2;
            if (check(m))
                L = m + 1;
            else
                R = m;
        }
        return L - 1;
    }
};
```
