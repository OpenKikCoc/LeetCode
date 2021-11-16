## [比赛链接](https://leetcode-cn.com/contest/weekly-contest-261/)


### [2027. 转换字符串的最少操作次数](https://leetcode-cn.com/problems/minimum-moves-to-convert-string/)

模拟即可

```c++
class Solution {
public:
    int minimumMoves(string s) {
        int n = s.size(), res = 0;
        for (int i = 0; i < n; ++ i )
            if (s[i] == 'X') {
                for (int j = i; j < n && j < i + 3; ++ j )
                    s[j] = 'O';
                res ++ ;
            }
        return res;
    }
};
```


### [2028. 找出缺失的观测数据](https://leetcode-cn.com/problems/find-missing-observations/)

简单模拟

注意细节判断的 case WA

```c++
class Solution {
public:
    vector<int> missingRolls(vector<int>& rolls, int mean, int n) {
        int m = rolls.size(), tot = mean * (m + n);
        for (auto v : rolls)
            tot -= v;
        // 细节1: tot < n * 1
        if (tot > n * 6 || tot < n * 1)
            return {};
        
        vector<int> res;
        // 细节2: mod需要均摊到每一个数上 否则会出现最后一个数极大(超过6)的情况
        int d = tot / n, mod = tot % n;
        for (int i = 0; i < n - mod; ++ i )
            res.push_back(d);
        for (int i = n - mod; i < n; ++ i )
            res.push_back(d + 1);
        return res;
    }
};
```

### [2029. 石子游戏 IX](https://leetcode-cn.com/problems/stone-game-ix/) [TAG]

一开始在想 区间DP

其实是情况较复杂的**分情况讨论**

>   这题的题意设计很有意思 1 和  2 先后选取恰好对应 mod 3 的各类情况

```c++
class Solution {
public:
    bool stoneGameIX(vector<int>& stones) {
        int s[3] = {0, 0, 0};
        for (int i : stones)
            s[i % 3] ++ ;
        
        // s[0] 仅用作换手
        
        // 当 s[0] 为偶数，显然消除换手，只考虑 s[1] s[2] 即可
        // 如果 s[1] s[2] 任一为 0，则 alice 必败
        // ==> 分情况讨论
        //      s[1] = 0: alice 只能取 2 后面 bob 跟着取 2
        //                      后面 [取光] 或 [alice 三的倍数] 必败
        //      s[2] = 0: alice 只能取 1 后面 bob 跟着取 1
        //                      同理
        // 否则必胜
        if (s[0] % 2 == 0)
            return s[1] != 0 && s[2] != 0;
        
        // s[0] % 2 == 1 必然有一次换手
        // ==> 分情况讨论
        //      s[1] = s[2]: 则相当于 bob 先手选 s[1] s[2]
        //                   alice 为了跟上 bob 必须跟着取 最终取到最后石子(三的倍数) 必败
        //      abs(s[1] - s[2]) <= 2:  不管 alice 先取哪个 bob 都可以换手
        //                              最终石子取完 必败
        //      abs(s[1] - s[2]) > 2:   alice 取较多的 最终 bob 会到达三的倍数的情况 必胜
        return abs(s[1] - s[2]) > 2;
    }
};
```

### [2030. 含特定字母的最小子序列](https://leetcode-cn.com/problems/smallest-k-length-subsequence-with-occurrences-of-a-letter/) [TAG]

#### 1. 单调栈 (prefer)

较显然的 如果不考虑 `letter 至少出现 repetition 次` 的条件 则是一个典型单调栈问题

考虑这一条件时 

1.   **出栈条件更加严格**

     添加 `has - (s[st.top()] == letter) + suf[i] >= repetition`

2.   **遍历结束时 需考虑删除多余元素**

     -   直接从尾部踢除 并由剩下的合法长度的字符构造 `res` 显然没有问题（满足 **长度** 及 **字典序** 条件）
     -   前述做法可能会使得 `res` 中的 `letter` 数量不足
         -   解决：直接从后向前补足 `letter`
         -   思考：正确性推导（显然相当于将 `letter` 集中向前移动）

```c++
class Solution {
public:
    string smallestSubsequence(string s, int k, char letter, int repetition) {
        int n = s.size();
        
        // suf 甚至可以用一个变量统计 在 for-loop 中递减来维护
        vector<int> suf(n);
        for (int i = n - 1; i >= 0; -- i )
            suf[i] = (i < n - 1 ? suf[i + 1] : 0) + (s[i] == letter);
        
        int del = n - k, has = 0;
        stack<int> st;
        for (int i = 0; i < n; ++ i ) {
            // the while-condition
            while (st.size() && del && s[st.top()] > s[i] && 
                  // 把当前栈顶去除letter仍然够用
                  has - (s[st.top()] == letter) + suf[i] >= repetition) {
                if (s[st.top()] == letter)
                    has -- ;
                del -- ;
                st.pop();
            }
            st.push(i);
            if (s[st.top()] == letter)
                has ++ ;
        }
        
        // 只获取前k项
        while (st.size() > k)
            has -= (s[st.top()] == letter), st.pop();
        string res;
        while (st.size())
            res.push_back(s[st.top()]), st.pop();
        reverse(res.begin(), res.end());
        
        // ATTENTION 使用letter向前挤兑其他字符的位置 以满足至少repetition次的要求
        // 重要: 思考为什么这样是可行的? ----> 因为相当于去除其他元素并将后面的直接前移
        for (int i = k - 1; has < repetition; -- i )
            if (res[i] != letter)
                res[i] = letter, has ++ ;
        
        return res;
    }
};
```

#### 2. 暴力构造串

```c++
const int L = 26;
const int N = 5e4 + 10;
int f[N][L];
int g[N];

class Solution {
public:
    string smallestSubsequence(string s, int k, char let, int rep) {
        int n = s.length();
        for (int i = 0; i < L; ++ i ) f[n][i] = f[n + 1][i] = n;
        g[n] = g[n + 1] = 0;
        for (int i = n - 1; i >= 0; -- i ) {
            for (int j = 0; j < L; ++ j)
                if (s[i] - 'a' == j) f[i][j] = i;
                else f[i][j] = f[i + 1][j];
            g[i] = g[i + 1] + (s[i] == let);
        }
        string res;
        int p = 0, l_ct = 0;
        for (int i = 0; i < k; ++ i ) {
            for (int j = 0; j < L; ++ j ) {
                int q = f[p][j];
                if (q < n && (k - i) <= (n - q) && g[q] + l_ct >= rep && (k - i - 1 >= max(0, rep - (l_ct + (s[q] == let))))) {
                    res.push_back('a' + j);
                    p = q + 1;
                    l_ct += (s[q] == let);
                    break;
                }
            }
        }
        return res;
    }
};
```

#### 3. 另一种暴力构造串

```c++
class Solution {
public:
    string smallestSubsequence(string s, int k, char C, int R) {
        int n = s.size();
        vector<int> nxt(n + 1), suf(n + 1);
        nxt[n] = n;
        for (int i = n - 1; i >= 0; i -- ) {
            nxt[i] = (s[i] == C ? i : nxt[i + 1]);
            suf[i] = suf[i + 1] + (s[i] == C);
        }
        vector<vector<int>> p(26);
        for (int i = 0; i < n; i ++ ) {
            p[s[i] - 'a'].push_back(i);
        }
        string res;
        int i = 0, j = 0;
        while (k -- ) {
            if (k + 1 == R) {
                while (R -- )
                    res += C;
                break;
            }
            auto check = [&](int x) {return n - 1 - x >= k && suf[x + 1] >= R;};
            j = max(i, j);
            while (j < n - 1 && check(j + 1))
                j ++ ;
            int pos = -1;
            for (int c = 0; c < 26; c ++ ) {
                auto t = lower_bound(p[c].begin(), p[c].end(), i);
                if (t != p[c].end() && *t <= j) {
                    pos = *t;
                    break;
                }
            }
            if (s[pos] > C && n - 1 - nxt[i] >= k)
                pos = nxt[i];
            res += s[pos];
            if (s[pos] == C)
                R -- ;
            i = pos + 1;
        }
        return res;
    }
};
```

