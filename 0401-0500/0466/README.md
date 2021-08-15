#  [466. 统计重复个数](https://leetcode-cn.com/problems/count-the-repetitions/)

## 题意



## 题解

一般类似这样的大规模数据都考虑能否【倍增】或【循环节】

本题即为循环节优化

```c++
class Solution {
public:
    // 循环节
    int getMaxRepetitions(string s1, int n1, string s2, int n2) {
        vector<int> cnt;
        // 匹配完后是匹配了s2的多少个字符
        unordered_map<int, int> hash;
        for (int i = 0, k = 0; i < n1; ++ i ) {
            for (int j = 0; j < s1.size(); ++ j )
                if (s1[j] == s2[k % s2.size()]) ++ k ;
            cnt.push_back(k);
            // 判断当前余数有没有出现过
            if (hash.count(k % s2.size())) {    // 出现循环节
                int a = i - hash[k % s2.size()];        // 循环节中有多少个s1
                int b = k - cnt[hash[k % s2.size()]];   // 循环节中匹配了多少个字符
                int res = (n1 - i - 1) / a * b;
                // 不完整部分
                for (int u = 0; u < (n1 - i - 1) % a; ++ u )
                    for (int j = 0; j < s1.size(); ++ j )
                        if (s1[j] == s2[k % s2.size()])
                            ++ k ;
                res += k;
                return res / s2.size() / n2;
            }
            hash[k % s2.size()] = i;
        }
        if (cnt.empty()) return 0;
        return cnt.back() / s2.size() / n2;
    }
};
```



```python3

```

