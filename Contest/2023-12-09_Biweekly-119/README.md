## [比赛链接](https://leetcode.cn/contest/biweekly-contest-119/)

>   virtual rank:
>
>   146 / 2472 0:36:10 0:02:46 0:07:45 0:11:37 0:36:10


### [2956. 找到两个数组中的公共元素](https://leetcode.cn/problems/find-common-elements-between-two-arrays/)



```c++
class Solution {
public:
    int get(vector<int> & a, vector<int> & b) {
        unordered_map<int, int> h;
        for (auto x : b)
            h[x] ++ ;
        int ret = 0;
        for (int i = 0; i < a.size(); ++ i )
            if (h[a[i]] >= 1)
                ret ++ ;
        return ret;
    }
    vector<int> findIntersectionValues(vector<int>& nums1, vector<int>& nums2) {
        vector<int> res;
        res.push_back(get(nums1, nums2));
        res.push_back(get(nums2, nums1));
        return res;
    }
};
```


### [2957. 消除相邻近似相等字符](https://leetcode.cn/problems/remove-adjacent-almost-equal-characters/)

其实可以贪心思维直接消除连续两个后面的那个 并且一定能满足修改后与更后面的一个不 "相似"

实现略

```c++
class Solution {
public:
    const static int N = 110, M = 26, INF = 0x3f3f3f3f;
    
    int f[N][M];
    
    int removeAlmostEqualCharacters(string word) {
        memset(f, 0x3f, sizeof f);
        int n = word.size();
        
        for (int j = 0; j < M; ++ j )
            if (word[0] - 'a' == j)
                f[1][j] = 0;
            else
                f[1][j] = 1;
        
        for (int i = 2; i <= n; ++ i ) {
            int x = word[i - 1] - 'a';
            for (int j = 0; j < M; ++ j ) {         // 枚举当前
                int cost = (j != x);
                for (int k = 0; k < M; ++ k ) {     // 枚举上一个
                    if (abs(j - k) > 1)
                        f[i][j] = min(f[i][j], f[i - 1][k] + cost);
                }
            }   
        }
        int res = INF;
        for (int j = 0; j < M; ++ j )
            res = min(res, f[n][j]);
        return res;
    }
};
```

### [2958. 最多 K 个重复元素的最长子数组](https://leetcode.cn/problems/length-of-longest-subarray-with-at-most-k-frequency/)

经典双指针

```c++
class Solution {
public:
    int k;
    unordered_map<int, int> h;
    void add(int x) {
        h[x] ++ ;
    }
    void sub(int x) {
        h[x] -- ;
    }
    bool invalid(int x) {
        return h[x] > k;
    }
    
    int maxSubarrayLength(vector<int>& nums, int k) {
        this->k = k;
        int n = nums.size(), res = 0;
        for (int i = 0, j = 0; j < n; ++ j ) {
            add(nums[j]);
            while (i <= j && invalid(nums[j]))  // ATTENTION: trick 可以直接使用nums[j]，因为唯一可能使其不合法的就是之前加了个nums[j]
                sub(nums[i ++ ]);
            res = max(res, j - i + 1);
        }
        return res;
    }
};
```

### [2959. 关闭分部的可行集合数目](https://leetcode.cn/problems/number-of-possible-sets-of-closing-branches/)

状压枚举即可 略

```c++
class Solution {
public:
    // 1. 题目所说关停的是【分部】的可行数量，而不是边的可行数量
    // 2. 1<=n<=10 则考虑枚举要删除的分部 O(2^10=1024) 再建图跑最长路
    const static int N = 11, INF = 0x3f3f3f3f;
    
    int n, maxd;
    int g[N][N], t[N][N];
    
    bool skip(int st, int i) {
        return !((st >> i) & 1);
    }
    
    bool check(int st) {
        memset(t, 0x3f, sizeof t);
        for (int i = 0; i < n; ++ i )
            for (int j = i; j < n; ++ j ) {
                if (skip(st, i) || skip(st, j))
                    continue;
                t[i][j] = t[j][i] = g[i][j];
            }
        
        for (int k = 0; k < n; ++ k )
            for (int i = 0; i < n; ++ i )
                for (int j = 0; j < n; ++ j ) {
                    if (skip(st, i) || skip(st, j) || skip(st, k))
                        continue;
                    t[i][j] = min(t[i][j], t[i][k] + t[k][j]);
                }
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j ) {
                if (skip(st, i) || skip(st, j))
                    continue;
                if (t[i][j] > maxd)
                    return false;
            }
        return true;
    }
    
    int numberOfSets(int n, int maxDistance, vector<vector<int>>& roads) {
        memset(g, 0x3f, sizeof g);
        for (int i = 0; i < N; ++ i )
            g[i][i] = 0;
        for (auto & r : roads) {
            int a = r[0], b = r[1], c = r[2];
            g[a][b] = g[b][a] = min(g[a][b], c);
        }
        this->n = n;
        this->maxd = maxDistance;
        
        int res = 0;
        for (int i = 0; i < 1 << n; ++ i )  // 剩下包含哪些
            if (check(i))
                res ++ ;
        return res;
    }
};
```
