## [比赛链接](https://leetcode.cn/contest/weekly-contest-387/)

>   virtual rank:
>
>   176 / 3694	18	0:34:48	0:02:18	0:07:21	0:16:46	0:29:48  1	


### [3069. 将元素分配到两个数组中 I](https://leetcode.cn/problems/distribute-elements-into-two-arrays-i/)



```c++
class Solution {
public:
    vector<int> resultArray(vector<int>& nums) {
        vector<int> a, b;
        int n = nums.size();
        {
            a.push_back(nums[0]), b.push_back(nums[1]);
        }
        
        for (int i = 2; i < n; ++ i ) {
            if (a.back() > b.back())
                a.push_back(nums[i]);
            else
                b.push_back(nums[i]);
        }
        
        for (auto x : b)
            a.push_back(x);
        return a;
    }
};
```


### [3070. 元素和小于等于 k 的子矩阵的数目](https://leetcode.cn/problems/count-submatrices-with-top-left-element-and-sum-less-than-k/)

想着指针优化... 实际上统计前缀和的时候就可以知道了 不需要这么麻烦 略

```c++
class Solution {
public:
    // 重要条件：返回包含 grid 左上角元素
    // 则显然在增加行的时候从右侧向左收缩列即可
    
    const static int N = 1010;
    
    int s[N][N];
    
    int countSubmatrices(vector<vector<int>>& grid, int k) {
        int n = grid.size(), m = grid[0].size();
        memset(s, 0, sizeof s);
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + grid[i - 1][j - 1];
        
        int res = 0;
        for (int i = 1, j = m; i <= n; ++ i ) {
            while (j && s[i][j] > k)
                j -- ;
            res += j;
        }
        return res;
    }
};
```

### [3071. 在矩阵上写出字母 Y 所需的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-write-the-letter-y-on-a-grid/)

统计分情况讨论即可

```c++
class Solution {
public:
    int minimumOperationsToWriteY(vector<vector<int>>& grid) {
        int n = grid.size();
        int c[3], s[3], ys = 0;
        memset(c, 0, sizeof c), memset(s, 0, sizeof s);
        
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < n; ++ j ) {
                int x = grid[i][j];
                if ((i < n / 2 && (i == j || i + j == n - 1)) || (i >= n / 2 && j == n / 2))
                    c[x] ++ , ys ++ ;
                s[x] ++ ;
            }
        
        // for (int i = 0; i < 3; ++ i )
        //     cout << "  i = " << i << " c = " << c[i] << " s = " << s[i] << " ys = " << ys << endl;
        
        int res = 1e9;
        for (int a = 0; a < 3; ++ a )
            for (int b = 0; b < 3; ++ b ) {
                if (a == b)
                    continue;
                // y -> a, other -> b
                int cost = (ys - c[a]) + (n * n - ys - (s[b] - c[b]));
                res = min(res, cost);
            }
        return res;
    }
};
```

### [3072. 将元素分配到两个数组中 II](https://leetcode.cn/problems/distribute-elements-into-two-arrays-ii/)

离散化 + BIT维护 即可

```c++
class Solution {
public:
    const static int N = 1e5;
    
    int lowbit(int x) {
        return x & -x;
    }
    void add(int tr[], int x, int v) {
        for (int i = x; i < N; i += lowbit(i))
            tr[i] += v;
    }
    int sum(int tr[], int x) {
        int ret = 0;
        for (int i = x; i; i -= lowbit(i))
            ret += tr[i];
        return ret;
    }
    
    int tr1[N], tr2[N];
    
    vector<int> n1, n2;
    vector<int> ys;
    
    int get(int x) {
        return (lower_bound(ys.begin(), ys.end(), x) - ys.begin()) + 1;
    }
    
    void append(vector<int> & ns, int tr[], int x) {
        ns.push_back(x);
        add(tr, get(x)/*ATTENTION 需要转换*/, 1);
    }
    int count(int tr[], int x) {
        return sum(tr, N - 1) - sum(tr, get(x)/*ATTENTION 需要转换*/);
    }
    
    vector<int> resultArray(vector<int>& nums) {
        memset(tr1, 0, sizeof tr1), memset(tr2, 0, sizeof tr2);
        
        {
            ys.clear();
            for (auto x : nums)
                ys.push_back(x);
            sort(ys.begin(), ys.end());
            ys.erase(unique(ys.begin(), ys.end()), ys.end());
        }
        
        int n = nums.size();
        n1.clear(), n2.clear();
        append(n1, tr1, nums[0]), append(n2, tr2, nums[1]);
        
        for (int i = 2; i < n; ++ i ) {
            int x = nums[i];
            int t1 = count(tr1, x), t2 = count(tr2, x);
            if (t1 > t2)
                append(n1, tr1, x);
            else if (t1 < t2)
                append(n2, tr2, x);
            else {
                if (n1.size() <= n2.size())
                    append(n1, tr1, x);
                else
                    append(n2, tr2, x);
            }
        }
        
        for (auto x : n2)
            n1.push_back(x);
        return n1;
    }
};
```
