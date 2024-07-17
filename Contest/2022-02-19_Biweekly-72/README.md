## [比赛链接](https://leetcode.cn/contest/biweekly-contest-72/)

>   virtual rank: 128 / 4400


### [2176. 统计数组中相等且可以被整除的数对](https://leetcode.cn/problems/count-equal-and-divisible-pairs-in-an-array/)

略

```c++
class Solution {
public:
    int countPairs(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j )
                if (nums[i] == nums[j] && i * j % k == 0)
                    res ++ ;
        return res;
    }
};
```


### [2177. 找到和为给定整数的三个连续整数](https://leetcode.cn/problems/find-three-consecutive-integers-that-sum-to-a-given-number/)

略

```c++
class Solution {
public:
    using LL = long long;
    vector<long long> sumOfThree(long long num) {
        if (num % 3)
            return {};
        
        LL t = num / 3;
        return {t - 1, t, t + 1};
    }
};
```

### [2178. 拆分成最多数目的正偶数之和](https://leetcode.cn/problems/maximum-split-of-positive-even-integers/)

贪心

```c++
class Solution {
public:
    using LL = long long;
    
    vector<long long> maximumEvenSplit(long long finalSum) {
        if (finalSum & 1)
            return {};
        
        vector<LL> res;
        LL x = 0;
        while (finalSum) {
            x += 2;
            if (x * 2 + 2 <= finalSum)
                finalSum -= x, res.push_back(x);
            else {
                LL t = finalSum;
                finalSum -= t;
                res.push_back(t);
            }
        }
        return res;
    }
};
```

更简单的思路：多出来的直接加到最后一个

```c++
class Solution {
public:
    using LL = long long;

    vector<long long> maximumEvenSplit(long long finalSum) {
        if (finalSum & 1)
            return {};
        vector<LL> res;
        for (LL i = 2; i <= finalSum; finalSum -= i, i += 2)
            res.push_back(i);
        res.back() += finalSum;
        return res;
    }
};
```

### [2179. 统计数组中好三元组数目](https://leetcode.cn/problems/count-good-triplets-in-an-array/)

预处理转化，随后只要求单数组内递增三元组即可

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10;
    
    int tr1[N], tr2[N];
    int lowbit(int x) {
        return x & -x;
    }
    void add(int tr[], int x, int c) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += c;
    }
    int query(int tr[], int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    long long goodTriplets(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        unordered_map<int, int> hash;
        for (int i = 0; i < n; ++ i )
            hash[nums1[i]] = i;
        
        vector<int> ve;
        for (auto x : nums2)
            ve.push_back(hash[x]);
        
        memset(tr1, 0, sizeof tr1);
        memset(tr2, 0, sizeof tr2);
        for (int i = 0; i < n; ++ i )
            add(tr2, n - ve[i], 1);
        LL res = 0;
        for (int i = 0; i < n; ++ i ) {
            int x = ve[i];
            add(tr2, n - x, -1);
            int l = query(tr1, x), r = query(tr2, n - x);
            res += (LL)l * r;
            add(tr1, x + 1, 1);
        }
        return res;
    }
};
```
