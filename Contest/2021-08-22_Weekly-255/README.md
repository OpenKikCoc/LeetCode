## [比赛链接](https://leetcode.cn/contest/weekly-contest-255/)


### [1979. 找出数组的最大公约数](https://leetcode.cn/problems/find-greatest-common-divisor-of-array/)

模拟 略

```c++
class Solution {
public:
    int findGCD(vector<int>& nums) {
        int minv = INT_MAX, maxv = INT_MIN;
        for (auto v : nums)
            minv = min(minv, v), maxv = max(maxv, v);
        return __gcd(minv, maxv);
    }
};
```

```c++
class Solution {
public:
    int findGCD(vector<int>& nums) {
        return __gcd(*min_element(nums.begin(), nums.end()), *max_element(nums.begin(), nums.end()));
    }
};
```

### [1980. 找出不同的二进制字符串](https://leetcode.cn/problems/find-unique-binary-string/)

考虑显然每个二进制串唯一对应一个数字，转化数字标识即可

```c++
class Solution {
public:
    const static int N = 65536; // 2^16 = 1024*64
    
    bool st[N];
    
    string findDifferentBinaryString(vector<string>& nums) {
        int n = nums.size();
        for (auto & s : nums) {
            int v = 0;
            for (int i = 0; i < n; ++ i )
                if (s[i] == '1')
                    v += 1 << i;
            st[v] = true;
        }
        for (int i = 0; i < N; ++ i )
            if (!st[i]) {
                string res(n, '0');
                for (int j = 0; j < n; ++ j )
                    if (i >> j & 1)
                        res[j] = '1';
                return res;
            }
        return "";
    }
};
```

赛榜第一 `sfiction` 巨巨的优雅代码：

```c++
// 评论区称之为 【康托对角线】
class Solution {
public:
    string findDifferentBinaryString(vector<string>& a) {
        int n= a.size();
        string s;
        for (int i = 0; i < n; ++i)
            s.push_back(a[i][i] ^ 1);
        return s;
    }
};
```

### [1981. 最小化目标值与所选元素的差](https://leetcode.cn/problems/minimize-the-difference-between-target-and-chosen-elements/)

较显然的是一个分组背包问题

直接分组写显然 MLE ，可以滚动数组来做

鉴于题目所述数据范围，直接标记某值是否可达即可（背包特性较弱）

```c++
class Solution {
public:
    const static int N = 5000; // 70*70
    
    int n, m;
    vector<vector<int>> g;
    vector<bool> st;
    
    int minimizeTheDifference(vector<vector<int>>& mat, int target) {
        this->g = mat;
        this->n = g.size(), this->m = g[0].size();
        this->st = vector<bool>(N);
        
        st[0] = true;
        for (int i = 0; i < n; ++ i ) {
            auto t = vector<bool>(N);
            for (int j = 0; j < m; ++ j ) {
                int v = g[i][j];
                for (int k = 0; k < N; ++ k )
                    if (st[k] && k + v < N)
                        t[k + v] = true;
            }
            st = t;
        }
        
        // 这一坨显然可以直接一个for-loop... 略
        int res = INT_MAX;
        {
            int p = target;
            while (p && !st[p])
                p -- ;
            if (p)
                res = min(res, target - p);
        }
        {
            int p = target;
            while (p < N && !st[p])
                p ++ ;
            if (p < N)
                res = min(res, p - target);
        }
        return res;
    }
};
```

```c++
// bitset优化
class Solution {
public:
    const static int M = 5000;

    int minimizeTheDifference(vector<vector<int>>& mat, int target) {
        int n = mat.size(), m = mat[0].size();
        bitset<M> b;
        b.set(0);
        for (int i = 0; i < n; ++ i ) {
            bitset<M> t;
            for (auto x : mat[i])
                t |= b << x;
            b = t;
        }
        int res = M;
        for (int i = 0; i < M; ++ i )
            if (b[i])
                res = min(res, abs(i - target));
        return res;
    }
};
```



### [1982. 从子集的和还原数组](https://leetcode.cn/problems/find-array-given-subset-sums/) [TAG]

核心在于将负数集合转化为正数集合

随后简化处理流程

```c++
// https://leetcode.cn/problems/find-array-given-subset-sums/solution/ti-jie-cong-zi-ji-de-he-huan-yuan-shu-zu-q9qw/
// 全非负数的基础版 题目链接 https://www.codechef.com/problems/ANUMLA
// 理解思路

// https://leetcode.cn/problems/find-array-given-subset-sums/solution/jian-yi-ti-jie-by-sfiction-9i43/
// 本题有负值，则将所有数 -min_element 转化为非负问题
// [非负问题中最小值必为0 次小值就是原集合的最小值] ===> [最大值与最小值差即为该数的绝对值 正负性待定]。递归求解

class Solution {
public:
    vector<int> recoverArray(int n, vector<int>& a) {
        sort(a.begin(), a.end());
        int B = -a[0];
        
        // 非负集合
        vector<int> b;
        for (auto x : a)
            b.push_back(B + x);
        
        vector<int> res;
        for (int _ = 0; _ < n; ++ _ ) {
            // 最小值为空集 次小值-最小值即为当前最小的数的绝对值
            int t = b[1] - b[0];
            res.push_back(t);
            
            // d 替代set实现值的删除
            int m = b.back();
            vector<int> d(m + 1);
            for (auto x : b)
                d[x] ++ ;
            b.clear();
            // ATTENTION
            for (int i = 0; i <= m; ++ i )
                if (d[i]) {
                    b.push_back(i);
                    d[i] -- ;
                    d[i + t] -- ;
                    i -- ; // 回退 继续检查当前值
                }
        }
        
        // 枚举子集
        for (int i = 0; i < 1 << n; ++ i ) {
            int t = 0;
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1)
                    t += res[j];
            if (t == B) {
                // 则该子集中的所有数字都应是负数
                for (int j = 0; j < n; ++ j )
                    if (i >> j & 1)
                        res[j] *= -1;
                return res;
            }
        }
        return res;
    }
};
```
