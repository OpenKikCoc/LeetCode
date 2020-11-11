#  [135. 分发糖果](https://leetcode-cn.com/problems/candy/)

## 题意



## 题解



```c++
class Solution {
public:
    int candy(vector<int>& ratings) {
        int len = ratings.size();
        if (len == 1) return 1;
        vector<int> candy(len+1, 1);
        
        for (int i = 1; i < len; ++i)
            if (ratings[i] > ratings[i-1]) candy[i] = candy[i-1] + 1;
        
        for (int i = len-2; i >= 0; --i)
            if (ratings[i] > ratings[i+1]) candy[i] = max(candy[i], candy[i+1] + 1);
        
        int ans = 0;
        for (int i = 0; i < len; ++i) ans += candy[i];
        return ans;
    }
};
```



```python3

```

