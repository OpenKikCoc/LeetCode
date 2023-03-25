## [比赛链接](https://leetcode.cn/contest/weekly-contest-337/)

>   virtual rank: 124 / 5628


### [2595. 奇偶位数](https://leetcode.cn/problems/number-of-even-and-odd-bits/)



```c++
class Solution {
public:
    vector<int> evenOddBit(int n) {
        string s;
        for (int i = 0; i < 12; ++ i )
            if (n >> i & 1)
                s += '1';
            else
                s += '0';
        
        // cout << s << endl;
        
        while (s.size() && s.back() == '0')
            s.pop_back();
        
        // reverse(s.begin(), s.end());
        // cout << s << endl;
        
        vector<int> res = {0, 0};
        for (int i = 0; i < s.size(); ++ i ) {
            if (s[i] == '1') {
                if (i & 1)
                    res[1] ++ ;
                else
                    res[0] ++ ;
            }
        }
        return res;
    }
};
```


### [2596. 检查骑士巡视方案](https://leetcode.cn/problems/check-knight-tour-configuration/)

注意条件：必须从左上角出发

```c++
class Solution {
public:
    using PII = pair<int, int>;
    
    bool checkValidGrid(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        
        unordered_set<int> S;
        vector<PII> xs;
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j ) {
                int x = grid[i][j];
                S.insert(x);
                xs.push_back({i, j});
            }
        
        for (int i = 0; i < n * m; ++ i )
            if (!S.count(i))
                return false;
        
        sort(xs.begin(), xs.end(), [&](const PII & a, const PII & b) {
            return grid[a.first][a.second] < grid[b.first][b.second];
        });
        // 骑士会从棋盘的 左上角 出发
        if (xs[0].first || xs[0].second)
            return false;
        
        int sz = xs.size();
        for (int i = 1; i < sz; ++ i ) {
            auto [ax, ay] = xs[i - 1];
            auto [bx, by] = xs[i];
            
            int dx = abs(ax - bx), dy = abs(ay - by);
            
            
            if (!(dx == 1 && dy == 2 || dx == 2 && dy == 1)) {
                // cout << " i = " << i << " dx = " << dx << " dy = " << dy << endl;
                return false;
            }
        }
        return true;
    }
};
```

### [2597. 美丽子集的数目](https://leetcode.cn/problems/the-number-of-beautiful-subsets/)



```c++
const static int N = 1 << 20, M = 1010;

bool f[N];
bool st[M];

class Solution {
public:
    int lowbit(int x) {
        return x & -x;
    }
    
    int beautifulSubsets(vector<int>& nums, int k) {
        memset(f, 0, sizeof f);
        f[0] = true;

        int n = nums.size(), res = 0;
        for (int i = 1; i < 1 << n; ++ i ) {
            int x = lowbit(i);
            if (!f[i ^ x])
                continue;
            
            int o = __builtin_ctz(x);
            bool flag = true;
            for (int j = i ^ x; j; j -= lowbit(j)) {
                int t = lowbit(j);
                if (abs(nums[o] - nums[__builtin_ctz(t)]) == k) {
                    flag = false;
                    break;
                }
            }
            
            if (flag) {
                res ++ ;
                f[i] = true;
            }
        }
        return res;
    }
};
```

### [2598. 执行操作后的最大 MEX](https://leetcode.cn/problems/smallest-missing-non-negative-integer-after-operations/)



```c++
class Solution {
public:
    // nums.length <= 1e5   ===> mex 不会超过 1e5+1
    int findSmallestInteger(vector<int>& nums, int value) {
        unordered_map<int, int> h;
        for (auto & x : nums) {
            int t = (x % value + value) % value;
            h[t] ++ ;
        }
        
        for (int i = 0; i <= 2e5; ++ i ) {
            int need = i % value;
            if (h[need] == 0)
                return i;
            h[need] -- ;
        }
        return -1;
    }
};
```
