## [比赛链接](https://leetcode.cn/contest/weekly-contest-291/)


### [2259. 移除指定数字得到的最大结果](https://leetcode.cn/problems/remove-digit-from-number-to-maximize-result/)

略

```c++
class Solution {
public:
    string removeDigit(string number, char digit) {
        // cout << "num = " << number << endl;
        int n = number.size();
        for (int i = 0; i < n; ++ i )
            if (i + 1 < n && number[i] == digit && number[i] < number[i + 1]) {
                // cout << " i = " << i << endl;
                return number.substr(0, i) + number.substr(i + 1);
            }
        // cout << " bingo " << endl;
        for (int i = n - 1; i >= 0; -- i )
            if (number[i] == digit)
                return number.substr(0, i) + number.substr(i + 1);
        return "";
    }
};
```


### [2260. 必须拿起的最小连续卡牌数](https://leetcode.cn/problems/minimum-consecutive-cards-to-pick-up/)

略

```c++
class Solution {
public:
    int minimumCardPickup(vector<int>& cards) {
        int res = 1e9, n = cards.size();
        unordered_map<int, int> hash;
        for (int i = 0; i < n; ++ i ) {
            int x = cards[i];
            if (hash.count(x))
                res = min(res, i - hash[x] + 1);
            hash[x] = i;
        }
        return res == 1e9 ? -1 : res;
    }
};
```

### [2261. 含最多 K 个可整除元素的子数组](https://leetcode.cn/problems/k-divisible-elements-subarrays/)

可以枚举的 原来TLE只是因为太暴力了

在第一层for-loop内维护t即可

```c++
class Solution {
public:
    int countDistinct(vector<int>& nums, int k, int p) {
        int n = nums.size();
        set<vector<int>> S;
        unordered_map<int, int> hash;
        hash[0] = 0;
        for (int i = 1, c = 0; i <= n; ++ i ) {
            c += (nums[i - 1] % p == 0);
            int x = max(0, c - k), last = hash[x];
            vector<int> t;
            for (int j = i; j > last; -- j ) {
                t.push_back(nums[j - 1]);
                S.insert(t);
            }
            // cout << " i = " << i << " c = " << c << " last = " << last << " sz = " << S.size() << endl;
            if (!hash.count(c))
                hash[c] = i;
        }
        
        return S.size();
    }
};
```

### [2262. 字符串的总引力](https://leetcode.cn/problems/total-appeal-of-a-string/) [TAG]

思路错了，其实不需要关心子串，题意有每个字符贡献都是一，那么拆解计算单个字符的贡献即可

```c++
class Solution {
public:
    using LL = long long;
    
    long long appealSum(string s) {
        int n = s.size();
        vector<vector<int>> v(26);
        for (int i = 0; i < 26; ++ i )
            v[i].push_back(-1);
        for (int i = 0; i < n; ++ i )
            v[s[i] - 'a'].push_back(i);
        for (int i = 0; i < 26; ++ i )
            v[i].push_back(n);
        
        LL res = 0;
        // 重点在于把每个字符的贡献拆卡统计
        // ATTENTION: 不管哪个字符 其贡献相等都是1
        for (int i = 0; i < 26; ++ i )
            for (int j = 1; j < v[i].size(); ++ j ) {
                LL L = v[i][j] - v[i][j - 1], R = n - v[i][j];
                res += L * R;
            }
        return res;
    }
};
```
