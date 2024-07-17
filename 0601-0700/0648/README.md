#  [648. 单词替换](https://leetcode.cn/problems/replace-words/)

## 题意



## 题解



```c++
class Solution {
public:
    // 手动字符串hash
    typedef unsigned long long ULL;
    const int P = 131;
    string replaceWords(vector<string>& dictionary, string sentence) {
        unordered_set<ULL> hash;
        for (auto & d : dictionary) {
            ULL h = 0;
            for (auto c : d) h = h * P + c;
            hash.insert(h);
        }

        stringstream ss(sentence);
        string s, res;
        while (ss >> s) {
            string t;
            ULL h = 0;
            for (auto c : s) {
                t += c;
                h = h * P + c;
                if (hash.count(h)) break;
            }
            res += t + ' ';
        }
        res.pop_back();
        return res;
    }

    // 原始hash
    string replaceWords_2(vector<string>& dictionary, string sentence) {
        unordered_map<string, bool> hash;
        for (auto & d : dictionary) hash[d] = true;

        vector<string> ve;
        stringstream ss(sentence);
        string s;
        while (ss >> s) {
            for (int i = 1; i < s.size(); ++ i ) {
                string sub = s.substr(0, i);
                if (hash.count(sub)) {
                    s = sub;
                    break;
                }
            }
            ve.push_back(s);
        }

        string res;
        for (auto & s : ve) {
            res += s;
            res.push_back(' ');
        }
        if (res.size()) res.pop_back();
        return res;
    }
};
```



```python3

```

