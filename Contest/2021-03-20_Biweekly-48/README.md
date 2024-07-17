## [比赛链接](https://leetcode.cn/contest/biweekly-contest-48/)


### [1796. 字符串中第二大的数字](https://leetcode.cn/problems/second-largest-digit-in-a-string/)

略

```c++
class Solution {
public:
    int secondHighest(string s) {
        vector<int> ve;
        for (auto c : s)
            if (c >= '0' && c <= '9')
                ve.push_back(c - '0');
        sort(ve.begin(), ve.end());
        ve.erase(unique(ve.begin(), ve.end()), ve.end());
        
        int n = ve.size();
        return n < 2 ? -1 : ve[n - 2];
    }
};
```


### [1797. 设计一个验证系统](https://leetcode.cn/problems/design-authentication-manager/)

略

```c++
class AuthenticationManager {
public:
    int ttl;
    unordered_map<string, int> hash;
    
    AuthenticationManager(int timeToLive) {
        ttl = timeToLive;
    }
    
    void generate(string tokenId, int currentTime) {
        hash[tokenId] = currentTime + ttl;
    }
    
    void renew(string tokenId, int currentTime) {
        if (!hash.count(tokenId) || hash[tokenId] <= currentTime)
            return;
        hash[tokenId] = currentTime + ttl;
    }
    
    int countUnexpiredTokens(int currentTime) {
        int res = 0;
        for (auto & [k, v] : hash)
            if (v > currentTime)
                ++ res;
        return res;
    }
};

/**
 * Your AuthenticationManager object will be instantiated and called as such:
 * AuthenticationManager* obj = new AuthenticationManager(timeToLive);
 * obj->generate(tokenId,currentTime);
 * obj->renew(tokenId,currentTime);
 * int param_3 = obj->countUnexpiredTokens(currentTime);
 */
```

### [1798. 你能构造出连续值的最大数目](https://leetcode.cn/problems/maximum-number-of-consecutive-values-you-can-make/) [TAG]

类似的总结

```c++
class Solution {
public:
    int getMaximumConsecutive(vector<int>& coins) {
        sort(coins.begin(), coins.end());
        int lst = 0, n = coins.size();
        for (int i = 0; i < n; ++ i )
            if (coins[i] <= lst + 1)
                lst += coins[i];
            else
                break;
        return lst + 1;
    }
};
```

### [1799. N 次操作后的最大分数和](https://leetcode.cn/problems/maximize-score-after-n-operations/)

显然状压 dp 注意实现

```c++
class Solution {
public:
    int maxScore(vector<int>& nums) {
        int n = nums.size();
        vector<int> f(1 << n);
        for (int i = 0; i < 1 << n; ++ i ) {
            int cnt = n - __builtin_popcount(i);
            cnt = cnt / 2 + 1;
            
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1)
                    for (int k = j + 1; k < n; ++ k )
                        if (i >> k & 1)
                            f[i] = max(f[i], f[i - (1 << j) - (1 << k)] + __gcd(nums[j], nums[k]) * cnt);
        }
        return f[(1 << n) - 1];
    }
};
```
