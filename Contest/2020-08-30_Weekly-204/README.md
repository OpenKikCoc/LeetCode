## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-204/)


### [1566. 重复至少 K 次且长度为 M 的模式](https://leetcode-cn.com/problems/detect-pattern-of-length-m-repeated-k-or-more-times/)



```c++
    // l,r 100*100 长度m*k
    int n, totl;
    bool check(vector<int>& arr, int l, int m) {
        for(int i = 0; i < m; ++i) {
            int p = l+i;
            while(p < l+totl && arr[p]==arr[l+i]) p += m;
            if(p < l+totl) return false;
        }
        return true;
    }
    bool containsPattern(vector<int>& arr, int m, int k) {
        n = arr.size(), totl = m*k;
        // <= n
        for(int l = 0; l+totl <= n; ++l) if(check(arr, l, m)) return true;
        return false;
    }
```

更简洁直接一些的校验

```c++
    int n, totl;
    bool containsPattern(vector<int>& arr, int m, int k) {
        n = arr.size(), totl = m*k;
        // 此处是 <= n 
        for(int l = 0; l+totl <= n; ++l) {
            // check(arr, l, m)
            bool f = true;
            for(int j = l+m; j < l+totl && f; ++j)
                if(arr[j] != arr[j-m]) f = false;
            if(f) return true;
        }
        return false;
    }
```


### [1567. 乘积为正数的最长子数组长度](https://leetcode-cn.com/problems/maximum-length-of-subarray-with-positive-product/) [TAG]

dp

```c++
    int getMaxLen(vector<int>& nums) {
        int n = nums.size();
        vector<int> posi(n), nega(n);
        posi[0] = nums[0] > 0 ? 1 : 0;
        nega[0] = nums[0] < 0 ? 1 : 0;
        int res = posi[0];
        for(int i = 1; i < n; ++i) {
            if(nums[i] > 0) {
                posi[i] = posi[i-1]+1;
                nega[i] = nega[i-1] > 0 ? nega[i-1]+1 : 0;
            } else if(nums[i] < 0) {
                posi[i] = nega[i-1] > 0 ? nega[i-1]+1 : 0;
                nega[i] = posi[i-1]+1;
            } else {
                posi[i] = 0;
                nega[i] = 0;
            }
            res = max(res, posi[i]);
        }
        return res;
    }
```

空间优化

```c++
    int getMaxLen(vector<int>& nums) {
        vector<int> f = {0, 0};
        int res = 0;
        for(auto v : nums) {
            if(v == 0) {
                f[0] = f[1] = 0;
            } else if(v > 0) {
                int f0 = f[0]+1;
                int f1 = f[1]>0 ? f[1]+1 : 0;
                f[0] = f0; f[1] = f1;
            } else {    // v < 0
                int f0 = f[1]>0 ? f[1]+1 : 0;
                int f1 = f[0]+1;
                f[0] = f0; f[1] = f1;
            }
            res = max(res, f[0]);
        }
        return res;
    }
```

```c++
    int getMaxLen(vector<int>& nums) {
        vector<int> f = {0, 0};
        int res = 0;
        int pos = 0, neg = 0;
        for(auto v : nums) {
            if(v == 0) {
                pos = neg = 0;
            } else if(v > 0) {
                ++pos;
                if(neg) ++neg;
            } else {    // v < 0
                int npos = neg ? neg+1 : 0;
                int nneg = pos ? pos+1 : 1;
                pos = npos;
                neg = nneg;
            }
            res = max(res, pos);
        }
        return res;
    }
```

###  [1568. 使陆地分离的最少天数](https://leetcode-cn.com/problems/minimum-number-of-days-to-disconnect-island/) [TAG]

floodfill+tarjan 关键在于想通 **在只有一个岛屿的情况下，最多经过两天一定可以分割成两个岛屿**。tarjan求割点，存在则为1否则2

> 如果不用tarjan 由上述结论可以每次替换一个1->0 如果成功就返回1 否则结束时返回2
>
> 复杂度 O(n^4)

这题本质只需改一个点，所以不用tarjan的复杂度可以接受，直接改即可

```c++
    int n, m;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    void dfs(vector<vector<int>>& g, int x, int y) {
        g[x][y] = 0;
        for(int i = 0; i < 4; ++i) {
            int nx = x+dx[i], ny = y+dy[i];
            if(nx < 0 || nx >= m || ny < 0 || ny >= n || g[nx][ny]==0) continue;
            g[nx][ny] = 0;
            dfs(g, nx, ny);
        }
    }
    int cal(vector<vector<int>> g) {
        int cnt = 0;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) if(g[i][j] == 1) {
                ++cnt;
                if(cnt > 1) return 2;
                dfs(g, i, j);
            }
        return cnt;
    }
    int minDays(vector<vector<int>>& grid) {
        m = grid.size(), n = grid[0].size();
        int t = cal(grid);
        if(t == 0 || t == 2) return 0;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j) if(grid[i][j] == 1) {
                grid[i][j] = 0;
                t = cal(grid);
                if(t == 2) return 1;
                grid[i][j] = 1;
            }
        return 2;
    }
```

### [1569. 将子数组重新排序得到同一个二叉查找树的方案数](https://leetcode-cn.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/) [TAG]

> 我还以为周赛不会考组合数...

TODO 做完组合数专题再来做一遍这个

```c++
class Solution {
    int mo=1000000007;
    vector<int> op;
    long long P[1005],Q[1005];
public:
    long long mul(long long x,long long y){
        if (y==0) return 1;
        if (y==1) return x;
        long long ret = mul(x,y / 2);
        if (y % 2==0) return ret * ret % mo;
        else return ret * ret % mo * x % mo;
    }
    long long C(long long x,long long y){
        return P[x] * Q[y] % mo * Q[x-y] % mo;
    }
    int dfs(int l,int r) {
        if (l>r) return 1;
        int mid;
        for(int i=0;i<op.size();i++) {
            if (l<=op[i] && op[i]<=r) {
                mid = op[i];
                break;
            }
        }
        long long cnt1 = dfs(l,mid-1);
        long long cnt2 = dfs(mid+1,r);
        long long ret = C(r-l,(mid-l)) * cnt1 % mo * cnt2 % mo;
        return ret;
    }
    int numOfWays(vector<int>& nums) {
        op=nums;
        P[0]=Q[0]=1;
        for(int i=1;i<=1000;i++) P[i]=P[i-1] * i % mo;
        for(int i=1;i<=1000;i++) Q[i]=mul(P[i],mo-2);
        long long ans=dfs(1,nums.size());
        ans=(ans-1+mo) % mo;
        return ans;
    }
};

```
