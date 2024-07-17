#   [781. 森林中的兔子](https://leetcode.cn/problems/rabbits-in-forest/)

## 题意



## 题解



```c++
class Solution {
public:
    // 有v个兔子声称其同色的还有k个
    int get(int k, int v) {
        return v % (k + 1) ? (v / (k + 1) + 1) * (k + 1) : v;
    }

    int numRabbits(vector<int>& answers) {
        unordered_map<int, int> hash;
        for (auto v : answers)
            hash[v] ++ ;
        int res = 0;
        for (auto & [k, v] : hash)
            res += get(k, v);
        return res;
    }
};
```

```c++
class Solution {
public:
    int numRabbits(vector<int>& answers) {
        unordered_map<int, int> cnt;
        for (auto x: answers) cnt[x] ++ ;
        int res = 0;
        for (auto [k, v]: cnt)
            // 【v / (k + 1) 向上取整】个组
            res += (v + k) / (k + 1) * (k + 1);
        return res;
    }
};
```



```python3

```

