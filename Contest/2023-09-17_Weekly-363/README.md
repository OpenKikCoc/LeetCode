## [比赛链接](https://leetcode.cn/contest/weekly-contest-363/)


### [2859. 计算 K 置位下标对应元素的和](https://leetcode.cn/problems/sum-of-values-at-indices-with-k-set-bits/)



```c++
class Solution {
public:
    int sumIndicesWithKSetBits(vector<int>& nums, int k) {
        int res = 0;
        for (int i = 0; i < nums.size(); ++ i )
            if (__builtin_popcount(i) == k)
                res += nums[i];
        return res;
    }
};
```


### [2860. 让所有学生保持开心的分组方法数](https://leetcode.cn/problems/happy-students/)

有点思维

```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int countWays(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        
        int res = 0;
        // 枚举不被选择的左边界
        for (int i = 0, max_choosed = -1; i < n; ++ i ) {
            int choosed = i;
            if (choosed < nums[i] && choosed > max_choosed)
                res ++ ;
            max_choosed = nums[i];
        }
        // 如果全部选中
        if (n > nums.back())
            res ++ ;
        
        return res;
    }
};
```

### [2861. 最大合金数](https://leetcode.cn/problems/maximum-number-of-alloys/)

注意加 LL 避免溢出

```c++
class Solution {
public:
    // 同一台机器完成，则问题被简化，只需要挨个枚举机器即可
    
    using LL = long long;
    const static int N = 110;
    
    int n, k, b;
    vector<int> s, c;
    
    bool check(vector<int> & cp, LL m) {
        LL tot = b;
        for (int i = 0; i < n; ++ i ) {
            LL need = (LL)cp[i] * m, have = s[i];   // ATTENTION 需要 LL 否则溢出
            if (need > have) {
                LL cost = (need - have) * c[i];
                if (cost > tot)
                    return false;
                tot -= cost;
            }
        }
        return true;
    }
    
    int maxNumberOfAlloys(int n, int k, int budget, vector<vector<int>>& composition, vector<int>& stock, vector<int>& cost) {
        this->n = n, this->k = k, this->b = budget;
        this->s = stock, this->c = cost;
        
        LL res = 0;
        for (auto & cp : composition) {
            LL l = 0, r = 1e10;
            while (l < r) {
                int m = l + (r - l) / 2;
                if (check(cp, m))
                    l = m + 1;
                else
                    r = m;
            }
            res = max(res, l - 1);
        }
        return res;
    }
};
```

### [2862. 完全子集的最大元素和](https://leetcode.cn/problems/maximum-element-sum-of-a-complete-subset-of-indices/) [TAG]

容易想到按照因子的奇偶性对所有下标进行解析

随后得到 st 值

核心点在于：并非使用 st 记录奇偶性，而是记录对应奇偶的乘积 => 思考

```c++
using LL = long long;

class Solution {
public:
    // 注意: 所谓的 '完全平方数' 是指下标，而非下标对应的值
    //  => 不会有重复值，则只能使用 1-1e4 范围内的元素，且集合需要保证质数的幂次总和为偶数
    //          后者必然符合: 质数大小不超过 25 个
    //
    // 还有个重要条件: 每对元素都需要能够两两完全平方 => 则一组内 所有元素的 st 必须完全一样
    // 
    // 【思考】ATTENTION: 不能比较二进制的 st，而应当计算乘积
    
    vector<int> ps = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97};
    int cnt = 25;
    
    long long maximumSum(vector<int>& nums) {
        int n = nums.size();
        
        LL res = 0;
        unordered_map<int, LL> h;
        for (int i = 1; i <= n; ++ i ) {
            // int st = 0, x = i;
            int st = 1, x = i;
            for (int j = 0; j < 25; ++ j ) {
                int c = 0, p = ps[j];
                while (x % p == 0)
                    x /= p, c ^= 1;
                if (c)
                    // st ^= 1 << j;
                    st *= p;
            }
            if (x > 1) {
                // 错误思维:
                // 1. 只能自己成为一组的元素
                // res = max(res, (LL)nums[i - 1]);    // ATTENTION: WA1, 需要单独考虑一下
                // continue;
                st *= x;
            }
            // 2. 可选的，能够与其他元素组合的元素
            h[st] += nums[i - 1];
        }

        for (auto & [x, y] : h)
            res = max(res, y);
        
        return res;
    }
};
```
