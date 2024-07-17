#  [383. 赎金信](https://leetcode.cn/problems/ransom-note/)

## 题意



## 题解



```c++
class Solution {
public:

    bool canConstruct(string a, string b) {
        unordered_map<char, int> hash;
        for (auto c: b) hash[c] ++ ;
        for (auto c: a)
            if (!hash[c]) return false;
            else hash[c] -- ;
        return true;
    }

    bool canConstruct_2(string ransomNote, string magazine) {
        sort(ransomNote.begin(), ransomNote.end());
        sort(magazine.begin(), magazine.end());
        int p = 0;
        for (int i = 0; i < magazine.size(); ++ i ) {
            if (p < ransomNote.size() && magazine[i] == ransomNote[p]) ++ p;
        }
        return p == ransomNote.size();
    }
};
```



```python3

```

