#  [710. 黑名单中的随机数](https://leetcode-cn.com/problems/random-pick-with-blacklist/)

## 题意



## 题解



```c++
class Solution {
public:
    // 核心在于将黑名单中的数值映射为其他数值
    int n, len;
    unordered_map<int, int> hash;

    Solution(int N, vector<int>& blacklist) {
        n = N, len = blacklist.size();
        // 可被映射的值 S
        unordered_set<int> S;
        for (int i = n - len; i < n; i ++ ) S.insert(i);
        // 删除黑名单元素
        for (auto x: blacklist) S.erase(x);
        // 将黑名单元素设置为对应映射值
        auto it = S.begin();
        for (auto x: blacklist)
            if (x < n - len)
                hash[x] = *it ++ ;
    }

    int pick() {
        int k = rand() % (n - len);
        if (hash.count(k)) return hash[k];
        return k;
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(N, blacklist);
 * int param_1 = obj->pick();
 */
```



```python3

```

