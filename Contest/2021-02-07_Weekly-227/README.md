## [比赛链接](https://leetcode.cn/contest/weekly-contest-227/)


### [1752. 检查数组是否经排序和轮转得到](https://leetcode.cn/problems/check-if-array-is-sorted-and-rotated/)

略

```c++
class Solution {
public:
    bool check(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++ i ) nums.push_back(nums[i]);
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < 2 * n && nums[j] >= nums[j - 1]) ++ j ;
            if (j - i >= n) return true;
            i = j - 1;
        }
        return false;
    }
};
```


### [1753. 移除石子的最大得分](https://leetcode.cn/problems/maximum-score-from-removing-stones/)

如果不是 `一个堆大于剩下俩堆` 则必然可以取完

```c++
class Solution {
public:
    bool check(int a, int b, int c) {
        int cnt = 0;
        if (a) ++ cnt;
        if (b) ++ cnt;
        if (c) ++ cnt;
        return cnt > 1;
    }
    int maximumScore(int a, int b, int c) {
        int res = 0;
        while (check(a, b, c)) {
            int na = max(max(a, b), c);
            int nc = min(min(a, b), c);
            int nb = a + b + c - na - nc;
            a = na, b = nb, c = nc;
            int cnt = min(a, b) - c;
            if (cnt) {
                a -= cnt, b -= cnt;
                res += cnt;
            } else {
                // b == c
                if (a < 2) {
                    a -= 1, b -= 1;
                    res += 1;
                } else if (a / 2 >= b) {
                    cnt = b;
                    a -= cnt * 2, b -= cnt, c -= cnt;
                    res += cnt * 2;
                } else {
                    cnt = a / 2;
                    a -= cnt * 2, b -= cnt, c -= cnt;
                    res += cnt * 2;
                }
            }
            // cout << a << ' ' << b << ' ' << c << endl;
        }
        return res;
    }
};
```

```c++
class Solution {
public:
    int maximumScore(int a, int b, int c) {
        int d[] = {a, b, c};
        sort(d, d + 3);
        int x = 0;
        if (d[0] + d[1] < d[2]) x = d[2] - (d[0] + d[1]);
        else x = (a + b + c) % 2;
        return (a + b + c - x) / 2;
    }
};
```


### [1754. 构造字典序最大的合并字符串](https://leetcode.cn/problems/largest-merge-of-two-strings/)

直接比较字符串子串即可

```c++
class Solution {
public:
    string largestMerge(string word1, string word2) {
        int n1 = word1.size(), n2 = word2.size();
        string res;
        int i = 0, j = 0;
        while (i < n1 || j < n2)    // ATTENTION
            if (word1.substr(i) > word2.substr(j))
                res.push_back(word1[i]), ++ i ;
            else res.push_back(word2[j]), ++ j ;
        return res;
    }
};
```

### [1755. 最接近目标值的子序列和](https://leetcode.cn/problems/closest-subsequence-sum/) [TAG]

`n = 40` 的复杂度考虑拆半再二进制枚举

可以分别计算两个部分的可能和，再双指针

也可以先计算第一部分，再计算第二个部分的时候二分查找

```c++
class Solution {
public:
    int minAbsDifference(vector<int>& nums, int goal) {
        int n = nums.size();
        int m = n >> 1;
        
        vector<int> h;
        for (int s = 0; s < 1 << m; ++ s ) {
            int t = 0;
            for (int i = 0; i < m; ++ i )
                if (s >> i & 1) 
                    t += nums[i];
            h.push_back(t);
        }
        sort(h.begin(), h.end());
        
        int ans = INT_MAX;
        for (int s = 0; s < (1 << n - m); ++ s ) {
            int t = goal;
            for (int i = 0; i < n - m; ++ i )
                if (s >> i & 1)
                    t -= nums[i + m];
            
            int l = 0, r = h.size() - 1;
            while (l < r) {
                int mid = l + r >> 1;
                if (h[mid] < t) l = mid + 1;
                else r = mid;
            }
            
            if (ans > abs(h[l] - t)) ans = abs(h[l] - t);
            if (l >= 1 && ans > abs(h[l - 1] - t)) ans = abs(h[l - 1] - t);
        }
        return ans;
    }
};
```
