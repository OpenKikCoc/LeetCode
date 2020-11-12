#  [187. 重复的DNA序列](https://leetcode-cn.com/problems/repeated-dna-sequences/)

## 题意



## 题解



```c++
class Solution {
public:
    //1. 朴素 还可以字符串hash 略
    vector<string> findRepeatedDnaSequences_2(string s) {
        vector<string> res;
        unordered_map<string, int> mp;
        for(int i = 0; i + 10 <= s.size(); ++i) {
            string str = s.substr(i, 10);
            if(mp[str] == 1) res.push_back(str);
            ++mp[str];
        }
        return res;
    }
    // 2. 除字符串hash外的 bitset优化
    vector<string> findRepeatedDnaSequences(string s) {
        unordered_map<char, int> m{{'A', 0}, {'C', 1}, {'G', 2}, {'T', 3}};
        vector<string> res;
        bitset<1 << 20> s1, s2; 
        int val = 0, mask = (1 << 20) - 1; 
        for (int i = 0; i < 10; ++i) val = (val << 2) | m[s[i]];
        s1.set(val); 
        for (int i = 10; i < s.size(); ++i) {
            val = ((val << 2) & mask) | m[s[i]]; 
            if (s2.test(val)) continue; 
            if (s1.test(val)) {
                res.push_back(s.substr(i - 9, 10));
                s2.set(val);
            } else s1.set(val);
        }
        return res;
    }
};
```



```python3

```

