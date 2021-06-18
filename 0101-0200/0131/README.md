#  [131. 分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/)

## 题意



## 题解



```c++
class Solution {
public:
    int n;
    vector<vector<string>> res;
    vector<string> t;
    bool check(string& s) {
        int l = 0, r = s.size()-1;
        while(l < r && s[l] == s[r]) ++l, --r;
        return s[l] == s[r];
    }
    void dfs(string& s, int l) {
        if(l == n) {
            res.push_back(t);
            return;
        }
        for(int i = l+1; i <= n; ++i) {
            string sub = s.substr(l, i-l);
            if(check(sub)) {
                t.push_back(sub);
                dfs(s, i);
                t.pop_back();
            }
        }
    }
    vector<vector<string>> partition(string s) {
        this->n = s.size();
        dfs(s, 0);
        return res;
    }
};
```



```python
#python3
#法一：区间dp + dfs
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        res = []
        path = []
        
        def dfs(u, path):
            if u == n:  # u表示当前搜到第几位，当u ==n: 说明一遍已经搜完，计入答案
                res.append(path[:])
                return 
            for j in range(u, n): # 开始枚举下一段
                if f[u][j]:
                    path.append(s[u:j + 1])  # 加入路径中
                    dfs(j + 1, path)  # 递归到下一层，注意是j + 1, 因为j是上一段最后一个字符
                    path.pop()
        n = len(s)
        f = [[False] * n for _ in range(n)]
				
        for j in range(n):   # 由于递推式f[i][j] = (f[i+1][j-1]),在计算f[i][j]时j-1必须先被算出来，那么应该先枚举j
            for i in range(n):
                if i == j:  # 只有一个字符的情况下
                    f[i][j] = True
                elif s[i] == s[j]:
                    if i + 1 > j - 1 or ((s[i] == s[j] and f[i + 1][j - 1])): # 两个字符
                        f[i][j] = True
        # 区间dp经典写法
        #f[0][0] = True
        #for i in range(1, n):
        #    f[i][i] = True
        #    f[i-1][i] = (s[i-1] == s[i])
        #for length in range(2, n):
        #    for i in range(n - length):
        #        j = i + length
        #        if s[i] == s[j] and f[i + 1][j - 1] == 1:
        #            f[i][j] = True
    
        return res
    
    
# 法2: 回溯
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        res = []
        
        def dfs(s, tmp):
            if not s:
                res.append(tmp)
                return 
            for i in range(1, len(s) + 1):
                if s[:i] == s[:i][::-1]:
                    dfs(s[i:], tmp + [s[:i]])
        dfs(s, [])
        return res
```

