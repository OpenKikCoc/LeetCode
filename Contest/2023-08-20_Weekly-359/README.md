## [比赛链接](https://leetcode.cn/contest/weekly-contest-359/)

>   virtual rank: 89 / 4101
>   0:00:48
>   0:05:08  1
>   0:10:55
>   0:24:18


### [2828. 判别首字母缩略词](https://leetcode.cn/problems/check-if-a-string-is-an-acronym-of-words/)



```c++
class Solution {
public:
    bool isAcronym(vector<string>& words, string s) {
        string t;
        for (auto & w : words)
            t.push_back(w[0]);
        return s == t;
    }
};
```


### [2829. k-avoiding 数组的最小总和](https://leetcode.cn/problems/determine-the-minimum-sum-of-a-k-avoiding-array/)



```c++
class Solution {
public:
    const static int N = 110;   // ATTENTION 需要是 50*2
    
    bool st[N];
    
    int minimumSum(int n, int k) {
        memset(st, 0, sizeof st);
        for (int i = 1; i < k - i; ++ i ) {
            st[k - i] = true;
        }
        
        int sum = 0;
        for (int i = 1, c = 0; i < N; ++ i ) {
            if (st[i])
                continue;
            sum += i, c ++ ;
            if (c == n)
                break;
        }
        return sum;
    }
};
```

### [2830. 销售利润最大化](https://leetcode.cn/problems/maximize-the-profit-as-the-salesman/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int f[N];   // 考虑前 i 个位置的最大收入
    
    int maximizeTheProfit(int n, vector<vector<int>>& offers) {
        sort(offers.begin(), offers.end(), [](const vector<int> & a, const vector<int> & b) {
            return a[1] < b[1];
        });
        
        int m = offers.size();
        memset(f, 0, sizeof f);
        for (int i = 1, p = 0; i < N; ++ i ) {
            f[i] = f[i - 1];
            while (p < m && offers[p][1] + 1 == i) {
                int l = offers[p][0] + 1, r = offers[p][1] + 1, w = offers[p][2];
                f[i] = max(f[i], f[l - 1] + w);
                p ++ ;
            }
        }
        
        // for (int i = 0; i <= n; ++ i )
        //     cout << "i = " << i << " f = " << f[i] << endl;
        // cout << endl;
        
        return f[n];
    }
};
```

### [2831. 找出最长等值子数组](https://leetcode.cn/problems/find-the-longest-equal-subarray/)

经典暴力优化

按数值对下标分类  随后同向双指针

```c++
class Solution {
public:
    // 考虑 直接遍历+枚举右端点 or 二分答案都不可行
    //
    // 思考 按照值分类记录下标  双指针维护
    const static int N = 1e5 + 10;
    
    vector<int> xss[N];
    
    int get(int x, int k) {
        auto & xs = xss[x];
        int n = xs.size(), ret = 0;
        for (int i = 0, j = 0, del = 0; j < n; ++ j ) {
            if (j)
                del += xs[j] - xs[j - 1] - 1;
            while (del > k && i < j) {
                i ++ ;
                del -= xs[i] - xs[i - 1] - 1;
            }
            ret = max(ret, j - i + 1);
        }
        return ret;
    }
    
    int longestEqualSubarray(vector<int>& nums, int k) {
        int n = nums.size();
        for (int i = 0; i < n; ++ i )
            xss[nums[i]].push_back(i);
        
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            res = max(res, get(i, k));
        return res;
    }
};
```
