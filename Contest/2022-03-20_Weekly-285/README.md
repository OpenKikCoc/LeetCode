## [比赛链接](https://leetcode.cn/contest/weekly-contest-285/)


### [6027. 统计数组中峰和谷的数量](https://leetcode.cn/problems/count-hills-and-valleys-in-an-array/)

略

```c++
class Solution {
public:
    int countHillValley(vector<int>& nums) {
        nums.erase(unique(nums.begin(), nums.end()), nums.end());
        int n = nums.size(), res = 0;
        for (int i = 1; i + 1 < n; ++ i )
            if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1] || 
                nums[i] < nums[i - 1] && nums[i] < nums[i + 1])
                res ++ ;
        return res;
    }
};
```


### [6028. 统计道路上的碰撞次数](https://leetcode.cn/problems/count-collisions-on-a-road/)

trick

```c++
class Solution {
public:
    int countCollisions(string directions) {
        int r = 0, s = 0, res = 0;
        for (auto x : directions)
            if (x == 'L') {
                if (s)
                    res ++ , s = 1, r = 0;
                else if (r)
                    res += r + 1, s = 1, r = 0;
            } else if (x == 'S') {
                if (r)
                    res += r;
                s = 1, r = 0;
            } else
                s = 0, r ++ ;
        return res;
    }
};
```

### [6029. 射箭比赛中的最大得分](https://leetcode.cn/problems/maximum-points-in-an-archery-competition/)

二进制枚举 注意 `numArrows > c 可以累加至任意分数上 这里直接加 0 上`

```c++
class Solution {
public:
    vector<int> maximumBobPoints(int numArrows, vector<int>& aliceArrows) {
        int n = aliceArrows.size();
        vector<int> res(n);
        int tot = 0;
        for (int i = 0; i < 1 << n; ++ i ) {
            int c = 0, s = 0;
            for (int j = 0; j < n; ++ j )
                if (i >> j & 1)
                    c += aliceArrows[j] + 1, s += j;
            if (c <= numArrows && s > tot) {
                for (int j = 0; j < n; ++ j )
                    if (i >> j & 1)
                        res[j] = aliceArrows[j] + 1;
                    else
                        res[j] = 0;
                if (numArrows > c)
                    res[0] += numArrows - c;
                
                tot = s;
            }
        }
        return res;
    }
};
```

### [6030. 由单个字符重复的最长子字符串](https://leetcode.cn/problems/longest-substring-of-one-repeating-character/)

模拟即可

```c++
class Solution {
public:
    using PII = pair<int, int>;
    const static int N = 1e5 + 10;
    
    vector<int> longestRepeating(string s, string queryCharacters, vector<int>& queryIndices) {
        set<PII> S;
        multiset<int> MS;
        int n = s.size();
        for (int i = 0; i < n; ++ i ) {
            int j = i + 1;
            while (j < n && s[j] == s[i])
                j ++ ;
            S.insert({i, j - 1});
            MS.insert(j - i);
            i = j - 1;
        }
        
        vector<int> res;
        int m = queryCharacters.size();
        for (int i = 0; i < m; ++ i ) {
            char c = queryCharacters[i];
            int id = queryIndices[i];
            if (s[id] == c) {
                res.push_back(*MS.rbegin());
                continue;
            }
            
            auto [l, r] = *prev(S.lower_bound({id, INT_MAX}));   // ATTENTION
            // 先删后加 因为可能删的和加的是同一个区间
            S.erase(S.find({l, r}));
            MS.erase(MS.find(r - l + 1));
            
            if (l < id) {
                S.insert({l, id - 1});
                MS.insert(id - l);
            }
            if (id < r) {
                S.insert({id + 1, r});
                MS.insert(r - id);
            }
            
            int nl = id, nr = id;
            if (id + 1 < n && s[id + 1] == c) {
                auto [pl, pr] = *S.lower_bound({id, INT_MAX});
                nr = pr;
                S.erase(S.find({pl, pr}));
                MS.erase(MS.find(pr - pl + 1));
            }
            if (id - 1 >= 0 && s[id - 1] == c) {
                auto [pl, pr] = *prev(S.lower_bound({id, INT_MIN}));
                nl = pl;
                S.erase(S.find({pl, pr}));
                MS.erase(MS.find(pr - pl + 1));
            }
            
            s[id] = c;
            S.insert({nl, nr});
            MS.insert(nr - nl + 1);
            res.push_back(*MS.rbegin());
        }
        // cout << endl;
        return res;
    }
};
```
