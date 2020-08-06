## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-200/)

### [1534. 统计好三元组](https://leetcode-cn.com/problems/count-good-triplets/)

暴力即可

```c++
    int countGoodTriplets(vector<int>& arr, int a, int b, int c) {
        int n = arr.size(), res = 0;
        for(int i = 0; i < n; ++i) {
            for(int j = i+1; j < n; ++j) {
                for(int k = j+1; k < n; ++k) {
                    if(abs(arr[i]-arr[j]) <= a && abs(arr[j]-arr[k]) <= b && abs(arr[i]-arr[k]) <= c) ++res;
                }
            }
        }
        return res;
    }
```

### [1535. 找出数组游戏的赢家](https://leetcode-cn.com/problems/find-the-winner-of-an-array-game/)

每次比较数组前两个，留下大的，小的放末尾。当大的保留次数达到k即返回大的值。

首先：显然有 `k >= n 时返回整个数组最大值（实际上 k >= n-1 即可返回整个数组最大值）`。

模拟就能过

```c++
    int getWinner(vector<int>& arr, int k) {
        int n = arr.size();
        if(k >= n) {
            int res = 0;
            for(auto v : arr) res = max(res, v);
            return res;
        }
        queue<int> q;
        for(int i = 1; i < n; ++i) q.push(arr[i]);
        int v = arr[0], cnt = 0;
        for(;;) {
            int u = q.front();
            q.pop();
            if(u > v) {
                q.push(v);
                v = u;
                cnt = 1;
            } else {
                q.push(u);
                ++cnt;
            }
            if(cnt == k) break;
        }
        return v;
    }
```

也可以推导：

> 考虑 某个结果 X
>
> 【小 小 小 X 小 小 小】
>
> 考虑：比较到了数组末尾
>
> 	1. 情况1：未到末尾已经赢的次数大于k了，所以就可以直接返回【X】了
>
>   2. 情况2：比较到末尾次数小于k，模拟将会比较前面一部分比 X 小的，但这部分实际上已知较小不用比较了，直接返回【X】
>
>  	3. 【特殊情况】k = 1：若[i]<[i+1]，表明[i+1]就已经赢了一次了，直接返回[i+1]

按照下面的写法不需要对 k == 1 特判：

```c++
    int getWinner(vector<int>& arr, int k) {
        int n = arr.size();
        if(k >= n-1) {
            int res = 0;
            for(auto v : arr) res = max(res, v);
            return res;
        }
        int res = arr[0], cnt = 0;
        for(int i = 1; i < n; ++i) {
            if(arr[i] > res) {
                res = arr[i];
                cnt = 1;
            } else {
                // <
                ++cnt;
            }
            if(cnt == k) break;
        }
        return res;
    }
```

### [1536. 排布二进制网格的最少交换次数](https://leetcode-cn.com/problems/minimum-swaps-to-arrange-a-binary-grid/) [TAG]

要求：主对角线以上的格子全0

考虑统计每一行右侧连续0个数 记录分界位置于 rec

随后贪心：从后面找到最近可满足的 【因为从前往后的要求逐级降低】 所以次近的

```c++
    int minSwaps(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<int> rec(n);
        for(int i = 0; i < n; ++i) {
            int cnt = 0;
            for(int j = n-1; j > 0; --j) {
                if(grid[i][j]) break;
                else ++cnt;
            }
            rec[i] = n-1-cnt;
        }
        int res = 0;
        for(int i = 0; i < n; ++i) {
            if(rec[i] <= i) continue;
            int j = i+1;
            while(j < n && rec[j] > i) ++j;
            if(j >= n) return -1;
            res += j-i;
            int t = rec[j];
            for(int k = j; k > i; k--) {
                rec[k] = rec[k-1];
            }
            rec[i] = t;
        }
        return res;
    }
```

### [1537. 最大得分](https://leetcode-cn.com/problems/get-the-maximum-score/)

两个递增有序数组 从任意一个头部起遇相同数字可换位置 求最终总和：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/08/02/sample_1_1893.png)

如图 2+4+6+8+10 = 30

**考虑：** 每一个相同数字相当于分界点 相同数字间取最大即可

双指针解决

```c++
    int maxSum(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size(), n2 = nums2.size();
        long long s1 = 0, s2 = 0, mod = 1e9+7;
        int i = n1-1, j = n2-1;
        while(~i && ~j) {
            if(nums1[i] > nums2[j]) {
                s1 += nums1[i];
                --i;
            } else if(nums1[i] < nums2[j]) {
                s2 += nums2[j];
                --j;
            } else {
                s1 = s2 = max(s1,s2)+nums1[i];
                --i, --j;
            }
        }
        while(~i) s1 += nums1[i--];
        while(~j) s2 += nums2[j--];
        return max(s1,s2)%mod;
    }
```