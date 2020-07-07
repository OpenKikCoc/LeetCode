## [比赛链接]()


### [1491. 去掉最低工资和最高工资后的工资平均值](https://leetcode-cn.com/problems/average-salary-excluding-the-minimum-and-maximum-salary/)

略

```c++
    double average(vector<int>& salary) {
        int maxv = INT_MIN, minv = INT_MAX, tot = 0;
        for(auto v : salary) {
            if(maxv < v) maxv = v;
            if(minv > v) minv = v;
            tot += v;
        }
        return (tot - minv - maxv)/(double)(salary.size()-2);
    }
```


### [1492. n 的第 k 个因子](https://leetcode-cn.com/problems/the-kth-factor-of-n/)

模拟 略

```c++
    int kthFactor(int n, int k) {
        vector<int> yin;
        int top = sqrt(n);
        for(int b = 1; b <= top; ++b) {
            if(n%b == 0) {
                yin.push_back(b);
                if(b * b != n) yin.push_back(n/b);
            }
        }
        if(yin.size() < k) return -1;
        sort(yin.begin(), yin.end());
        return yin[k-1];
    }
```

优化

```c++
    int kthFactor(int n, int k) {
        for(int i = 1; i <= n; ++i) if(n%i == 0) {
            --k;
            if(!k) return i;
        }
        return -1;
    }
```



### [1493. 删掉一个元素以后全为 1 的最长子数组](https://leetcode-cn.com/problems/longest-subarray-of-1s-after-deleting-one-element/) 

统计某一位 左右侧各有多少连续1即可

```c++
    int longestSubarray(vector<int>& nums) {
        int n = nums.size();
        vector<int> a(n+1), b(n+1);
        for(int i = 0; i < n; ++i) {
            if(nums[i]) a[i+1] = a[i] + 1;
            else a[i+1] = 0;
        }
        for(int i = n-1; i >= 0; --i) {
            if(nums[i]) b[i] = b[i+1] + 1;
            else b[i] = 0;
        }
        //for(auto v : a) cout <<v<<" ";
        //cout <<endl;
        //for(auto v : b) cout <<v<<" ";
        //cout <<endl;
        int res = 0;
        for(int i = 1; i <= n; ++i) res = max(res, a[i-1] + b[i]);
        return res;
    }
```

### [1494. 并行课程 II](https://leetcode-cn.com/problems/parallel-courses-ii/) [TAG]

状压dp

逆序拓扑的思路是对的

```c++
int f[1<<15];  // 放全局

    const int inf = 1e9;
    int minNumberOfSemesters(int n, vector<vector<int>>& dependencies, int k) {
        vector<vector<int>> es(n);
        for(auto e : dependencies) es[e[1]-1].push_back(e[0]-1);
        for(int s = 0; s < 1<<n; ++s) f[s] = inf;
        f[0] = 0;
        for(int s = 0; s < 1<<n; ++s) {
            if(f[s] == inf) continue;
            int can = 0;
            for(int v = 0; v < n; ++v) {
                if(s&1<<v) continue;
                bool f = 0;
                for(auto u : es[v]) if(!(s&1<<u)) f = 1;
                if(!f) can |= 1<<v;
            }
            // 当前 s 状态下 还能上can的课
            for(int t = can; t; t = (t-1)&can) {
                if(__builtin_popcount(t) > k) continue;
                f[s|t] = min(f[s|t], f[s]+1);
            }
        }
        return f[(1<<n)-1];
    }
```
