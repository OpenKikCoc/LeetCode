#  [338. 比特位计数](https://leetcode-cn.com/problems/counting-bits/)

## 题意



## 题解



```c++
class Solution {
public:
    vector<int> countBits(int num) {
        vector<int> dp(num+1, 0);
        for(int i = 1; i <= num; ++i)
            dp[i] = i&1 ? dp[i-1] + 1 : dp[i>>1];
        return dp;
    }
};
```



```python3

```

