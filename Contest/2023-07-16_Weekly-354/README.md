## [比赛链接](https://leetcode.cn/contest/weekly-contest-354/)

>   virtual rank
>
>   223 / 3957
>   0:01:03
>   0:03:44
>   0:13:10  1
>   0:46:45  3


### [2778. 特殊元素平方和](https://leetcode.cn/problems/sum-of-squares-of-special-elements/)



```c++
class Solution {
public:
    int sumOfSquares(vector<int>& nums) {
        int n = nums.size(), res = 0;
        for (int i = 1; i <= n; ++ i )
            if (n % i == 0)
                res += nums[i - 1] * nums[i - 1];
        return res;
    }
};
```


### [2779. 数组的最大美丽值](https://leetcode.cn/problems/maximum-beauty-of-an-array-after-applying-operation/)



```c++
class Solution {
public:
    int maximumBeauty(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int n = nums.size(), res = 0;
        for (int l = 0, r = 0; r < n; ++ r ) {
            while (l < r && nums[l] < nums[r] - 2 * k)
                l ++ ;
            res = max(res, r - l + 1);
        }
        return res;
    }
};
```

### [2780. 合法分割的最小下标](https://leetcode.cn/problems/minimum-index-of-a-valid-split/)



```c++
class Solution {
public:
    int minimumIndex(vector<int>& nums) {
        int n = nums.size();
        // 先找到支配元素
        int x, y = 0;
        {
            for (auto v : nums)
                if (y == 0)
                    x = v, y = 1;
                else if (v == x)
                    y ++ ;
                else
                    y -- ;
        }
        int z = 0;
        for (auto v : nums)
            if (v == x)
                z ++ ;
        
        for (int i = 0, s = 0; i < n; ++ i ) {
            // 以 i 为前面一段的结束
            s += nums[i] == x;
            if (s * 2 > (i + 1) && (z - s) * 2 > (n - i - 1))
                return i;
        }
        
        return -1;
    }
};
```

### [2781. 最长合法子字符串的长度](https://leetcode.cn/problems/length-of-the-longest-valid-substring/) [TAG]

显然有字符串hash + 标记位置的思路

```c++
class Solution {
public:
    // 根据题目数据: forbidden 中每个元素长度不超过 10
    //  考虑字符串hash
    // 以及 求合法的恶书
    
    using ULL = unsigned long long;
    const static int N = 1e5 + 10, P = 131;
    
    unordered_set<ULL> hash;
    
    ULL parse(string & s) {
        ULL h = 0;
        for (auto x : s)
            h = h * P + x;
        return h;
    }
    
    ULL h[N], p[N];
    
    ULL get(int l, int r) {
        return h[r] - h[l - 1] * p[r - l + 1];
    }
    
    int longestValidSubstring(string word, vector<string>& forbidden) {
        hash.clear();
        for (auto & w : forbidden)
             hash.insert(parse(w));
        // cout << " hash.size = " << hash.size() << endl;
        
        int n = word.size();
        h[0] = 0, p[0] = 1;
        for (int i = 1; i <= n; ++ i ) {
            h[i] = h[i - 1] * P + word[i - 1];
            p[i] = p[i - 1] * P;
        }
        
        int res = 0, x = -1;
        for (int i = 1; i <= n; ++ i ) {
            int maxd;
            if (x == -1)
                maxd = i;
            else
                maxd = i - x;   // 不能用到上次探测到的起点
            
            for (int j = 1; j <= 10 && j <= i; ++ j ) {
                ULL t = get(i - j + 1, i);
                if (hash.count(t)) {
                    // maxd = j - 1;
                    maxd = min(maxd, j - 1);    // ATTENTION: 需要取最小值
                    // x = i - j + 1;
                    x = max(x, i - j + 1);      // ATTENTION: 需要取最大值
                    break;
                }
            }
            // 往左侧最多可以延伸 i 的长度
            res = max(res, maxd);
        }
        return res;
    }
};
```

另有巧妙的双指针思路（如果长度不止 10 要考虑结合 AC自动机）

```c++
class Solution {
public:
    int longestValidSubstring(string word, vector<string>& forbidden) {
        vector<unordered_set<string>> s(11);
        for (auto & f : forbidden)
            s[f.size()].insert(f);

        int n = word.size(), res = 0;
        for (int l = 0, r = 0; r < n; ++ r ) {
            // 检查当前位置最多可以延伸到哪里
            bool flag = true;
            for (int w = 1; w <= min(10, r - l + 1); ++ w )
                if (s[w].count(word.substr(r - w + 1, w))) {
                    flag = false;
                    l = r - w + 2;  // r - w + 1 不行
                    break;
                }
            if (flag)
                res = max(res, r - l + 1);
        }
        return res;
    }
};
```

