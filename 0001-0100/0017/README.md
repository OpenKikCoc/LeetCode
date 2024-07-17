#  [17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> mp{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    vector<string> res;
    string t;
    void dfs(string& digits, int pos) {
        if (pos == digits.size()) {
            // 处理输入是 [""] 空的情况
            // if(!t.empty()) 
            res.push_back(t);
            return;
        }
        for (auto c : mp[digits[pos] - '0']) {
            t.push_back(c);
            dfs(digits, pos + 1);
            t.pop_back();
        }
    }
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return vector<string>{};
        dfs(digits, 0);
        return res;
    }
};
```



```python
# dfs
# 用字典记录 数字 对应的 字母选项
# 然后 dfs 记录当前遍历到第几个数字字符 以及 当前的path 
# dfs 返回的条件是：当前数字字符被遍历完了，就把 path 加入到 res中

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        n = len(digits)
        if not n:return []
        my_dic = {'2':'abc', '3':'def', '4':'ghi','5':'jkl', \
                    '6':'mno', '7':'pqrs', '8':'tuv', '9':'wxyz'}
        res = []
        def dfs(u, path):
            if u == n:
                res.append(path)  
                # 一定要写 return 
                return 
            for c in my_dic[digits[u]]:
                dfs(u + 1, path + c) 

        dfs(0, '')
        return res
```

