## [比赛链接](https://leetcode.cn/contest/weekly-contest-356/)


### [2798. 满足目标工作时长的员工数目](https://leetcode.cn/problems/number-of-employees-who-met-the-target/)



```c++
class Solution {
public:
    int numberOfEmployeesWhoMetTarget(vector<int>& hours, int target) {
        int res = 0;
        for (auto x : hours)
            if (x >= target)
                res ++ ;
        return res;
    }
};
```


### [2799. 统计完全子数组的数目](https://leetcode.cn/problems/count-complete-subarrays-in-an-array/)



```c++
class Solution {
public:
    int countCompleteSubarrays(vector<int>& nums) {
        unordered_set<int> S;
        for (auto x : nums)
            S.insert(x);
        
        int n = nums.size(), tar = S.size(), res = 0;
        for (int i = 0; i < n; ++ i ) {
            S.clear();
            for (int j = i; j < n; ++ j ) {
                S.insert(nums[j]);
                if (S.size() == tar) {
                    res += n - j;
                    break;
                }
            }
        }
        
        return res;
    }
};
```

### [2800. 包含三个字符串的最短字符串](https://leetcode.cn/problems/shortest-string-that-contains-three-strings/)

优雅实现

```c++
class Solution {
public:
    int check(string & a, string & b) {
        int n = a.size(), m = b.size();
        for (int i = min(n, m); i > 0; -- i ) {
            if (a.substr(n - i, i) == b.substr(0, i))
                return i;
        }
        return 0;
    }

    string get(string a, string b, string c) {
        string t = a;
        if (t.find(b) == string::npos) {
            t += b.substr(check(t, b));
        }
        if (t.find(c) == string::npos) {
            t += c.substr(check(t, c));
        }
        return t;
    }

    string minimumString(string a, string b, string c) {
        vector<string> ss = {a, b, c};

        string res;

        // 生成所有顺序
        for (int i = 0; i < 3; ++ i )
            for (int j = 0; j < 3; ++ j )
                for (int k = 0; k < 3; ++ k ) {
                    if (i == j || i == k || j == k)
                        continue;
                    
                    string t = get(ss[i], ss[j], ss[k]);
                    if (res.empty() || t.size() < res.size() || (t.size() == res.size() && t < res))
                        res = t;
                }
        return res;
    }
};
```

### [2801. 统计范围内的步进数字数目](https://leetcode.cn/problems/count-stepping-numbers-in-range/)

标准数位dp 略

```c++
// 显然 是一个标准的数位dp
const static int N = 110, M = 10, MOD = 1e9 + 7;

int f[N][M];    // 长度为 i, 最前面的数字为 j 的所有 “步进数”
bool inited = false;

void init() {
    if (inited)
        return;
    inited = true;
    memset(f, 0, sizeof f);
    for (int i = 0; i < M; ++ i )   // ATTENTION 注意 0 idx
        f[1][i] = 1;
    for (int i = 2; i < N; ++ i )
        for (int j = 0; j < M; ++ j )
            for (int k = 0; k < M; ++ k )
                if (abs(j - k) == 1)
                    f[i][j] = (f[i][j] + f[i - 1][k]) % MOD;
}

class Solution {
public:
    string sub_one(string & s) {
        vector<int> C;
        for (int i = s.size() - 1, t = 1; i >= 0; -- i ) {
            t = s[i] - '0' - t;
            C.push_back((t + 10) % 10);
            if (t < 0)
                t = 1;
            else
                t = 0;
        }
        while (C.size() > 1 && C.back() == 0)
            C.pop_back();
        string t;
        for (int i = C.size() - 1; i >= 0; -- i )
            t += '0' + C[i];
        return t;
    }
    
    int get(string s) {
        if (s == "0")
            return 0;
        
        int t = 0, n = s.size(), last = -1;
        // 长度小于的
        for (int i = 1; i < n; ++ i )
            for (int j = 1; j < M; ++ j )   // 不能 0 起始
                t = (t + f[i][j]) % MOD;
        
        // 长度等于的
        for (int i = 0; i < n; ++ i ) {
            int x = s[i] - '0';
            
            for (int j = (i ? 0 : 1); j < x; ++ j ) // ATTENTION 不能有前导 0
                if (last == -1 || abs(last - j) == 1)
                    t = (t + f[n - i][j]) % MOD;
            
            if (last != - 1 && abs(last - x) != 1)
                break;
            last = x;
            
            if (i == n - 1)
                t = (t + 1) % MOD;
        }
        
        return t;
    }
    
    int countSteppingNumbers(string low, string high) {
        init();
        // 需要让 low -1
        return (get(high) - get(sub_one(low)) + MOD) % MOD;
    }
};
```
