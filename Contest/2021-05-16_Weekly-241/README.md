## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-241/)

AK 52min

rank: 62 / 4490

### [5759. 找出所有子集的异或总和再求和](https://leetcode-cn.com/problems/sum-of-all-subset-xor-totals/)

暴力枚举即可 枚举技巧 bit

```c++
class Solution {
public:
    int subsetXORSum(vector<int>& nums) {
        int res = 0, n = nums.size();
        for (int i = 0; i < 1 << n; ++ i ) {
            int c = 0;
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1)
                    c ^= nums[j];
            res += c;
        }
        return res;
    }
};
```


### [5760. 构成交替字符串需要的最小交换次数](https://leetcode-cn.com/problems/minimum-number-of-swaps-to-make-the-binary-string-alternating/)

模拟即可 因为可以直接交换所以计算其不同处即可

```c++
class Solution {
public:
    string get(int n, char start) {
        string ret;
        ret.push_back(start);
        while ( -- n)
            ret.push_back(ret.back() ^ 1);
        return ret;
    }
    
    int get_dist(string a, string b) {
        int c = 0, n = a.size();
        for (int i = 0; i < n; ++ i )
            if (a[i] != b[i])
                c ++ ;
        return c / 2;
    }
    
    int minSwaps(string s) {
        int c1 = 0, c0 = 0, n = s.size();
        for (auto c : s)
            if (c == '1')
                c1 ++ ;
            else
                c0 ++ ;
        if (abs(c1 - c0) > 1)
            return -1;
        
        string s1 = get(n, '1'), s0 = get(n, '0');
        if (c1 > c0) {
            return get_dist(s, s1);
        } else if (c1 < c0) {
            return get_dist(s, s0);
        } else {
            return min(get_dist(s, s0), get_dist(s, s1));
        }
        return -1;
    }
};
```

### [5761. 找出和为指定值的下标对](https://leetcode-cn.com/problems/finding-pairs-with-a-certain-sum/)

模拟题 hash 维护即可

```c++
class FindSumPairs {
public:
    vector<int> ns1, ns2;   // 正数
    unordered_map<int, int> hash;
    int n;
    
    FindSumPairs(vector<int>& nums1, vector<int>& nums2) {
        this->ns1 = nums1, this->ns2 = nums2;
        n = ns1.size();
        sort(ns1.begin(), ns1.end());
        for (auto v : nums2)
            hash[v] ++ ;
    }
    
    void add(int index, int val) {
        int t = ns2[index];
        hash[t] -- ;
        hash[t + val] ++ ;
        ns2[index] += val;
    }
    
    int count(int tot) {
        int res = 0;
        for (int i = 0; i < n; ++ i ) {
            if (ns1[i] >= tot)
                break;
            int t = tot - ns1[i];
            if (hash.count(t))
                res += hash[t];
        }
        return res;
    }
};

/**
 * Your FindSumPairs object will be instantiated and called as such:
 * FindSumPairs* obj = new FindSumPairs(nums1, nums2);
 * obj->add(index,val);
 * int param_2 = obj->count(tot);
 */
```

### [5762. 恰有 K 根木棍可以看到的排列数目](https://leetcode-cn.com/problems/number-of-ways-to-rearrange-sticks-with-k-sticks-visible/) [TAG]

经典题目 dp时考虑当前枚举的是所有当中最小的即可

```c++
class Solution {
public:
    using LL = long long;
    const int MOD = 1e9 + 7;
    
    const static int N = 1010;
    LL f[N][N];    // 用了高度1-i 左侧可以看到j个 最终 f[n][k]
    
    int rearrangeSticks(int n, int k) {
        f[1][1] = 1;
        for (int i = 2; i <= n; ++ i )
            for (int j = 1; j <= i; ++ j )
                f[i][j] = (f[i - 1][j - 1] + f[i - 1][j] * (i - 1) % MOD) % MOD;
        
        return f[n][k];
    }
};
```
