#   [771. 宝石与石头](https://leetcode-cn.com/problems/jewels-and-stones/)

## 题意



## 题解



```c++
class Solution {
public:
    int numJewelsInStones(string jewels, string stones) {
        unordered_set<char> hash(jewels.begin(), jewels.end());
        int res = 0;
        for (auto c: stones) res += hash.count(c);
        return res;
    }
};
```



```python3

```

