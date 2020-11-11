#  [140. 单词拆分 II](https://leetcode-cn.com/problems/word-break-ii/)

## 题意



## 题解



```c++
class Solution {
public:
    // 1. pass
    unordered_map<int, vector<string>> ans;
    unordered_set<string> wordSet;
    
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        wordSet = unordered_set(wordDict.begin(), wordDict.end());
        backtrack(s, 0);
        return ans[0];
    }

    void backtrack(const string& s, int index) {
        if (!ans.count(index)) {
            if (index == s.size()) {
                ans[index] = {""};
                return;
            }
            ans[index] = {};
            for (int i = index + 1; i <= s.size(); ++i) {
                string word = s.substr(index, i - index);
                if (wordSet.count(word)) {
                    backtrack(s, i);
                    for (const string& succ: ans[i]) {
                        ans[index].push_back(succ.empty() ? word : word + " " + succ);
                    }
                }
            }
        }
    }
    
    // 2. yxc
    vector<bool> f;
    vector<string> ans;
    unordered_set<string> hash;
    int n;

    vector<string> wordBreak(string s, vector<string>& wordDict) {
        n = s.size();
        f.resize(n + 1);
        for (auto word: wordDict) hash.insert(word);
        f[n] = true;
        for (int i = n - 1; ~i; i -- )
            for (int j = i; j < n; j ++ )
                if (hash.count(s.substr(i, j - i + 1)) && f[j + 1])
                    f[i] = true;

        dfs(s, 0, "");
        return ans;
    }

    void dfs(string& s, int u, string path) {
        if (u == n) {
            path.pop_back();
            ans.push_back(path);
        } else {
            for (int i = u; i < n; i ++ )
                if (hash.count(s.substr(u, i - u + 1)) && f[i + 1])
                    dfs(s, i + 1, path + s.substr(u, i - u + 1) + ' ');
        }
    }

    // 3. 超时代码 重复计算部分记忆化搜索即过 参考1
/*
在用例 31 / 36 : 
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]
*/
    int n;
    vector<bool> f;             // f[i] 表示 [0, i] 是否可以被完整分割
    unordered_set<string> mp;
    vector<string> res;
    void dfs(string & s, int u, string path) {
        if(u == n) {
            path.pop_back();    // remove ' '
            res.push_back(path);
            return;
        }
        for(int i = u; i < n; ++i) {
            string ncur = s.substr(u, i-u+1);
            if(mp.count(ncur) && f[i+1])
                dfs(s, i+1, path + ncur + ' ');
        }
    }

    vector<string> wordBreak(string s, vector<string>& wordDict) {
        n = s.size();
        mp = unordered_set<string>(wordDict.begin(), wordDict.end());
        f.resize(n+1);
        f[0] = true;
        for(int i = 1; i <= n; ++i)
            for(int j = 0; j <i; ++j) {
                string cur = s.substr(j, i-j);
                if(mp.count(cur)) f[i] = f[i] | f[j];
            }
        
        dfs(s, 0, "");
        return res;
    }
};
```



```python3

```

