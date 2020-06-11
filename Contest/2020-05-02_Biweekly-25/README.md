## [比赛链接](https://leetcode-cn.com/contest/biweekly-contest-25/)


### [1431. 拥有最多糖果的孩子](https://leetcode-cn.com/problems/kids-with-the-greatest-number-of-candies/)

求原有最多多少个 再遍历加上extra之后能不能达到最多即可

```c++
class Solution {
public:
    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {
        int maxv = 0;
        for(auto v : candies) if(v > maxv) maxv = v;
        vector<bool> res;
        for(auto v : candies) {
            if(v + extraCandies >= maxv) res.push_back(true);
            else res.push_back(false);
        }
        return res;
    }
};
```


### [1432. 改变一个整数能得到的最大差值](https://leetcode-cn.com/problems/max-difference-you-can-get-from-changing-an-integer/)

数字替换 不能有前导0 求两次替换最大差值

题解很多遍历的 太麻烦了

```c++
class Solution {
public:
    int maxDiff(int num) {
        string nums = to_string(num);
        int n = nums.size();
        string a = nums, b = nums;
      	// 求最大数就直接换9即可
        for(int i = 0; i < n; ++i) {
            if(a[i] != '9') {
                char c = a[i];
                for(int j = i; j < n; ++j) {
                    if(a[j] == c) a[j] = '9';
                }
                break;
            }
        }
        char first = b[0];
      	// 求最小数 如果第一位不是1就全换1 否则找到个不是0的(且不是第一位值的)后面全换0
        for(int i = 0; i < n; ++i) {
            if(!i && b[0] != '1') {
                for(int j = 0; j < n; ++j) if(b[j] == first) b[j] = '1';
                break;
            } else if(i>0 && b[i] != '0' && b[i] != first) {
                char c = b[i];
                for(int j = 0; j < n; ++j) if(b[j] == c) b[j] = '0';
                break;
            }
        }
        //cout <<a<<" "<<b<<endl;
        return stoi(a) - stoi(b);
    }
};
```

### [1433. 检查一个字符串是否可以打破另一个字符串](https://leetcode-cn.com/problems/check-if-a-string-can-break-another-string/)

字典序 <= 或 >= 即可

```c++
class Solution {
public:
    bool checkIfCanBreak(string s1, string s2) {
        sort(s1.begin(), s1.end());
        sort(s2.begin(), s2.end());
        int n = s1.size();
        bool f1 = true, f2 = true;
        for(int i = 0; i < n; ++i) {
            if(s1[i] > s2[i]) f1 = false;
            else if(s1[i] < s2[i]) f2 = false;
        }
        return f1 || f2;
    }
};
```

### [1434. 每个人戴不同帽子的方案数](https://leetcode-cn.com/problems/number-of-ways-to-wear-different-hats-to-each-other/) [TAG]

状态压缩

```c++
class Solution {
public:
    typedef long long ll;
    const ll MOD = 1e9 + 7;
    int numberWays(vector<vector<int>>& hats) {
        int n = hats.size();
        vector<ll> dp(1 << n);
        dp[0] = 1;
        vector<set<int>> s(41);
        for(int i = 0; i < n; ++i)
            for(int hat : hats[i])
            	 	s[hat].insert(i);
        for(int i = 1; i <= 40; ++i) {
            for(int state = (1 << n) - 1; state >= 0; --state) {
                for(int person : s[i]) {
                    if(state & (1 << person)) continue;
                    int next = state + (1 << person);
                    dp[next] += dp[state];
                    dp[next] %= MOD;
                }
            }
        }
        return dp[(1 << n) - 1];
    }
};
```
