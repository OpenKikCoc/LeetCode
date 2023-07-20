## [比赛链接](https://leetcode.cn/contest/weekly-contest-351)


### [2748. 美丽下标对的数目](https://leetcode.cn/problems/number-of-beautiful-pairs/)



```c++
class Solution {
public:
    int countBeautifulPairs(vector<int>& nums) {
        int res = 0, n = nums.size();
        for (int i = 0; i < n; ++ i )
            for (int j = i + 1; j < n; ++ j ) {
                int a = to_string(nums[i])[0] - '0', b = nums[j] % 10;
                if (__gcd(a, b) == 1)
                    res ++ ;
            }
        return res;
    }
};
```


### [2749. 得到整数零需要执行的最少操作数](https://leetcode.cn/problems/minimum-operations-to-make-the-integer-zero/)

分情况讨论

可以看下题解区其他解法 TODO

```c++
class Solution {
public:
    using LL = long long;
    
    int makeTheIntegerZero(int num1, int num2) {
        LL x = num1, y = num2;
        for (int i = 1; i < 100; ++ i ) {
            LL t = x - y * i;
            if (t < 0)
                continue;       // ATTENTION 如果已经是负数肯定不能再减了
            
            // cout << " i = " << i << " t = " << t << endl;
            int x = i;
            if (t & 1)
                x -- , t -- ;
            
            int c = 0;
            for (int i = 0; i < 64; ++ i )  // ATTENTION 不止 32 位需要关注
                if (t >> i & 1)
                    c ++ ;
            
            // for (int i = 63; i >= 0; -- i )
            //     if (t >> i & 1)
            //         cout << '1';
            //     else
            //         cout << '0';
            // cout << endl;
            
            // ATTENTION 过滤条件
            if (c && x == 0)
                continue;
            if (c == 0 && x)
                continue;
            
            if (c <= x)
                return i;
        }
        return -1;
    }
};
```

### [2750. 将数组划分成若干好子数组的方式](https://leetcode.cn/problems/ways-to-split-array-into-good-subarrays/)

简单乘法原理

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 1e5 + 10, MOD = 1e9 + 7;
    
    LL f[N];
    
    int numberOfGoodSubarraySplits(vector<int>& nums) {
        f[0] = 1;
        for (int i = 1; i < N; ++ i )
            f[i] = f[i - 1] * 2 % MOD;
        
        int n = nums.size();
        
        vector<int> xs;
        for (int i = 0; i < n; ++ i ) {
            int j = i;
            while (j < n && nums[j] == 0)
                j ++ ;
            xs.push_back(j - i);
            i = j;
        }
        
        if (xs.size() && nums.back() == 0)
            xs.pop_back();
        
        if (xs.size())
            xs.erase(xs.begin());
        else
            return 0;   // return 0
        
        LL res = 1;
        
        for (auto x : xs)
            res = (res * (x + 1)) % MOD;
        
        return res;
    }
};
```

更好写的思路

```c++
class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;

    bool has(vector<int> & xs, int y) {
        for (auto x : xs)
            if (x == y)
                return true;
        return false;
    }

    int numberOfGoodSubarraySplits(vector<int>& nums) {
        if (!has(nums, 1))
            return 0;

        // ATTENTION 使用 pre 记录来巧妙的实现 trimLeft & trimRight
        int n = nums.size(), pre = -1;
        LL res = 1;
        for (int i = 0; i < n; ++ i )
            if (nums[i]) {
                if (pre >= 0)
                    res = (res * (i - pre)) % MOD;
                pre = i;
            }

        return res;
    }
};
```

### [2751. 机器人碰撞](https://leetcode.cn/problems/robot-collisions/) [TAG]

显然是栈 细节在于分情况讨论

```c++
class Solution {
public:
    // 一般这种都是用 栈
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    vector<int> survivedRobotsHealths(vector<int>& positions, vector<int>& healths, string directions) {
        int n = positions.size();
        vector<PII> xs;
        for (int i = 0; i < n; ++ i )
            xs.push_back({positions[i], i});
        sort(xs.begin(), xs.end());
        
        stack<int> st;
        for (int i = 0; i < n; ++ i ) {
            auto [p, idx] = xs[i];
            if (directions[idx] == 'R') {
                st.push(idx);
                // cout << " ... continue i = " << i << " p = " << p << " idx = " << idx << " sz " << st.size() << endl;
                continue;
            }
            
            // now we got L, only care about R
            while (st.size()) {
                auto t_idx = st.top();
                
                // break 条件
                if (directions[t_idx] != 'R')
                    break;
                if (healths[t_idx] > healths[idx]) {
                    healths[idx] = 0;   // 特殊处理
                    healths[t_idx] -- ;
                    break;
                }
                if (healths[t_idx] == healths[idx]) {
                    healths[idx] = 0;   // 特殊处理
                    st.pop();
                    break;
                }
                
                // 否则可以一直往下
                // h[t_idx] < h[idx]
                st.pop();
                healths[idx] -- ;
            }
            if (healths[idx])
                st.push(idx);
            // cout << " ... i = " << i << " p = " << p << " idx = " << idx << " sz " << st.size() << endl;
        }
        // cout << endl;
        
        vector<int> res;
        {
            vector<PII> t;
            while (st.size()) {
                int x = st.top(); st.pop();
                t.push_back({x, healths[x]});
            }
            sort(t.begin(), t.end());
            for (auto [x, h] : t)
                res.push_back(h);
        }
        return res;
    }
};
```
