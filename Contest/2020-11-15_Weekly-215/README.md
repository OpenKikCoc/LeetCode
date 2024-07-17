## [比赛链接](https://leetcode.cn/contest/weekly-contest-215/)


### [1656. 设计有序流](https://leetcode.cn/problems/design-an-ordered-stream/)



```c++
class OrderedStream {
public:
    int n, ptr;
    vector<string> ve;
    OrderedStream(int n) {
        this->n = n, ptr = 1;
        ve.resize(n + 1);
    }
    
    vector<string> insert(int id, string value) {
        ve[id] = value;
        vector<string> res;
        while (ptr <= n && ve[ptr].size()) res.push_back(ve[ptr++]);
        return res;
    }
};

/**
 * Your OrderedStream object will be instantiated and called as such:
 * OrderedStream* obj = new OrderedStream(n);
 * vector<string> param_1 = obj->insert(id,value);
 */
```


### [1657. 确定两个字符串是否接近](https://leetcode.cn/problems/determine-if-two-strings-are-close/)

统计计数

> 包含的字符种类完全一样；
>
> 把各个字符的重复次数放在一个数组里，数组在排序后完全一样；

```c++
class Solution {
public:
    bool closeStrings(string word1, string word2) {
        int n1 = word1.size(), n2 = word2.size();
        if (n1 != n2) return false;
        unordered_map<char, int> c1, c2;
        for (auto c : word1) ++ c1[c];
        for (auto c : word2) ++ c2[c];
        
        vector<pair<int, char>> v1, v2;
        for (auto [k, v] : c1) v1.push_back({v, k});
        for (auto [k, v] : c2) v2.push_back({v, k});
        if (v1.size() != v2.size()) return false;
        sort(v1.begin(), v1.end());
        sort(v2.begin(), v2.end());
        
        int n = v1.size();
        unordered_map<char, char> h1, h2;
        for (int i = 0; i < n; ++ i ) {
            auto [cnt1, k1] = v1[i];
            auto [cnt2, k2] = v2[i];
            if (cnt1 != cnt2) return false;
            if (h1.count(k1)) {
                if (h1[k1] != k2) return false;
            } else {
                if (k1 == k2) continue;
                if (c1[k2]) {
                    h1[k1] = k2;
                    h2[k2] = k1;
                } else return false;
            }
        }
        return true;
    }
};
```

更简洁:

```c++
class Solution {
public:
    bool closeStrings(string word1, string word2) {
        vector<int> v(26), w(26);
        for(char c : word1) v[c - 'a'] += 1;
        for(char c : word2) w[c - 'a'] += 1;
        for(int i = 0; i < 26; i += 1){
            if(v[i] == 0 and w[i]) return false;
            if(v[i] and w[i] == 0) return false;
        }
        sort(v.begin(), v.end());
        sort(w.begin(), w.end());
        return v == w;
    }
};
```


### [1658. 将 x 减到 0 的最小操作数](https://leetcode.cn/problems/minimum-operations-to-reduce-x-to-zero/)

前缀和

```c++
// 最后一个用例超时 88 / 88
class Solution {
public:
    typedef long long LL;
    int minOperations(vector<int>& nums, int x) {
        int n = nums.size(), minv = INT_MAX;
        for (int i = 0; i < n; ++ i ) nums.push_back(nums[i]), minv = min(minv, nums[i]);
        if (minv > x) return -1;
        vector<LL> psum(2 * n + 1);
        unordered_map<LL, int> hash;
        hash[0] = 0;
        int res = INT_MAX;
        for (int i = 1; i <= 2 * n; ++ i ) {
            psum[i] = psum[i - 1] + nums[i - 1];
            if (i >= n) {
                LL tar = psum[i] - x;
                //cout << "i = " << i << " psum = " << psum[i] << " tar = " << tar << " hash[tar] " << hash[tar]  << endl;
                if (hash.count(tar) && hash[tar] + n >= i && hash[tar] <= n) res = min(res, i - hash[tar]);
            }
            hash[psum[i]] = i;
        }
        //cout << endl;
        return res == INT_MAX ? -1 : res;
    }
};
```

反向求和为 `tot - x` 的最长子数组

```c++
class Solution {
public:
    int minOperations(vector<int>& nums, int x) {
        int n = nums.size(), tot = 0;
        for (auto v : nums) tot += v;
        if (tot < x) return -1;
        // 区间为空 特判
        if (tot == x) return n;
        
        unordered_map<int, int> hash;
        hash[0] = 0;
        int res = INT_MAX, sum = 0;
        for (int i = 1; i <= n; ++ i ) {
            sum += nums[i - 1];
            // sum - tar = tot - x
            int tar = x + sum - tot;
            if (hash.count(tar)) res = min(res, n - i + hash[tar]);
            if (!hash.count(sum)) hash[sum] = i;
        }
        return res == INT_MAX ? -1 : res;
    }
};
```

### [1659. 最大化网格幸福感](https://leetcode.cn/problems/maximize-grid-happiness/) [TAG]

状压dp

单个位置三进制表示

```c++
// newhar
class Solution {
public:
    int getMaxGridHappiness(int m, int n, int a, int b) {
        // 0- 不放人 1-放内向 2-放外向 3^n
        int cases = pow(3, n);
        
        int f[cases][5];
        memset(f, 0, sizeof(f));
        for(int i = 0; i < cases; ++i) {
            for(int t = i, p = 0; t; t /= 3, p++) {
                f[i][n-1-p] = t % 3;
            }
        }
        
        int M = cases - 1;
        int dp[m+1][n][a+1][b+1][cases];
        memset(dp, 0, sizeof(dp));
        
        for(int i = m-1; i >= 0; --i) {
            for(int j = n-1; j >= 0; --j) {
                int nei = i, nej = j + 1;
                if(j == n) {
                    nei = i + 1, nej = 0;
                }
                for(int x = 0; x <= a; ++x) {
                    for(int y = 0; y <= b; ++y) {
                        for(int pre = 0; pre < cases; ++pre) {
                            int nem = (pre * 3) % cases;
                            if(x > 0) {
                                int diff = 120;
                                if(j != 0 && f[pre][n-1] == 1) {
                                    diff -= 30;
                                    diff -= 30;
                                }
                                if(j != 0 && f[pre][n-1] == 2) {
                                    diff += 20;
                                    diff -= 30;
                                }
                                if(f[pre][0] == 1) {
                                    diff -= 30;
                                    diff -= 30;
                                }
                                if(f[pre][0] == 2) {
                                    diff += 20;
                                    diff -= 30;
                                }
                                //cout << "1:" << i << ',' << j << ',' << x << ',' << y << ',' << f[pre][0] << ',' << f[pre][1] << ',' << diff << endl;
                                dp[i][j][x][y][pre] = max(dp[i][j][x][y][pre], diff + dp[nei][nej][x-1][y][nem + 1]);
                            }
                            if(y > 0) {
                                int diff = 40;
                                if(j != 0 && f[pre][n-1] == 1) {
                                    diff -= 30;
                                    diff += 20;
                                }
                                if(j != 0 && f[pre][n-1] == 2) {
                                    diff += 20;
                                    diff += 20;
                                }
                                if(f[pre][0] == 1) {
                                    diff -= 30;
                                    diff += 20;
                                }
                                if(f[pre][0] == 2) {
                                    diff += 20;
                                    diff += 20;
                                }
                                //cout << "2:" << i << ',' << j << ',' << x << ',' << y << ',' << pre << ',' << diff << endl;
                                dp[i][j][x][y][pre] = max(dp[i][j][x][y][pre], diff + dp[nei][nej][x][y-1][nem + 2]);
                            }
                            dp[i][j][x][y][pre] = max(dp[i][j][x][y][pre], dp[nei][nej][x][y][nem]);
                        }
                    }
                }
            }
        }
        return dp[0][0][a][b][0];
    }
};
```
