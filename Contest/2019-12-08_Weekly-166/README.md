## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-166/)


### [1281. 整数的各位积和之差](https://leetcode-cn.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/)

模拟即可

```c++
    int subtractProductAndSum(int n) {
        long long mul = 1, sum = 0;
        while(n) {
            int d = n%10;
            mul *= d; sum += d;
            n /= 10;
        }
        return mul - sum;
    }
```


### [1282. 用户分组](https://leetcode-cn.com/problems/group-the-people-given-the-group-size-they-belong-to/)

简单模拟过

```c++
    vector<vector<int>> groupThePeople(vector<int>& groupSizes) {
        unordered_map<int, vector<int>> mp;
        int n = groupSizes.size();
        for(int i = 0; i < n; ++i) mp[groupSizes[i]].push_back(i);
        vector<vector<int>> res;
        for(auto& [k, ve] : mp) {
            // ve % k == 0
            int d = ve.size() / k;
            int p = 0;
            while(d--) {
                vector<int> tmp;
                for(int i = 0; i < k; ++i) tmp.push_back(ve[p++]);
                res.push_back(tmp);
            }
        }
        return res;
    }
```

### [1283. 使结果不超过阈值的最小除数](https://leetcode-cn.com/problems/find-the-smallest-divisor-given-a-threshold/)

显然二分 注意计算check以及二分条件

```c++
    int n;
    int check(vector<int>& nums, int m) {
        int res = 0;
        for(auto& v : nums) {
            res += v/m;
            if(v%m) ++res;
            //if(v % m) res += v/m+1;
            //else res += v/m;
        }
        return res;
    }
    int smallestDivisor(vector<int>& nums, int threshold) {
        n = nums.size();
        int l = 1, r= 1e6+1;
        while(l < r) {
            int m = l + (r-l)/2;
            //cout <<"l="<<l<<" r="<<r<<" m="<<m <<" check="<<check(nums, m)<<endl;
            if(check(nums, m) > threshold) l = m+1;
            else r = m;
        }
        //cout <<"l="<<l<<" check="<<check(nums, l)<<endl;
        return l;
    }
```

### [1284. 转化为全零矩阵的最少反转次数](https://leetcode-cn.com/problems/minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix/) [TAG]

搜索 注意状态的改变 不止修改四个方向 还有本格

记录写法

```c++
    const int inf = 0x3f3f3f3f;
    int dx[4] = {-1, 0, 0, 1}, dy[4] = {0, -1, 1, 0};
    int minFlips(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        int tot = n*m;
        vector<int> f(1<<tot, inf);
        int st = 0;
        for(int i = 0; i < m; ++i)
            for(int j = 0; j < n; ++j)
                if(mat[i][j]) st ^= 1<<(i*n+j);
        f[st] = 0;
        queue<int> q;
        q.push(st);
        while(!q.empty()) {
            int x = q.front(); q.pop();
            if(!x) return f[x];
            for(int i = 0; i < m; ++i)
                for(int j = 0; j < n; ++j) {
                    // 改哪一个位置
                    int y = x^(1<<(i*n+j));
                    for(int k = 0; k < 4; ++k) {
                        int ni = i+dx[k], nj = j+dy[k];
                        if(ni < 0 || ni >= m || nj < 0 || nj >= n) continue;
                        y ^= 1 << (ni*n+nj);
                    }
                    if(f[y] != inf) continue;
                    f[y] = f[x]+1;
                    q.push(y);
                }
        }
        return -1;
    }
```
