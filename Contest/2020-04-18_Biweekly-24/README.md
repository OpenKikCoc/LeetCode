## [比赛链接](https://leetcode.cn/contest/biweekly-contest-24/)

### [1413. 逐步求和得到正数的最小值](https://leetcode.cn/problems/minimum-value-to-get-positive-step-by-step-sum/)

即求前缀和的最小值 处理即可


```c++
class Solution {
public:
    int minStartValue(vector<int>& nums) {
        int n = nums.size();
        if(n == 1) return nums[0] > 0 ? 1 : 1-nums[0];
        int minv = INT_MAX, sum = 0;
        for(auto v: nums) {
            sum += v;
            minv = min(minv, sum);
        }
        if(minv >= 0) return 1;
        return 1-minv;
    }
};
```

### [1414. 和为 K 的最少斐波那契数字数目](https://leetcode.cn/problems/find-the-minimum-number-of-fibonacci-numbers-whose-sum-is-k/)

返回和为 `k` 的斐波那契数字的最少数目，其中，每个斐波那契数字都可以被使用多次。

贪心


```c++
class Solution {
public:
    int findMinFibonacciNumbers(int k) {
        vector<int> fib;
        fib.push_back(1);
        fib.push_back(2);
        int a = 1, b = 2, c = 3;
        while(c <= k) {
            fib.push_back(c);
            a = b;
            b = c;
            c = a + b;
        }
        int n = fib.size(), res = 0;
      	// === 
        for(int i = n-1; i >= 0; --i) {
            if(k > fib[i]) {
                ++res;
                k -= fib[i];
            } else if(k == fib[i]) {
                ++res;
                break;
            }
        }
      	// ===
      	// === OR
        while (k > 0) { // 从大到小贪心选取
             if (k >= fi[i]) k -= fi[i], ++ res;
             --i;
        }
      	// ===
        return res;
    }
};
```

### [1415. 长度为 n 的开心字符串中字典序第 k 小的字符串](https://leetcode.cn/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n/)

只有abc组成的字符串 排列 回溯


```c++
class Solution {
public:
    int tot;
    string path, res;
    void dfs(int c, int left, int k) {
        path.push_back('a'+c);
        if(left == 0) {
            ++tot;
            if(tot == k) res = path;
        }
        
        for(int i = 0; i < 3; ++i) {
            if(i == c) continue;
            if(left-1>=0) dfs(i, left-1, k);
        }
        path.pop_back();
    }
    
    string getHappyString(int n, int k) {
        tot = 0;
        dfs(0, n-1, k);
        if(tot >= k) return res;
        
        dfs(1, n-1, k);
        if(tot >= k) return res;
        
        dfs(2, n-1, k);
        if(tot >= k) return res;
        
        if(tot < k) return "";
        return res;
    }
```

### [1416. 恢复数组](https://leetcode.cn/problems/restore-the-array/)

一个数字字符串 由小于等于k的正整数组成 求组成可能个数 mod


```c++
class Solution {
public:
    int numberOfArrays(string s, int k) {
        int n = s.size();
        int mod = 1e9+7;
        vector<int> dp(n+1,0);
        dp[0] = 1;
        for(int i = 1; i <= n; ++i){
            for(int j = 1; j <= 15 && j <= i; ++j){
                if(s[i-j] == '0') continue;
                if(stoll(s.substr(i-j,j)) <= k){
                    dp[i] = (dp[i] + dp[i-j]) % mod;
                }
            }
        }
        return dp[n];
    }
};
```

上面比较暴力(stl

下面这个 因为 u>k break的存在 复杂度并不高(每次j最多循环10次)

```c++
class Solution {
public:
    int numberOfArrays(string s, int k) {
        const int MOD=1e9+7;
        int n=s.size();
        int*f=(int*)malloc(sizeof(int)*(n+1));
        memset(f,0,sizeof(int)*(n+1));
        f[0]=1;
        for(int i=0;i<n;++i) if(s[i]!='0')
        {
            long long u=0;
            for(int j=i;j<n;++j)
            {
                u=u*10+s[j]-48;
                if(u>k) break;
                (f[j+1]+=f[i])%=MOD;
            }
        }
        int ans=f[n];
        free(f);
        return ans;
    }
};
```

