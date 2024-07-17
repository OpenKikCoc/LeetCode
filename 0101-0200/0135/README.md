#  [135. 分发糖果](https://leetcode.cn/problems/candy/)

## 题意



## 题解



```c++
class Solution {
public:
    int candy(vector<int>& ratings) {
        int len = ratings.size();
        if (len == 1) return 1;
        vector<int> candy(len + 1, 1);
        
        for (int i = 1; i < len; ++ i )
            if (ratings[i] > ratings[i - 1]) candy[i] = candy[i - 1] + 1;
        
        for (int i = len - 2; i >= 0; -- i )
            if (ratings[i] > ratings[i + 1]) candy[i] = max(candy[i], candy[i + 1] + 1);
        
        int ans = 0;
        for (int i = 0; i < len; ++i) ans += candy[i];
        return ans;
    }
};
```

记忆化dp

```c++
class Solution {
public:
    vector<int> f;
    vector<int> w;
    int n;

    int candy(vector<int>& ratings) {
        n = ratings.size();
        w = ratings;
        f.resize(n, -1);

        int res = 0;
        for (int i = 0; i < n; i ++ ) res += dp(i);
        return res;
    }

    int dp(int x) {
        if (f[x] != -1) return f[x];
        f[x] = 1;
        if (x && w[x - 1] < w[x]) f[x] = max(f[x], dp(x - 1) + 1);
        if (x + 1 < n && w[x + 1] < w[x]) f[x] = max(f[x], dp(x + 1) + 1);
        return f[x];
    }
};
```


```python
# 和滑雪的题 类似：记忆化搜索
"""
(前向扫描+后向扫描) O(n)
1.初始化一个糖果列表，给每个孩子初始化1个糖果；
2.从左往右，如果当前的孩子比左边孩子优秀，他的糖果比前面的多1；
3.从右往左，如果当前孩子比右边孩子优秀，他的糖果比右边至少多1.
4.对糖果列表求和。
"""

class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        if n == 0: return 0
        res = [1] * n

        for i in range(1, n):
            if ratings[i] > ratings[i-1]:
                res[i] = res[i-1] + 1
        for i in range(n-2, -1, -1):
            if ratings[i]>ratings[i+1]:
                res[i] = max(res[i],res[i+1]+1)

        return sum(res)
```

