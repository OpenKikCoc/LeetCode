## [比赛链接]()


### [5830. 三除数](https://leetcode.cn/problems/three-divisors/)

模拟即可

```c++
class Solution {
public:
    bool isThree(int n) {
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            if (n % i == 0) {
                res ++ ;
            }
        return res == 3;
    }
};
```


### [5831. 你可以工作的最大周数](https://leetcode.cn/problems/maximum-number-of-weeks-for-which-you-can-work/)

贪心加思维

考虑某个最长的任务以及剩下其他所有任务之和

1.   如果其他任务之和小于最长任务，可完成周数为其他任务之和的二倍加一
2.   如果其他任务之和小于等于最长任务，则所有任务皆可完成，直接累加

做的太慢了。。。

```c++
class Solution {
public:
    using LL = long long;
    long long numberOfWeeks(vector<int>& ms) {
        sort(ms.begin(), ms.end());
        int n = ms.size();
        LL res = 0;
        for (int i = 0; i < n - 1; ++ i )
            res += (LL)ms[i];
        if (res < ms[n - 1])
            res += res + 1;
        else
            res += ms[n - 1];
        return res;
    }
};
```

也可以直接遍历同时取最值：

```c++
using LL = long long;
class Solution {
public:
    long long numberOfWeeks(vector<int>& milestones) {
        LL sum = 0, m = 0;
        for (LL x : milestones)
            sum += x, m = max(m, x);
        if (m > sum - m + 1)
            return (sum - m) * 2 + 1;
        return sum;
    }
};
```



### [5187. 收集足够苹果的最小花园周长](https://leetcode.cn/problems/minimum-garden-perimeter-to-collect-enough-apples/)

一开始题意理解错了。。

显然

1.   以原点为中心
2.   为正方形

可以直接二分在某一象限内的小正方形边长，也可通过公式累加

```c++
// 比赛代码
class Solution {
public:
    using LL = long long;
    
    LL get(LL x) {
        return (x - 1) * x * 3 + x * 3;
    }
    
    long long minimumPerimeter(long long neededApples) {
        LL tot = 0, l = 0;
        while (tot * 4 < neededApples) {
            l ++ ;
            tot += get(l);
        }
        return l * 8;
    }
};
```

显然每次 `l ++` 会增加 `3 * x * x`

对于全局来说，每次 `l ++ ` 会增加 `12 * x * x`

这样累加即可

也可以借助平方和公式如下二分

```c++
class Solution {
public:
    using LL = long long;

    LL get(LL x) {
        // x 为在某一象限内某一维度的长
        // 每增加一圈 增加数量为 12*i*i
        // 平方和公式 得整个正方形内苹果个数
        // 1^2 + 2^2 + 3^2 ... + n^2 = n * (n + 1) * (2 * n + 1) / 6
        // 注意需乘12
        return 2 * x * (1 + x) * (2 * x + 1);
    }

    long long minimumPerimeter(long long neededApples) {
        LL l = 0, r = 1e6;
        while (l < r) {
            LL m = l + r >> 1;
            if (get(m) < neededApples)
                l = m + 1;
            else
                r = m;
        }
        return l * 8;
    }
};
```



### [5833. 统计特殊子序列的数目](https://leetcode.cn/problems/count-number-of-special-subsequences/) [TAG]

核心在于 **状态定义** 和 **转移**

前 `i` 个位置分别构成 `0 / 01 / 012` 形式序列的方案数

```c++
class Solution {
public:
    using LL = long long;
    const int MOD = 1e9 + 7;
    
    int countSpecialSubsequences(vector<int>& nums) {
        LL a = 0, b = 0, c = 0;
        for (auto x : nums) {
            if (x == 0)
                // 不选本个 a
                // 选本个 则可以与前面连也可以不连 共a+1
                // 合计 a*2+1
                a = (a * 2 + 1) % MOD;
            if (x == 1)
                b = (b * 2 + a) % MOD;
            if (x == 2)
                c = (c * 2 + b) % MOD;
        }
        return c;
    }
};
```
