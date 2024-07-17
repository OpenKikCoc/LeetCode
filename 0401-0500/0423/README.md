#  [423. 从英文中重建数字](https://leetcode.cn/problems/reconstruct-original-digits-from-english/)

## 题意



## 题解



```c++
class Solution {
public:
/*
        “z” 只在 “zero” 中出现。同时带走o
        “g” 只在 “eight” 中出现, 同时把h给带走了
        “h” 在剩下的单词中只有"three"有
        “w” 只在 “two” 中出现。同时把o带走
        “x” 只在 “six” 中出现
        “u” 只在 “four” 中出现。同时把f，o带走
        "f" 在剩下的单词中只有"five"有
        "o" 在剩下的单词里只有"one"有
        “s" 在剩下的单词里只有"seven"有
        "n" 在剩下的单词里只有"nine“有
*/
    string originalDigits(string s) {
        string name[] = {
            "zero", "one", "two", "three", "four", "five",
            "six", "seven", "eight", "nine"
        };
        int ord[] = {0, 8, 3, 2, 6, 4, 5, 1, 7, 9};
        unordered_map<char, int> cnt;
        for (auto c: s) cnt[c] ++ ;
        string res;
        for (int x: ord) {
            while (true) {
                bool flag = true;
                for (auto c: name[x])
                    if (!cnt[c]) {
                        flag = false;
                        break;
                    }
                    if (flag) {
                        res += to_string(x);
                        for (auto c: name[x]) cnt[c] -- ;
                    }
                    else break;
            }
        }
        sort(res.begin(), res.end());
        return res;
    }
};
```



```python3

```

