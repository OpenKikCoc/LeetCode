## [比赛链接](https://leetcode.cn/contest/biweekly-contest-74/)

>   virtual rank: 255 / 5442


### [6020. 将数组划分成相等数对](https://leetcode.cn/problems/divide-array-into-equal-pairs/)

略

```c++
class Solution {
public:
    bool divideArray(vector<int>& nums) {
        int n = nums.size();
        if (n & 1)
            return false;
        sort(nums.begin(), nums.end());
        for (int i = 0; i + 1 < n; i += 2)
            if (nums[i] != nums[i + 1])
                return false;
        return true;
    }
};
```


### [6021. 字符串中最多数目的子字符串](https://leetcode.cn/problems/maximize-number-of-subsequences-in-a-string/)

有更简单思路：

>   根据题意，x 插入的位置越靠左，答案的个数越多；y 插入的位置越靠右，答案的个数越多。
>
>   若 pattern="ac"，那么认为在 text 的开始添加 'a' 或者在 text 的结尾添加 'c' 这两种情况能得到最大值。

```c++
class Solution {
public:
    using LL = LL;
    LL f(const string &a, const string &b) {
        LL ret = 0;
        int k = 0;
        for (auto i : a)
            if (i == b[1])
                ret += k;
            else
                k++;

        return ret;
    }
    long long maximumSubsequenceCount(string text, string pattern) {
        string t1 = text + pattern[1];
        string t2 = pattern[0] + text;

        return max(f(t1, pattern), f(t2, pattern));
    }
};

class Solution {
public:
    using LL = long long;

    long long maximumSubsequenceCount(string text, string pattern) {
        int cnt0 = 0, cnt1 = 0;
        LL ans = 0;
        for (auto &ch : text)
            if (ch == pattern[1]) {
                ans += cnt0;
                cnt1++;
            } else
                cnt0++;
        // 返回初始子序列数量 + 新增的子序列数量
        return ans + max(cnt0, cnt1);
    }
};
```

初始代码：

```c++
class Solution {
public:
    using LL = long long;
    long long maximumSubsequenceCount(string text, string pattern) {
        char a = pattern[0], b = pattern[1];
        if (a == b) {
            LL c = 0;
            for (auto x : text)
                if (x == a)
                    c ++ ;
            return (c + 1) * c / 2;
        }
        
        LL res = 0;
        {
            LL c = 0, t = 0;
            for (auto x : text)
                if (x == a)
                    c ++ ;
                else if (x == b)
                    t += (c + 1);
            res = max(res, t);
        }
        {
            LL c = 0, t = 0;
            reverse(text.begin(), text.end());
            for (auto x : text)
                if (x == b)
                    c ++ ;
                else if (x == a)
                    t += (c + 1);
            res = max(res, t);
        }
        return res;
    }
};
```

### [6022. 将数组和减半的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-halve-array-sum/)

>   1e7 除不到 30 次小于 1 ，精度可以接受，所以也可以不加 EPS

```c++
class Solution {
public:
    using LD = long double;
    constexpr static LD EPS = 1e-10;
    
    int halveArray(vector<int>& nums) {
        LD s = 0;
        priority_queue<LD> heap;
        for (auto x : nums) {
            s += x;
            heap.push(x);
        }
        
        int res = 0;
        LD out = 0;
        while (out < s - out - EPS) {
            // cout << " out = " << out << " s - out + EPS = " << s - out + EPS << endl;
            auto t = heap.top(); heap.pop();
            out += t / 2.0;
            heap.push(t / 2.0);
            res ++ ;
        }
        return res;
    }
};
```

### [6023. 用地毯覆盖后的最少白色砖块](https://leetcode.cn/problems/minimum-white-tiles-after-covering-with-carpets/)

>   有  wqs 二分 优化可以复杂度 O(n log n) ===> TODO 整理优化

空间压缩下就 AC

```c++
class Solution {
public:
    const static int N = 1e3 + 10;
    
    int s[N];
    int f[N][N];
    
    int minimumWhiteTiles(string floor, int nc, int cl) {
        int n = floor.size(); s[0] = 0;
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + (floor[i - 1] == '1');
        memset(f, 0, sizeof f);
        
        for (int i = 1; i <= n; ++ i ) {
            for (int j = 1; j <= nc; ++ j ) {
                f[i][j] = f[i - 1][j];
                int pre = max(0, i - cl);
                f[i][j] = max(f[i][j], f[pre][j - 1] + s[i] - s[pre]);
            }
        }
            
        return s[n] - f[n][nc];
    }
};
```

**这题卡常数了。。原生 static 数组是最快的**

初始版本 TEL

```c++
// TLE 2698 / 2698 个通过测试用例
class Solution {
public:
    const static int N = 1e3 + 10;
    
    int s[N];
    int f[N][N][2];
    
    int minimumWhiteTiles(string floor, int nc, int cl) {
        int n = floor.size(); s[0] = 0;
        for (int i = 1; i <= n; ++ i )
            s[i] = s[i - 1] + (floor[i - 1] == '1');
        memset(f, 0, sizeof f);
        
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= nc; ++ j ) {
                f[i][j][0] = max(f[i - 1][j][0], f[i - 1][j][1]);
                int pre = max(0, i - cl);
                f[i][j][1] = max(f[pre][j - 1][0], f[pre][j - 1][1]) + s[i] - s[pre];
                    
                res = max(res, max(f[i][j][0], f[i][j][1]));
            }
        return s[n] - res;
    }
};
```
