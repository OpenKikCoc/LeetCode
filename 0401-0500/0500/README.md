#  [500. 键盘行](https://leetcode-cn.com/problems/keyboard-row/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<string> findWords(vector<string>& words) {
        string line[3] = {
            "qwertyuiop",
            "asdfghjkl",
            "zxcvbnm"
        };
        unordered_map<char, int> hash;
        for (int i = 0; i < 3; i ++ )
            for (auto& c: line[i])
                hash[c] = i;

        vector<string> res;
        for (auto& word: words) {
            set<int> S;
            for (auto c: word) S.insert(hash[tolower(c)]);
            if (S.size() == 1) res.push_back(word);
        }
        return res;
    }
};
```



```python3

```

