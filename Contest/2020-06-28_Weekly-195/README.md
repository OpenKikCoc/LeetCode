## [比赛链接](https://leetcode.cn/contest/weekly-contest-195/)


### [1496. 判断路径是否相交](https://leetcode.cn/problems/path-crossing/)

模拟即可

```c++
    int getv(int x, int y) {
        return x*1e5+y;
    }
    bool isPathCrossing(string path) {
        int x = 0, y = 0, t;
        unordered_map<int, bool> m;
        m[0] = true;
        for(auto c : path) {
            if(c == 'N') {
                --x;
            } else if(c == 'S') {
                ++x;
            } else if(c == 'E') {
                ++y;
            } else if(c == 'W') {
                --y;
            }
            t = getv(x, y);
            if(m[t]) return true;
            m[t] = true;
        }
        return false;
    }
```

#### [1497. 检查数组对是否可以被 k 整除](https://leetcode.cn/problems/check-if-array-pairs-are-divisible-by-k/) 

取模检查即可 需要注意的是对 k/2出现次数的处理

map可以换vector

```c++
    bool canArrange(vector<int>& arr, int k) {
        unordered_map<int, int> m;
        int t;
        for(auto v : arr) {
            t = v%k;
            if(t) {
                if(t < 0) t += k;
                ++m[t];
            }
        }
        for(int i = 1; i <= k/2; ++i) {
            if(m[i] != m[k-i]) return false;
        }
        if(k%2==0 && m[k/2]%2) return false;
        return true;
    }
```

### [1498. 满足条件的子序列数目](https://leetcode.cn/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/)

子序列 不要求连续 所以可以排序去做 双指针即可

```c++
    const int mod = 1e9+7;
    int numSubseq(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int n = nums.size(), res = 0;
        vector<int> mul2(1e5+5);
        mul2[0] = 1;
        for(int i = 1; i <= n; ++i) {
            mul2[i] = mul2[i-1] << 1;
            if(mul2[i] >= mod) mul2[i] -= mod;
        }
        for(int i = 0, j = n-1; i <= j; ++i) {
            while(i <= j && nums[i] + nums[j] > target) --j;
            if(i > j) break;
            res += mul2[j-i];
            if(res >= mod) res -= mod;
        }
        return res;
    }
```

### [1499. 满足不等式的最大值](https://leetcode.cn/problems/max-value-of-equation/)

动态维护单调队列 略

```c++
    int findMaxValueOfEquation(vector<vector<int>>& points, int k) {
        // 动态维护队列的情况下 (对于i<j)所求yi + yj + |xi - xj| 即 yi+yj+xj-xi 所以在满足 xj-xi <= k的情况下找最大的yi-xi
        // pair->first yi-xi pair->second xi
        priority_queue<pair<int, int>> pq;
        int res = -1e9;
        for(auto v : points) {
            int x = v[0], y = v[1];
            while(!pq.empty() && pq.top().second < x-k) pq.pop();
            if(!pq.empty()) res = max(res, pq.top().first+y+x);
            pq.push({y-x, x});
        }
        return res;
    }
```
