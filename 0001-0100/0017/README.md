#  [17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> mp{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    vector<string> res;
    string t;
    void dfs(string& digits, int pos) {
        if(pos == digits.size()) {
            // 处理输入是 [""] 空的情况
            // if(!t.empty()) 
            res.push_back(t);
            return;
        }
        for(auto c : mp[digits[pos]-'0']) {
            t.push_back(c);
            dfs(digits, pos+1);
            t.pop_back();
        }
    }
    vector<string> letterCombinations(string digits) {
        if(digits.empty()) return vector<string>{};
        dfs(digits, 0);
        return res;
    }
};
```



```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        n = len(digits)
        if not n:return []
        my_dic = {'2':'abc', '3':'def', '4':'ghi','5':'jkl', \
                    '6':'mno', '7':'pqrs', '8':'tuv', '9':'wxyz'}
        res = []
        def dfs(u, path):
            if u == n:
                res.append(path)  # 字符串是不可变类型，不会把这次递归的结果返回给上一次，所以不需要pop，也不需要path[:]
                return 
            for c in my_dic[digits[u]]:
                dfs(u + 1, path + c) # 字符串不能写成：path.append(c) or path.add(c) 

        dfs(0, '')
        return res
```

