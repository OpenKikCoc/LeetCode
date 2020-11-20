#  [451. 根据字符出现频率排序](https://leetcode-cn.com/problems/sort-characters-by-frequency/)

## 题意



## 题解



```c++
class Solution {
public:
    string frequencySort(string s) {
        unordered_map<char, int> cnt;
        for (auto c: s) cnt[c] ++ ;
        sort(s.begin(), s.end(), [&](char a, char b) {
            if (cnt[a] != cnt[b]) return cnt[a] > cnt[b];
            return a < b;
        });
        return s;
    }
    string frequencySort_1(string s) {
        unordered_map<char, int> cnt;
        for (auto c : s) ++ cnt[c];
        vector<pair<int, char>> ve;
        for (auto [c, v] : cnt) ve.push_back({v, c});
        sort(ve.begin(), ve.end());
        string res;
        for (auto [v, c] : ve) for (int i = 0; i < v; ++ i ) res.push_back(c);
        reverse(res.begin(), res.end());
        return res;
    }
    string frequencySort_2(string s) {
        unordered_map<char, int> m;
        int len = s.size();
        for(int i = 0; i < len; ++i) ++m[s[i]];
        vector<pair<char, int>> vp;
        for(auto iter = m.begin(); iter != m.end(); ++iter)
            vp.push_back(*iter);
        sort(vp.begin(), vp.end(), [](const pair<char, int>& a, const pair<char, int>& b) {
            return a.second > b.second;
        });
        string res;
        for(int i = 0; i < vp.size(); ++i) res += string(vp[i].second, vp[i].first);
        return res;
    }
};
```



```python3

```

