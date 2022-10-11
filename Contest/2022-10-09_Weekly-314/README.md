## [比赛链接](https://leetcode.cn/contest/weekly-contest-314)

>   rank: 231 / 4838


### [6200. 处理用时最长的那个任务的员工](https://leetcode.cn/problems/the-employee-that-worked-on-the-longest-task/)

```c++
class Solution {
public:
    int hardestWorker(int n, vector<vector<int>>& logs) {
        int p = -1, mx = -1;
        for (int i = 0; i < logs.size(); ++ i )
            if (i == 0) {
                int c = logs[i][1];
                if (c > mx || c == mx && logs[i][0] < p)
                    p = logs[i][0], mx = c;
            } else {
                int c = logs[i][1] - logs[i - 1][1];
                if (c > mx || c == mx && logs[i][0] < p)
                    p = logs[i][0], mx = c;
            }
        return p;
    }
};
```

```python
class Solution:
    def hardestWorker(self, n: int, logs: List[List[int]]) -> int:
        n = len(logs)
        maxv = logs[0][1]
        maxidx = logs[0][0]
        for i in range(1, n):
            tmp = logs[i][1] - logs[i - 1][1]
            if tmp > maxv:
                maxv = tmp
                maxidx = logs[i][0]
            elif tmp == maxv:
                maxidx = min(maxidx, logs[i][0])
        return maxidx
```



### [6201. 找出前缀异或的原始数组](https://leetcode.cn/problems/find-the-original-array-of-prefix-xor/)

```c++
class Solution {
public:
    vector<int> findArray(vector<int>& pref) {
        int pre = 0, n = pref.size();
        vector<int> res;
        for (int i = 0; i < n; ++ i ) {
            res.push_back(pre ^ pref[i]);
            pre ^= res[i];
        }
        return res;
    }
};

class Solution {
public:
    vector<int> findArray(vector<int>& pref) {
        int pre = 0, n = pref.size();
        vector<int> res;
        res.push_back(pref[0]);
        for (int i = 1; i < n; ++ i )
            res.push_back(pref[i - 1] ^ pref[i]);
        return res;
    }
};
```

```python
class Solution(object):
    def findArray(self, pref):
        res = [pref[0]]
        for i in range(1, len(pref)):
            res.append(pref[i] ^ pref[i-1])
        return res
      
      
class Solution:
    def findArray(self, pref: List[int]) -> List[int]:
        n = len(pref)
        if n <= 1:
            return pref 
        res = [0] * n
        res[0] = pref[0]
        for i in range(1, n):
            res[i] = pref[i] ^ pref[i - 1]
        return res
```



### [6202. 使用机器人打印字典序最小的字符串](https://leetcode.cn/problems/using-a-robot-to-print-the-lexicographically-smallest-string/) [TAG]

比赛时代码：

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = 26;
    
    int c[M];  // 方便找后面的串中 最小的字符是谁 ==> 查询过程可以常量优化
    
    string robotWithString(string s) {
        int n = s.size();
        memset(c, 0, sizeof c);
        for (auto x : s)
            c[x - 'a'] ++ ;
        
        string res;
        stack<char> st;
        for (auto x : s) {
            int p = -1;
            for (int i = 0; i < M; ++ i )
                if (c[i]) {
                    p = i;
                    break;
                }
            if (x - 'a' == p) {
                res.push_back(x);
                c[p] -- ;
                
                while (st.size()) {
                    int t = -1;
                    for (int i = 0; i < M; ++ i )
                        if (c[i]) {
                            t = i;
                            break;
                        }
                    if (st.top() - 'a' <= t) {
                        res.push_back(st.top()), st.pop();
                    } else
                        break;
                }
            } else {
                st.push(x);
                c[x - 'a'] -- ;
            }
            // cout << " after x = " << x << " res = " << res << endl;
            // vzho fn 
        }
        while (st.size())
            res.push_back(st.top()), st.pop();
        return res;
    }
};
```

```c++
class Solution {
public:
    const static int N = 1e5 + 10, M = 26;
    
    int c[M];
    
    string robotWithString(string s) {
        int n = s.size();
        memset(c, 0, sizeof c);
        for (auto x : s)
            c[x - 'a'] ++ ;
        
        string res;
        stack<char> st;
        int p = 0;
        for (auto x : s) {
            st.push(x);
            c[x - 'a'] -- ;
            
            // int p = -1;
            // for (int i = 0; i < M; ++ i )
            //     if (c[i]) {
            //         p = i;
            //         break;
            //     }
            while (p < M && c[p] == 0)
                p ++ ;
            
            while (st.size() && st.top() - 'a' <= p)
                res.push_back(st.top()), st.pop();
        }
        while (st.size())
            res.push_back(st.top()), st.pop();
        return res;
    }
};
```

```python
class Solution(object):
    def robotWithString(self, s):
        d = dict()
        for i in range(26):
            d[i] = 0
        
        res = ''
        
        for v in s:
            v = ord(v) - ord('a')
            d[v] += 1
        
        stack = deque()
        for v in s:
            v = ord(v) - ord('a')
            stack.append(v)
            d[v] -= 1
            
            while len(stack) > 0:
                x = stack[-1]
                flag = 1
                for i in range(x):
                    if d[i] > 0:
                        flag = 0
                if flag:
                    res += chr(97 + stack[-1])
                    stack.pop()
                else:
                    break
        
        while len(stack) > 0:
            res += chr(97 + stack[-1])
            stack.pop()
        
        return res
```



### [6203. 矩阵中和能被 K 整除的路径](https://leetcode.cn/problems/paths-in-matrix-whose-sum-is-divisible-by-k/)

```c++

class Solution {
public:
    using LL = long long;
    const static int MOD = 1e9 + 7;
    
    vector<vector<int>> g;
    int n, m;
    
    vector<vector<vector<LL>>> f;
    
    int numberOfPaths(vector<vector<int>>& grid, int k) {
        this->g = grid;
        this->n = g.size(), m = g[0].size();
        
        f = vector<vector<vector<LL>>>(n + 1, vector<vector<LL>>(m + 1, vector<LL>(k + 1)));
        
        f[0][1][0] = 1;
        for (int i = 1; i <= n; ++ i )
            for (int j = 1; j <= m; ++ j )
                for (int x = 0; x < k; ++ x ) {
                    int last = ((x - g[i - 1][j - 1]) % k + k) % k;
                    f[i][j][x] = (f[i - 1][j][last] + f[i][j - 1][last]) % MOD;
                }
        return f[n][m][0] % MOD;
    }
};
```

```python
class Solution:
    def numberOfPaths(self, grid: List[List[int]], k: int) -> int:
        MOD = int(1e9+7)
        n, m = len(grid), len(grid[0])
        f = [[[0] * (k + 1) for _ in range(m + 1)] for _ in range(n + 1)]
        f[0][1][0] = 1

        for i in range(1, n + 1):
            for j in range(1, m + 1):
                for x in range(k):
                    last = ((x - grid[i - 1][j - 1]) % k + k) % k
                    f[i][j][x] = (f[i - 1][j][last] + f[i][j - 1][last]) % MOD
        return f[n][m][0] % MOD
```

