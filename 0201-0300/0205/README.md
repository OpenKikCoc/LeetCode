#  [205. 同构字符串](https://leetcode-cn.com/problems/isomorphic-strings/)

## 题意



## 题解



```c++
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        unordered_map<char, char> ms, mt;
        for (int i = 0; i < s.size(); ++i) {
            int a = s[i], b = t[i];
            if(ms.count(a) && ms[a] != b) return false;
            ms[a] = b;
            if(mt.count(b) && mt[b] != a) return false;
            mt[b] = a;
        }
        return true;
    }

    bool isIsomorphic_2(string s, string t) {
        unordered_map<char, int> ms, mt;
        int len = s.size();
        for(int i = 0; i < len; ++i) {
            char cs = s[i], ct = t[i];
            if(!ms[cs] && !mt[ct]) {
                ms[cs] = i+1;
                mt[ct] = i+1;   // not 0
            } else if(ms[cs] && mt[ct] && ms[cs] == mt[ct]) {
                continue;
            } else return false;
        }
        return true;
    }
};
```



```python3

```

