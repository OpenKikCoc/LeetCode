## [比赛链接](https://leetcode.cn/contest/biweekly-contest-124/)


### [3038. 相同分数的最大操作数目 I](https://leetcode.cn/problems/maximum-number-of-operations-with-the-same-score-i/)



```c++
class Solution {
public:
    int maxOperations(vector<int>& nums) {
        int tar = nums[0] + nums[1], res = 0;
        for (int i = 0; i + 1 < nums.size(); i += 2 ) {
            if (nums[i] + nums[i + 1] == tar)
                res ++ ;
            else
                break;
        }
        return res;
    }
};
```


### [3039. 进行操作使字符串为空](https://leetcode.cn/problems/apply-operations-to-make-string-empty/)



```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 5e5 + 10, M = 26;
    
    deque<int> cs[M];
    bool st[N];
    
    bool goon() {
        for (int i = 0; i < M; ++ i )
            if (cs[i].size() > 1)
                return true;
        return false;
    }
    void refresh() {
        for (int i = 0; i < M; ++ i )
            if (cs[i].size()) {
                int t = cs[i].front();
                st[t] = true;
                cs[i].pop_front();
            }
    }
    
    string lastNonEmptyString(string s) {
        int n = s.size();
        
        for (int i = 0; i < n; ++ i )
            cs[s[i] - 'a'].push_back(i);
        
        memset(st, 0, sizeof st);
        for (;goon();)
            refresh();
        
        string ns;
        for (int i = 0; i < n; ++ i )
            if (!st[i])
                ns.push_back(s[i]);
        
        return ns;
    }
};
```

### [3040. 相同分数的最大操作数目 II](https://leetcode.cn/problems/maximum-number-of-operations-with-the-same-score-ii/)



```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 2010;
    
    vector<int> nums;
    int calc(int l, int r, int i) {
        if (i == 0)
            return nums[l] + nums[l + 1];
        else if (i == 1)
            return nums[l] + nums[r];
        return nums[r - 1] + nums[r];
    }
    
    int dx[3] = {2, 1, 0}, dy[3] = {0, -1, -2};
    
    int h[N][N];
    void init() {
        memset(h, -1, sizeof h);
    }
    int tar;    // ATTENTION 实现技巧
    int dfs(int l, int r) {
        if (l >= r)         // ATTENTION 需要放在前面 否则越界panic
            return 0;
        if (h[l][r] != -1)
            return h[l][r];
        
        int t = 0;
        for (int i = 0; i < 3; ++ i ) {
            int x = l + dx[i], y = r + dy[i];
            if (calc(l, r, i) == tar)
                t = max(t, dfs(x, y) + 1);
        }
        return h[l][r] = t;
    }
    
    
    int maxOperations(vector<int>& nums) {
        this->nums = nums;
        int n = nums.size();
        
        int res = 0;
        for (int i = 0; i < 3; ++ i ) {
            init();
            this->tar = calc(0, n - 1, i);
            res = max(res, dfs(0 + dx[i], n - 1 + dy[i]));
        }
        return res + 1;
    }
};
```

### [3041. 修改数组后最大化数组中的连续元素数目](https://leetcode.cn/problems/maximize-consecutive-elements-in-an-array-after-modification/)



```c++
class Solution {
public:
    const static int N = 1e5 + 10;
    
    int f[N][2];
    
    void refresh_max(int & a, int b) {
        a = max(a, b);
    }
    
    int maxSelectedElements(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        
        memset(f, 0, sizeof f);
        f[1][0] = f[1][1] = 1;
        
        for (int i = 2; i <= n; ++ i ) {
            int a = nums[i - 1], b = nums[i - 2];
            f[i][0] = f[i][1] = 1;
            
            if (a == b + 1)
                refresh_max(f[i][0], f[i - 1][0] + 1), refresh_max(f[i][1], f[i - 1][1] + 1);
            else if (a == b) {
                refresh_max(f[i][0], f[i - 1][0]), refresh_max(f[i][1], f[i - 1][1]);   // ATTENTION 可以继承
                refresh_max(f[i][1], f[i - 1][0] + 1);
            }
            else if (a == b + 2)
                refresh_max(f[i][0], f[i - 1][1] + 1);
        }
        
        int res = 0;
        for (int i = 1; i <= n; ++ i )
            refresh_max(res, max(f[i][0], f[i][1]));
        return res;
    }
};
```
