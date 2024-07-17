## [比赛链接](https://leetcode.cn/contest/biweekly-contest-52/)

AK 40min

rank: 41 / 2930

### [5742. 将句子排序](https://leetcode.cn/problems/sorting-the-sentence/)

模拟即可

```c++
class Solution {
public:
    string sortSentence(string s) {
        stringstream ss(s);
        vector<string> ve;
        while (ss >> s)
            ve.push_back(s);
        sort(ve.begin(), ve.end(), [](const string a, const string b) {
            return a.back() < b.back();
        });
        string res;
        for (auto v : ve) {
            v.pop_back();
            res += v + ' ';
        }
        if (res.size())
            res.pop_back();
        return res;
    }
};
```


### [5743. 增长的内存泄露](https://leetcode.cn/problems/incremental-memory-leak/)

同模拟

```c++
class Solution {
public:
    vector<int> memLeak(int m1, int m2) {
        int t = 0;
        for (;;) {
            t ++ ;
            if (m1 >= m2) {
                if (m1 >= t)
                    m1 -= t;
                else
                    break;
            } else {
                if (m2 >= t)
                    m2 -= t;
                else
                    break;
            }
        }
        return {t, m1, m2};
    }
};
```

### [5744. 旋转盒子](https://leetcode.cn/problems/rotating-the-box/)

模拟即可

```c++
class Solution {
public:
    vector<vector<char>> rotateTheBox(vector<vector<char>>& box) {
        int m = box.size(), n = box[0].size();
        
        for (int i = n - 1; i >= 0; -- i )
            for (int j = 0; j < m; ++ j ) {
                int x = j, y = i;
                if (box[x][y] != '.')
                    continue;
                int nx = x, ny = y;
                while (ny >= 0 && box[nx][ny] == '.')
                    ny -- ;
                if (ny >= 0 && box[nx][ny] == '#')
                    swap(box[nx][ny], box[x][y]);
            }
        
        vector<vector<char>> res(n, vector<char>(m));
        for (int i = 0; i < n; ++ i )
            for (int j = 0; j < m; ++ j )
                res[i][j] = box[m - j - 1][i];
        return res;
    }
};
```

```c++
class Solution {
public:
    vector<vector<char>> rotateTheBox(vector<vector<char>>& box) {
        int n = box.size(), m = box[0].size();
        vector<vector<char>> res(m, vector<char>(n));
        for (int j = 0; j < m; j ++ )
            for (int i = n - 1, k = 0; i >= 0; i --, k ++ )
                res[j][k] = box[i][j];

        for (int i = 0; i < n; i ++ )
            for (int j = m - 1, k = m; j >= 0; j -- )
                if (res[j][i] == '*') k = j;
                else if (res[j][i] == '#') {
                    res[j][i] = '.';
                    res[ -- k][i] = '#';
                }
        return res;
    }
};
```

### [5212. 向下取整数对和](https://leetcode.cn/problems/sum-of-floored-pairs/)

BIT 即可

>   rejudge 时超时 还是需要用计数的方法
>
>   简单 不再赘述

```c++
class Solution {
public:
    using LL = long long;
    const static int N = 200010;
    int tr[N];
    
    int lowbit(int x) {
        return x & -x;
    }
    
    void add(int x, int c) {
        for (int i = x; i < N; i += lowbit(i)) tr[i] += c;
    }
    
    LL sum(int x) {
        LL res = 0;
        for (int i = x; i; i -= lowbit(i)) res += tr[i];
        return res;
    }
    
    const int MOD = 1e9 + 7;
    vector<int> ns;
    int n;
    
    LL get(int x) {
        int top = ns.back() / x;
        LL ret = 0;
        for (int i = 1; i <= top; ++ i ) {
            LL cnt = sum(x * (i + 1) - 1) - sum(x * i - 1);
            ret = (ret + i * cnt) % MOD;
        }
        return ret;
    }
    
    // 显然只计算某个值和后面比它大的
    int sumOfFlooredPairs(vector<int>& nums) {
        this->ns = nums;
        n = ns.size();
        memset(tr, 0, sizeof tr);
        for (auto v : ns)
            add(v, 1);
        sort(ns.begin(), ns.end());
        LL res = 0;
        for (auto v : ns)
            res = (res + get(v)) % MOD;
        return res;
    }
};
```

计数也可

```c++
typedef long long LL;

const int N = 100010, MOD = 1e9 + 7;

int s[N];

class Solution {
public:
    int sumOfFlooredPairs(vector<int>& nums) {
        memset(s, 0, sizeof s);
        for (auto x: nums) s[x] ++ ;
        for (int i = 1; i < N; i ++ ) s[i] += s[i - 1];
        int res = 0;
        
        for (int i = 1; i < N; i ++ ) {
            for (int j = 1; j * i < N; j ++ ) {
                int l = j * i, r = min(N - 1, (j + 1) * i - 1);
                int sum = (LL)(s[r] - s[l - 1]) * j % MOD;
                res = (res + (LL)sum * (s[i] - s[i - 1])) % MOD;
            }
        }
        return res;
    }
};
```