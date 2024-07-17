#  [131. 分割回文串](https://leetcode.cn/problems/palindrome-partitioning/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<vector<bool>> f;
    vector<vector<string>> ans;
    vector<string> path;

    vector<vector<string>> partition(string s) {
        int n = s.size();
        f = vector<vector<bool>>(n, vector<bool>(n));
        for (int j = 0; j < n; j ++ )
            for (int i = 0; i <= j; i ++ )
                if (i == j) f[i][j] = true;
                else if (s[i] == s[j]) {
                    if (i + 1 > j - 1 || f[i + 1][j - 1]) f[i][j] = true;
                }

        dfs(s, 0);
        return ans;
    }

    void dfs(string& s, int u) {
        if (u == s.size()) ans.push_back(path);
        else {
            for (int i = u; i < s.size(); i ++ )
                if (f[u][i]) {
                    path.push_back(s.substr(u, i - u + 1));
                    dfs(s, i + 1);
                    path.pop_back();
                }
        }
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

