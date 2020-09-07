## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-34/)


### [1572. 矩阵对角线元素的和](https://leetcode-cn.com/problems/matrix-diagonal-sum/)

模拟即可

```c++
    int diagonalSum(vector<vector<int>>& mat) {
        int n = mat.size(), res = 0;
        for(int i = 0; i < n; ++i) res += mat[i][i] + mat[n-i-1][i];
        if(n & 1) res -= mat[n/2][n/2];
        return res;
    }
```


### [1573. 分割字符串的方案数](https://leetcode-cn.com/problems/number-of-ways-to-split-a-string/)

统计 1 的个数，分情况讨论计算即可

```c++
    // tot = 0, Cn-2 2 
    const long long mod = 1e9+7;
    int numWays(string s) {
        long long n = s.size(), tot = 0, div = 0;
        for(auto c : s) if(c == '1') ++tot;
        if(tot == 0) return (n-1)*(n-2)/2ll%mod;
        else if(tot % 3) return 0;
        div = tot/3;
        // 
        long long cnt = 0, p1 = 0, p2 = 0, l1 = 0, l2 = 0;
        while(p1 < n && cnt < div) if(s[p1++] == '1') ++cnt;
        l1 = p1;
        while(p1 < n && s[p1] != '1') ++p1;
        l1 = p1-l1;
        // 
        p2 = p1; cnt = 0;
        while(p2 < n && cnt < div) if(s[p2++] == '1') ++cnt;
        l2 = p2;
        while(p2 < n && s[p2] != '1') ++p2;
        l2 = p2-l2;
        //
        //cout << "l1="<<l1 << " l2="<< l2 << endl;
        return (l1+1) * (l2+1) % mod;
    }
```

### [1574. 删除最短的子数组使剩余数组有序](https://leetcode-cn.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted/) [TAG]

原来想的思路一直有问题：

> 考虑删除剩下的，则求最长非递减子序列
> 
> ==>  最长不下降子序列 & 有重复元素

**需要注意题意：删除一个子数组 子数组指一段连续的子序列**

所以不能按照最长不下降来做

考虑从后面找到最长不上升序列，随后双指针

> 右指针在后缀里移动, 每次固定左指针, 右指针往后试探到符合条件的位置
> 
> 然后中间就是要删除的长度, 取最小值就是答案

```c++
    int findLengthOfShortestSubarray(vector<int>& arr) {
        int n = arr.size();
        int R = n-1;
        for(int i = n-1; i >= 0; --i)
            if(i == n-1 || arr[i] <= arr[i+1]) R = i;
            else break;
        int res = R;
        for(int i = 0, j = R; i < R; ++i) {
        //for(int i = 0, j = R; i < n; ++i) {
            if(!i || arr[i] >= arr[i-1]) {
                while(j < n && arr[j] < arr[i]) ++j;
                res = min(res, j-i-1);
            } else break;
        }
        return max(res, 0);
    }
```

### [1575. 统计所有可行路径](https://leetcode-cn.com/problems/count-all-possible-routes/) [TAG]

dp 

`f[k][i-dis] += dp[j][i]`

```c++
    const int mod = 1e9+7;
    void add(int& x, int y){
        x += y;
        if(x >= mod) x -= mod;
    }
    int countRoutes(vector<int>& locations, int start, int finish, int fuel) {
        int n = locations.size();
        vector<vector<int>> f(n+1, vector<int>(fuel+1));
        f[start][fuel] = 1;
        for(int i = fuel; i >= 0; --i)
            for(int j = 0; j < n; ++j)
                for(int k = 0; k < n; ++k) {
                    int dis = abs(locations[j]-locations[k]);
                    if(j != k &&  dis <= i) add(f[k][i-dis], f[j][i]);
                }
        int res = 0;
        for(int i = 0; i <= fuel; ++i) add(res, f[finish][i]);
        return res;
    }
```
